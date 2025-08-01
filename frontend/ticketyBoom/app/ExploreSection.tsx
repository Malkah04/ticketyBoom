import { Dimensions, FlatList, ScrollView, Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import LoadingScreen from "./pages/LoadingScreen"; 

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
  },
  sold: number;
};

const cardWidth = 200; // حجم الكارد المناسب في العرض

export default function ExploreSection() {
  const [lifeStyle, setLifeStyle] = useState<Ticket[]>([]);
  const [movie, setMovie] = useState<Ticket[]>([]);
  const [comedy, setComedy] = useState<Ticket[]>([]);
  const [sport, setSport] = useState<Ticket[]>([]);
  const [music, setMusic] = useState<Ticket[]>([]);
  const [art, setArt] = useState<Ticket[]>([]);
  const [concert, setConcert] = useState<Ticket[]>([]);
  const [theater, setTheater] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [press, setPress] = useState(false);

  const getTickets = async (c: string) => {
    try {
      const response = await fetch(`http://192.168.1.3:8000/api/tickets/category/${c}`);
      const data = await response.json();
      switch (c) {
        case 'art': setArt(data); break;
        case 'theater': setTheater(data); break;
        case 'movie': setMovie(data); break;
        case 'sport': setSport(data); break;
        case 'concert': setConcert(data); break;
        case 'comedy': setComedy(data); break;
        case 'lifeStyle': setLifeStyle(data); break;
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendId = (id: string) => {
    router.push(`/ticket/${id}`);
  };

  useEffect(() => {
    getTickets("lifeStyle");
    getTickets("comedy");
    getTickets("concert");
    getTickets("sport");
    getTickets("movie");
    getTickets("theater");
    getTickets("art");
  }, []);

  const render = (item: Ticket) => (
    <Pressable onPress={() => sendId(item._id)} style={{ marginRight: 12 }}>
      <View style={[styles.card, { width: cardWidth }]}>
        <View style={styles.heart}>
          <Pressable onPress={() => setPress(!press)}>
            <FontAwesome name={press ? "heart" : "heart-o"} size={20} color="#FF00A8" />
          </Pressable>
        </View>
        {item.images.length > 0 && item.images[0] !== '' && (
          <Image source={{ uri: item.images[0] }} style={styles.image} />
        )}
        <Text style={styles.text} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>{item.price + "$"}</Text>
      </View>
    </Pressable>
  );

  const sections = [
    { title: "Art", data: art },
    { title: "Concert", data: concert },
    { title: "Comedy", data: comedy },
    { title: "Movies", data: movie },
    { title: "Sport", data: sport },
    { title: "Theater", data: theater },
    { title: "Lifestyle", data: lifeStyle },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
      {sections.map((section) => (
        <View key={section.title} style={{ marginBottom: 30 }}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <FlatList
            data={section.data}
            keyExtractor={(item) => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => render(item)}
            contentContainerStyle={{ paddingLeft: 10 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#e8aa42',
    marginBottom: 10,
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
  },
  heart: {
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#e8aa42",
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    color: "#FF00A8",
    fontWeight: "bold",
    textAlign: 'center',
  },
});
