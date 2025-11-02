import EmojiButton from './EmojiButton'

export default function MemoryCard({ handleClick, data, selectedCards, matchedCards }) {

  const cardEl = data.map((emoji, index) => {
    const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
    const matchedCardEntry = matchedCards.find(emoji => emoji.index === index)

    const cardStyle = matchedCardEntry ? "card-item--matched"
      : selectedCardEntry ? "card-item--selected" : "";
    
    return (
      <li key={index} className={`card-item ${cardStyle}`}>
        <EmojiButton
          emoji={emoji}
          handleClick={() => handleClick(emoji.name, index)}
          selectedCardEntry={selectedCardEntry}
          matchedCardEntry={matchedCardEntry}
        />
      </li>
    )
  })

  return <ul className="card-container">{cardEl}</ul>
}

/**
    We need to pass the complete emoji to the EmojiButton to make it accessible.
    We are going to move the decoding from MemoryCard into EmojiButton
 */

