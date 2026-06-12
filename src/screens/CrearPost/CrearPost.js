import {useState, useEffect} from "react"
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native'
import {auth, db} from "../../firebase/config.js"

function CrearPost(props){

    const [descripcionPost, setDescripcionPost]= useState("")
    
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
        db.collection("posts")

        .add({
        email: auth.currentUser.email,
        likes:[],
        descripcionPost: descripcionPost,
        createdAt: Date.now()})

        .then(()=>{
            setDescripcionPost("")
            props.navigation.navigate("Home")
        })
        
        .catch(error=>{
            console.log(error)
        })
    }

    return(
        <>
        <View style={styles.principal}>

            <Text>Crear Nuevo Post</Text>
   
            <TextInput style={styles.field}
            placeholder="Escribe aquí tu comentario..."
            onChangeText={text=> setDescripcionPost(text)}
            value={descripcionPost}/>
    
            
            <Pressable style={styles.button} onPress={()=> crearPost(descripcionPost)}>
                <Text styles={styles.buttonText}>Publicar Post</Text>
            </Pressable>
            
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

export default CrearPost