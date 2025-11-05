import { FlatList, StyleSheet, View, Text } from 'react-native'
import ItemSeparator from '../../../components/ItemSeparator'
import SynsetCard from '../../../components/SynsetCard'
import { data } from '../../../data'

const HeaderWord = ({ headword }: { headword: string }) => (
  <Text>{headword}</Text>
)

const Pivot = ({ pivot }: { pivot: string }) => (
  <Text>{pivot.toUpperCase()}</Text>
)

const WordScreenHeader = () => (
  <View style={styles.container}>
    <View style={styles.backButton}>
      <Text>Back</Text>
    </View>
    
    <View style={styles.leftContainer}>
      <HeaderWord headword={data.headword} />
      <Pivot pivot={data.pivot} />
    </View>
    
    <Text>star</Text>
  </View>
)

const WordScreen = () => {
  
  return (
    <FlatList
      data={data.synsets}
      renderItem={({ item }) => <SynsetCard synset={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <WordScreenHeader />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default WordScreen

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 100
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
