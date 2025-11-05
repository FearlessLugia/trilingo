import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import { Lemmas } from '../types'
import LemmaPerLanguage from './LemmaPerLanguage'

const LemmaGroup = ({ lemmas }: { lemmas: Lemmas }) => {
  return (
    <View style={styles.lemmaGroup}>
      <LemmaPerLanguage lemmas={lemmas.eng} color='eng' />
      <LemmaPerLanguage lemmas={lemmas.fra} color='fra' />
      <LemmaPerLanguage lemmas={lemmas.spa} color='spa' />
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
