import React, { useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const[repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: 'Desafio do reactJS',
      url: 'https://github.com/samirlandou/RocketSeatNivel01DesafioGoStackReactJS.git',
      techs: ['node.js', 'react.js']
    });

    setRepositories([... repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    //Filtrando para  deletar o repository a ser deletar
    //mantendo no repositories, os repositories diferente do
    //repository que foi removido.
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository =>
         <li key={repository.id}>
           {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
       </li>       
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
