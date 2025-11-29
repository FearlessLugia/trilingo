import { Redirect } from 'expo-router'
import { useSelector } from 'react-redux'
import { selectUserState } from '@/features/user/userSlice'

export default function AppIndex() {
  const userId = useSelector(selectUserState).userId
  
  if (!userId) {
    return <Redirect href="/signIn" />
  }
  
  return <Redirect href="/(tabs)" />
}
