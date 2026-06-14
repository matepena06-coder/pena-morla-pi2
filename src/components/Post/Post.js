import { View, Text, Pressable, StyleSheet } from "react-native"

function Post(props){
    return(
        <View style={styles.card}>
            <Text style={styles.email}>{props.data.email}</Text>
            <Text style={styles.descripcion}>{props.data.descripcionPost}</Text>
            <View style={styles.acciones}>
                <Text style={styles.likes}>{props.data.likes ? props.data.likes.length : 0} likes</Text>
                <View style={styles.botones}>
                    <Pressable style={styles.boton}>
                        <Text>Me gusta</Text>
                    </Pressable>
                    <Pressable style={styles.boton}>
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