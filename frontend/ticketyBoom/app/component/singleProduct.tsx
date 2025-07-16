import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, ActivityIndicator, StyleSheet, Pressable, ScrollView, Dimensions, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

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

export const screenOptions = {
  headerShown: false,
};

export default function SingleProduct() {
  const searchParams = useLocalSearchParams();
  const [item, setItem] = useState<Ticket | null>(null); 
  const [loading, setLoading] = useState(true);
  const [press, setPress] = useState(false);
  const [visible, setVisible] = useState(false);
  const id = searchParams?.id;
  const router =useRouter();

  const fetchItem = async () => {
    try {
      const response = await fetch(`http://192.168.1.6:8000/api/tickets/${id}`);
      const data = await response.json();
      setItem(data); 
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchItem();
  }, []);

  const getImage = () => {
    if (item?.images?.length) {
      for (let i = 0; i < item.images.length; i++) {
        if (item.images[i]) return item.images[i];
      }
    }
    return ""; 
  };



  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <ScrollView style={styles.container}>
            <SafeAreaView>
              <View>
                {getImage() ? (
                  <Image
                    source={{ uri: getImage() }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ) : (
                  <Text>No image available</Text>
                )}
                
                
                  <View style={{padding: 10}}>
                    <View style={styles.titleCont}>
                      <Text style={styles.title}>{item?.title || "No title"}</Text>
                      <Pressable onPress={() => setPress(!press)}> 
                        <FontAwesome 
                          name={press ? "heart" : "heart-o"} 
                          size={27} 
                          color="red" 
                        /> 
                      </Pressable>
                    </View>    
                    
                    <View style={styles.containerLoc}>
                      <FontAwesome5 name="theater-masks" size={20} color="black" />
                      <Text style={styles.textLoc}>{item?.category || "No category"}</Text>
                    </View>
                    
                    <View style={styles.containerLoc}>
                      <Ionicons name="location" size={19} color="red" />
                      <Text style={styles.textLoc}>Location: {item?.location || "No location"}</Text>
                    </View> 

                    <View style={styles.containerLoc}>
                      <Ionicons name="time-outline" size={20} color="black" />
                      <Text style={styles.textLoc}>{item?.time || "No time"}</Text>
                    </View>
                  
                    <Text>Date: {item?.date?.split("T")[0] || "No date"}</Text>
                    
                    <View>
                      <Text style={{fontSize:20, marginBottom:5}}>Description</Text>
                      <Text style={styles.text}>{item?.description || "No description"}</Text>
                    </View>
                  </View>
              </View>
            </SafeAreaView>
          </ScrollView>
          
          <View style={{ marginBottom: 50 }}>
            <Pressable>
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  Buy Ticket - {item?.price ? `${item.price}$` : "Price not available"}
                </Text>
              </View>
            </Pressable>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto"
  },
  image: {
    width: "90%",
    height: 400,
    justifyContent:"center",
    alignSelf:"center",
    marginTop:40
},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  btn: {
    width: "90%",
    backgroundColor: "red",
    height: 50,
    justifyContent: "center", 
    alignItems: "center", 
    alignSelf: "flex-end",
    marginRight: 20
  },
  btnText: {
    color: "white",
  },
  price: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20
  },
  containerLoc: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5 
  },
  textLoc: {
    paddingLeft: 5 
  },
  titleCont: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "space-between",
    marginRight: 20
  }
})