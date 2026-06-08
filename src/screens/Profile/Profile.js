import {View, Text, StyleSheet, Pressable} from 'react-native'

function Profile({navigation}){

    const styles= StyleSheet.create({
        principal: {
            alignItems: "center",
            padding: 10
        }
    })

    return(
        <>
        <View style={styles.principal}>
            <Text>Formulario de Profile</Text>
            <Pressable onPress={()=> navigation.navigate("Login")}>
                <Text>Desloguearse</Text>
            </Pressable>
        </View>
        </>
    )
}

export default Profile