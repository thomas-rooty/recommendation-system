import React from 'react';
import './App.css';

function App() {
  const sendMessage = () => {
    fetch('/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: "Hello World" }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Succès:', data);
    })
    .catch((error) => {
      console.error('Erreur:', error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={sendMessage}>Envoyer "Hello World" à Kafka</button>
      </header>
    </div>
  );
}

export default App;
