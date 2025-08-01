import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import img1 from "../../assets/images/fady.jpeg"
export default function Profile() {
  const [user, setUser] = useState({
    name: "Big Eskander",
    email: "fadyeskander180@gmail.com",
    img: {img1} ,
    tickets: 5,
    favorites: 12,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image  source= {img1 }style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

     
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.tickets}</Text>
          <Text style={styles.statLabel}>Tickets</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.favorites}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

    
      <View style={styles.actions}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: '#ff0040' }]}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e8aa42",
  },
  email: {
    color: "#ccc",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e8aa42",
  },
  statLabel: {
    color: "#888",
    fontSize: 14,
  },
  actions: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#1f1f1f",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#e8aa42",
    fontWeight: "bold",
    fontSize: 16,
  },
});
