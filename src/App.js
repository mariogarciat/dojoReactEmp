import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pokemon from './pokemon'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pokemons: [],
      pokedex: [],
    }
  }

  componentWillMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=15")
    .then(response => response.json())
    .then(resPokemons => this.setState({pokemons: resPokemons.results}))
  }

  catchThem = (pokemon) => {
    const randy = Math.floor(Math.random() *10)
    if(randy % 2 == 0){
      this.setState({pokedex: this.state.pokedex.concat(pokemon)})
      alert(pokemon.name +" CAPTURADO")
    }else {
      alert("Pokemon no capturado")
    }
  }

  render() {
    return ( 
      <div className="App">
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-10">
                <h4 className="title is-4">Pokemons capturados: {this.state.pokedex.length}</h4>
                <h5 className="title is-5">Atrapa el pokemon</h5>
                <div className="pokemon-list">
                  {this.state.pokemons.map((pokemon, index) => 
                    <Pokemon key={index} url={pokemon.url} onCatchThem={this.catchThem}/>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
