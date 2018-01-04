import React, { Component } from 'react';
import ContentLoader from 'react-content-loader'
import Cards from '../Cards/Cards';
import MapWithAMarker from '../GoogleMaps/GoogleMaps';
import { fetchData, sortData } from '../utils/utils';
import './App.css';

const MyLoader = () => <ContentLoader type="facebook" />

class App extends Component {
  state = {
    hazards: {
      accidents: [],
      ongoing: [],
      rest: []
    },
    coords: { lat: -33.8688, lng: 151.2093 },
    zoom: 6
  };

  goToCoords({ lat, lng }) {
    this.setState({
      coords: { lat, lng },
      zoom: 13
    });
    const map = document.getElementById('google-maps');
    map.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidMount() {
    fetchData()
      .then(response => {
        const filtered = sortData(response);
        this.setState({
          hazards: filtered
        });
      });
  }

  render() {
    const options = {
      weekday: 'long',
      year: '2-digit',
      month: 'short',
      day: 'numeric'
    };
    const date = new Date().toLocaleString('en-AU', options);
    const combined = [].concat(this.state.hazards.accidents, this.state.hazards.ongoing, this.state.hazards.rest);
    return (
      <div>
        <header>
          <div className="container">
            <h1>NSW | Current Road Hazards</h1>
          </div>
        </header>
        <main>
          <section>
            <article>
              <Cards data={this.state.hazards.accidents} />
              <Cards data={this.state.hazards.rest} />
              <Cards data={this.state.hazards.ongoing} />
            </article>
            <article>
              <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwLOREvY7B0YO5OZAqBiydgaGkRavgTTI"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `600px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                data={combined}
                defaultCenter={this.state.coords}
                defaultZoom={this.state.zoom}
                coords={this.state.coords}
                zoom={this.state.zoom}
              />
            </article>
          </section>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default App;

{/*<Grid container>
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
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwLOREvY7B0YO5OZAqBiydgaGkRavgTTI"
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
</Grid>*/}
