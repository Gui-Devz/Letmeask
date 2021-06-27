import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from "../hooks/useAuth";
import {useTheme} from "../hooks/useTheme";

import illustrationImg from '../assets/images/illustration.svg'
import googleIconImg from '../assets/images/google-icon-cool.svg'

import { Button } from '../components/Button';
import {Logo} from '../components/Logo';
import { ButtonToggleTheme } from '../components/ButtonToggleTheme';

import {database} from '../services/firebase';

import '../styles/auth.scss'

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const {theme} = useTheme();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    console.log(roomRef)

    if (!roomRef.exists()){
      alert('Room does not exist.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }
    history.push(`/rooms/${roomCode}`)
  }

  return (
    <>
    <div id="page-auth">
      <aside className={`theme-${theme}`}>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real.</p>
      </aside>
      <main className={`theme-${theme}`}>
        <div className="main-content">
          <div className="toggle-theme">
            <div>
              <ButtonToggleTheme/>
            </div>
            <div>
              <p><span className={theme === "light" ? 'light':''}>Light</span> | <span className={theme === "dark" ? 'dark':''}>Dark</span></p>
            </div>
          </div>
          <div>
            <Logo value={theme}/>
          </div>
          
          <button className={`create-room theme-${theme}`} onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            <div>Crie sua sala com o Google</div>
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              className={`theme-${theme}`}
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
    </>
  )
}