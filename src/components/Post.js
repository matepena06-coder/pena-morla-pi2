import { View, Text, Pressable, StyleSheet } from "react-native"
import firebase from "firebase"
import { auth, db } from "../firebase/config"

function Post(props){

    const likes = props.data.likes ? props.data.likes : []
    const yaLikeo = likes.includes(auth.currentUser.email)

    function toggleLike(){
        if(yaLikeo){
            db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .catch(error=> console.log(error))
        } else {
            db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .catch(error=> console.log(error))
        }
    }

    return(
        <View style={styles.card}>
            <Text style={styles.email}>{props.data.email}</Text>
            <Text style={styles.descripcion}>{props.data.descripcionPost}</Text>
            <View style={styles.acciones}>
                <Text style={styles.likes}>{likes.length} likes</Text>
                <View style={styles.botones}>
                    <Pressable style={styles.boton} onPress={()=> toggleLike()}>
                        <Text>{yaLikeo ? "No me gusta" : "Me gusta"}</Text>
                    </Pressable>
                    <Pressable style={styles.boton} onPress={()=> props.onComentar(props.id, props.data)}>
                        <Text>Comentar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    email: {
        color: "#888",
        marginBottom: 8,
    },
    descripcion: {
        color: "#222",
    },
    acciones: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
    },
    likes: {
        color: "#888",
    },
    botones: {
        flexDirection: "row",
        gap: 8,
    },
    boton: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: "#eee",
    },
})

export default Post
