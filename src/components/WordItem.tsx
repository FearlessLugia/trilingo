import { FlatList, StyleSheet, View, Text } from 'react-native'
import ItemSeparator from './ItemSeparator'
import { data } from '../data'
import LemmaItem from './LemmaItem'

const styles = StyleSheet.create({
  container: {}
})


const WordItem = () => {
  return (
    <FlatList
      data={data.senses}
      renderItem={({ item }) => <LemmaItem sense={item} />}
      keyExtractor={({ id }) => id}
      // ListHeaderComponent={() => <WordDisplay item={word} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default WordItem