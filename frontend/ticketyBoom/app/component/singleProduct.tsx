import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FontAwesome ,FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, ActivityIndicator, StyleSheet, Pressable, ScrollView ,Dimensions, SafeAreaView} from "react-native";
const screenHeight = Dimensions.get('window').height;
import { router } from "expo-router";


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
  const [press ,setPress] =useState(false);
  const [visable ,setVisable] =useState(false);
  const id = searchParams?.id;

  const fetchItem = async () => {
    try {
      const response = await fetch(`http://192.168.1.6:8000/api/tickets/${id}`);
      const data = await response.json();
      setItem(data); 
      // setLoading(false)
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  };

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

  // const addToFav=async ()=>{
  //   router.push({
  //     pathname:"../(tabs)/Favourite" ,
  //     params :{
  //       userId : "",
  //       itemId : "",

  //     }
  //   })
  // }

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.container}>
          <SafeAreaView>
            <View style={{flex:1, flexDirection:"row" ,justifyContent:"flex-end" ,marginBottom:5}}>
            </View>
            <View>
          {getImage() ? (
            <Image
              source={{ uri: getImage() }}
              style={{
                width: "100%",
                height: !visable ? screenHeight-screenHeight/7 : 400,
              }}
              resizeMode="cover"
            />
          ) : (
            <Text>No image available</Text>
          )}
          
          <View style={{justifyContent:"center" ,alignItems:"center"}}>
          <Pressable onPress={()=>{setVisable(!visable)}}>
            <Ionicons name={!visable?"chevron-up" :"chevron-down"} size={24} color="black" />
          </Pressable>
          </View>

          {visable && (
            <View style={{padding:10 }} >

          <View style={styles.titleCont} >
             <Text style={styles.title}>{item?.title}</Text>
            <Pressable onPress={()=>{setPress(!press)}} > <FontAwesome name= {press? "heart" : "heart-o" }size={27} color="red" /> </Pressable>
          </View>    
         
          <View style={styles.containerLoc}>
            <FontAwesome5 name ="theater-masks"/>
            <Text style={styles.textLoc}>{item?.category}</Text>
           </View>
           <View style={styles.containerLoc}> <Ionicons name="location" size={19} color="blue" />
          <Text style={styles.textLoc}>Location: {item?.location}</Text>
           </View> 

           <View style={styles.containerLoc} >
            <Ionicons name="time-outline" size={20} color="black" />
           <Text style={styles.textLoc}>{item?.time}</Text>
           </View>
        
           <Text>Date: {item?.date.split("T")[0]}</Text>
           <View> <Text style={{fontSize:20 ,marginBottom:5}} >Description </Text>
          <Text style={styles.text} >{item?.description}</Text>
            </View>

          </View>
          )}
  
          </View>
          </SafeAreaView>
        </ScrollView>
      )}
      <View>
        <View style={{ marginBottom:50 }}>
          <Pressable> <View  style={styles.btn } ><Text style={styles.btnText}>Buy Ticket - {item?.price + "$"}</Text></View> </Pressable>
          </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    height:"auto"
    
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 0,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom:5,
  },
  text:{
    fontSize:18,
    marginBottom:5,

  },
  btn:{
    width :"90%",
    backgroundColor:"black",
    height:50,
    justifyContent: "center", 
    alignItems: "center", 
    alignSelf:"flex-end",
    marginRight:20
  },
  btnText:{
    alignSelf:"center" ,
    color:"white",
    
  },
  price:{
    color :"red" ,
    fontWeight:"bold" ,
    fontSize:20,
    marginLeft:20

  },
  containerLoc:{
    flex:1 ,
    flexDirection:"row" ,
    alignItems:"center" ,
    marginBottom:5 
  },
  textLoc:{
    justifyContent:"center" ,
    alignItems:"center",
    paddingLeft:5 
  },
  titleCont:{
    flex:1 ,
    flexDirection:"row" ,
    alignItems:"center" ,
    marginBottom:5 ,
    justifyContent:"space-between",
    marginRight:20
  }
});
