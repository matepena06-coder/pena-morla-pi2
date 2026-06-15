import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native'
import {useState, useEffect} from 'react'
import Post from "../components/Post"
import {auth, db} from '../firebase/config'

function Profile({navigation}){

    const [posteos, setPosteos]= useState([])
    const [username, setUserName]= useState("")

    useEffect(()=>{
        db.collection("users")
        .where("email", "==", auth.currentUser.email)
        .onSnapshot(
            docs=>{
                docs.forEach((doc)=>{
                    setUserName(doc.data().username)
                })
            })
    },[])

    useEffect(()=>{
        db.collection("posts")
        .where("email", "==", auth.currentUser.email)
        .onSnapshot(
            docs=>{
                let posts=[]
                docs.forEach((doc)=>{
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setPosteos(posts)
            })
    },[])

    function logout(){
        auth.signOut()
        .then(()=>navigation.navigate("Login"))
        .catch(error=> console.log(error))
    }

    return(
        <>
        <View style={styles.principal}>

            <Text style={styles.titulo}>Mi perfil</Text>

            <Text style={styles.dato}>Usuario: {username}</Text>

            <Text style={styles.dato}>Email: {auth.currentUser.email}</Text>

            <Text style={styles.subtitulo}>Mis posteos</Text>

            <FlatList
            data={posteos}
            keyExtractor={(item)=> item.id}
            renderItem={({item}) => <Post data={item.data} id={item.id} onComentar={(id, data)=> navigation.navigate("Home", {screen: "ComentarPost", params: {id: id, data: data}})}/>}/>

            <Pressable style={styles.button} onPress={()=> logout()}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
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
    dato: {
        color: "#000000",
        marginVertical: 4
    },
    subtitulo: {
        color: "#666666",
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8
    },
    button: {
        backgroundColor: "#0088cc",
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: "center",
        marginTop: 8
    },
    buttonText: {
        color: "#eeeeee",
        fontWeight: "bold"
    }
})

export default Profile
