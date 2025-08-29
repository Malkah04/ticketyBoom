import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

type User = {
  userName: string;
  email: string;
  role: string;
};

export default function Profile() {
  const [exists, setExists] = useState(false);
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const userId = searchParams?.id;
  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.6:8000/api/user/${userId}`
      );
      const data = await response.json();
      setUser(data);
      setExists(true);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);
  const logout = () => {
    setExists(false);
    setUser(null);
    router.push("/authPage/LogIn");
  };

  return (
    <>
      {exists && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={{ uri: defaultImage }} style={styles.avatar} />
            <Text style={styles.name}>{user?.userName}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>

          <View style={styles.statsContainer}>
            {/* <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user.tickets}</Text>
              <Text style={styles.statLabel}>Tickets</Text>
            </View> */}
            {/* <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user.favorites}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View> */}
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                logout();
              }}
              style={[styles.button, { backgroundColor: "#ff0040" }]}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
          </View>
        </View>
      )}
      {!exists && (
        <View style={styles.container}>
          <Text
            style={[
              styles.header,
              {
                color: "white",
                alignItems: "center",
                fontSize: 20,
                alignSelf: "center",
              },
            ]}
          >
            Please log in to view your profile.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => router.push("/authPage/LogIn")}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
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
