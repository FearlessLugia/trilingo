import { View, StyleSheet, Text, Alert, Pressable } from 'react-native'
import { supabase } from '@/utils/supabase'
import AuthForm from '@/components/AuthForm'
import { useRouter } from 'expo-router'
import { globalStyles } from '@/styles/globalStyles'
import { setUser } from '@/features/user/userSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'

const SignUpScreen = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  
  const handleSignUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    
    if (error) {
      Alert.alert('Sign Up', error.message)
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
    
    Alert.alert('Sign Up', 'Sign up successful!')
    router.replace('/')
  }
  
  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerText}>Sign Up</Text>
      
      <AuthForm submitLabel='Sign Up' onSubmit={handleSignUp} />
      
      <Pressable
        style={({ pressed }) => [
          globalStyles.button,
          pressed && { opacity: 0.8 }
        ]}
        onPress={() => router.replace('/signIn')}
      >
        <Text style={globalStyles.buttonText}>Already have an account? Sign In</Text>
      </Pressable>
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