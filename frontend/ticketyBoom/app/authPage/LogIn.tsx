import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { View, Text, TextInput, Pressable, Image, StyleSheet } from "react-native";
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';

const navigation = useRouter();

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <View style={styles.container}>
      {/* <Image source={logo} style={styles.logo} /> */}
      <Text style={styles.header}>Login to your account</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Forgot Password */}
      <Pressable onPress={() => navigation.push('./ForgetPass')}>
        <Text style={styles.forgotPassword}>Forgot Password ?</Text>
      </Pressable>

      {/* Login Button */}
      <Pressable style={styles.signInButton} onPress={() => { /* handleLogin(); */ }}>
        <Text style={styles.signInText}>Login</Text>
      </Pressable>

      {/* Sign up link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.push('./SignUp')}>
          <Text style={styles.signupLink}> Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#121212', 
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#dddddd',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 14,
    color: '#80cbc4',
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#26a69a',
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 16,
  },
  signInText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  signupText: {
    fontSize: 15,
    color: '#ccc',
  },
  signupLink: {
    fontSize: 15,
    color: '#80cbc4',
    fontWeight: '600',
    marginLeft: 4,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 50,
  },
});
