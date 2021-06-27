//import { useContext } from 'react';
import {FormEvent, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg'
import {Logo} from '../components/Logo'

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme'
import { database } from '../services/firebase';
//import { AuthContext } from '../contexts/AuthContext';


import '../styles/auth.scss'


export function NewRoom() {
  const { user } = useAuth();
  const {theme} = useTheme();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    //console.log(firebaseRoom)

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside className={`theme-${theme}`}>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real.</p>
      </aside>
      <main className={`theme-${theme}`}>
        <div className="main-content">
          <Logo value={theme}/>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              className={`theme-${theme}`}
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button className="button" type="submit">Criar Sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/"> Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}