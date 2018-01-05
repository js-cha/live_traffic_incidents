import React, { Component } from 'react';
import Cards from '../Cards/Cards';
import MapWithAMarker from '../GoogleMaps/GoogleMaps';
import { fetchData, sortData } from '../utils/utils';
import './App.css';
import './normalize.css';

class App extends Component {
  state = {
    hazards: {
      accidents: [],
      ongoing: [],
      rest: []
    },
    dataLoaded: false,
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
          hazards: filtered,
          dataLoaded: true
        });
      });
  }

  render() {
    const options = {
      weekday: 'long',
      year: '2-digit',
      month: 'long',
      day: 'numeric'
    };
    const date = new Date().toLocaleString('en-AU', options);
    const { accidents, ongoing, rest } = this.state.hazards;
    const combined = [].concat(accidents, ongoing, rest);

    return (
      <div>
        <header>
          <div className="container">
            <h1>NSW | Current Road Hazards</h1>
            <span>{date}</span>
          </div>
        </header>
        <main>
          <div className="container">
            <section>
              <article>
                <div className="cards_container">
                  <div className="cards accidents">
                    <h2 className="cards__title">Accidents ({accidents.length})</h2>
                    <Cards loaded={this.state.dataLoaded} data={accidents} clickHandler={this.goToCoords.bind(this)} />
                  </div>
                  <div className="cards hazards">
                    <h2 className="cards__title">Hazards ({rest.length})</h2>
                    <Cards loaded={this.state.dataLoaded} data={rest} clickHandler={this.goToCoords.bind(this)} />
                  </div>
                  <div className="cards ongoing">
                    <h2 className="cards__title">Ongoing ({ongoing.length})</h2>
                    <Cards loaded={this.state.dataLoaded} data={ongoing} clickHandler={this.goToCoords.bind(this)} />
                  </div>
                </div>
              </article>
              <article>
                <div id="google-maps">
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
                </div>
              </article>
            </section>
          </div>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default App;
