import { useState } from 'react'

export default function useFormErrors (defaultValues) {
  const [valuesError, setValuesError] = useState(defaultValues)

  const handleSettingError = ({ name, message }) => {
    console.log(name, message)
    setValuesError(prevValuesError => ({
      ...prevValuesError,
      [name]: message + prevValuesError[name]
    }))
  }

  const recognizeEmptyName = (name) => {
    return true
  }

  return {
    valuesError,
    setValuesError,
    handleSettingError,
    recognizeEmptyName
  }
}
