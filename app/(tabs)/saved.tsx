import { StyleSheet, Text, TextInput, View } from 'react-native'
import { globalStyles } from '@/styles/globalStyles'
import { useSelector } from 'react-redux'
import { selectSaved } from '@/features/saved/savedSlice'
import RecordList from '@/components/RecordList'
import { useState } from 'react'
import { groupByDate } from '@/utils/recordUtils'

const FilterBar = ({ filter, setFilter }: {
  filter: string, setFilter: (value: string) => void
}) => (
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

const SavedScreen = () => {
  const saved = useSelector(selectSaved)
  const [filter, setFilter] = useState('')
  
  const filtered = saved.filter((entry) =>
    entry.headword.toLowerCase().includes(filter.toLowerCase())
  )
  
  return (
    <View style={globalStyles.container}>
      <FilterBar filter={filter} setFilter={setFilter} />
      
      <RecordList recordList={filtered} />
    </View>
  )
}

export default SavedScreen

const styles = StyleSheet.create({
  filterBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
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
