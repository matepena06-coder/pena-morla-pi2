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

            <Text>Mi Perfil</Text>

            <Text>Usuario: {username}</Text>

            <Text>Email: {auth.currentUser.email}</Text>

            <Text>Mis Posteos</Text>

            <FlatList
            data={posteos}
            keyExtractor={(item)=> item.id}
            renderItem={({item}) => <Post data={item.data} id={item.id} onComentar={(id, data)=> navigation.navigate("Home", {screen: "ComentarPost", params: {id: id, data: data}})}/>}/>

            <Pressable onPress={()=> logout()}>
                <Text>Desloguearse</Text>
            </Pressable>
        </View>
        </>
    )
}

const styles= StyleSheet.create({
    principal: {
        flex: 1,
        alignItems: "center",
        padding: 10
    } 
})

export default Profile