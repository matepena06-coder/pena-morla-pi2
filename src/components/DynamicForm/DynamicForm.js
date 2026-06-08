import {useState} from "react"
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native'

function DynamicForm(){

    const [comentario, setComentario]= useState("")
        
    const onSubmit =()=>{
        console.log(comentario)
    }

    return(
        <>
        <View style={styles.principal}>
            
            <TextInput style={styles.field}
            placeholder="comentario"
            onChangeText={text=> setComentario(text)}
            value={comentario}/>
            
            <Pressable style={styles.button} onPress={()=> onSubmit()}>
                <Text styles={styles.buttonText}>Enviar</Text>
            </Pressable>
            
            <View>
                <Text>Comentario: {comentario}</Text>
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

export default DynamicForm