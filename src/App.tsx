import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button, { ButtonProps } from './components/Button/button'
const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>aaa</h1>
        <Button btnType='link' href="http://baidu.com">baidu</Button>
        <Button onClick={() => { console.log(22) }} size='lg'>baidu</Button>
        <Button {...testProps}>ccc</Button>
        <code>const a = 2;</code>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
    </div>
  );
}

export default App;
