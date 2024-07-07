import { View,StyleSheet,Text} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AppLoader = () => {
    return (
        <SafeAreaView>
            <View style={[StyleSheet.absoluteFillObject,styles.container]}>
          <LottieView source={require('../../assets/animation.json')} autoPlay loop/>
        </View>
        </SafeAreaView>
        
      )
    }
    
    export default AppLoader
    const styles = StyleSheet.create({
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        zIndex:1
    
    })

