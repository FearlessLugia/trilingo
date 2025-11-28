import { useState, useEffect } from 'react'
import { LanguagesResponse } from '@/types'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

const useLanguages = (query: string) => {
  const [data, setData] = useState<LanguagesResponse | null>(null)
  const [loading, setLoading] = useState(false)
  
  const fetchLanguages = async () => {
    if (!query.trim()) {
      setData(null)
      return
    }
    
    setLoading(true)
    
    const url = `${API_BASE_URL}/languages?q=${encodeURIComponent(query)}`
    
    const response = await fetch(url)
    const json = await response.json()
    
    setLoading(false)
    setData(json)
  }
  
  useEffect(() => {
    fetchLanguages()
  }, [query])
  
  return { data, loading, refetch: fetchLanguages }
}

export default useLanguages