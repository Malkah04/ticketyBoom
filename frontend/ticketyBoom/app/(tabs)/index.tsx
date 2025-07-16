import { FlatList, Text, View ,Image ,StyleSheet, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

type tickets ={
    _id : string;
    title : string;
    description : string;
    category : string;
    price : number;
    date : string;
    time : string;
    numOfTickets : number;
    location : string;
    status : string;
    images : [string];
    oragnizer : {
        _id : string;
    },
    sold : number;

}

export default function Index() {
  const [tickets, setTickets] = useState<tickets[]>([]);
  const limit = 10;
   const router = useRouter();
  
  const findTicketByCategory = async () => {
    try {
      const response =await fetch(`http://192.168.1.3:8000/api/tickets/latest/${limit}`);
      const data = await response.json();
     setTickets(data);
      }
    catch (error) {
      console.error("Error fetching tickets by category:", error);
    }

  }
 useEffect(() => {
  findTicketByCategory();
}, []);


  return (
    <>
    <View style={styles.container}>
  <Text style={styles.heading}>Welcome to TicketyBoom!</Text>
  <Text style={styles.subheading}>Your go-to app for booking tickets to the hottest events in town.</Text>
  <Text style={styles.subheading}>🎭 Comedy, 🎶 Music, 🎥 Movies, 🎨 Art, and more — all in one place.</Text>
  <Text style={styles.subheading}>Create, explore, and enjoy events effortlessly.</Text>
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
      <Pressable onPress={() => {router.push('../pages/explore')}}>
        <View style={styles.card}>
        <Text style={styles.seeMoreText}>See More Tickets</Text>
        </View>
      </Pressable>
    )}
    renderItem={({ item }) => (
      <View style={styles.card}>
        {item.images.length > 0 && item.images[0] !== '' && (
          <Image
            source={{ uri: item.images[0] }}
            style={styles.image}
          />
        )}
        <Text style={styles.ticketTitle}>{item.title}</Text>
      </View>
    )}
  />
</View>

  </>
  );
}const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#4B0082", 
  },
  subheading: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#333",
  },
  categoryTitle: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#000",
    marginLeft: 10,
    marginBottom: 10,

  },
  card: {
    padding: 10,
    // backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginHorizontal: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    width: 200,
    height: 240,
    alignItems: "center",

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
    color: "#333",
    textAlign: "center",
  },
  seeMoreText: {
    color: "black",
    fontSize: 16,
    padding: 10,
    marginTop: 100,
    textAlign: "center",
    textDecorationLine:"underline",
    opacity:0.7,
  }
    
});
