import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PageNotFound() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.t404}>404</Text>
      <Text style={styles.title}>Page Not Found</Text>
     
      {/* <MaterialCommunityIcons name="alert-circle" size={30} color="red" /> */}
      
       <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
              <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#121212',
    
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e8aa42',
  },
  t404: {
    fontSize: 200,
    fontWeight: 'bold',
    color: '#e8aa42',
  },

  alert: {
    fontSize: 100,
    color: '#e8aa42',
  },
  button: {
    backgroundColor: '#e8aa42',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
