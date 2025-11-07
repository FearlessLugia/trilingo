import { StyleSheet, View } from 'react-native'

const ItemSeparator = () =>
  <View style={styles.separator} />

export default ItemSeparator

const styles = StyleSheet.create({
  separator: {
    height: 5
  }
})
