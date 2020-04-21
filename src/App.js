import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

import logo from './assets/gostack.svg'

function App() {

  const [ repositories, setRepositories ] = useState([])
  const [ repository, setRepository ] = useState({title: '', url: '', techs: ['']})
  // const [ title, setTitle ] = useState([])
  // const [ url, setURL ] = useState([])
  // const [ techs, setTechs ] = useState([])
  

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository(repository) {
    // const repository = {
    //   "url": "https://github.com/marcelojrfarias/",
    //   "title": `Repository ${Date.now()}`,
    //   "techs": ["NodeJS", "ReactJS", "ReactNative"]
    // }

    const response = await api.post('/repositories', repository)

    setRepositories([...repositories, response.data])

    setRepository({title: '', url: '', techs: ['']})
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`)
    
    if (response.status === 204) {
      setRepositories(repositories.filter(
        repository => repository.id !== id
      ))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (repository.title === '')
      return
      
    if (repository.url === '')
      return

    if (repository.techs === [''])
      return

    handleAddRepository(repository)
  }

  return (
    <div className="container">

      <img src={logo} alt="GoStack"/>
      
      <div className="content">
        
        <p className="slogan">
          Adicione seus <strong>repositórios</strong> ao seu <strong>portfólio</strong>.
        </p>

        {/* onClick={handleAddRepository} */}
        <form onSubmit={handleSubmit}>

          <label htmlFor="title">TÍTULO:*</label>
          <input 
            id="title"
            type="text"
            className="title"
            placeholder="Título do seu projeto"
            value={repository.title}
            onChange = {event => setRepository({...repository, title: event.target.value})}
          />

          <label htmlFor="url">LINK:*</label>
          <input 
            id="url"
            type="url"
            className="url"
            placeholder="Link para o seu projeto"
            value={repository.url}
            onChange = {event => setRepository({...repository, url: event.target.value})}
          />

          <label htmlFor="techs">TECNOLOGIAS:*</label>
          <input 
            id="techs"
            type="text"
            className="techs"
            placeholder="Tecnologias utilizadas no seu projeto"
            value={repository.techs}
            onChange = {event => setRepository({...repository, techs: event.target.value.split(',')})}
          />

          <button type="submit">Adicionar</button>
        </form>

      </div>
        
      {repositories.length > 0 && (<div className="list">
        <p className="slogan">
          <strong>Repositórios:</strong>
        </p>
        <ul data-testid="repository-list">
          {repositories.map(repository => (
          <li key={repository.id}>
            <a href={repository.url}>{repository.title}</a>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          ))}
        </ul>
      </div>)}

    </div>
  );
}

export default App;
