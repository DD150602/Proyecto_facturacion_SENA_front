import { Autocomplete, TextField } from '@mui/material'

export default function AutocompleteComponent (props) {
  const {
    options,
    id,
    label,
    name,
    value,
    onChange,
    required,
    disabled,
    error,
    helperText,
    type
  } = props

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option?.label ?? ''}
      value={value || null}
      onChange={(event, newValue) => onChange(name, newValue)}
      filterSelectedOptions
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          id={id}
          label={label}
          variant='outlined'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          name={name}
          required={required}
          error={error}
          helperText={helperText}
          type={type}
          fullWidth
        />
      )}
    />
  )
}
