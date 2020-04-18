import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const repository = {
      "url": "https://github.com/marcelojrfarias/",
      "title": `Repository ${Date.now()}`,
      "techs": ["NodeJS", "ReactJS", "ReactNative"]
    }

    const response = await api.post('/repositories', repository)

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    
    if (response.status === 204) {
      setRepositories(repositories.filter(
        repository => repository.id !== id
      ))
    }
  }

  return (
    <div>
      <h2>Repositories</h2>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
