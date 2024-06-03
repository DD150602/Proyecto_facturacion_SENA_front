import React, { useState, useEffect } from 'react';
import Input from '../components/InputComponent';
import DataTable from '../components/dataTable';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';
import dayjs from 'dayjs';

const optionsMes = [
    { id: 1, value: 'Enero' },
    { id: 2, value: 'Febrero' },
    { id: 3, value: 'Marzo' },
    { id: 4, value: 'Abril' },
    { id: 5, value: 'Mayo' },
    { id: 6, value: 'Junio' },
    { id: 7, value: 'Julio' },
    { id: 8, value: 'Agosto' },
    { id: 9, value: 'Septiembre' },
    { id: 10, value: 'Octubre' },
    { id: 11, value: 'Noviembre' },
    { id: 12, value: 'Diciembre' },
];

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'productos',
        headerName: 'Productos',
        width: 150,
        renderCell: (params) => (
            <div>
                {params.value.map(producto => (
                    <div key={producto.id_producto}>
                        {producto.nombre_producto}
                    </div>
                ))}
            </div>
        )
    },
    {
        field: 'valor_neto_factura', headerName: 'Precio de la factura', width: 210,
        renderCell: (params) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoneyIcon style={{ marginRight: '5px' }} />
                {params.value}
            </div>
        )
    },
    {
        field: 'fecha_factura', headerName: 'Fecha de facturación', width: 160,
        valueGetter: (params) => `${dayjs(params.row.fecha_factura).format('MM-DD-YYYY')}`
    },
];

function HistorialCompras({ id }) {
    const [rows, setRows] = useState([]);
    const [mes, setMes] = useState('');
    const [year, setYear] = useState('');

    const fetchData = async (mes, year) => {
        try {
            const response = await axios.get(`http://localhost:4321/gestion_cliente/${id}?mes=${mes}&anio=${year}`);
            console.log(response.data);
            setRows(response.data);
        } catch (error) {
            console.error('Error al obtener los datos', error);
        }
    };

    useEffect(() => {
        fetchData(mes, year);
    }, [mes, year]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchData(mes, year);
    };

    return (
        <div className="container mx-auto">
            <h1 className='text-3xl text-center mb-5 font-semibold text-gray-500'>Historial de compra</h1>
            <form className="mb-4" onSubmit={handleFormSubmit}>
                <div className="flex ml-20 flex-wrap -mx-20">
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                        <FormControl fullWidth>
                            <InputLabel id="mes-label">Seleccionar mes</InputLabel>
                            <Select
                                labelId="mes-label"
                                id="mes"
                                value={mes}
                                onChange={(e) => setMes(e.target.value)}
                                label="Seleccionar mes"
                                sx={{ borderRadius: '10px', textAlign: 'left' }}
                            >
                                <MenuItem value="">
                                    <em>Seleccionar mes</em>
                                </MenuItem>
                                {optionsMes.map(option => (
                                    <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                        <Input type="text" label="Año" value={year} onChange={(e) => setYear(e.target.value)} />
                    </div>
                    <div className="w-full sm:w-1/2">
                        <button
                            type='submit'
                            className='w-full md:w-1/2 bg-gray-800 text-white rounded-lg py-4 px-6 hover:bg-gray-700 transition duration-300 ease-in-out font-semibold flex items-center justify-center'
                        >
                            BUSCAR <YoutubeSearchedForIcon className="ml-2" />
                        </button>
                    </div>
                </div>
            </form>
            <DataTable columns={columns} rows={rows} id={id} />
        </div>
    );
};

export default HistorialCompras;
