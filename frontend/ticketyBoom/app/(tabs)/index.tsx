import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import ExploreSection from "../ExploreSection";

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

export default function Index() {
  const [tickets, setTickets] = useState<tickets[]>([]);
  const limit = 10;
  const router = useRouter();

  const findTicketByCategory = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.6:8000/api/tickets/latest/${limit}`
      );
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets by category:", error);
    }
  };

  useEffect(() => {
    findTicketByCategory();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ padding: 5, backgroundColor: "#121212" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to TicketyBoom!</Text>
        <Text style={styles.subheading}>
          Your go-to app for booking tickets to the hottest events in town.
        </Text>
        <Text style={styles.subheading}>
          🎭 Comedy, 🎶 Music, 🎥 Movies, 🎨 Art, and more — all in one place.
        </Text>
        <Text style={styles.subheading}>
          Create, explore, and enjoy events effortlessly.
        </Text>
        <Text style={styles.subheading}>Get your ticket in a boom!</Text>
      </View>

      <View>
        <Text style={styles.categoryTitle}>Newest Tickets</Text>
        <FlatList
          data={tickets}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          ListFooterComponent={() => (
            <Pressable onPress={() => router.push("../pages/explore")}>
              <View style={styles.card}>
                <Text style={styles.seeMoreText}>See More Tickets</Text>
              </View>
            </Pressable>
          )}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/ticket/${item._id}`)}>
              <View style={styles.card}>
                {item.images.length > 0 && item.images[0] !== "" && (
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.image}
                  />
                )}
                <Text style={styles.ticketTitle}>{item.title}</Text>
              </View>
            </Pressable>
          )}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <ExploreSection />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#121212",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#e8aa42",
  },
  subheading: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#e8aa42",
  },
  categoryTitle: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#e8aa42",
    marginLeft: 10,
    marginBottom: 10,
  },
  card: {
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 10,
    borderColor: "#333",
    borderWidth: 1,
    width: 200,
    height: 240,
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    elevation: 3,
  },
  image: {
    width: 180,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e8aa42",
    textAlign: "center",
  },
  seeMoreText: {
    color: "#e8aa42",
    fontSize: 16,
    padding: 10,
    marginTop: 100,
    textAlign: "center",
    textDecorationLine: "underline",
    opacity: 0.7,
  },
});
