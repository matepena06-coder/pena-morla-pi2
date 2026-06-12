import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../../screens/Home/Home"
import Profile from "../../screens/Profile/Profile"
import {Entypo, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import CrearPost from "../../screens/CrearPost/CrearPost";


const Tab= createBottomTabNavigator()
function HomeMenu(){


    return(

    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarIcon:()=><Entypo name="home" size={24} color="black"/>}}/>
        <Tab.Screen name="Crear Posteo" component={CrearPost} options={{headerShown: false, tabBarIcon:()=><Ionicons name="add-circle" size={24} color="black"/>}}/>
        <Tab.Screen name="Profile" component={Profile} options={{headerShown: false, tabBarIcon:()=><MaterialCommunityIcons 
        name="face-man-profile" size={24} color="black"/>}}/>
    </Tab.Navigator>
       
    )
}

export default HomeMenu