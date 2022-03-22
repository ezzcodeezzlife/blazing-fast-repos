import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Card, Button, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Highlighter from "react-highlight-words";

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

  const fetchData = () => {
    fetch(
      "https://api.github.com/search/repositories?q=blazing%20fast&sort=stars&order=desc&per_page=100"
    )
      .then((response) => {
        return response.json();
      })
      .then((repos) => {
        setRepos(repos.items);
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
        <div id="content">
          {repos.map((repo) => (
            <>
              <Card>
                <Card.Header> ⭐ {repo.stargazers_count}</Card.Header>
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
                    GitHub
                  </Button>
                </Card.Body>
              </Card>
              <br></br>
            </>
          ))}
        </div>
      </center>
    </>
  );
}

export default App;
