import {View, Text, Pressable} from "react-native"

function Post(props){
    return(
        <>

        <View>
            <Text>{props.data.descripcionPost}</Text>
            <Text>{props.data.email}</Text>
            <Text>{props.data.likes ? props.data.likes.length : 0} Likes</Text>
        </View>

        <Pressable>
            <Text>Me gusta</Text>
        </Pressable>

        <Pressable>
            <Text>Comentar</Text>
        </Pressable>

        </>
    )
}

export default Post