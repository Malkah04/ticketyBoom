import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: "black",
          },
          drawerActiveTintColor: "#26a69a",
          drawerInactiveTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#e8aa42",
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "TicketyBoom",
          }}
        />
        <Drawer.Screen
          name="boughtItems"
          options={{
            drawerLabel: "Your Tickets",
            title: "Your Tickets",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
