import { StyleSheet, View, Text, TextInput } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Pivot } from '../../types'
import { spaceToUnderscore } from '../../utils/stringUtils'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [pivot, setPivot] = useState<Pivot>('eng')
  const router = useRouter()
  
  const handleSearch = () => {
    if (/\p{L}/u.test(query.trim())) {
      router.push({
        pathname: '/word/[headword]/[pivot]',
        params: {
          headword: spaceToUnderscore(query.trim()),
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

const SearchedHistory = () => {
  return (
    <View style={styles.history}>
      <Text>History Item 1</Text>
      <Text>History Item 2</Text>
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
