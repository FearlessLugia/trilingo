import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { RecordEntry } from '@/types'
import { useRouter } from 'expo-router'

const RecordList = ({ recordList }: { recordList: RecordEntry[] }) => {
  const router = useRouter()
  
  return (
    <View style={styles.recordList}>
      <FlatList
        data={recordList}
        keyExtractor={(item) => `${item.headword}|${item.pivot}|${item.timestamp}`}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/word/${item.headword}/${item.pivot}`)}>
            <Text>{item.headword} {item.pivot}</Text>
          </Pressable>
        )}
        contentContainerStyle={styles.recordList}
      />
    </View>
  )
}

export default RecordList

const styles = StyleSheet.create({
  recordList: {}
})