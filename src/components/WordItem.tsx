import { FlatList, StyleSheet, View, Text } from 'react-native'
import { Translation, Sense } from '../../types'

const styles = StyleSheet.create({
  container: {}
})

const lemmaList = {
  'pivot': 'FR',
  'headword': 'assuré',
  'senses': [
    {
      'id': 'unashamed.a.01',
      'glossEN': 'used of persons or their behavior; feeling no shame',
      'translations': {
        'EN': [
          {
            'lang': 'EN',
            'lemma': 'unashamed',
            'pos': 'adj'
          }
        ],
        'FR': [
          {
            'lang': 'FR',
            'lemma': 'assuré',
            'pos': 'adj'
          },
          {
            'lang': 'FR',
            'lemma': 'éhonté',
            'pos': 'adj'
          }
        ],
        'ES': []
      }
    }
  ]
}

const ExplainItem = ({ lang }: { lang: Translation }) => {
  return (
    <Text>{lang.lemma}</Text>
  )
}

const LemmaItem = ({ sense }: { sense: Sense }) => {
  return (
    <View style={styles.container}>
      <Text>{sense.id}</Text>
      <Text>{sense.glossEN}</Text>
      
      {sense.translations.EN.map((en: Translation) => (
        <ExplainItem lang={en} />
      ))}
      
      {sense.translations.FR.map((fr: Translation) => (
        <ExplainItem lang={fr} />
      ))}
      
      {sense.translations.ES.map((es: Translation) => (
        <ExplainItem lang={es} />
      ))}
    </View>
  )
}

const WordItem = () => {
  return (
    <FlatList
      data={lemmaList.senses}
      renderItem={({ item }) => <LemmaItem sense={item} />}
      keyExtractor={({ id }) => id}
      // ListHeaderComponent={() => <WordDisplay item={word} />}
      // ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default WordItem