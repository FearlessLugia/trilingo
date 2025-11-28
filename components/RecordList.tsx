import { SectionList, Pressable, StyleSheet, Text, View, FlatList } from 'react-native'
import { RecordEntry } from '@/types'
import { useRouter } from 'expo-router'
import { PivotBadge } from '@/components/PivotBadge'
import ItemSeparator from '@/components/ItemSeparator'
import { spaceToUnderscore, underscoreToSpace } from '@/utils/stringUtils'
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

const PressableRecord = ({ item, children }: {
  item: RecordEntry, children: React.ReactNode
}) => {
  const router = useRouter()
  
  const onPress = () => {
    router.push({
      pathname: '/word/[headword]/[pivot]',
      params: {
        headword: spaceToUnderscore(item.headword),
        pivot: item.pivot
      }
    })
  }
  
  return <Pressable onPress={onPress}>{children}</Pressable>
}

const RecordList = ({ recordList, showDate = true }: {
  recordList: RecordEntry[], showDate?: boolean
}) => {
  const router = useRouter()
  
  if (!showDate) {
    return (
      <FlatList
        style={styles.flatList}
        data={recordList}
        keyExtractor={(item) => `${item.headword}|${item.pivot}|${item.timestamp}`}
        renderItem={({ item }) => (
          <PressableRecord item={item}>
            <RecordListEntry item={item} />
          </PressableRecord>
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    )
  }
  
  const sections = groupByDate(recordList)
  
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => `${item.headword}|${item.pivot}|${item.timestamp}`}
      renderItem={({ item }) => (
        <PressableRecord item={item}>
          <RecordListEntry item={item} />
        </PressableRecord>
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
  flatList: {
    paddingTop: 18
  },
  
  sectionHeader: {
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 6,
    fontSize: 16,
    fontWeight: '600'
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