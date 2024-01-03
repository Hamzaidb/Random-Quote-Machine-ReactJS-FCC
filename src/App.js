import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import './App.css';

function App() {
  const [quoteInfo, setQuoteInfo] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('#f0f0f0');

  useEffect(() => {
    getQuote();
  }, []); 

  const getQuote = () => {
    fetch('https://api.quotable.io/random')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setQuoteInfo({
        text: data.content,
        author: data.author,
      });
      changeBackgroundColor();
    });
  };

  const changeBackgroundColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);
  };

  return (
    <div className="App" style={{ backgroundColor: backgroundColor }}>
      <div id="quote-box">
        <div className="quote-icon">
          <FontAwesomeIcon icon={faQuoteLeft} />
        </div>
        <div className="quote-content">
          <p id="text">{quoteInfo.text}</p>
          <p id="author">{quoteInfo.author}</p>
        </div>
        <button id="new-quote" onClick={getQuote}>
          <FontAwesomeIcon icon={faPlus} /> New Quote
        </button>
        <a href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quoteInfo.text} id="tweet-quote">
          <FontAwesomeIcon icon={faTwitter} /> Post to Twitter
        </a>
      </div>
    </div>
  );
}

export default App;
