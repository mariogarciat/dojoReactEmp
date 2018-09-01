import React, { Component } from 'react'

class Pokemon extends Component{

    constructor(props){
        super(props)
        this.state = {
            attributes: []
        }
    }

    componentDidMount(){
        const requestPokemon = async () => {
            const response = await fetch(this.props.url)
            const pokemonAttrs = await response.json()
            this.setState({attributes: pokemonAttrs})
        }
        requestPokemon() 
    }

    render() {
        var imgURL = ''
        var abilities = []
        var moves = []
        if(this.state.attributes.id !== undefined){
            imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.attributes.id}.png`
        }
        if (this.state.attributes.abilities !== undefined) {
            abilities = this.state.attributes.abilities.map((element, index) => 
              <li key={index}>{element.ability.name}</li>
            )
          }
      
        if (this.state.attributes.moves !== undefined) {
        moves = this.state.attributes.moves.slice(0, 4).map((element, index) =>
            <li key={index}>{element.move.name}</li>
        )
        }
        
        return(
            <div className="card pokemon">
                <div className="card-image">
                    <figure className="image is-128x128">
                        <img src={imgURL}/>
                    </figure>
                </div>
                
                <div className="card-content">
                <div className="media-content">
                    <p className="title is-4">{this.state.attributes.name}</p>
                </div>
                
                <table className="table is-narrow is-fullwidth">
                    <tbody>
                    <tr>
                        <td className="has-text-bold">Weight</td>
                        <td>{this.state.attributes.weight}</td>
                    </tr>
                
                    <tr>
                        <td className="has-text-bold">Height</td>
                        <td>{this.state.attributes.height}</td>
                    </tr>
                
                    <tr>
                        <td className="has-text-bold">Abilities</td>
                        <td>{abilities}</td>
                    </tr>
                
                    <tr>
                        <td className="has-text-bold">Moves</td>
                        <td>{moves}</td>
                    </tr>
                
                    </tbody>
                </table>
                
                </div>
                    
                <footer className="card-footer">
                    <button className="button is-primary" 
                        onClick={() => this.props.onCatchThem(this.state.attributes)}>
                        Capture
                    </button>
                </footer>
            </div>
        )
    }

}
export default Pokemon