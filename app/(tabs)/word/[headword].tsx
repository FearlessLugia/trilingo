import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native'
import ItemSeparator from '../../../components/ItemSeparator'
import SynsetCard from '../../../components/SynsetCard'
import { data } from '../../../data'
import { globalStyles } from '../../../styles/globalStyles'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '../../../constants/colors'

const HeaderWord = ({ headword }: { headword: string }) => (
  <Text>{headword}</Text>
)

const Pivot = ({ pivot }: { pivot: string }) => {
  const color = colors[pivot as keyof typeof colors]
  
  return (
    <View style={[styles.pivot, { borderColor: color }]}>
      <Text style={[styles.pivotText, { color: color }]}>
        {pivot.toUpperCase()}
      </Text>
    </View>
  )
}

const WordScreenHeader = () => {
  const router = useRouter()
  
  const toggleStar = () => {
    // TODO
  }
  
  return (
    <View style={styles.header}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name='chevron-back-sharp' size={24} color='black' />
      </Pressable>
      
      <View style={styles.leftContainer}>
        <HeaderWord headword={data.headword} />
        <Pivot pivot={data.pivot} />
      </View>
      
      <Pressable
        onPress={toggleStar}
      >
        <Ionicons name='star-outline' size={24} color='black' />
        {/*<Ionicons name="star" size={24} color="black" />*/}
      </Pressable>
    </View>
  )
}

const WordScreen = () => {
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={data.synsets}
        renderItem={({ item }) => <SynsetCard synset={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <WordScreenHeader />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  )
}

export default WordScreen

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  
  pivot: {
    borderWidth: 1,
    padding: 2,
    borderRadius: 3
  },
  
  pivotText: {}
})
