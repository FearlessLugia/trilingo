import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { colors } from '../constants/colors'
import { useRouter } from 'expo-router'
import { Pivot } from '../types'

const LemmaPerLanguage = ({ lemmas, pivot }: {
  lemmas: string[],
  pivot: Pivot
}) => {
  const router = useRouter()
  
  return (
    <View style={styles.lemma}>
      {lemmas.map((lemma) => (
        <Pressable
          key={lemma}
          style={[styles.button, { backgroundColor: colors[pivot] }]}
          onPress={() => {
            router.push({
              pathname: '/word/[headword]/[pivot]',
              params: { headword: lemma, pivot }
            })
          }}
        >
          <Text style={styles.buttonText}>{lemma.replace(/_/g, ' ')}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export default LemmaPerLanguage

const baseButtonStyle: ViewStyle = {
  justifyContent: 'center',
  borderRadius: 5,
  marginTop: 3,
  marginHorizontal: 2,
  alignSelf: 'flex-start'
}

const styles = StyleSheet.create({
  lemma: {
    width: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 1,
    marginTop: 6
  },
  
  button: {
    ...baseButtonStyle
  },
  
  buttonText: {
    color: colors.white,
    margin: 5
  }
})