import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native'
import ItemSeparator from '@/components/ItemSeparator'
import SynsetCard from '@/components/SynsetCard'
import { globalStyles } from '@/styles/globalStyles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Pivot, Synset, SynsetsRequest } from '@/types'
import useSynsets from '@/hooks/useSynsets'
import { underscoreToSpace } from '@/utils/stringUtils'
import { AppDispatch } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addSaved, deleteSaved, selectSaved } from '@/features/saved/savedSlice'
import { refreshHistory } from '@/features/history/historySlice'
import { useEffect } from 'react'
import { PivotBadge } from '@/components/PivotBadge'

const HeaderWord = ({ headword }: { headword: string }) => (
  <Text style={globalStyles.headerText}>
    {underscoreToSpace(headword)}
  </Text>
)

const WordScreenHeader = ({ headword, pivot, synsets }: { headword: string, pivot: Pivot, synsets?: Synset[] }) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  const saved = useSelector(selectSaved)
  
  const isSaved = saved.some((it: { headword: string, pivot: string }) =>
    it.headword.toLowerCase() === headword.toLowerCase() && it.pivot === pivot
  )
  
  const toggleStar = () => {
    if (!isSaved) {
      dispatch(addSaved({
        headword,
        pivot,
        synsets: synsets ?? []
      }))
    } else {
      dispatch(deleteSaved({ headword, pivot }))
    }
  }
  
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name='chevron-back-sharp' size={24} color='black' />
      </Pressable>
      
      <View style={styles.leftContainer}>
        <HeaderWord headword={headword} />
        <PivotBadge pivot={pivot} />
      </View>
      
      <Pressable onPress={toggleStar}>
        <Ionicons name={isSaved ? 'star' : 'star-outline'} size={24} color='orange' />
      </Pressable>
    </View>
  )
}

const WordScreen = () => {
  const { headword: rawHeadword, pivot } = useLocalSearchParams()
  const headword = decodeURIComponent(rawHeadword as string)
  
  const dispatch = useDispatch<AppDispatch>()
  
  const saved = useSelector(selectSaved)
  const cached = saved.find(
    (entry) =>
      entry.headword === headword &&
      entry.pivot === pivot &&
      entry.synsets && entry.synsets.length > 0
  )
  
  const requestBody: SynsetsRequest = { query: headword, pivot: pivot as Pivot }
  const { data } = useSynsets(requestBody)
  const finalSynsets = cached?.synsets ?? data?.synsets
  
  useEffect(() => {
    const newRecordEntry = {
      headword: headword as string,
      pivot: pivot as Pivot
    }
    
    dispatch(refreshHistory(newRecordEntry))
  }, [])
  
  if (!finalSynsets) {
    return (
      <View style={globalStyles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
  
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={finalSynsets}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) =>
          <SynsetCard synset={item} />
        }
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() =>
          <WordScreenHeader headword={headword as string} pivot={pivot as Pivot} synsets={finalSynsets} />
        }
      />
    </View>
  )
}

export default WordScreen

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 60
  },
  
  backButton: {
    paddingRight: 10,
    alignItems: 'center'
  },
  
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10
  }
})
