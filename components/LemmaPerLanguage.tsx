import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { colors } from '../constants/colors'

const LemmaPerLanguage = ({ lemmas, color }: {
  lemmas: string[],
  color: keyof typeof colors
}) => {
  return (
    <View style={styles.lemma}>
      {lemmas.map((language) => (
        <Pressable
          key={language}
          style={[styles.button, { backgroundColor: colors[color] }]}
          onPress={() => {
          }}
        >
          <Text style={styles.buttonText}>{language.replace(/_/g, ' ')}</Text>
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