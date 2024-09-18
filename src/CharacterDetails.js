import React, { useState } from 'react';
import './App.css'; 

const CharacterDetails = () => {
  const [characterName, setCharacterName] = useState('');
  const [characters, setCharacters] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = async () => {
    if (!characterName) return; 

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setCharacters(data.results); 
      } else {
        setError('No characters found with that name.');
        setCharacters([]);
      }
    } catch (error) {
      setError(error.message);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="character-details-container">
      <h2><strong>RICK AND MORTY CHARACTERS</strong></h2>
      <p className="description">
        Enter names of Rick and Morty characters like Rick Sanchez, Summer Smith, Morty Smith etc., to get info about them.
      </p>
      <input
        type="text"
        placeholder="Enter character name"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
      />
      <button onClick={fetchCharacters}>Search</button>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {characters.length > 0 && (
        <div className="character-list">
          {characters.map(character => (
            <div key={character.id} className="character-details">
              <img src={character.image} alt={character.name} className="character-image" />
              <div className="character-info">
                <h3>{character.name}</h3>
                <p>Species: {character.species}</p>
                <p>Status: {character.status}</p>
                <p>Gender: {character.gender}</p>
                <p>Origin: {character.origin.name}</p>
                <p>Location: {character.location.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;
