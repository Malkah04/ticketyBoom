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
          borderTopWidth: 0,
          backgroundColor: "#121212",
          height: 60,
          padding: 5,
        },
        headerTintColor: "#26a69a",
      }}
    >
      <Tabs.Screen
        name="yourtickets"
        options={{
          headerTitle: "Your Tickets",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ticket-sharp" : "ticket-outline"}
              size={30}
              color={focused ? "#26a69a" : "white"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "TicketyBoom",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={30}
              color={focused ? "#26a69a" : "white"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              size={30}
              color={focused ? "#26a69a" : "white"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
