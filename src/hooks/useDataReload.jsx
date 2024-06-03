import { useEffect, useState } from 'react'
import { api } from '../utils/conection'

export default function useDataPreload (endpoint) {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [refresh, setRefresh] = useState(0)

  const fetchData = async () => {
    try {
      const response = await api.get(endpoint)
      setData(response.data)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [endpoint, refresh])

  const refetchData = () => setRefresh(prev => prev + 1)

  return { data, error, refetchData }
}
