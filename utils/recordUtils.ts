import { RecordEntry } from '@/types'

export interface DateSection {
  title: string
  data: RecordEntry[]
}

export const groupByDate = (items: RecordEntry[]): DateSection[] => {
  const map: Record<string, RecordEntry[]> = {}
  
  items.forEach((item) => {
    const date = new Date(item.timestamp).toISOString().split('T')[0]
    
    if (!map[date]) {
      map[date] = []
    }
    map[date].push(item)
  })
  
  return Object.keys(map)
    .sort((a, b) => (a < b ? 1 : -1))
    .map((date) => ({
      title: date,
      data: map[date]
    }))
}