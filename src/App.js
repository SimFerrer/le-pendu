import React, { Component } from 'react';
import './App.css';

import './Keyboard/Keyboard'
import Keyboard from './Keyboard/Keyboard';
import Letter from './Letter/Letter';
import Counter from './Counter/Counter';

const allword = ["NOMBRE", "GEANTE", "CORAUX", "ROULEAU", "EJECTER", "LIVRETS",
  "DIVISION", "LICORNES", "FOURNEAU", "EMPLETTE", "CLEPSYDRE", "INDIGENES",
  "ECLATANTE", "MATERIAUX", "ANAGRAMME", "ULTERIEURE", "FACTORISER",
  "RACCROCHER", "HIPPOPOTAME", "SAUTERELLES"]

class App extends React.Component {


  state = {
    keyboard: this.generateKeyboard(),
    word: this.generateWords(),
    guesses: 0,
    selection: [],
    gameState: "en cours",
  }



  generateKeyboard() {
    return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  }


  generateWords() {
    const result = []
    let oneWord = Math.floor(Math.random() * allword.length)
    oneWord = allword[oneWord]
    const word = oneWord.split('')
    while (word.length > 0) {
      const letter = word.shift()
      result.push(letter)
    }
    return result
  }

  handleCardClick = (letter) => {
    const { selection, gameState } = this.state

    if (gameState == "en cours") {
      console.log(selection)
      this.setState({ selection: [...selection, letter] }, this.gameState)
      return
    }
  }

  getFeedback(letter) {
    const { selection } = this.state
    return selection.includes(letter)
  }

  gameState = () => {
    const { word, selection } = this.state
    const lastTests = 10 - this.trying()
    const findWord = word.filter(elt => selection.includes(elt)).length === word.length
    if (lastTests > 0 && findWord) {
      this.setState({ gameState: "gagnée" })
    } else if (lastTests > 0) {
      return
    } else {
      this.setState({ gameState: "perdue" })
    }
  }

  trying = () => {
    const { word, selection } = this.state
    return selection.filter(elt => !word.includes(elt)).length
  }

  newGame = () => {
    this.setState({ selection: [], word: this.generateWords(), gameState: "en cours" })
  }

  render() {
    const { keyboard, word } = this.state
    return (
      <div className="lependu">
        <div className="header">
          <h1 className="title">Jeu du pendu</h1>
          <button className="btn btn-info" onClick={this.newGame}>Nouvelle partie</button>
        </div>
        <div className="game">
          {word.map((letter, index) => (
            <Letter
              letter={letter}
              feedback={this.getFeedback(letter) ? "visible" : "hidden"}
              key={index}
            />
          ))}
          <Counter
            counter={this.trying()}
            gameState={this.state.gameState}
          />
        </div>
        <div className="keyboard">
          {keyboard.map((letter, index) => (
            <Keyboard
              letter={letter}
              feedback={this.getFeedback(letter) ? "visible" : "hidden"}
              key={index}
              gameState={this.state.gameState}
              onClick={this.handleCardClick}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
