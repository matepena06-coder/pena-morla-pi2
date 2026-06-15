import {useState, useEffect} from "react"
import {View, Text, StyleSheet, Pressable, TextInput, FlatList} from 'react-native'
import {auth, db} from "../firebase/config.js"

function ComentarPost(props){

    const idPost = props.route.params.id
    const post = props.route.params.data

    const [comentario, setComentario]= useState("")
    const [comentarios, setComentarios]= useState([])

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

    useEffect(()=>{
        db.collection("comentarios")
        .where("postId", "==", idPost)
        .onSnapshot(
            docs=>{
                let comments=[]
                docs.forEach((doc)=>{
                    comments.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                comments.sort((a, b)=> a.data.createdAt - b.data.createdAt)
                setComentarios(comments)
            })
    },[])

    const enviarComentario =(comentario)=>{
        if(comentario === ""){
            return
        }
        db.collection("comentarios")
        .add({
            postId: idPost,
            email: auth.currentUser.email,
            texto: comentario,
            createdAt: Date.now()
        })
        .then(()=>{
            setComentario("")
        })
        .catch(error=> console.log(error))
    }

    return(
        <>
        <View style={styles.principal}>

            <View style={styles.post}>
                <Text style={styles.postEmail}>{post.email}</Text>
                <Text style={styles.postDescripcion}>{post.descripcionPost}</Text>
            </View>

            <Text style={styles.titulo}>Comentarios</Text>

            <TextInput style={styles.field}
            placeholder="Escribe un comentario..."
            onChangeText={text=> setComentario(text)}
            value={comentario}/>

            <Pressable style={styles.button} onPress={()=> enviarComentario(comentario)}>
                <Text style={styles.buttonText}>Comentar</Text>
            </Pressable>

            <FlatList
            data={comentarios}
            keyExtractor={(item)=> item.id}
            renderItem={({item})=>
                <View style={styles.comentario}>
                    <Text style={styles.comentarioEmail}>{item.data.email}</Text>
                    <Text style={styles.comentarioTexto}>{item.data.texto}</Text>
                </View>
            }/>

        </View>
        </>
    )
}

const styles= StyleSheet.create({

        principal: {
            flex: 1,
            paddingHorizontal: 10,
            marginTop: 20
        },

        post: {
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12
        },

        postEmail: {
            color: "#888",
            marginBottom: 8
        },

        postDescripcion: {
            color: "#222"
        },

        titulo: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10
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
        },

        comentario: {
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 12,
            marginVertical: 6
        },

        comentarioEmail: {
            color: "#888",
            marginBottom: 4
        },

        comentarioTexto: {
            color: "#222"
        }
    })

export default ComentarPost
