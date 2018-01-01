import React, { Component } from "react";
import { Grid, Card, Header, Icon } from "semantic-ui-react";
import Cards from "./Cards";
import MapWithAMarker from './GoogleMaps';
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
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const date = new Date().toLocaleString("en-AU", options);

    return (
      <div>
        <Grid container>
          <Grid.Column>
            <Header as="h1" color="red">
              <Icon name="warning sign" />
              <Header.Content>
                Live NSW road incidents &ndash; {date}
              </Header.Content>
            </Header>
            <Cards data={this.state.hazards} />
            <Card fluid>
              <Card.Content>
                <MapWithAMarker
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `600px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  data={{ lat: -33.8688, lng: 151.2093 }}
                />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
