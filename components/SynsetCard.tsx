import { Synset } from '../types'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import { useRouter } from 'expo-router'
import Gloss from './Gloss'
import LemmaGroup from './LemmaGroup'

const baseLangStyle = {
  color: colors.white,
  justifyContent: 'center',
  borderRadius: 5,
  marginTop: 3,
  marginHorizontal: 2,
  alignSelf: 'flex-start'
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 5,
    padding: 5
  },
  
  lemma: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  langRow: {
    width: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 1,
    marginTop: 6
  },
  
  eng: {
    ...baseLangStyle,
    backgroundColor: colors.primary
  },
  
  fra: {
    ...baseLangStyle,
    backgroundColor: 'orange'
  },
  
  spa: {
    ...baseLangStyle,
    backgroundColor: '#FD92BA'
  },
  
  buttonText: {
    color: colors.white,
    margin: 5
  }
})

const SynsetCard = ({ synset }: { synset: Synset }) => {
  const router = useRouter()
  
  return (
    <Pressable
      onPress={() => router.push(`/synset/${synset.id}`)}
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
