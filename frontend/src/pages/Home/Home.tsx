import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

export function Home (): React.ReactElement {
  const { userData } = useAuth()
  return (
        <>
        <h1>Hola {userData?.username} </h1>
        </>
  )
}
