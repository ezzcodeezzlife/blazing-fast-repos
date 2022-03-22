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
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Highlighter from "react-highlight-words";
import { GoMarkGithub, GoGlobe } from "react-icons/go";

function Header() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="#">✨blazing fast✨repos</Navbar.Brand>
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header></Header>
      <br></br>
      <center>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <div id="content">
            {repos.map((repo) => (
              <>
                <Card>
                  <Card.Header>
                    <Badge bg="secondary"> ⭐ {repo.stargazers_count}</Badge> ▪️{" "}
                    <Badge bg="secondary"> 🍴 {repo.forks_count}</Badge> ▪️{" "}
                    <Badge bg="info">{repo.language}</Badge>
                  </Card.Header>
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
                    <Button href={repo.html_url} variant="primary">
                      <GoMarkGithub></GoMarkGithub> GitHub
                    </Button>{" "}
                    <Button href={repo.homepage} variant="secondary">
                      <GoGlobe></GoGlobe> Homepage
                    </Button>
                  </Card.Body>
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
