import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

export default function Botonera (props) {
  const { descarga, agregar, editar, eliminar, ver, title } = props
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          m: 1
        }
      }}
    >
      <h2 className='flex justify-center text-6xl font-bold text-blue-fond p-2 rounded-lg'>{title}</h2>
      <ButtonGroup className='justify-end' variant='outlined' aria-label='outlined button group'>
        {agregar}
        {editar}
        {descarga}
        {ver}
        {eliminar}
      </ButtonGroup>
    </Box>
  )
}
