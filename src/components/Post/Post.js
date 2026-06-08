import {View, Text} from "react-native"

function Post (props){
    return(
        <View>
            <Text>{props.data.descripcionPost}</Text>
            <Text>{props.data.email}</Text>
        </View>
    )
}

export default Post