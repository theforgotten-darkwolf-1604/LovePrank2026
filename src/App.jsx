import { useState } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [answer, setAnswer] = useState("");
  const [noStyle, setNoStyle] = useState({});
  const [tries, setTries] = useState(0);

  const dodge = () => {
    const w = 120;
    const h = 55;
    const x = Math.random() * Math.max(1, window.innerWidth - w - 20) + 10;
    const y = Math.random() * Math.max(1, window.innerHeight - h - 20) + 10;

    setNoStyle({
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`
    });

    setTries((n) => n + 1);
  };

  const submit = (e) => {
    e.preventDefault();
    if (answer.trim()) setPage(3);
  };

  return (
    <main className="app">

      {page === 1 && (
        <section className="card">
          <div className="heart">♥</div>
          <h1>Do you love me?</h1>
          <p>Be honest... 👀</p>

          <div className="buttons">
            <button className="yes" onClick={() => setPage(2)}>
              YES ❤️
            </button>

            <button
              className="no"
              style={noStyle}
              onMouseEnter={dodge}
              onPointerDown={dodge}
              onTouchStart={dodge}
            >
              NO 😏
            </button>
          </div>

          {tries > 2 && (
            <div className="tease">Too slow 😂</div>
          )}
        </section>
      )}

      {page === 2 && (
        <section className="card question">
          <div className="heart">♥</div>
          <h1>Yes? 🤨</h1>
          <h2>But how much?</h2>
          <h2>And why? ❤️</h2>

          <form onSubmit={submit}>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Tell me everything..."
              rows="5"
            />

            <button className="submit" type="submit">
              ANSWER ❤️
            </button>
          </form>
        </section>
      )}

      {page === 3 && (
        <section className="card">
          <div className="heart">♥</div>
          <h1>Analyzing...</h1>
          <p>AI is thinking about your answer 🤖❤️</p>
          <div className="dots">• • •</div>
        </section>
      )}

    </main>
  );
}
