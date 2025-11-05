import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import { Lemmas } from '../types'
import LemmaPerLanguage from './LemmaPerLanguage'

const LemmaGroup = ({ lemmas }: { lemmas: Lemmas }) => {
  return (
    <View style={styles.lemmaGroup}>
      <LemmaPerLanguage lemmas={lemmas.eng} color='englishColor' />
      <LemmaPerLanguage lemmas={lemmas.fra} color='frenchColor' />
      <LemmaPerLanguage lemmas={lemmas.spa} color='spanishColor' />
    </View>
  )
}

export default LemmaGroup


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 5,
    padding: 5
  },
  
  lemmaGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
