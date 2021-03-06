import React, { useEffect, useState } from "react";
import ProjectCard from "../projeto/ProjectCard";
import styles from "./Projetos.module.css";
function Projetos() {
const [projetos, setProjetos] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/projetos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setProjetos(data)
      })
      console.log("Aqui é o log dos projetos"+ projetos)
      // eslint-disable-next-line 
  }, [])

  function removeProjeto(id) {
    fetch(`http://localhost:5000/projetos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjetos(projetos.filter((projeto) => projeto.id !== id))
      })
  }
  
  return (
    <div className={styles.projetos}>

      <h1>Meus Projetos</h1>
      <div className={styles.cards}>
        {projetos.map((projeto)=>(
          <ProjectCard 
        key={projeto.id}
        projeto={projeto.projeto}
        autor={projeto.nome}
        data={projeto.data = new Date(projeto.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}         
        sobre={projeto.sobre}
        id={projeto.id}
        handleRemove={removeProjeto}
        />
        ))}

      </div>
    </div>
  );
}

export default Projetos;

