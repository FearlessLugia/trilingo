import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { useSelector } from 'react-redux'
import { selectSaved } from '../../features/saved/savedSlice'
import RecordList from '../../components/RecordList'

const FilterBar = () => {
  return (
    <View style={styles.filterBar}>
      <Text>Filter...</Text>
    </View>
  )
}

const Saved = () => {
  const saved = useSelector(selectSaved)
  
  return (
    <View style={globalStyles.container}>
      <FilterBar />
      
      <RecordList recordList={saved} />
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({
  filterBar: {},
  saved: {}
})
