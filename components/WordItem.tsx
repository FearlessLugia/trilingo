import { FlatList, StyleSheet, View, Text } from 'react-native'
import ItemSeparator from './ItemSeparator'
import { data } from '../data'
import SynsetCard from './SynsetCard'

const styles = StyleSheet.create({
  container: {}
})


const WordItem = () => {
  return (
    <FlatList
      data={data.synsets}
      renderItem={({ item }) => <SynsetCard synset={item} />}
      keyExtractor={({ id }) => id}
      // ListHeaderComponent={() => <WordDisplay item={word} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default WordItem