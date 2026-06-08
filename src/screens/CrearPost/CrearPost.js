import {useState} from "react"
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native'
import {auth, db} from "../../firebase/config.js"

function CrearPost(){

    const [descripcionPost, setDescripcionPost]= useState("")

        
    const crearPost =(descripcionPost)=>{
        db.collection("posts").add({
        email: auth.currentUser.email,
        descripcionPost: descripcionPost,
        createdAt: Date.now()})
        
        .catch(error=>{
            console.log(error)
        })
    }

    return(
        <>
        <View style={styles.principal}>
   
            <TextInput style={styles.field}
            placeholder="post"
            onChangeText={text=> setDescripcionPost(text)}
            value={descripcionPost}/>
    
            
            <Pressable style={styles.button} onPress={()=> crearPost(descripcionPost)}>
                <Text styles={styles.buttonText}>Crear Post</Text>
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