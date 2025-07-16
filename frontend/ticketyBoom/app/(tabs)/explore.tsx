import { ActivityIndicator ,Dimensions, FlatList, ScrollView, Text ,View  ,Image ,StyleSheet ,Pressable, SafeAreaView} from "react-native";
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
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 40) / 2;

export default function Explore(){
    const [lifeStyle , setLifeStyle] = useState<Ticket[]>([]);
    const [movie ,setMovie] =useState<Ticket[]>([]);
    const [comedy ,setComedy] =useState<Ticket[]>([]);
    const [sport ,setSport] =useState<Ticket[]>([]);
    const [music ,setMusic] =useState<Ticket[]>([]);
    const [art ,setArt] =useState<Ticket[]>([]);
    const [concert ,setconcert] =useState<Ticket[]>([]);
    const [theater ,setTheater] =useState<Ticket[]>([]);
    const [loading , setLoading] = useState<boolean>(true);
    const [press ,setPress] =useState(false);
    const getTickets= async (c:string)=>{
        try{
            const response = await fetch(`http://192.168.1.3:8000/api/tickets/category/${c}`);
            const data = await response.json();
            switch(c){
                case 'art' :
                    setArt(data)
                    break;
                case 'theater' :
                    setTheater(data)
                    break;
                case 'movie' :
                    setMovie(data)
                    break;
                case 'sport' :
                    setSport(data)
                    break; 
                case 'concert' :
                    setconcert(data)
                    break;
                case 'comedy' :
                    setComedy(data)
                    break; 
                case 'lifeStyle' :
                    setLifeStyle(data)
                    break;              
            }
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
        getTickets("lifeStyle");
        getTickets("comedy");
        getTickets("concert");
        getTickets("sport");
        getTickets("movie");
        getTickets("theater");
        getTickets("art");

    },[])

    const render =(item :Ticket)=>{
        return(
            <View style={[styles.cont, { width: cardWidth }]}>
            <Pressable onPress={() => {sendId(item._id)}}>
            <View style={styles.card}>
                <View style={styles.heart}>
                    <Pressable onPress={() => {}}> 
                        <FontAwesome name={press ? "heart" : "heart-o"} size={20} color="red" />
                    </Pressable>
                </View>
                {item.images.length > 0 && item.images[0]!=='' && (
                    <Image
                        source={{ uri: item.images[0] }}
                        style={styles.image}
                    />
                )}
                <Text style={styles.text} numberOfLines={1}>{item.title}</Text>
                <View style={styles.priceCont}>
                    <Text style={styles.price}>{item.price + "$"}</Text>
                </View>
            </View>
        </Pressable>
        </View>
        )
    }

    const sections = [
        { title: "Art", data: art },
        { title: "Concert", data: concert },
        { title: "Comedy", data: comedy },
        { title: "Movies", data: movie },
        { title: "Sport", data: sport },
        { title: "Theater", data: theater },
        { title: "Lifestyle", data: lifeStyle },
    ];

return(
    <>
        {loading?(
            <ActivityIndicator/>
        ):(

        <ScrollView contentContainerStyle={{ padding: 10 }} showsVerticalScrollIndicator={false}>
        {sections.map((section) => ( 
            <View key={section.title} style={{ marginBottom: 30 }}>
            <Text style={{fontWeight:"bold" ,fontSize:20 ,marginBottom:5}} >{section.title}</Text>
            <FlatList
            data={section.data}
            keyExtractor={(item) => item._id}
            numColumns={2}
            scrollEnabled={false} 
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
            renderItem={({ item }) => render(item)}
            />
            </View>
            
        ))}
        </ScrollView>
        )}
    </>
)
}

const styles = StyleSheet.create({
    cont: {
        marginHorizontal: 5, 
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 10,
        elevation: 2,
    },
    heart: {
        alignSelf: "flex-end",
        marginBottom: 5,
    },
    image: {
        width: "100%",
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
        alignItems:"center",
        alignSelf:"center"
    },
    priceCont: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf:"center"
    },
    locationContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 5,
    },
    locationText: {
        fontWeight: "bold",
        marginLeft: 5,
        flexShrink: 1,
    },
    price: {
        color: "red",
        fontWeight: "bold",
    },
});
