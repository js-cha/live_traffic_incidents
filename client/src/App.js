import React, { Component } from "react";
import { Grid, Container, Header, Icon } from "semantic-ui-react";
import Cards from "./Cards";
import "./App.css";

class App extends Component {
  state = {
    hazards: []
  };

  fetchAPI() {
    fetch("/api")
      .then(response => response.json())
      .then(val => {
        const parsed = JSON.parse(val);
        this.setState({
          hazards: parsed.features
        });
      });
  }

  componentDidMount() {
    this.fetchAPI();
  }

  render() {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const date = new Date().toLocaleString("en-AU", options);

    return (
      <Grid padded>
        <Grid.Column>
          <Container>
            <Header as="h1" color="red">
              <Icon name="warning sign" />
              <Header.Content>
                Live NSW road incidents &ndash; {date}
              </Header.Content>
            </Header>
            <Cards data={this.state.hazards} />
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
