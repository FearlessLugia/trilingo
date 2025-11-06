import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router'
import { globalStyles } from '../../styles/globalStyles'
import Ionicons from '@expo/vector-icons/Ionicons'
import Gloss from '../../components/Gloss'
import LemmaGroup from '../../components/LemmaGroup'
import { useDispatch, useSelector } from 'react-redux'
import { popSynset, selectSynsetById } from '../../features/synsetStack/synsetStackSlice'
import { AppDispatch } from '../../store/store'

const SynsetId = ({ synsetId }: { synsetId: string }) => (
  <Text>{synsetId}</Text>
)

const SynsetScreenHeader = ({ synsetId }: { synsetId: string }) => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={
          () => {
            dispatch(popSynset(synsetId))
            router.back()
          }
        }
      >
        <Ionicons name='chevron-back-sharp' size={24} color='black' />
      </Pressable>
      
      <View style={styles.leftContainer}>
        <SynsetId synsetId={synsetId} />
      </View>
    </View>
  )
}

const ExampleSentences = ({ examples }: {
  examples: { eng: string[] }
}) => {
  // console.log('examples', examples)
  
  if (!examples) {
    return null
  }
  
  return (
    <View>
      <Text>Example Sentences</Text>
      {examples?.eng.map((example, index) => (
        <Text key={index}>"{example}"</Text>
      ))}
    </View>
  )
}

const SynsetScreen = () => {
  const { id } = useLocalSearchParams()
  const synset = useSelector(selectSynsetById(id as string))
  
  return (
    <View style={globalStyles.container}>
      <SynsetScreenHeader synsetId={id as string} />
      
      <View style={styles.container}>
        <Gloss gloss={synset.gloss.eng} />
        
        <LemmaGroup lemmas={synset.lemmas} />
        
        <ExampleSentences examples={synset.examples} />
      </View>
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
  },
  
  container: {
    padding: 5,
    gap: 10
  }
})
