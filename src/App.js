import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    api.post('repositories', {
      title: `Mobile React Native - ${Date.now()}`,
      url: "localhost:3333",
      techs: ["React Native"]
    }).then(response => {

      const newRepository = response.data;
      setRepositories([...repositories, newRepository]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {

      if (response.status === 204) {
        const newRespositories = repositories.filter(repository => repository.id !== id);

        setRepositories(newRespositories);
      }
    });
  }



  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (

            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>

          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
