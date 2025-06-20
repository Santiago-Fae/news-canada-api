import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="bg-red-500 text-white p-10 text-2xl">
      Tailwind CSS 動いてるで！
    </div>
    <div className="bg-green-500 text-white text-2xl p-4">Tailwind OKやで！</div>
    </div>
  );
}

export default App;
