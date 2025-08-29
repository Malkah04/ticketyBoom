import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

type tickets = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  date: string;
  time: string;
  numOfTickets: number;
  location: string;
  status: string;
  images: [string];
  oragnizer: {
    _id: string;
  };
  sold: number;
};
export default function fav() {
  const [ticket, setTicket] = useState<tickets[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  const [press, setPress] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const id = await AsyncStorage.getItem("UserId");
        setUser(id);
      } catch (e) {
        console.log("Error loading email:", e);
      }
    };
    loadUser();
  }, []);

  const getFav = async () => {
    try {
      const response = await fetch(`http://192.168.1.6:8000/api/fav/${user}`);
      const data = await response.json();
      setTicket(data);
    } catch {}
  };
  useFocusEffect(
    useCallback(() => {
      if (user) {
        getFav();
      }
    }, [user])
  );

  const sendId = (id: string) => {
    router.push(`/ticket/${id}`);
  };

  return (
    <View style={styles.container}>
      {ticket ? (
        <FlatList
          data={ticket}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable onPress={() => sendId(item._id)}>
              <View style={styles.card}>
                <Image source={{ uri: item.images[0] }} style={styles.image} />

                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={[styles.title, { color: "#26a69a" }]}>
                      {" "}
                      {item.category}{" "}
                    </Text>
                  </View>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      ) : (
        <View>
          <Text> no item in Favourite yet</Text>
          <Pressable
            onPress={() =>
              router.push({ pathname: "../../ticket/all_tickets" })
            }
          >
            <Text> explore </Text>
          </Pressable>
        </View>
      )}
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
  input: {
    height: 50,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    color: "white",
    backgroundColor: "#1e1e1e",
    marginBottom: 20,
    width: "90%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    marginVertical: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#e8aa42",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: "white",
    fontSize: 14,
  },
});
