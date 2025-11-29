import { useState } from 'react'
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native'
import { colors } from '@/constants/colors'
import { globalStyles } from '@/styles/globalStyles'

type Props = {
  submitLabel: string
  onSubmit: (email: string, password: string) => void
}

const AuthForm = ({ submitLabel, onSubmit }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  function handlePress() {
    onSubmit(email, password)
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        style={styles.input}
      />
      
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <Pressable
        style={({ pressed }) => [
          globalStyles.button,
          pressed && { opacity: 0.8 }
        ]}
        onPress={handlePress}
      >
        <Text style={globalStyles.buttonText}>{submitLabel}</Text>
      </Pressable>
    </View>
  )
}

export default AuthForm

const styles = StyleSheet.create({
  container: {
    gap: 15
  },
  
  input: {
    borderWidth: 1,
    borderColor: colors['border'],
    borderRadius: 6,
    padding: 10
  }
})

