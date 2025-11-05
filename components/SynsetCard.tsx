import { Synset } from '../types'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../constants/colors'
import { useRouter } from 'expo-router'

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
        <Text>{synset.gloss.eng}</Text>
        
        <View style={styles.lemma}>
          {/*<Text>English</Text>*/}
          <View style={styles.langRow}>
            {synset.lemmas.eng.map((en) => (
              <Pressable
                key={en}
                style={styles.eng}
                onPress={() => {
                }}
              >
                <Text style={styles.buttonText}>{en.replace(/_/g, ' ')}</Text>
              </Pressable>
            ))}
          </View>
          
          {/*<Text>French</Text>*/}
          <View style={styles.langRow}>
            {synset.lemmas.fra.map((fr) => (
              <Pressable
                key={fr}
                style={styles.fra}
                onPress={() => {
                }}
              >
                <Text style={styles.buttonText}>{fr.replace(/_/g, ' ')}</Text>
              </Pressable>
            ))}
          </View>
          
          {/*<Text>Spanish</Text>*/}
          <View style={styles.langRow}>
            {synset.lemmas.spa.map((es) => (
              <Pressable
                key={es}
                style={styles.spa}
                onPress={() => {
                }}
              >
                <Text style={styles.buttonText}>{es.replace(/_/g, ' ')}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default SynsetCard
