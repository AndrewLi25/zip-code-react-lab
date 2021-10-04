import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './App.css';


function City( { data } ) {
  return (
    <div>
      <Card className="Card">
        <Card.Header as="h5">
            { data.City }, { data.State }
        </Card.Header>
        <Card.Body>
        <ul>
          <li>State: { data.State }</li>
          <li>Location: ({ data.Long }, { data.Lat })</li>
          <li>Population (estimated): { data.EstimatedPopulation }</li>
          <li>Total Wages: { data.TotalWages }</li>
        </ul>
        </Card.Body>
      </Card>
    </div>
    );
}

function ZipSearchField(props) {
  return (
    <div>
      <strong>Zip Code:</strong>
      <input type="text" onChange={ props.changeHandler } />
    </div>
  );
}


class App extends Component {

  state = {
    zipCode: '',
    cities: []
  }

  zipChanged = (event) => {
    console.log(event.target.value);
    this.setState({ zipCode: event.target.value });

    if (event.target.value.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ cities: data });
        })
        .catch((err) => {
          console.log("No Results");
          this.setState({ cities: [] });
        });
    }
    else this.setState({ cities: [] });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="Zipcode">
          <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChanged} />
          Current Zip is { this.state.zipCode }
        </div>
        <div>
          { this.state.cities.length === 0 ? <h2 className="No-result">No Results</h2> : null }
          { this.state.cities.map((city) => <City data={city} />) }
        </div>
      </div>
    );
  }
}

export default App;
