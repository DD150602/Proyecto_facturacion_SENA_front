import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useUser } from '../utils/authContext'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined'
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { motion } from 'framer-motion'
import Logo from '../assets/img/FTM.2.png'
import Logo1 from '../assets/img/FTM.png'

function Sidebar () {
  const { user, setUser } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeItem, setActiveItem] = useState(location.pathname)

  useEffect(() => {
    setActiveItem(location.pathname)
  }, [location.pathname])

  const cerrarSession = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/')
  }

  const linkClasses = (path) =>
    `font-medium text-sm py-2.5 px-4 rounded-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105 ${activeItem === path ? 'bg-gray-800 text-white' : 'text-gray-900 hover:bg-gray-800 hover:text-white'
    }`

  return (
    <>
      <div className='w-full'>
        <div className='bg-gray-800 h-16 flex justify-center items-center px-4'>
          <img src={Logo} className='block h-8 w-auto' alt='Logo' />
          <img src={Logo1} className='block h-10 w-auto' alt='Logo1' />
          <div className='flex flex-col items-center ml-4'>
            <p className='text-xs text-gray-500 mb-1'>Bienvenido a tu puesto de trabajo</p>
          </div>
        </div>
      </div>
      <div className='fixed top-0 left-0 h-full mt-11 w-64 bg-gray-100 shadow-lg z-10 rounded-lg'>
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-center py-6'>
            <div className='rounded-full h-16 w-16 flex items-center justify-center text-white text-xl font-bold bg-sky-800'>
              {user.primer_nombre_usuario.charAt(0)}{user.primer_apellido_usuario.charAt(0)}
            </div>
            <div className='ml-3'>
              <p className='text-sm font-semibold text-gray-900'>{user.primer_nombre_usuario} {user.primer_apellido_usuario}</p>
              <p className='text-sm font-semibold text-gray-500'>{user.correo_usuario}</p>
              <p className='text-xs text-gray-500'>{user.id_tipo_usuario === 1 ? 'Administrador' : 'Vendedor'}</p>
            </div>
          </div>
          <div className='overflow-y-auto'>
            <div className='py-2 px-4'>
              {user.id_tipo_usuario === 1 && (
                <p className='text-xs text-gray-500 mb-2'>Opciones Administrador</p>
              )}
              {user.id_tipo_usuario === 2 && (
                <p className='text-xs text-gray-500 mb-2'>Opciones Vendedor</p>
              )}
              {user.id_tipo_usuario === 1 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Link
                      to='/clientes'
                      className={linkClasses('/clientes')}
                    >
                      <motion.div whileHover={{ rotate: 20 }}>
                        <AdminPanelSettingsOutlinedIcon className='mr-4' />
                      </motion.div>
                      Clientes
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Link to='/informesVentas' className={linkClasses('/informesVentas')}>
                      <motion.div whileHover={{ rotate: 20 }}>
                        <FileOpenOutlinedIcon className='mr-4' />
                      </motion.div>
                      Informes
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Link
                      to='/inventario'
                      className={linkClasses('/inventario')}
                    >
                      <motion.div whileHover={{ rotate: 20 }}>
                        <Inventory2OutlinedIcon className='mr-4' />
                      </motion.div>
                      Inventario
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Link
                      to='/zonas'
                      className={linkClasses('/zonas')}
                    >
                      <motion.div whileHover={{ rotate: 20 }}>
                        <TravelExploreOutlinedIcon className='mr-4' />
                      </motion.div>
                      Zonas
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Link
                      to='/dashboard_admin'
                      className={linkClasses('/dashboard_admin')}
                    >
                      <motion.div whileHover={{ rotate: 20 }}>
                        <PersonAddAltOutlinedIcon className='mr-4' />
                      </motion.div>
                      Usuarios
                    </Link>
                  </motion.div>
                </>
              )}

              {user.id_tipo_usuario === 2 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Link
                      to='/dashboard_vendedor'
                      className={linkClasses('/dashboard_vendedor')}
                    >
                      <motion.div whileHover={{ rotate: 20 }}>
                        <CreditScoreOutlinedIcon className='mr-4' />
                      </motion.div>
                      Factura
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Link
                      to='/informes'
                      className={linkClasses('/informes')}
                    >
                      <motion.div whileHover={{ rotate: 20 }}>
                        <PlagiarismOutlinedIcon className='mr-4' />
                      </motion.div>
                      Informes
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <Link
                      to='/clientesZona'
                      className={linkClasses('/clientesZona')}
                    >
                      <motion.div whileHover={{ rotate: 20 }}>
                        <TravelExploreIcon className='mr-4' />
                      </motion.div>
                      Clientes en zona
                    </Link>
                  </motion.div>
                </>
              )}

              <p className='text-xs text-gray-500 mb-2 mt-5'>Opciones Comunes</p>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                whileHover={{ scale: 1.08 }}
              >
                <button
                  onClick={cerrarSession}
                  className='font-medium text-sm w-full text-gray-900 py-2.5 px-4 transition duration-100 ease-in-out transform hover:scale-500 rounded-lg flex items-center hover:bg-gray-200'
                >
                  <motion.div whileHover={{ rotate: 20 }}>
                    <LogoutOutlinedIcon className='mr-2' />
                  </motion.div>
                  Salir
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
