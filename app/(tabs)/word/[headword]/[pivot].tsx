import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native'
import ItemSeparator from '../../../../components/ItemSeparator'
import SynsetCard from '../../../../components/SynsetCard'
import { globalStyles } from '../../../../styles/globalStyles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '../../../../constants/colors'
import { Pivot, SynsetsRequest } from '../../../../types'
import useSynsets from '../../../../hooks/useSynsets'

const HeaderWord = ({ headword }: { headword: string }) => (
  <Text>{headword}</Text>
)

const PivotDisplay = ({ pivot }: { pivot: string }) => {
  const color = colors[pivot as keyof typeof colors]
  
  return (
    <View style={[styles.pivot, { borderColor: color }]}>
      <Text style={[styles.pivotText, { color: color }]}>
        {pivot.toUpperCase()}
      </Text>
    </View>
  )
}

const WordScreenHeader = ({ headword, pivot }: { headword: string, pivot: Pivot }) => {
  const router = useRouter()
  
  const toggleStar = () => {
    // TODO
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
        <PivotDisplay pivot={pivot} />
      </View>
      
      <Pressable
        onPress={toggleStar}
      >
        <Ionicons name='star-outline' size={24} color='black' />
        {/*<Ionicons name="star" size={24} color="black" />*/}
      </Pressable>
    </View>
  )
}

const WordScreen = () => {
  const { headword, pivot = 'eng' } = useLocalSearchParams()
  const requestBody: SynsetsRequest = { query: headword as string, pivot: pivot as Pivot }
  const { data } = useSynsets(requestBody)
  console.log('data.headword', data?.headword)
  
  if (!data) {
    return (<View style={globalStyles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
  
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={data.synsets}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) =>
          <SynsetCard synset={item} />
        }
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() =>
          <WordScreenHeader headword={data.headword} pivot={data.pivot} />
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
    alignItems: 'center',
    gap: 10
  },
  
  pivot: {
    borderWidth: 1,
    padding: 2,
    borderRadius: 3
  },
  
  pivotText: {}
})
