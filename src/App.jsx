import { useState, useEffect } from 'react'

import './index.css'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'


export default function App() {
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);

  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  
  // Log Tests
  useEffect(() => {
    console.log("selectedCards updated:", JSON.stringify(selectedCards, null, 2));
  }, [selectedCards]);

  // TUTORIAL SOLUTION, but I useEffect works better for me
  // console.log("This is the simple log of selectedCards", selectedCards);

  useEffect(() => {

    if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {

      setMatchedCards(prev => [...prev, ...selectedCards])
      console.log("Matched", selectedCards)
    }
  }, [selectedCards])

  
  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setIsGameOver(true)
    }
  }, [matchedCards, emojisData])
  console.log("is Game Over? ", isGameOver);


  /*
  useEffect(() => { 
    console.log("emojisData: ", emojisData)
  }, [emojisData]);
  */

    async function startGame(e) {
      e.preventDefault()

      try { 

        const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature");

          if (!response.ok) {
            throw new Error("Failed to fetch emoji data from API");
          }
            
        const data = await response.json();
        //console.log("Fetched data from API: ", data);

        const dataSlice = getDataSlice(data);
        //console.log("testing getDataSlice(data):", dataSlice)  

        const emojisDataArray = getEmojisArray(dataSlice);
        //console.log("emojisDataArray(dataSlice): ", emojisDataArray);
        
        setEmojisData(emojisDataArray);
        setIsGameOn(true);  
        
      } catch (error) { 
        console.error("Error:", error.message);
      }
    }

  
  function getDataSlice(data) {
    const randomIndices = getRandomIndices(data);
    const dataSlice = randomIndices.map( index => data[index]);
    return dataSlice;
  }

  /** TUTORIAL VERSION - getDataSlice(data)
   * Will keep for reference in case my implementation mess up stuff.
   * 
  function getDataSlice(data) {
    const randomIndices = getRandomIndices(data);
    const dataSlice = randomIndices.reduce((array, index) => {
      array.push(data[index]); 
      return array;
    }, [])
    return dataSlice;
  }
  */


  function getRandomIndices(data) {

    const randomIndicesSet = new Set;

    while (randomIndicesSet.size < 5) {
      const randomNum = Math.floor(Math.random() * data.length);
      randomIndicesSet.add(randomNum);
    }

    return Array.from(randomIndicesSet);
  }

  /** TUTORIAL VERSION - getRandomIndices(data)
   *  Keeping tutorial version commented for reference in case 
   *  my implementation messes things up later on

  function getRandomIndices(data) {
    const randomIndicesArray = [];

    for (let i = 0; i < 5; i++) {
      const randomNum = Math.floor(Math.random() * data.length);

      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum)
      } else {
        i--
      }
    };
    return randomIndicesArray;
  }
  */


  function getEmojisArray(dataSlice) {
    // Duplicate the Array:
    const pairedEmojisArray = [...dataSlice, ...dataSlice];

    // Shuffle using the Fisher–Yates algorithm
    for (let i = pairedEmojisArray.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [pairedEmojisArray[i], pairedEmojisArray[j]] = [pairedEmojisArray[j], pairedEmojisArray[i]];
    }

    return pairedEmojisArray; 
  }

  /** TUTORIAL Version getEmojisArray(data)
   **  It's the same but instead of `dataSlice` uses `data`
   *
    async function getEmojisArray(data) {
      const pairedEmojisArray = [...data, ...data]
      // shuffle...
      return pairedEmojisArray
    }
  * 
  * * According to ChatGPT - In the tutorial version:
  * * `data` was the **full API response** (all \~107 emojis in that category).
  * * The function duplicated and shuffled **all 107 emojis**, not just the 5 the game needed.
  * * Then the game would eventually only use the first few, but the shuffle was unnecessarily large.
  * * The refactored version using `dataSlice` ensures you only duplicate and shuffle the **subset of emojis** actually used in the game board, which is more efficient.
  * */




  function turnCard(name, index) {
    // console.log(`The emoji ${name} at index ${index} was clicked!`);

    const isCardSelected = selectedCards.find(card => card.index === index)
    
     if (isCardSelected && selectedCards.length === 1)  console.log("Pick another card you cheat!") 

    if (isCardSelected === undefined && selectedCards.length < 2) {
      setSelectedCards(prev => [...prev, { name, index }])
  
    } else if (!isCardSelected && selectedCards.length === 2 ) {
      setSelectedCards([{ name, index }])
    }
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} data={ emojisData } />}
    </main>
  )
}


/**
 * Challenge:
 * 1) Create a new state variable, "isGameOver", with a corresponding setter function. Initialize the variable as false.
 * 2) Create a new useEffect that sets "isGameOver" to true when all memory cards have been matched and the game is over. Make sure to consider the following:
 *      - What value should we use in the dependencies array?
 *      - What condition can we use to determine whether the game is over?
 */



