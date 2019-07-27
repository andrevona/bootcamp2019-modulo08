import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

  // useCallback evita que a função seja recriada em memória a todo novo render
  const handleAdd = useCallback(() => {
    setTechs([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

  // componentDidMount
  // 1o argumento: função que vai ser executada
  // 2o argumento: quando vai executar (array com variáveis a serem monitoradas)
  // Executa uma única vez pois não monitora nenhuma variável específica (array vazio)
  useEffect(() => {
    const storedTechs = localStorage.getItem('tech');

    if (storedTechs) {
      setTechs(JSON.parse(storedTechs));
    }
  }, []);

  // componentDidUpdate
  // Executa sempre que o valor techs no array for alterado
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(techs));
  }, [techs]);

  // Faz o cálculo apenas quando a variável techs for alterada
  // Se fosse feito dentro do <strong>, executaria em todo render
  const techsQty = useMemo(() => techs.length, [techs]);

  return (
    <>
      <ul>
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <strong>Tecnologias adicionadas: {techsQty}</strong> <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
