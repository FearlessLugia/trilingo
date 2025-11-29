import { StyleSheet } from 'react-native'
import { colors } from '@/constants/colors'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  
  button: {
    backgroundColor: colors['fra'],
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
})
