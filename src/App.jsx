import { useState } from 'react'
import './index.css'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'


export default function App() {
  const [isGameOn, setIsGameOn] = useState(false)

  async function startGame(e) {
    e.preventDefault()

    try { 

      const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature");

        if (!response.ok) {
          
          throw new Error("Failed to fetch emojis");

        } else {
          
          const data = await response.json();
          console.log([data]);
          setIsGameOn(true);
          
      }

    } catch (error) { 

      console.error("Error:", error.message);

    }


    setIsGameOn(true)
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




/**
 * Challenge 1:
 
 1) Turn startGame into an async function.
 
 2) Use the try...catch syntax and make a fetch request to the emoji API, using this url:         
 "https://emojihub.yurace.pro/api/all/category/animals-and-nature". Store the response in a      
  const "response".
 
 3) Check if the response is ok.
    
    a) If yes, store the fetched data in a const "data". Log the data to the console.               
    Call setIsGameOn(true).
    
    b) If no, throw an error with a custom error message, and inside the catch block, log           
    the error message to the console.
 
 💡 Hint: Remember the await keyword!
 ⚠️ Warning: The emojis rendered will still be those from the hardcoded array.
 */
