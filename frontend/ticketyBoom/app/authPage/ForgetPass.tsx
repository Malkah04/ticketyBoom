import React from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
const ForgetPass = () => {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
    <Text style={styles.header}>Forgot Password</Text>

    <Text style={styles.label}>Enter your email</Text>
    <TextInput
      style={styles.input}
      placeholder="Email address"
      placeholderTextColor="#888"
      keyboardType="email-address"
      value={email}
      onChangeText={(text) => setEmail(text)}
    />


    <Pressable style={styles.resetButton} onPress={() => Alert.alert('Password Reset Link Sent!')}>
      <Text style={styles.resetButtonText}>Send Reset Link</Text>
    </Pressable>
  </View>
  )
}

export default ForgetPass


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
    color: '#e8aa42',
    marginBottom: 30,
    alignContent: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e8aa42',
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
  resetButton: {
    backgroundColor: '#26a69a',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 20,
  },
  resetButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
});
