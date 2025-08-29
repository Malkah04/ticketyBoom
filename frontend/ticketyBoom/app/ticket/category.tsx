import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
type Ticket = {
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
export default function category() {
  const searchParams = useLocalSearchParams();
  const category_name = searchParams?.category_name;
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const router = useRouter();

  const get_items = async (c: string) => {
    try {
      const response = await fetch(
        `http://192.168.1.6:8000/api/tickets/category/${c}`
      );
      const data = await response.json();
      if (data) {
        setTicket(data);
      }
    } catch (err) {}
  };
  useEffect(() => {
    if (category_name) {
      get_items(category_name as string);
    }
  }, []);
  const sendId = (id: string) => {
    router.push(`/ticket/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#e8aa42",
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        {category_name}
      </Text>
      <FlatList
        data={ticket}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => sendId(item._id)}>
            <View style={styles.card}>
              {item.images.length > 0 && item.images[0] !== "" && (
                <Image source={{ uri: item.images[0] }} style={styles.image} />
              )}
              <Text
                style={{ color: "#e8aa42", fontWeight: "bold", fontSize: 16 }}
              >
                {item.title}
              </Text>
              <Text style={{ color: "white" }}>{item.description}</Text>
            </View>
          </Pressable>
        )}
      />
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
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 10,
    borderColor: "#333",
    borderWidth: 1,
    width: 300,
    height: 290,
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    elevation: 3,
    marginBottom: 20,
  },
  image: {
    width: 240,
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
});
