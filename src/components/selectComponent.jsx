import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'

function Selects (props) {
  const { id, label, name, onChange, value, items, required, disabled, error, helperText } = props
  return (
    <FormControl sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} error={error} fullWidth>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        items={items}
        disabled={disabled}
      >
        {
        items.map((item) => (
          <MenuItem
            key={item.id}
            value={item.id}
          >
            {item.value}
          </MenuItem>
        ))
      }
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default Selects
