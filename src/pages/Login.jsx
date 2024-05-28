import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, InputAdornment, TextField, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useUser } from '../utils/authContext';
import logo from '../assets/img/FTM.2.png';
import logo1 from '../assets/img/FTM.png'

function Login() {
    const [correo_usuario, setCorreo] = useState('');
    const [password_usuario, setContraseña] = useState('');
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeError, setMensajeError] = useState(false);
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const validateCorreo = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return 'El correo es requerido';
        if (!regex.test(value)) return 'Correo inválido';
        return '';
    };

    const validateContraseña = (value) => {
        if (!value) return 'La contraseña es requerida';
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return '';
    };

    const authSession = async (e) => {
        e.preventDefault();
        if (validateCorreo(correo_usuario) || validateContraseña(password_usuario)) {
            setMensajeError('Error campos vacios')
            setMostrarAlerta(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:4321/login', { correo_usuario, password_usuario });
            const { user } = response.data;
            setUser(user);

            if (user.id_tipo_usuario === 1) {
                navigate('/dashboard_admin');
            } else if (user.id_tipo_usuario === 2) {
                navigate('/dashboard_vendedor');
            }
        } catch (error) {
            let errorMessage = 'Error de autenticación';

            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            } else if (error.message) {
                errorMessage = error.message;
            }

            setMensajeError(errorMessage);
            setMostrarAlerta(true);
        }
    };

    useEffect(() => {
        if (user) {
            if (user.id_tipo_usuario === 1) {
                navigate('/dashboard_admin');
            } else if (user.id_tipo_usuario === 2) {
                navigate('/dashboard_vendedor');
            }
        }
    }, [user, navigate]);

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="w-full px-5 mt-48 max-w-xs sm:max-w-sm md:max-w-md p-6 rounded-xl bg-white shadow-lg mx-auto">
                    <div className="container mx-auto py-5">
                        <div className="flex justify-center">
                            <div className="w-full">
                                <form className="flex flex-col items-center" onSubmit={authSession}>
                                    <div className="flex items-center mb-4">
                                        <img src={logo} alt="Logo" className="h-20 w-30" style={{ filter: 'brightness(0%)' }} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-400 rounded-md p-2">Bienvenido a nuestro software</span>
                                    <span className="text-sm text-gray-600 mb-4">Inicia sesión para acceder a tu cuenta</span>

                                    {mostrarAlerta && (
                                        <Alert severity="error" variant="outlined" sx={{ width: '100%', marginBottom: 4 }}>
                                            {mensajeError}
                                        </Alert>
                                    )}
                                    <TextField
                                        id="correo_usuario"
                                        label="Correo Electrónico"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={correo_usuario}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        error={mostrarAlerta && validateCorreo(correo_usuario) !== ''}
                                        helperText={mostrarAlerta && validateCorreo(correo_usuario)}
                                        InputProps={{
                                            endAdornment: mostrarAlerta && validateCorreo(correo_usuario) !== '' && (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end">
                                                        <ErrorOutlineIcon color="error" />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                                    />
                                    <TextField
                                        id="password_usuario"
                                        label="Contraseña"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        type={mostrarContraseña ? 'text' : 'password'}
                                        value={password_usuario}
                                        onChange={(e) => setContraseña(e.target.value)}
                                        error={mostrarAlerta && validateContraseña(password_usuario) !== ''}
                                        helperText={mostrarAlerta && validateContraseña(password_usuario)}
                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setMostrarContraseña(!mostrarContraseña)}
                                                        edge="end"
                                                    >
                                                        {mostrarContraseña ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        className="mb-4"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full mt-10 bg-gray-800 text-white rounded-lg py-3 px-6 hover:bg-gray-700 transition duration-300 ease-in-out font-semibold"
                                    >
                                        Login
                                    </button>
                                    <div className="flex justify-end mt-5 w-full">
                                        <LockIcon className="text-gray-500 mr-2" />
                                        <Link to="/recuperar-password_usuario" className="text-gray-500 hover:underline">Recuperar Contraseña</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 90 1420 320">
                        <path fill="#273036" fillOpacity="1" d="M0,32L60,58.7C120,85,240,139,360,149.3C480,160,600,128,720,149.3C840,171,960,245,1080,234.7C1200,224,1320,128,1380,80L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                        <image xlinkHref={logo1} x="20" y="220" height="50" width="auto" />
                        <text x="700" y="250" fill="white" fontSize="10" fontFamily="Arial" textAnchor="middle">
                            &copy; 2024 Derechos Reservados FTM
                        </text>
                    </svg>
                </div>

            </div>



        </>
    );
}

export default Login;
