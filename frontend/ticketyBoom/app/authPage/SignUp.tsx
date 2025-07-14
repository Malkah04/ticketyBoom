import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { useRouter } from "expo-router";
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
const navigation = useRouter();

const SignUp = () => {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSignUp = () => {
    return 0;
  }
  
  return (
    <View style={styles.container}>
      {/* <Image source={logo} style={styles.logo} /> */}

      <Text style={styles.title}>Sign up a new account</Text>

      <Text style={styles.label}>User name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Re-Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.logInText}>
        Already have an account?
        <Text style={styles.logInLink} onPress={() => navigation.push('./LogIn')}> Login</Text>
      </Text>
    </View>
  );
};

export default SignUp;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#121212',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ddd',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  signUpButton: {
    backgroundColor: '#26a69a',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 16,
  },
  signUpText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  logInText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#ccc',
  },
  logInLink: {
    fontSize: 15,
    color: '#80cbc4',
    fontWeight: '600',
  },
});
