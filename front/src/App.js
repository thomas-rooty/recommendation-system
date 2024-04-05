import React, { useState } from 'react';

function App() {
  const [userData, setUserData] = useState({
    username: '',
    contentId: '',
    contentCategory: 'fiction', // Mettez une valeur par défaut si vous le souhaitez
    interactionType: 'click', // Idem, une valeur par défaut
    timestamp: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Conversion du timestamp en format souhaité si nécessaire
    const payload = {
      ...userData,
      timestamp: Date.now(), // Génère le timestamp actuel si vous ne souhaitez pas le spécifier manuellement
    };

    await fetch('http://localhost:3001/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    alert('Message envoyé !');
    // Réinitialiser l'état ici si nécessaire
  };

  return (
    <div>
      <h1>Envoyer un message à Kafka</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Nom d'utilisateur"
          required
        />
        <input
          type="text"
          name="contentId"
          value={userData.contentId}
          onChange={handleChange}
          placeholder="ID du contenu"
          required
        />
        <select name="contentCategory" value={userData.contentCategory} onChange={handleChange}>
          <option value="adulte">Adulte</option>
          <option value="fiction">Fiction</option>
          <option value="romance">Romance</option>
          {/* Ajoutez d'autres catégories ici */}
        </select>
        <select name="interactionType" value={userData.interactionType} onChange={handleChange}>
          <option value="click">Click</option>
          <option value="vue">Vue</option>
          <option value="partage">Partage</option>
          <option value="dislike">Dislike</option>
          <option value="like">Like</option>
          {/* Ajoutez d'autres types d'interaction ici */}
        </select>
        <input
          type="text"
          name="timestamp"
          value={userData.timestamp}
          onChange={handleChange}
          placeholder="Timestamp (laissez vide pour automatique)"
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;
