import {useState, useEffect} from "react"
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native'
import {auth, db} from "../firebase/config"

function Register({navigation}){

    const [email, setEmail]= useState("")
    const [username, setUserName]= useState("")
    const [password, setPassword]= useState("")
    const [estaRegistrado, setEstaRegistrado]= useState(false)
    const [registerError, setRegisterError]= useState("")

    const onSubmit =(email, password, username)=>{

        if (!email.includes("@")){
            setRegisterError("Email mal formateado")
            return
        }

        if (password<6){
            setRegisterError("La contraseña debe tener como mínimo 6 caracteres")
            return
        }

        auth.createUserWithEmailAndPassword(email,password)

        .then(()=>{
            db.collection("users").add({
                email: auth.currentUser.email,
                username: username,
                createdAt: Date.now()
            })
            setEstaRegistrado(true)
            navigation.navigate("Login")
        })

        .catch(error=>{

        if (error.code === "auth/email-already-in-use"){

            setRegisterError("Ya existe un usuario registrado con este email")

        } else {

            setRegisterError("Fallo en el registro")}

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

            <Text style={styles.titulo}>Registrarse</Text>

            <Pressable onPress={()=> navigation.navigate("Login")}>
                <Text style={styles.link}>Ya tengo cuenta</Text>
            </Pressable>

            <TextInput style={styles.field}
            keyboardType="email-address"
            placeholder="email"
            placeholderTextColor="#979797"
            onChangeText={text=> setEmail(text)}
            value={email}/>

            <TextInput style={styles.field}
            placeholder="usuario"
            placeholderTextColor="#979797"
            onChangeText={text=> setUserName(text)}
            value={username}/>

            <TextInput style={styles.field}
            placeholder="contraseña"
            placeholderTextColor="#979797"
            secureTextEntry={true}
            onChangeText={text=> setPassword(text)}
            value={password}/>

            <Text style={styles.error}>{registerError}</Text>

            <Pressable style={styles.button} onPress={()=> onSubmit(email, password, username)}>
                <Text style={styles.buttonText}>Registrarse</Text>
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

export default Register
