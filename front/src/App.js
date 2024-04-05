import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Envoi du message au backend
    await fetch('http://localhost:3001/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    setMessage('');
    alert('Message envoyé !');
  };

  return (
    <div>
      <h1>Envoyer un message à Kafka</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Votre message"
          required
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;
