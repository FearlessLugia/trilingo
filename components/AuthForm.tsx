import { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

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
      
      <Button title={submitLabel} onPress={handlePress} />
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
    borderColor: '#CCC',
    borderRadius: 6,
    padding: 10
  }
})

