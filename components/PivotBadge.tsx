import { colors } from '@/constants/colors'
import { StyleSheet, Text, View } from 'react-native'

export const PivotBadge = ({ pivot }: { pivot: string }) => {
  const color = colors[pivot as keyof typeof colors]
  
  return (
    <View style={[styles.pivot, { borderColor: color }]}>
      <Text style={[styles.pivotText, { color: color }]}>
        {pivot.toUpperCase()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  pivot: {
    width: 40,
    borderWidth: 1,
    padding: 2,
    borderRadius: 3,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  pivotText: {
    fontWeight: '500'
  }
})