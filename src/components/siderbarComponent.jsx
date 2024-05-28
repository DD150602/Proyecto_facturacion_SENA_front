import React from 'react';
import Logo from '../assets/img/FTM.2.png';
import { useUser } from '../utils/authContext';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const cerrarSession = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/')
    };

    return (
        <>
            <div className='w-full'>
                <div className="bg-blue-900 h-16 flex justify-center items-center px-4">
                    <img src={Logo} className="block btn- h-8 w-auto" alt="" />
                </div>
            </div>
            <div className="fixed top-0 left-0 h-full ml-10 mt-6 w-64 bg-white shadow-lg z-10 rounded-lg">
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center py-6">
                        <div className="rounded-full h-16 w-16 flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: getRandomColor() }}>
                            {user.primer_nombre_usuario.charAt(0)}{user.primer_apellido_usuario.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-semibold text-gray-900">{user.primer_nombre_usuario} {user.primer_apellido_usuario}</p>
                            <p className="text-sm font-semibold text-gray-500">{user.correo_usuario}</p>
                            <p className="text-xs text-gray-500">{user.id_tipo_usuario === 1 ? 'Administrador' : 'Vendedor'}</p>
                        </div>
                    </div>
                    <div className="overflow-y-auto">
                        <div className="py-2 px-4">
                            {user.id_tipo_usuario === 1 && (
                                <p className="text-xs text-gray-500 mb-2">Opciones Admin</p>
                            )}
                            {user.id_tipo_usuario === 2 && (
                                <p className="text-xs text-gray-500 mb-2">Opciones Vendedor</p>
                            )}
                            {user.id_tipo_usuario === 1 && (
                                <>
                                    <Link to="#" className="font-medium text-sm  text-gray-900 py-2.5 px-4 rounded-lg flex items-center hover:bg-gray-200">
                                        <AdminPanelSettingsOutlinedIcon className='mr-4'></AdminPanelSettingsOutlinedIcon>
                                        Clientes
                                    </Link>
                                    <Link to="#" className="font-medium text-sm mt-2 text-gray-900 py-2.5 px-4 rounded-lg flex items-center hover:bg-gray-200">
                                        <FileOpenOutlinedIcon className='mr-4'></FileOpenOutlinedIcon>
                                        Informes
                                    </Link>
                                    <Link to="#" className="font-medium text-sm mt-2 text-gray-900 py-2.5 px-4 rounded-lg flex items-center hover:bg-gray-200">
                                        <Inventory2OutlinedIcon className='mr-4'></Inventory2OutlinedIcon>
                                        Inventario
                                    </Link>
                                    <Link to="#" className="font-medium text-sm mt-2 text-gray-900 py-2.5 px-4 rounded-lg flex items-center hover:bg-gray-200">
                                        <TravelExploreOutlinedIcon className='mr-4'></TravelExploreOutlinedIcon>
                                        Zonas
                                    </Link>
                                    <Link to="#" className="font-medium text-sm mt-2 text-gray-900 py-2.5 px-4 rounded-lg flex items-center hover:bg-gray-200">
                                        <PersonAddAltOutlinedIcon className='mr-4'></PersonAddAltOutlinedIcon>
                                        Usuarios
                                    </Link>
                                </>
                            )}

                            {user.id_tipo_usuario === 2 && (
                                <>
                                    <Link to="#" className="font-medium text-sm  text-gray-900 py-2.5 px-4 rounded-lg flex items-center hover:bg-gray-200">
                                        <CreditScoreOutlinedIcon className='mr-4'></CreditScoreOutlinedIcon>
                                        Factura
                                    </Link>
                                    <Link to="#" className="font-medium text-sm mt-2 text-gray-900 py-2.5 px-4 rounded-lg flex items-center hover:bg-gray-200">
                                        <PlagiarismOutlinedIcon className='mr-4'></PlagiarismOutlinedIcon>
                                        Informes
                                    </Link>
                                </>
                            )}

                            <p className="text-xs text-gray-500 mb-2 mt-5">Opciones Comunes</p>

                            <button onClick={cerrarSession} className="font-medium text-sm w-full text-gray-900 py-2.5 px-4 rounded-lg flex items-center hover:bg-gray-200">
                                <LogoutOutlinedIcon className='mr-2'></LogoutOutlinedIcon>
                                Salir
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
