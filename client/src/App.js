import React, { Component } from 'react';
import { Grid, Card, Header, Icon } from 'semantic-ui-react';
import Cards from './Cards';
import MapWithAMarker from './GoogleMaps';
import './App.css';

class App extends Component {
  state = {
    hazards: [],
    coords: { lat: -33.8688, lng: 151.2093 },
    zoom: 6
  };

  fetchAPI() {
    fetch('/api').then(response => response.json()).then(val => {
      const parsed = JSON.parse(val);
      this.setState({
        hazards: parsed.features
      });
    });
  }

  goToCoords({ lat, lng }) {
    this.setState({
      coords: { lat, lng },
      zoom: 13
    });
    const map = document.getElementById('google-maps');
    map.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidMount() {
    this.fetchAPI();
  }

  render() {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const date = new Date().toLocaleString('en-AU', options);

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
            <Cards data={this.state.hazards} clickHandler={this.goToCoords.bind(this)} />
            <Card fluid id="google-maps">
              <Card.Content>
                <MapWithAMarker
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `600px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  data={this.state.hazards}
                  defaultCenter={this.state.coords}
                  defaultZoom={this.state.zoom}
                  coords={this.state.coords}
                  zoom={this.state.zoom}
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
