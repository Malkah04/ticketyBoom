import { ActivityIndicator, FlatList, Text ,View  ,Image ,StyleSheet} from "react-native";
import { useEffect, useState } from "react";

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

export default function Profile(){
    const [tickets , setTickets] = useState<tickets[]>([]);
    const [loading , setLoading] = useState<boolean>(true);
    const getTickets= async ()=>{
        try{
            const response = await fetch('http://localhost:8000/api/tickets/');
            const data = await response.json();
            setTickets(data);
            setLoading(false);
        }catch(error){
            console.error("Error fetching tickets:", error);
        }finally {
            setLoading(false);
        }
        
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
                        <View style={styles.card}>
                            {item.images.length > 0 && item.images[0] !== '' && (
                                <Image
                                    source={{ uri: item.images[0]}}
                                    style={styles.image}
                                />
                            )}
                            <Text style={styles.text}>{item.title}</Text>
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
    color:"#260432",
    marginLeft: 10,
  },
  card:{
   padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginHorizontal: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
    height: 320,
    alignItems: "center",
    
  }
})
