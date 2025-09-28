

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