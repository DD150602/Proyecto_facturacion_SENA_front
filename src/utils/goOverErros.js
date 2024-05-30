export function goOverErrors (objectError, setError) {
  for (const error of objectError) {
    setError({ name: error.path[0], message: error.message })
  }
}
