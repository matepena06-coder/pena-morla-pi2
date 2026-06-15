import {useState, useEffect} from "react"
import {View, Text, StyleSheet, Pressable, TextInput, FlatList, ActivityIndicator} from 'react-native'
import {auth, db} from "../firebase/config.js"

function ComentarPost(props){

    const idPost = props.route.params.id
    const post = props.route.params.data

    const [comentario, setComentario]= useState("")
    const [comentarios, setComentarios]= useState([])
    const [cargando, setCargando]= useState(false)

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
        setCargando(true)
        db.collection("comentarios")
        .add({
            postId: idPost,
            email: auth.currentUser.email,
            texto: comentario,
            createdAt: Date.now()
        })
        .then(()=>{
            setComentario("")
            setCargando(false)
        })
        .catch(error=>{
            console.log(error)
            setCargando(false)
        })
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
            placeholderTextColor="#979797"
            onChangeText={text=> setComentario(text)}
            value={comentario}/>

            <Pressable style={styles.button} onPress={()=> enviarComentario(comentario)} disabled={cargando}>
                {cargando ? <ActivityIndicator color="#eeeeee" /> : <Text style={styles.buttonText}>Comentar</Text>}
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
            backgroundColor: "#eeeeee",
            padding: 16
        },

        post: {
            borderWidth: 1,
            borderColor: "#979797",
            borderRadius: 4,
            padding: 12,
            marginBottom: 12
        },

        postEmail: {
            color: "#666666",
            marginBottom: 8
        },

        postDescripcion: {
            color: "#000000"
        },

        titulo: {
            color: "#000000",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 8
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
        },

        comentario: {
            borderWidth: 1,
            borderColor: "#979797",
            borderRadius: 4,
            padding: 12,
            marginVertical: 6
        },

        comentarioEmail: {
            color: "#666666",
            marginBottom: 4
        },

        comentarioTexto: {
            color: "#000000"
        }
    })

export default ComentarPost
