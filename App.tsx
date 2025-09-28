import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Main from './src/components/Main'

const App = () => {
  return (
    <>
      {/*<NativeRouter>*/}
      {/*<ApolloProviderider client={apolloClient}>*/}
      {/*<AuthStorageContext.Provider value={authStorage}>*/}
      <Main />
      {/*</AuthStorageContext.Provider>*/}
      {/*</ApolloProviderider>*/}
      {/*</NativeRouter>*/}
      <StatusBar style='auto' />
    </>
  )
}

export default App