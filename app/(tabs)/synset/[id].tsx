import { View, Text, Pressable } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'

const SynsetScreen = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  
  return (
    // <View>
    //   <Pressable onPress={() => router.back()} style={styles.side}>
    //     {/*<Ionicons name='chevron-back' size={24} color='#222' />*/}
    //     <Text>{'<'}</Text>
    //   </Pressable>
    //
      <Text>synset Screen: {id}</Text>
    // </View>
  )
}

export default SynsetScreen