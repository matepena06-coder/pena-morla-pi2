import {useEffect, useState} from "react"
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native'
import {auth} from "../../firebase/config.js"

function Login({navigation}){

    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [loginCorrecto, setLoginCorrecto]= useState(false)
    const [loginError, setLoginError]= useState("")
        
    const onSubmit =(email, password)=>{

        if (password<6){
            setLoginError("La contraseña debe tener como mínimo 6 caracteres")
            return
        }
        if (!email.includes("@")){
            setLoginError("Email mal escrito")
            return
        }

        auth.signInWithEmailAndPassword(email, password)
        
        .then(response=>{
            setLoginCorrecto(true)
            navigation.navigate("HomeMenu")
        })
        .catch(error=>{
            setLoginError("Credenciales Inválidas")
            console.log(error)
        })
    }

    useEffect(
        ()=>{
            auth.onAuthStateChanged(
                user=> {
                    if(user){
                        navigation.navigate("HomeMenu")
                    }
                }
            )
        }, []
    )

    return(
        <>
        <View style={styles.principal}>

            <Text>Formulario de Login</Text>

            <Pressable onPress={()=> navigation.navigate("Register")}>
                <Text>No tengo cuenta</Text>
            </Pressable>
            
            <TextInput style={styles.field}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={text=> setEmail(text)}
            value={email}/>
            
            <TextInput style={styles.field}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={text=> setPassword(text)}
            value={password}/>

            <Text>{loginError}</Text>
            
            <Pressable style={styles.button} onPress={()=> onSubmit(email, password)}>
                <Text styles={styles.buttonText}>Log in</Text>
            </Pressable>
            
            <View>
                <Text>Email: {email}</Text>
                <Text>Password: {password}</Text>
            </View>

        </View>
        </>
    )
}

const styles= StyleSheet.create({

        principal: {
            paddingHorizontal: 10,
            marginTop: 20
        },

        field:{
            height: 20,
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            marginVertical: 10
        },

        button:{
            backgroundColor: "#28a745",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderColor: "#28a745",
            borderRadius: 4,
            borderWidth: 1,
            alignItems:"center"
        },

        buttonText: {
            color: "#fff"
        }
    })

export default Login