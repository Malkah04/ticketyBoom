import { Tabs, SplashScreen } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import LogoScreen from "../pages/LogoScreen";

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
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#121212", // خلفية داكنة
          height: 70,
          paddingBottom: 10,
          borderTopColor: "#333",
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: "#e8aa42",  // اللون الذهبي لما الأيقونة تكون مفعلة
        tabBarInactiveTintColor: "#888",   // لون الأيقونة الغير مفعّلة
        headerShown: false,
      })}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "search-sharp" : "search-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="yourtickets"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "ticket-sharp" : "ticket-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
