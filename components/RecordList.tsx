import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { RecordEntry } from '@/types'
import { useRouter } from 'expo-router'
import { PivotBadge } from '@/components/PivotBadge'
import ItemSeparator from '@/components/ItemSeparator'
import { underscoreToSpace } from '@/utils/stringUtils'

const RecordListEntry = ({ item }: { item: RecordEntry }) => {
  const { headword, pivot } = item
  
  return (
    <View style={styles.recordListEntry}>
      <Text style={styles.recordText} allowFontScaling={false}>
        {underscoreToSpace(headword)}
      </Text>
      
      <PivotBadge pivot={pivot} />
    </View>
  )
}

const RecordList = ({ recordList }: { recordList: RecordEntry[] }) => {
  const router = useRouter()
  
  return (
    <FlatList
      data={recordList}
      keyExtractor={(item) => `${item.headword}|${item.pivot}|${item.timestamp}`}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/word/${item.headword}/${item.pivot}`)}>
          <RecordListEntry item={item} />
        </Pressable>
      )}
      contentContainerStyle={styles.recordList}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default RecordList

const styles = StyleSheet.create({
  recordList: {},
  
  recordListEntry: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5
  },
  
  recordText: {
    lineHeight: 40
  }
})