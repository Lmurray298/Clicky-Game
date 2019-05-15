import React, { Component } from "./node_modules/react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import Items from "../Items";
import data from "../../data.json";


class Game extends Component {
    state = {
        data,
        score: 0,
        topScore: 0
    };

    componentDidMount(){
        this.setState({ data: this.shuffleData(this.state.data) });
    }

    handleCorrectGuess = newData => {
        const { topScore, score } = this.state;
        const newScore = score + 1;
        const newTopScore = Math.max(newScore, topScore);

        this.setState({
            data: this.shuffleData(newData),
            score: newScore,
            topScore: newTopScore
        });
    };

    resetData = data => {
        const resetData = data.map(item => ( {...item, clicked: false }));
        return this.shuffleData(resetData);
    };


    shuffleData = data => {
        let i = data.length - 1;
        while (i > 0) {
            const k = Math.floor(Math.random() * (i + 1 ));
            const temp = data[i];
            data[i] = data[k];
            data[k] = temp;
            i--;
        }
        return data;
    };

    handleItemClick = id => {
        let guessedCorrectly = false;
        const newData = this.state.data.map(item => {
            const newItem = { ...item }; 
            if (newItem.id === id) {
                if (!newItem.clicked) {
                    newItem.clicked = true;
                    guessedCorrectly = true;

                }
            }
            return newItem;

        });
        guessedCorrectly
        
        ? this.handleCorrectGuess(newData)
        : this.handleIncorrectGuess(newData);

  
    };

    render() {
        return (
          <div>
            <Nav score={this.state.score} topScore={this.state.topScore} />
            <Header />
            <Container>
              {this.state.data.map(item => (
                <Items
                  key={item.id}
                  id={item.id}
                  shake={!this.state.score && this.state.topScore}
                  handleClick={this.handleItemClick}
                  image={item.image}
                />
              ))}
            </Container>
          </div>
        );
      }
    }
    
    export default Game;
    

