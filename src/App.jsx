import { useState } from 'react'
import { decode } from 'html-entities';
import './index.css'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'


export default function App() {
  const [isGameOn, setIsGameOn] = useState(false)
  const [emojisData, setEmojisData] = useState([]);

  console.log("emojisData: ", emojisData)

    async function startGame(e) {
      e.preventDefault()

      try { 

        const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature");

          if (!response.ok) {
            throw new Error("Failed to fetch emoji data from API");
          }
            
        const data = await response.json();
        console.log("Fetched data from API: ", data);

        const emojisDataArray = data.slice(0, 5);
        console.log("emojisDataArray (first 5 emojis): ", emojisDataArray);
        
        console.log("testing getRandomIndices(data)", getRandomIndices(data));
          
        setEmojisData(emojisDataArray);
        
        setIsGameOn(true);  
        
      } catch (error) { 
        console.error("Error:", error.message);
      }
    }


  function getRandomIndices(data) {
    const randomIndicesArray = [];

    for (let i = 0; i < 5; i++){
      const randomNum = Math.floor(Math.random() * data.length);

      if (!randomIndicesArray.includes(randomNum)) {
        randomIndicesArray.push(randomNum)
      } else {
        i--
      }
    };
    return randomIndicesArray;
  }

  function turnCard() {
    console.log("Memory card clicked")
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && <Form handleSubmit={startGame} />}
      {isGameOn && <MemoryCard handleClick={turnCard} />}
    </main>
  )
}


