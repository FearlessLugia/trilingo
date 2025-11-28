import { View, Text, Button, StyleSheet } from 'react-native'
import { supabase } from '@/utils/supabase'
import AuthForm from '@/components/AuthForm'
import { useRouter } from 'expo-router'
import { globalStyles } from '@/styles/globalStyles'

const SignInScreen = () => {
  const router = useRouter()
  
  const handleSignIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      alert(error.message)
    } else {
      alert('Sign in successful!')
      router.replace('/')
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerText}>Sign In</Text>
      
      <AuthForm submitLabel='Sign In' onSubmit={handleSignIn} />
      
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => router.push('/signUp')}
      />
    
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 15
  }
})