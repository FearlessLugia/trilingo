import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'

const styles = StyleSheet.create({
  container: {},
  
  button: {
    backgroundColor: colors.primary,
    color: colors.white,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 20,
    marginBottom: 20
  },
})

const ExplainItem = ({ lang }) => {
  return (
    <View style={styles.container}>
    </View>
  )
}

export default ExplainItem