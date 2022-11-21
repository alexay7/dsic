import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { anonymRequest } from '../../api/api'
import { useAuth } from '../../contexts/AuthContext'
import { setCookie } from '../../helpers/helpers'

export function Login (): React.ReactElement {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUserData } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    const body = {
      username,
      password
    }
    const response = await anonymRequest('login', { method: 'POST', body: JSON.stringify(body) }) as { access_token: string }
    if (response.access_token !== null) {
      setUserData({ username })
      setCookie('token', response.access_token, 365)
      navigate('/')
    }
  }

  return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Nombre de Usuario</label>
                <input required id="username" type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
                <label htmlFor="">Contraseña</label>
                <input required type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button>Iniciar Sesión</button>
            </form>
        </div>
  )
}
