import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

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

export default function Search() {
  const [ticket, setTicket] = useState<tickets[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const search = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.6:8000/api/tickets/search/${searchTerm}`
      );
      const data = await response.json();
      setTicket(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  const sendId = (id: string) => {
    router.push(`/ticket/${id}`);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TextInput
          style={styles.input}
          placeholder="Search by title,category or location.."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={search}
          multiline={false}
        />
      </View>
      <FlatList
        data={ticket}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => sendId(item._id)}>
            <View style={styles.card}>
              <Text
                style={{
                  color: "#26a69a",
                  marginBottom: 10,
                  alignSelf: "flex-start",
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                {item.category}
              </Text>
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
