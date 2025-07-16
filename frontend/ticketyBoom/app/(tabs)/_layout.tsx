import { Tabs, SplashScreen } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import LogoScreen from '../pages/LogoScreen';

export default function RootLayout() {
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const handleAnimationEnd = async () => {
    setAnimationDone(true);
    await SplashScreen.hideAsync();
  };

  if (!animationDone) {
    return <LogoScreen onAnimationDone={handleAnimationEnd} />;
  }

  return (
    <Tabs
        screenOptions={{
            tabBarStyle: {
            backgroundColor: "white",
            height: 70,
            paddingBottom: 10,            
            },
            headerTintColor: "black",
            headerShown:false ,
        }}
        initialRouteName="explore"
    >
      <Tabs.Screen name="explore" options={{headerTitle:"Explore",tabBarShowLabel :false ,tabBarIcon : ({focused ,color})=>{
            return <Ionicons name={focused ? "grid" : "grid-outline"} size={24} color={color? "red" : "white"} />
        } }}/>
       <Tabs.Screen name="search" options={{headerTitle:"Favourites",tabBarShowLabel :false ,tabBarIcon : ({focused ,color})=>{
            return <Ionicons name={focused ? "search-sharp" : "search-outline"} size={24} color={color? "red" : "white"} />
        } }}/>
        <Tabs.Screen name="index" options={{ headerTitle : "TicketyBoom" , tabBarShowLabel :false , headerTitleAlign:"center", tabBarIcon : ({focused ,color})=>{
        return <Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color={color? "red" : "white"} />
        } }}/>
        
        <Tabs.Screen name="yourtickets" options={{headerTitle:"Your Tickets",tabBarShowLabel :false ,tabBarIcon : ({focused ,color})=>{
                return <Ionicons name={focused ? "ticket-sharp" : "ticket-outline"} size={24} color={color? "red" : "white"} />
        } }}/>  
        
         <Tabs.Screen name="profile" options={{headerTitle:"Profile" ,tabBarShowLabel :false ,tabBarIcon : ({focused ,color})=>{
        return <Ionicons name={focused ? "person-sharp" : "person-outline"} size={24} color={color? "red" : "white"} />
      } }}/>
       
    </Tabs>
  );
}
