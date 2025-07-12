import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RootLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarStyle: {
            backgroundColor: "white",
            height: 60,
            paddingBottom: 10,            
            },
            headerTintColor: "purple",

        }}
    >
      <Tabs.Screen name="index" options={{ headerTitle : "TicketyBoom" , tabBarShowLabel :false , headerTitleAlign:"center", tabBarIcon : ({focused ,color})=>{
        return <Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color={color? "purple" : "white"} />
        } }}/>
       <Tabs.Screen name="Favourite" options={{headerTitle:"Favourites",tabBarShowLabel :false ,tabBarIcon : ({focused ,color})=>{
            return <Ionicons name={focused ? "heart-sharp" : "heart-outline"} size={24} color={color? "purple" : "white"} />
        } }}/>
        <Tabs.Screen name="explore" options={{headerTitle:"Explore",tabBarShowLabel :false ,tabBarIcon : ({focused ,color})=>{
            return <Ionicons name={focused ? "search-sharp" : "search-outline"} size={24} color={color? "purple" : "white"} />
        } }}/>
        <Tabs.Screen name="yourtickets" options={{headerTitle:"Your Tickets",tabBarShowLabel :false ,tabBarIcon : ({focused ,color})=>{
                return <Ionicons name={focused ? "ticket-sharp" : "ticket-outline"} size={24} color={color? "purple" : "white"} />
        } }}/>  
        
         <Tabs.Screen name="profile" options={{headerTitle:"Profile" ,tabBarShowLabel :false ,tabBarIcon : ({focused ,color})=>{
        return <Ionicons name={focused ? "person-sharp" : "person-outline"} size={24} color={color? "purple" : "white"} />
      } }}/>
       
    </Tabs>
  );
}
