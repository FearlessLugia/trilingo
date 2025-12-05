import { StyleSheet, View, TextInput } from 'react-native'
import { globalStyles } from '@/styles/globalStyles'
import { useState } from 'react'
import { selectHistory } from '@/features/history/historySlice'
import { useSelector } from 'react-redux'
import RecordList from '@/components/RecordList'
import useLanguages from '@/hooks/useLanguages'

const SearchBar = ({ query, setQuery }: {
  query: string, setQuery: (value: string) => void
}) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        autoCapitalize='none'
        style={styles.searchBarInput}
        placeholder='Search...'
        value={query}
        onChangeText={setQuery}
        returnKeyType='search'
        clearButtonMode='while-editing'
      />
    </View>
  )
}

const HomeScreen = () => {
  const history = useSelector(selectHistory)
  
  const [query, setQuery] = useState('')
  const trimmedQuery = query.trim()
  
  const { data } = useLanguages(trimmedQuery)
  
  const languages = trimmedQuery && Array.isArray(data?.languages) ? data.languages : []
  const list = languages.map((lang) => ({
    headword: trimmedQuery,
    pivot: lang,
    timestamp: Date.now()
  }))
  
  return (
    <View style={globalStyles.container}>
      <SearchBar query={query} setQuery={setQuery} />
      
      {languages.length > 0
        ? <RecordList recordList={list} showDate={false} />
        : <RecordList recordList={history} />
      }
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 16,
    paddingTop: 12
  },
  
  searchBarInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    
    borderWidth: 1,
    borderColor: '#e5e5e5'
  }
})
