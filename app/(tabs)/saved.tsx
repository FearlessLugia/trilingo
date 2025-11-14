import { StyleSheet, Text, TextInput, View } from 'react-native'
import { globalStyles } from '@/styles/globalStyles'
import { useSelector } from 'react-redux'
import { selectSaved } from '@/features/saved/savedSlice'
import RecordList from '@/components/RecordList'
import { useState } from 'react'

const FilterBar = () => {
  const [filter, setFilter] = useState('')
  
  return (
    <View style={styles.filterBar}>
      <TextInput
        style={styles.filterInput}
        placeholder='Filter...'
        value={filter}
        onChangeText={setFilter}
        autoCapitalize='none'
        returnKeyType='done'
      />
    </View>
  )
}

const SavedScreen = () => {
  const saved = useSelector(selectSaved)
  
  return (
    <View style={globalStyles.container}>
      <FilterBar />
      
      <RecordList recordList={saved} />
    </View>
  )
}

export default SavedScreen

const styles = StyleSheet.create({
  filterBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    marginBottom: 6
  },
  
  filterInput: {
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
  },
  
  saved: {}
})
