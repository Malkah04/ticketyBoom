import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const SignUp = () => {
  const navigation = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errMatch, setErrMatch] = useState("");
  const [err, setErr] = useState("");
  const handleSignUp = async () => {
    setErr("");
    setErrMatch("");
    setErrPassword("");
    if (password !== confirmPassword) {
      setErrMatch("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        "http://192.168.1.6:8000/api/auth/register",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      setErrMatch("");
      if (response.ok) {
        navigation.push({
          pathname: "../(drawer)/(tabs)/profile",
          params: { id: data._id },
        });
        return data;
      } else if (data.message === "password not vaild") {
        setErrPassword(
          "Password must contain an uppercase letter and a special character"
        );
      } else {
        setErr("invalid email, u may have an account ,try to login");
      }
    } catch (err) {}
  };
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
      {errPassword && (
        <Text style={{ color: "#26a69a", marginTop: 10 }}> {errPassword} </Text>
      )}

      <Text style={styles.label}>Re-Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errMatch && (
        <Text style={{ color: "#26a69a", marginTop: 10 }}> {errMatch} </Text>
      )}

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign up</Text>
      </TouchableOpacity>
      {err && <Text style={{ color: "#fff", marginBottom: 10 }}> {err} </Text>}

      <Text style={styles.logInText}>
        Already have an account?
        <Text
          style={styles.logInLink}
          onPress={() => navigation.push("./LogIn")}
        >
          {" "}
          Login
        </Text>
      </Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#121212",
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
    fontWeight: "600",
    color: "#e8aa42",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#e8aa42",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "#444",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  signUpButton: {
    backgroundColor: "#26a69a",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 16,
  },
  signUpText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  logInText: {
    textAlign: "center",
    fontSize: 15,
    color: "#e8aa42",
  },
  logInLink: {
    fontSize: 15,
    color: "#80cbc4",
    fontWeight: "600",
  },
});
