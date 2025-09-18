

export default function EmojiButton({style, handleClick, content}) {
    
    return (
      <button
        className={ style }
        onClick={ handleClick }
      >
        { content }
      </button>
    )
}






/**
 * Challenge 8:
 * 1) In the components folder, create a new component, "EmojiButton". The component should return an HTML button element equivalent to the button in the "MemoryCard" component.
 * 2) Refactor the "MemoryCard" component to render the new "EmojiButton" instead of the current HTML button element. Pass three props to the "EmojiButton": "content" (the emoji itself), "style" (the class names) and "handleclick" (the function reference).
 * 3) Rename the "emojiEl" variable to "cardEl" to make it clear that we create the card here in the "MemoryCard" component while the emoji itself is rendered in the "EmojiButton" component.
 * 4) In the "App" component, log "selectedCards" to the console. Run the code and click some cards to check that your refactored code is working.
 */


/*
Details on data flow:

- App component:
  Holds all the state: emojisData, selectedCards, matchedCards.
  Also has the logic (useEffect + turnCard) to track which cards
  are selected/matched.

- MemoryCard component:
  Receives emojisData as a prop from App.
  Inside, we map over emojisData → for each emoji we pass:
    • emoji.name
    • index in the array
    • plus handleClick (turnCard fn) back to App

- What each MemoryCard knows:
  Just its own name + index (from props).
  When clicked, it reports back to App via turnCard.

- What it doesn’t know:
  Its own status (whether selected or matched).
  That info lives in App’s state and is not passed down yet.
*/
