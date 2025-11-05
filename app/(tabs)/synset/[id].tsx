import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { globalStyles } from '../../../styles/globalStyles'
import Ionicons from '@expo/vector-icons/Ionicons'

const SynsetId = ({ synsetId }: { synsetId: string }) => (
  <Text>{synsetId}</Text>
)

const SynsetScreenHeader = ({ synsetId }: { synsetId: string }) => {
  const router = useRouter()
  
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name='chevron-back-sharp' size={24} color='black' />
      </Pressable>
      
      <View style={styles.leftContainer}>
        <SynsetId synsetId={synsetId} />
      </View>
    </View>
  )
}

const SynsetScreen = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  
  return (
    <View style={globalStyles.container}>
      <SynsetScreenHeader synsetId={id as string} />
      
      {/*<Gloss />*/}
      
      {/*<Lemmas />*/}
      
      {/*<ExampleSentences />*/}
    </View>
  )
}

export default SynsetScreen

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 60
  },
  
  backButton: {
    paddingRight: 10,
    alignItems: 'center'
  },
  
  leftContainer: {
    flex: 1
  }
})
