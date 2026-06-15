import {useState, useEffect} from "react"
import {View, Text, StyleSheet, Pressable, TextInput, ActivityIndicator} from 'react-native'
import {auth, db} from "../firebase/config.js"

function CrearPost(props){

    const [descripcionPost, setDescripcionPost]= useState("")
    const [cargando, setCargando] = useState(false)

    useEffect(

        ()=>{
            auth.onAuthStateChanged(
                user=> {
                    if(!user){
                        props.navigation.navigate("Login")
                    }
                }
            )
        }, []
    )

    const crearPost =(descripcionPost)=>{
        setCargando(true)
        db.collection("posts")

        .add({
        email: auth.currentUser.email,
        likes:[],
        descripcionPost: descripcionPost,
        createdAt: Date.now()})

        .then(()=>{
            setDescripcionPost("")
            setCargando(false)
            props.navigation.navigate("Home")
        })

        .catch(error=>{
            console.log(error)
            setCargando(false)
        })
    }

    return(
        <>
        <View style={styles.principal}>

            <Text style={styles.titulo}>Crear nuevo post</Text>

            <TextInput style={styles.field}
            placeholder="Escribe aquí tu posteo..."
            placeholderTextColor="#979797"
            onChangeText={text=> setDescripcionPost(text)}
            value={descripcionPost}/>

            <Pressable style={styles.button} onPress={()=> crearPost(descripcionPost)} disabled={cargando}>
                {cargando ? <ActivityIndicator color="#eeeeee" /> : <Text style={styles.buttonText}>Publicar post</Text>}
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
        field:{
            borderWidth: 1,
            borderColor: "#979797",
            borderRadius: 4,
            paddingHorizontal: 10,
            paddingVertical: 12,
            marginVertical: 8,
            color: "#000000"
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

export default CrearPost
