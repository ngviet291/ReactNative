import React, { useState } from "react";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { authService } from "../services/authService";
import { saveAuth } from "../stores/auth";
import { validateEmail, validatePassword } from "../utils/validate";

const RegisterScreen = ({ onLogin, navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);
    setMessage("");
    if (eErr || pErr) return;

    try {
      setLoading(true);
      const result = await authService.register(email.trim(), password);
      await saveAuth(result.token, result.user);
      onLogin(result.user); 
    } catch (error: any) {
      setMessage(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(t) => {
          setEmail(t);
          if (emailError) setEmailError(validateEmail(t));
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      {!!emailError && <Text style={styles.error}>{emailError}</Text>}

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(t) => {
          setPassword(t);
          if (passwordError) setPasswordError(validatePassword(t));
        }}
        secureTextEntry
        style={styles.input}
      />
      {!!passwordError && <Text style={styles.error}>{passwordError}</Text>}

      {!!message && <Text style={styles.error}>{message}</Text>}

      <Button title={loading ? "Loading..." : "Register"} onPress={handleRegister} disabled={loading} />
      <Pressable style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 26, marginBottom: 20, marginTop: 15 },
  input: { borderWidth: 1, padding: 10, marginTop: 10 },
  error: { color: "red", marginTop: 5 },
  button: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
    buttonText: {
    color: 'white',
    fontSize: 16,
    },
});

export default RegisterScreen;