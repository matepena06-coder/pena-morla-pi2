import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../../screens/Home/Home"
import Profile from "../../screens/Profile/Profile"
import {Entypo, MaterialCommunityIcons} from '@expo/vector-icons';

function HomeMenu(){

    const Tab= createBottomTabNavigator()

    return(

    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{headerShown: false, tabBarIcon:()=><Entypo name="home" size={24} color="black"/>}}/>
        <Tab.Screen name="Profile" component={Profile} options={{headerShown: false, tabBarIcon:()=><MaterialCommunityIcons 
        name="face-man-profile" size={24} color="black"/>}}/>
    </Tab.Navigator>
       
    )
}

export default HomeMenu