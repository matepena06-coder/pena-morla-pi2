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

    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} options={{headerShown: false, tabBarIcon:()=><Entypo name="home" size={24} color="black"/>}}/>
        <Tab.Screen name="Crear Posteo" component={CrearPost} options={{headerShown: false, tabBarIcon:()=><Ionicons name="add-circle" size={24} color="black"/>}}/>
        <Tab.Screen name="Profile" component={Profile} options={{headerShown: false, tabBarIcon:()=><MaterialCommunityIcons
        name="face-man-profile" size={24} color="black"/>}}/>
    </Tab.Navigator>

    )
}

export default HomeMenu
