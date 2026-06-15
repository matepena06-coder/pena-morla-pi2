import {useEffect, useState} from "react"
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native'
import {auth} from "../firebase/config.js"

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
            setLoginError("Email mal formateado")
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

            <Text style={styles.titulo}>Iniciar sesión</Text>

            <Pressable onPress={()=> navigation.navigate("Register")}>
                <Text style={styles.link}>No tengo cuenta</Text>
            </Pressable>

            <TextInput style={styles.field}
            keyboardType="email-address"
            placeholder="email"
            placeholderTextColor="#979797"
            onChangeText={text=> setEmail(text)}
            value={email}/>

            <TextInput style={styles.field}
            placeholder="contraseña"
            placeholderTextColor="#979797"
            secureTextEntry={true}
            onChangeText={text=> setPassword(text)}
            value={password}/>

            <Text style={styles.error}>{loginError}</Text>

            <Pressable style={styles.button} onPress={()=> onSubmit(email, password)}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </Pressable>

        </View>
        </>
    )
}

const styles= StyleSheet.create({

        principal: {
            flex: 1,
            backgroundColor: "#eeeeee",
            padding: 16
        },
        titulo: {
            color: "#000000",
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 16
        },
        link: {
            color: "#0088cc",
            marginBottom: 16
        },
        field:{
            borderWidth: 1,
            borderColor: "#979797",
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 12,
            marginVertical: 8,
            color: "#000000"
        },
        error: {
            color: "#000000",
            marginVertical: 8
        },
        button:{
            backgroundColor: "#0088cc",
            paddingVertical: 12,
            borderRadius: 4,
            alignItems: "center",
            marginVertical: 8
        },
        buttonText: {
            color: "#eeeeee",
            fontWeight: "bold"
        }
    })

export default Login
