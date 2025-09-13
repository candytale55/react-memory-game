import { decodeEntity } from 'html-entities'

export default function MemoryCard({ handleClick, data }) {
    const emojiEl = data.map((emoji, index) =>
        <li key={index} className="card-item">
            <button
                className="btn btn--emoji"
                onClick={() => handleClick(emoji.name, index)}
            >
                {decodeEntity(emoji.htmlCode[0])}
            </button>
        </li>
    )

    return <ul className="card-container">{emojiEl}</ul>
}

/**
 * Challenge:
 * 1) Pass emoji.name and index as arguments to the handleClick function that is called when 
 *    clicking the button.
 * 
 * App → MemoryCard: App passes the function turnCard as a prop called handleClick. 
 *      At this point, App is just giving MemoryCard a reference to a function; no data 
 *      is being sent yet.
 * MemoryCard → App: MemoryCard uses that function inside its buttons. When a button is clicked,
 *      MemoryCard calls the function, passing the emoji’s name and index as arguments. 
 *      That’s how data flows from MemoryCard back to App.
 * 
 * So the key distinction is:
 * App provides the function (callback).
 * MemoryCard calls the function with data when an event occurs.
 */
