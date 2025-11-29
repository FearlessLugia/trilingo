import { useState, useEffect } from 'react'
import { SynsetsRequest, SynsetsResponse } from '@/types'
import { apiFetch } from '@/utils/api'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

const useSynsets = (body: SynsetsRequest) => {
  const [data, setData] = useState<SynsetsResponse>()
  const [loading, setLoading] = useState(false)
  
  const fetchSynsets = async () => {
    setLoading(true)
    
    const url = `${API_BASE_URL}/align`
    
    const response = await apiFetch(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    const json = await response.json()
    
    setLoading(false)
    setData(json)
  }
  
  useEffect(() => {
    fetchSynsets()
  }, [body.query, body.pivot])
  
  return { data, loading, refetch: fetchSynsets }
}

export default useSynsets