import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native'
import ItemSeparator from '../../../components/ItemSeparator'
import SynsetCard from '../../../components/SynsetCard'
import { data } from '../../../data'
import { globalStyles } from '../../../styles/globalStyles'
import { useRouter } from 'expo-router'

const HeaderWord = ({ headword }: { headword: string }) => (
  <Text>{headword}</Text>
)

const Pivot = ({ pivot }: { pivot: string }) => (
  <Text>{pivot.toUpperCase()}</Text>
)

const WordScreenHeader = () => {
  const router = useRouter()
  
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text>Back</Text>
      </Pressable>
      
      <View style={styles.leftContainer}>
        <HeaderWord headword={data.headword} />
        <Pivot pivot={data.pivot} />
      </View>
      
      <Text>star</Text>
    </View>
  )
}

const WordScreen = () => {
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={data.synsets}
        renderItem={({ item }) => <SynsetCard synset={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <WordScreenHeader />}
        ItemSeparatorComponent={ItemSeparator}
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
    width: 46,
    paddingRight: 10,
    alignItems: 'center'
  },
  
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
})
