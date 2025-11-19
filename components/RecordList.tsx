import { SectionList, Pressable, StyleSheet, Text, View } from 'react-native'
import { RecordEntry } from '@/types'
import { useRouter } from 'expo-router'
import { PivotBadge } from '@/components/PivotBadge'
import ItemSeparator from '@/components/ItemSeparator'
import { underscoreToSpace } from '@/utils/stringUtils'
import { groupByDate } from '@/utils/recordUtils'

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
  
  const sections = groupByDate(recordList)
  
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => `${item.headword}|${item.pivot}|${item.timestamp}`}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/word/${item.headword}/${item.pivot}`)}>
          <RecordListEntry item={item} />
        </Pressable>
      )}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      ItemSeparatorComponent={ItemSeparator}
      stickySectionHeadersEnabled={false}
    />
  )
}

export default RecordList

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 6,
    fontSize: 16,
    fontWeight: '600',
  },
  
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