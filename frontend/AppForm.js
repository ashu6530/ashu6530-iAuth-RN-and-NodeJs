import { Dimensions, ScrollView,View } from 'react-native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import FormHeader from './app/components/FormHeader';
import FromSelectBtn from './app/components/FromSelectBtn';
import LoginForm from './app/components/LoginForm';
import SignupForm from './app/components/SignupForm';
import { useRef } from 'react';
import AppLoader from './app/components/AppLoader';
const { width } = Dimensions.get('window');

export default function AppForm({navigation}) {

  const scrollView = useRef()
  return (
    <>
  <SafeAreaProvider>
   
   <FormHeader 
   leftHeading='Welcome' 
   rightHeading='Back' 
   subHeading='Task Manager'/>
   <View className="p-4">
      <View className="flex-row">
        <FromSelectBtn 
        backgroundColor="rgba(27,27,51,1)" 
        title="Login"
        onPress={()=>scrollView.current.scrollTo({x:0})}
        />

        <FromSelectBtn 
        backgroundColor="rgba(27,27,51,0.4)" 
        title="Signup"
        onPress={()=>scrollView.current.scrollTo({x:width})}
        />
        </View>
    </View>
    <ScrollView 
    ref = {scrollView}
    horizontal 
    pagingEnabled 
    showsHorizontalScrollIndicator={false} >
     <LoginForm navigation={navigation}/>
     <ScrollView>
     <SignupForm navigation={navigation}/>
     </ScrollView>
    
      
    </ScrollView>
 
  </SafeAreaProvider>
  <AppLoader/>
  </>
 
  
  )
  
}


