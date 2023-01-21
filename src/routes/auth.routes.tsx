import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import SignIn from '@screens/SignIn';
import SignUp from '@screens/SignUp';

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

const AuthRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='signIn' component={SignIn} />
      <Screen name='signUp' component={SignUp} />
    </Navigator>
  )
}

export default AuthRoutes;
