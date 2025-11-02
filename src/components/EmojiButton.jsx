

export default function EmojiButton({
  content,
  handleClick,
  selectedCardEntry,
  matchedCardEntry
}) {

  const btnContent = selectedCardEntry || matchedCardEntry ? content : "?"

  const btnStyle =
    matchedCardEntry ? "btn--emoji__back--matched" :
      selectedCardEntry ? "btn--emoji__back--selected" :
        "btn--emoji__front"

  return (
    <button
      className={`btn btn--emoji ${btnStyle}`}
      onClick={selectedCardEntry ? null : handleClick}
      disabled={matchedCardEntry}
    >
      {btnContent}
    </button>
  )
}

/** EmojiButton

     * Challenge:
     * Add a disabled attribute to the button and give it a value that is thruthy when a card is matched, otherwise falsy.

      Check moving with KEYBOARD, it should skip the card
*/
/**
     * Challenge:  Emojibutton and Appp
     * Refactor the onClick event handler. Use a ternary operator to set the value to null if a card is selected, otherwise "handleClick".
     */