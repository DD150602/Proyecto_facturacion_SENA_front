import { useState } from 'react'

export default function useForm (defaultValues) {
  const [values, setValues] = useState(defaultValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleInputChangeDate = (name, value) => {
    setValues(prevValuesError => ({
      ...prevValuesError,
      [name]: value
    }))
  }

  const handleAutocompleteChange = (name, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue
    }))
  }
  return {
    values,
    setValues,
    handleInputChange,
    handleInputChangeDate,
    handleAutocompleteChange
  }
}
