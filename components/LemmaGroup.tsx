import { StyleSheet, View } from 'react-native'
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
  lemmaGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
