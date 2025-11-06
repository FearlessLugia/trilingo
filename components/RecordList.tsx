import { StyleSheet, Text, View } from 'react-native'
import { RecordEntry } from '../types'

const RecordList = ({ recordList }: { recordList: RecordEntry[] }) => {
  console.log('recordList', recordList)
  
  return (
    <View style={styles.recordList}>
      {recordList.map(({ headword, pivot, timestamp }) => (
        <Text key={timestamp}>
          {headword} {pivot}
        </Text>
      ))}
    </View>
  )
}

export default RecordList

const styles = StyleSheet.create({
  recordList: {}
})