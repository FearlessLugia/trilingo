import { StyleSheet, View } from 'react-native'
import WordItem from '../components/WordItem'
import Constants from 'expo-constants'

// import AppBar from './AppBar'
// import SignIn from './SignIn'
// import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.colors.mainBackground,
    paddingTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1
  }
})

const Main = () => {
  return (
    <View style={styles.container}>
      {/*<AppBar />*/}
      <WordItem />
    </View>
  )
}

export default Main