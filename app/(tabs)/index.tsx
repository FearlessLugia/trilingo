import { StyleSheet, View, TextInput } from 'react-native'
import { globalStyles } from '@/styles/globalStyles'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Pivot } from '@/types'
import { spaceToUnderscore } from '@/utils/stringUtils'
import { selectHistory } from '@/features/history/historySlice'
import { useSelector } from 'react-redux'
import RecordList from '@/components/RecordList'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [pivot, setPivot] = useState<Pivot>('eng')
  const router = useRouter()
  
  const handleSearch = () => {
    const trimmed = query.trim()
    if (/\p{L}/u.test(trimmed)) {
      const normalizedHeadword = spaceToUnderscore(trimmed)
      
      router.push({
        pathname: '/word/[headword]/[pivot]',
        params: {
          headword: spaceToUnderscore(normalizedHeadword),
          pivot
        }
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

const HomeScreen = () => {
  const history = useSelector(selectHistory)
  
  return (
    <View style={globalStyles.container}>
      <SearchBar />
      
      <RecordList recordList={history} />
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
