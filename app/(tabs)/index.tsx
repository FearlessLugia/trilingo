import { StyleSheet, View, Text, TextInput } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { useState } from 'react'
import { useRouter } from 'expo-router'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const router = useRouter()
  
  const handleSearch = () => {
    if (query.trim() !== '') {
      router.push({
        pathname: '/word/[headword]',
        params: { headword: query.trim(), pivot: 'eng' }
      })
      setQuery('')
    }
  }
  
  return (
    <View style={styles.searchBar}>
      <TextInput
        // style={styles.input}
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
  history: {}
})
