import { View, Button, StyleSheet, Text } from 'react-native'
import { supabase } from '@/utils/supabase'
import AuthForm from '@/components/AuthForm'
import { useRouter } from 'expo-router'
import { globalStyles } from '@/styles/globalStyles'

const SignUpScreen = () => {
  const router = useRouter()
  
  const handleSignUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    
    if (error) {
      alert(error.message)
    } else {
      alert('Sign up successful!')
      router.replace('/')
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerText}>Sign Up</Text>
      
      <AuthForm submitLabel='Sign Up' onSubmit={handleSignUp} />
      
      <Button
        title='Already have an account? Sign In'
        onPress={() => router.push('/signIn')}
      />
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 15
  }
})