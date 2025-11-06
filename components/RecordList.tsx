import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RecordEntry } from '../types'
import { useRouter } from 'expo-router'

const RecordList = ({ recordList }: { recordList: RecordEntry[] }) => {
  const router = useRouter()
  
  return (
    <View style={styles.recordList}>
      {recordList.map(({ headword, pivot, timestamp }) => (
        <Pressable onPress={() =>
          router.push(`/word/${headword}/${pivot}`)
        }>
          <Text key={timestamp}>
            {headword} {pivot}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}

export default RecordList

const styles = StyleSheet.create({
  recordList: {}
})