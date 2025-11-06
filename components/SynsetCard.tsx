import { Synset } from '../types'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import Gloss from './Gloss'
import LemmaGroup from './LemmaGroup'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { pushSynset } from '../features/synsetStack/synsetStackSlice'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 5,
    padding: 5
  }
})

const SynsetCard = ({ synset }: { synset: Synset }) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  return (
    <Pressable
      onPress={() => {
        dispatch(pushSynset(synset))
        router.push(`/synset/${synset.id}`)
      }}
    >
      <View style={styles.container}>
        <Text>{synset.id}</Text>
        
        <Gloss gloss={synset.gloss.eng} />
        
        <LemmaGroup lemmas={synset.lemmas} />
      </View>
    </Pressable>
  )
}

export default SynsetCard
