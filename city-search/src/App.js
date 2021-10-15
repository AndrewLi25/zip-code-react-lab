import React, { Component } from 'react';
import './App.css';

function ZipCode( { data } ) {
  return (
    <div className="Zips">
      { data }
    </div>
  );
}

function CitySearchField(props) {
  return (
    <div>
      <strong>City:</strong>
      <input type="text" onChange={ props.changeHandler }></input>
    </div>
  );
}


class App extends Component {

  state = {
    city: '',
    zipCodes: []
  }

  cityChanged = (event) => {

    console.log(event.target.value);
    this.setState({ city: event.target.value });

    fetch(`http://ctp-zip-api.herokuapp.com/city/${event.target.value.toUpperCase()}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ zipCodes: data });
      })
      .catch((err) => {
        console.log("No Results");
        this.setState({ zipCodes: [] });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div className="CitySearch">
          <CitySearchField city={this.state.city} changeHandler={this.cityChanged} />
          Current City is { this.state.city.toUpperCase() }
        </div>
        <div>
          { this.state.zipCodes.length === 0 ? <h2 className="No-result">No Results</h2> : null }
          { this.state.zipCodes.map((zip) => <ZipCode data={ zip } />) }
        </div>
      </div>
    );
  }
}

export default App;