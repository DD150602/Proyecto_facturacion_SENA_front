import { TextField } from '@mui/material'

export default function Input (props) {
  const { id, label, name, value, onChange, required, disabled, error, helperText, InputProps, type, multiline = false } = props
  return (
    <TextField
      id={id}
      label={label}
      variant='outlined'
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
      InputProps={InputProps}
      type={type}
      multiline={multiline}
      maxRows={5}
      fullWidth
    />
  )
}
