import { StyleSheet, View, TextInput } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Pivot } from '../../types'
import { spaceToUnderscore } from '../../utils/stringUtils'
import { addHistory, selectHistory } from '../../features/history/historySlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store'
import RecordList from '../../components/RecordList'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [pivot, setPivot] = useState<Pivot>('eng')
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  const handleSearch = () => {
    if (/\p{L}/u.test(query.trim())) {
      const newRecordEntry = {
        headword: spaceToUnderscore(query.trim()),
        pivot
      }
      
      dispatch(addHistory(newRecordEntry))
      
      router.push({
        pathname: '/word/[headword]/[pivot]',
        params: newRecordEntry
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
  searchBar: {},
  
  searchBarInput: {},
  
  history: {}
})
