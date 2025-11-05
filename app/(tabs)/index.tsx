import { StyleSheet, View, Text } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <Text>Search...</Text>
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
