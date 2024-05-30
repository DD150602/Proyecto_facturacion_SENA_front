import { useState, useEffect } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { FormControl, FormHelperText, TextField } from '@mui/material'

dayjs.locale('es')

export default function InputDate (props) {
  const {
    label,
    fecha = '',
    name,
    id,
    onChange,
    required = false,
    disabled = false,
    blockPastDates = false,
    views = ['year', 'month', 'day'],
    error = false,
    helperText = ''
  } = props

  const [value, setValue] = useState(dayjs(fecha))

  useEffect(() => {
    setValue(dayjs(fecha))
  }, [fecha])

  const handleDateChange = (date) => {
    setValue(date)
    onChange(name, dayjs(date).format('YYYY-MM-DD'))
  }

  return (
    <FormControl className='mb-4' sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} error={error} fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
        <DatePicker
          id={id}
          label={label}
          value={value}
          onChange={handleDateChange}
          required={required}
          disabled={disabled}
          minDate={blockPastDates ? dayjs() : undefined}
          views={views}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
