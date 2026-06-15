import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import ComentarPost from "../screens/ComentarPost"
import Profile from "../screens/Profile"
import {Entypo, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import CrearPost from "../screens/CrearPost";


const Tab= createBottomTabNavigator()
const Stack= createNativeStackNavigator()

function HomeStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="ComentarPost" component={ComentarPost} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

function HomeMenu(){


    return(

    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0088cc",
        tabBarInactiveTintColor: "#979797",
        tabBarStyle: {backgroundColor: "#eeeeee"}
    }}>
        <Tab.Screen name="Home" component={HomeStack} options={{tabBarIcon:({color})=><Entypo name="home" size={24} color={color}/>}}/>
        <Tab.Screen name="Crear Posteo" component={CrearPost} options={{tabBarIcon:({color})=><Ionicons name="add-circle" size={24} color={color}/>}}/>
        <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon:({color})=><MaterialCommunityIcons
        name="face-man-profile" size={24} color={color}/>}}/>
    </Tab.Navigator>

    )
}

export default HomeMenu
