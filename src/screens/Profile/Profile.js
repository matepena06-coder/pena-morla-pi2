import {View, Text, StyleSheet, Pressable} from 'react-native'
import { auth } from '../../firebase/config'

function Profile({navigation}){

    const styles= StyleSheet.create({
        principal: {
            alignItems: "center",
            padding: 10
        }
    })

    function logout(){
        auth.signOut()
        navigation.navigate("Login")
    }

    return(
        <>
        <View style={styles.principal}>
            <Text>Formulario de Profile</Text>
            <Pressable onPress={()=> logout()}>
                <Text>Desloguearse</Text>
            </Pressable>
        </View>
        </>
    )
}

export default Profile