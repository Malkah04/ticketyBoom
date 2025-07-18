import { Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the profile page</Text>
      <Text style={styles.title2}>This is the profile page</Text>
      <Text style={styles.title3}>This is the profile page</Text>

      {/* Navigate to Login */}
      <Pressable style={styles.button} onPress={() => router.push('/authPage/LogIn')}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      {/* Navigate to ticket */}
      <Pressable style={styles.button} onPress={() => router.push('../component/singleProduct')}>
        <Text style={styles.buttonText}>ticket</Text>
      </Pressable>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 22,
      color: '#fff',
      marginBottom: 30,
    },
    title2: {
      fontSize: 22,
      color: '#e8aa42',
      marginBottom: 30,
    },
    title3: {
      fontSize: 22,
      color: '#ffe5b4',
      marginBottom: 30,
    },
    button: {
      backgroundColor: '#26a69a',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  