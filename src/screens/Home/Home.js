import { useEffect, useState } from "react"
import {View, Text, StyleSheet} from 'react-native'
import {auth, db} from "../../firebase/config"
import Post from "../../components/Post/Post"
import { FlatList } from "react-native"

function Home(props){

    const [posteos, setPosteos]= useState([])

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
        db.collection("posts")
        .orderBy("createdAt", "desc")
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

    return(
        <>
        <View style={styles.principal}>
            <Text>Home</Text>
            <FlatList
            data={posteos}
            keyExtractor={(item)=> item.id}
            renderItem={({item}) => <Post data={item.data}/>}/>
        </View>
        </>
    )
}

const styles= StyleSheet.create({
        principal: {
            alignItems: "center",
            padding: 10
        }
    })

export default Home