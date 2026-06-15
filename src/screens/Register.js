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

            <Text>Formulario de Register</Text>
            <Pressable onPress={()=> navigation.navigate("Login")}>
                <Text>Ya tengo cuenta</Text>
            </Pressable>

            <TextInput style={styles.field}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={text=> setEmail(text)}
            value={email}/>

            <TextInput style={styles.field}
            placeholder="user"
            onChangeText={text=> setUserName(text)}
            value={username}/>

            <TextInput style={styles.field}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={text=> setPassword(text)}
            value={password}/>

            <Text>{registerError}</Text>

            <Pressable style={styles.button} onPress={()=> onSubmit(email, password, username)}>
                <Text styles={styles.buttonText}>Registrarse</Text>
            </Pressable>

            <View>
                <Text>Email: {email}</Text>
                <Text>UserName: {username}</Text>
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

export default Register