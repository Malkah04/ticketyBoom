import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import DashedLine from "react-native-dashed-line";
import LoadingScreen from "../pages/LoadingScreen";
import img1 from "../../assets/images/img.jpg";

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
  images: string[];
  oragnizer: {
    _id: string;
  };
  sold: number;
};

const Ticket = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Ticket | null>(null);
  const [press, setPress] = useState(false);
  const { id } = useLocalSearchParams();

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://192.168.1.6:8000/api/tickets/${id}`);
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const getImage = () => {
    if (item?.images?.length) {
      for (let i = 0; i < item.images.length; i++) {
        if (item.images[i]) return item.images[i];
      }
    }
    return "";
  };

  if (loading || !item) return <LoadingScreen />;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#e8aa42"
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>Ticket</Text>
      </View>

      {/* Ticket Card */}
      <View style={styles.ticketCard}>
        <View style={styles.eventImageContainer}>
          <Pressable
            onPress={() => setPress(!press)}
            style={{ alignSelf: "flex-end", padding: 5 }}
          >
            <FontAwesome
              name={press ? "heart" : "heart-o"}
              size={27}
              color="#FF00A8"
            />
          </Pressable>

          <Image
            source={getImage() ? { uri: getImage() } : img1}
            style={styles.eventImage}
          />

          <Text style={styles.eventTitle}>{item.title}</Text>
        </View>

        <DashedLine
          dashLength={9}
          dashThickness={2}
          dashGap={6}
          dashColor={"gray"}
        />

        <View style={styles.containerLoc}>
          <FontAwesome5 name="theater-masks" size={24} color="#e8aa42" />
          <Text style={styles.textLoc}>{item.category}</Text>
        </View>

        <View style={styles.circleLeft2} />
        <View style={styles.circleRight2} />

        {/* Ticket Info */}
        <View style={styles.ticketInfo}>
          <View>
            <Text style={styles.label}>Location</Text>
            <Ionicons name="location" size={19} color="#e8aa42" />
            <Text style={styles.value}>{item.location}</Text>
          </View>

          <View>
            <Text style={styles.label}>Seat</Text>
            <Text style={styles.value}>No Seat</Text>
          </View>

          <View>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{item.time}</Text>
            <Text style={styles.value}>Date: {item.date.split("T")[0]}</Text>
          </View>

          <View>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>

      {/* Buy Ticket Button */}
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>
          Buy Ticket - {item.price ? `${item.price}$` : "Price not available"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Ticket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 15,
    backgroundColor: "#121212",
  },
  headerTitle: {
    color: "#e8aa42",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  ticketCard: {
    margin: 20,
    backgroundColor: "#1f1f1f",
    borderRadius: 20,
    overflow: "hidden",
    paddingBottom: 20,
    position: "relative",
  },
  circleLeft2: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#121212",
    left: -20,
    top: "41%",
    marginTop: -20,
    zIndex: 10,
  },
  circleRight2: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#121212",
    right: -20,
    top: "41%",
    marginTop: -20,
    zIndex: 10,
  },
  eventImageContainer: {
    padding: 10,
  },
  eventImage: {
    width: "100%",
    height: 180,
    borderRadius: 20,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e8aa42",
    marginTop: 15,
  },
  containerLoc: {
    alignItems: "center",
    marginVertical: 10,
  },
  textLoc: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  ticketInfo: {
    paddingHorizontal: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    color: "#e8aa42",
    marginTop: 10,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  downloadButton: {
    backgroundColor: "#e8aa42",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  downloadText: {
    color: "#121212",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
