import { ActivityIndicator, FlatList, Text ,View  ,Image ,StyleSheet ,Pressable} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from '@expo/vector-icons';


type Ticket ={
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

export default function Explore(){
    const [tickets , setTickets] = useState<Ticket[]>([]);
    const [loading , setLoading] = useState<boolean>(true);
    const [press ,setPress] =useState(false);
    const getTickets= async ()=>{
        try{
            const response = await fetch('http://192.168.1.6:8000/api/tickets/');
            const data = await response.json();
            setTickets(data);
            setLoading(false);
        }catch(error){
            console.error("Error fetching tickets:", error);
        }finally {
            setLoading(false);
        }
        
    }
    const sendId=(id :string)=>{
        router.push({pathname:"../component/singleProduct",
            params:{
                id :id
            }
        })
    }
    useEffect(()=>{
        getTickets();
    },[])
    useEffect(() => {
  console.log("Tickets:", tickets);
}, [tickets]);

    return(
        <>
        {/* search here  */}
            {loading?(
                <ActivityIndicator/>
            ):(
                <FlatList
                showsVerticalScrollIndicator={false}
                data={tickets}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                    if (item.status !== 'inComplete') return null;
                    return (
                        <View style={{paddingTop:50}}>
                        <Pressable onPress={()=>{sendId(item._id)}} >
                            <View style={styles.card}>
                                 <View style={{ alignSelf:"flex-end" ,marginBottom:5 ,marginRight:20}}>
                                    <Pressable onPress={()=>{}} > 
                                        <Text>
                                        <FontAwesome name= {press? "heart" : "heart-o" }size={20} color="red" />
                                        </Text>
                                         </Pressable>
                                </View>
                            {item.images.length > 0 && item.images[0] !== '' && (
                                <Image
                                    source={{ uri: item.images[0]}}
                                    style={styles.image}
                                />
                            )}
                            <Text style={styles.text}>{item.title}</Text>
                            <View style={styles.container}>
                                <View style={{flex:1 ,flexDirection:"row" ,paddingTop:20 ,justifyContent:"space-between" }}>
                                    <View  style={{flex:1 ,flexDirection:"row"}}>
                                        <Text>
                                            <Ionicons name="location" size={18} color="black" />
                                        </Text>
                                <Text style={{fontWeight:"bold"}}>{item.location}</Text>
                                    </View>
                                <Text style={styles.price}>{item.price + "$"}</Text>
                                </View>
                            </View>
                        </View>
                        </Pressable>
                        </View>
                    );
                }}
                />
            )}
        </>
    )
}
const styles =StyleSheet.create ({
  image:{
    width: "96%",
    alignSelf:"center",
    height: 250,
    borderRadius: 10 ,
    marginBottom: 15
  },
  text:{
    fontSize: 18,
    fontWeight: 'bold' ,
    color:"black",
    marginLeft: 10,
  },
  card:{
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "90%",
    height: 390,
    alignItems: "center",
    marginBottom:-25,
    alignSelf:"center",
    padding:10

    
  },
  container :{
    flex:1 ,
    flexDirection:"row" ,
    justifyContent:"space-between" ,
    width:"90%" 
  },
    price:{
    color :"red" ,
    fontWeight:"bold" ,
    marginLeft:20
  },
})
