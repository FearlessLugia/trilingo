import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import { supabase } from '@/utils/supabase'
import AuthForm from '@/components/AuthForm'
import { useRouter } from 'expo-router'
import { globalStyles } from '@/styles/globalStyles'
import { setUser } from '@/features/user/userSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'

const SignInScreen = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  const handleSignIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      Alert.alert('Sign In', error.message)
      return
    }
    
    const sessionUser = data.user ?? data.session?.user
    if (sessionUser) {
      dispatch(setUser({
        userId: sessionUser.id,
        email: sessionUser.email,
        username: sessionUser.user_metadata?.username ?? null
      }))
    }
    
    Alert.alert('Sign In', 'Sign in successful!')
    router.replace('/')
  }
  
  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerText}>Sign In</Text>
      
      <AuthForm submitLabel='Sign In' onSubmit={handleSignIn} />
      
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => router.replace('/signUp')}
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