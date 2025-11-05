import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <Text>Search...</Text>
    </View>
  )
}

const SavedList = () => {
  return (
    <View style={styles.history}>
      <Text>Saved Item 1</Text>
      <Text>Saved Item 2</Text>
    </View>
  )
}

const Saved = () => {
  return (
    <View style={globalStyles.container}>
      <SearchBar />
      
      <SavedList />
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({
  searchBar: {},
  history: {}
})
