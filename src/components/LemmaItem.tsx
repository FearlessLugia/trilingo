import { Sense, Translation } from '../../types'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import theme from '../../theme'

const baseLangStyle = {
  color: theme.colors.white,
  justifyContent: 'center',
  borderRadius: 5,
  marginTop: 5,
  marginHorizontal: 5,
  alignSelf: 'flex-start'
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  
  lemma:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  
  langRow: {
    width: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 6
  },
  
  en: {
    ...baseLangStyle,
    backgroundColor: theme.colors.primary
  },
  
  fr: {
    ...baseLangStyle,
    backgroundColor: 'orange'
  },
  
  es: {
    ...baseLangStyle,
    backgroundColor: '#FD92BA'
  },
  
  buttonText: {
    color: theme.colors.white,
    margin: 5
  }
})

const LemmaItem = ({ sense }: { sense: Sense }) => {
  return (
    <View style={styles.container}>
      <Text>{sense.id}</Text>
      <Text>{sense.glossEN}</Text>
      
      <View style={styles.lemma}>
        {/*<Text>English</Text>*/}
        <View style={styles.langRow}>
          {sense.translations.EN.map((en: Translation) => (
            <Pressable
              style={styles.en}
              onPress={() => {
              }}
            >
              <Text style={styles.buttonText}>{en.lemma.replace(/_/g, ' ')}</Text>
            </Pressable>
          ))}
        </View>
        
        {/*<Text>French</Text>*/}
        <View style={styles.langRow}>
          {sense.translations.FR.map((fr: Translation) => (
            <Pressable
              style={styles.fr}
              onPress={() => {
              }}
            >
              <Text style={styles.buttonText}>{fr.lemma.replace(/_/g, ' ')}</Text>
            </Pressable>
          ))}
        </View>
        
        {/*<Text>Spanish</Text>*/}
        <View style={styles.langRow}>
          {sense.translations.ES.map((es: Translation) => (
            <Pressable
              style={styles.es}
              onPress={() => {
              }}
            >
              <Text style={styles.buttonText}>{es.lemma.replace(/_/g, ' ')}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  )
}

export default LemmaItem
