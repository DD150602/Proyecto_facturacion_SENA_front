import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../utils/authContext'

function ProtectedRoute ({ elemento, rolesPermitidos }) {
  const { user } = useUser()

  if (!user || !rolesPermitidos.includes(user.id_tipo_usuario)) {
    return <Navigate to='/' />
  }

  return elemento
}

export default ProtectedRoute
