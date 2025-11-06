import { StyleSheet, View, Text, TextInput } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Pivot } from '../../types'
import { spaceToUnderscore } from '../../utils/stringUtils'
import { addHistory, selectHistory } from '../../features/history/historySlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [pivot, setPivot] = useState<Pivot>('eng')
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  const handleSearch = () => {
    if (/\p{L}/u.test(query.trim())) {
      const newHistoryEntry = {
        headword: spaceToUnderscore(query.trim()),
        pivot
      }
      
      dispatch(addHistory(newHistoryEntry))
      
      router.push({
        pathname: '/word/[headword]/[pivot]',
        params: newHistoryEntry
      })
    }
    
    setQuery('')
  }
  
  return (
    <View style={styles.searchBar}>
      <TextInput
        autoCapitalize='none'
        style={styles.searchBarInput}
        placeholder='Search...'
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType='search'
      />
    </View>
  )
}

const SearchedHistory = () => {
  const history = useSelector(selectHistory)
  console.log('history', history)
  
  return (
    <View style={styles.history}>
      {history.map(({ headword, pivot, timestamp }) => (
        <Text key={timestamp}>
          {headword} {pivot}
        </Text>
      ))}
    </View>
  )
}

const Main = () => {
  return (
    <View style={globalStyles.container}>
      <SearchBar />
      
      <SearchedHistory />
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  searchBar: {},
  
  searchBarInput: {},
  
  history: {}
})
