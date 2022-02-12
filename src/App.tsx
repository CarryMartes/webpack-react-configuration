import React from 'react';
import './App.css';
import Tests from './components/example/test'

function App(): JSX.Element {
  return (
    <div className="App">
      <Tests title={'Hello'} />
    </div>
  );
}

export default App;
