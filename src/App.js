import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Card,
  Button,
  Navbar,
  Container,
  Spinner,
  Badge,
  Jumbotron,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Highlighter from "react-highlight-words";
import { GoMarkGithub, GoGlobe, GoBeaker } from "react-icons/go";
import header from "./header.JPG"; // Tell webpack thits JS file uses this image
import GithubCorner from "react-github-corner";
import ReactGA from "react-ga4";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

ReactGA.initialize("G-PG0Y3ZSSTJ");
ReactGA.send("pageview");

function Header() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>✨ blazing fast ✨ repos</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch(
      "https://api.github.com/search/repositories?q=blazing%20fast&sort=stars&order=desc&per_page=100"
    )
      .then((response) => {
        return response.json();
      })
      .then((repos) => {
        setRepos(repos.items);
        setLoading(false);
      });
  };

  const randomRepo = () => {
    const repoarray = [];
    repos.map((repo) => {
      repoarray.push(repo.html_url);
    });
    var randomrepo = repoarray[Math.floor(Math.random() * repoarray.length)];
    return randomrepo;
  };

  console.log(randomRepo());

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header></Header>
      <GithubCorner href="https://github.com/ezzcodeezzlife/blazing-fast-repos" />
      <img src={header} id="headerimg" alt="Logo" />
      <br></br>

      <center>
        {loading ? (
          <>
            <div id="content">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <br></br>

              <Card>
                <Card.Body>
                  <Card.Title> {<Skeleton />}</Card.Title>
                  <Card.Text>
                    <Skeleton />
                  </Card.Text>
                  <Skeleton />
                </Card.Body>
                <Card.Header>
                  <Skeleton />
                </Card.Header>
              </Card>
              <br></br>

              <Card>
                <Card.Body>
                  <Card.Title> {<Skeleton />}</Card.Title>
                  <Card.Text>
                    <Skeleton />
                  </Card.Text>
                  <Skeleton />
                </Card.Body>
                <Card.Header>
                  <Skeleton />
                </Card.Header>
              </Card>
              <br></br>

              <Card>
                <Card.Body>
                  <Card.Title> {<Skeleton />}</Card.Title>
                  <Card.Text>
                    <Skeleton />
                  </Card.Text>
                  <Skeleton />
                </Card.Body>
                <Card.Header>
                  <Skeleton />
                </Card.Header>
              </Card>
              <br></br>
            </div>
          </>
        ) : (
          <div id="content">
            <h5>Get a random ✨blazing fast✨ repo: </h5>
            <Button
              id="randombutton"
              variant="outline-primary"
              href={randomRepo()}
            >
              {" "}
              <GoBeaker></GoBeaker> Random
            </Button>{" "}
            {repos.map((repo) => (
              <>
                <Card>
                  <Card.Body>
                    <Card.Title> {repo.name}</Card.Title>
                    <Card.Text>
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[
                          "blazing",
                          "fast",
                          "blazing fast",
                          "blazing-fast",
                        ]}
                        autoEscape={true}
                        textToHighlight={repo.description}
                      />
                    </Card.Text>
                    <Button
                      id="homepagebutton"
                      href={repo.html_url}
                      variant="primary"
                    >
                      <GoMarkGithub></GoMarkGithub> GitHub
                    </Button>{" "}
                    <Button
                      id="homepagebutton"
                      href={repo.homepage}
                      variant="secondary"
                    >
                      <GoGlobe></GoGlobe> Homepage
                    </Button>
                  </Card.Body>
                  <Card.Header>
                    <Badge bg="secondary"> ⭐ {repo.stargazers_count}</Badge> ▪️{" "}
                    <Badge bg="secondary"> 🍴 {repo.forks_count}</Badge> ▪️{" "}
                    <Badge bg="info">{repo.language}</Badge>
                  </Card.Header>
                </Card>
                <br></br>
              </>
            ))}
          </div>
        )}
      </center>
    </>
  );
}

export default App;
