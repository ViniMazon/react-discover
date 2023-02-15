import { useState, useEffect } from 'react'
import './style.css'
import {Card} from '../../components/Card'

export function Home() {
  const [count, setCount] = useState(0)
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ login: '', avatar: ''})

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/ViniMazon')
    .then(response => response.json())
    .then(data => {
      setUser({
        login: data.login,
        avatar: data.avatar_url,
      })
    })

  }, [])

  return (
    <div className='container'>
      <header>
      <h1>Lista de Presença</h1>
        <div>
          <strong>{user.login}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
    
    <input 
    type="text" 
    placeholder='Digite o nome' 
    onChange={e => setStudentName(e.target.value)}
    />
    <button onClick={handleAddStudent} type='button'>Adicionar</button>
  {
    students.map(student => (<Card key={student.time} name={student.name} time={student.time} />))
  }
    </div>
  )
}

