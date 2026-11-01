
import React, { useState } from 'react';
import { saveAuth } from '../stores/auth';
import { authService } from '../services/authService';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { validateEmail, validatePassword } from '../utils/validate';

const LoginScreen = ({ navigation, onLogin }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
  const eErr = validateEmail(email);
  const pErr = validatePassword(password);
  setEmailError(eErr);
  setPasswordError(pErr);
  setMessage("");
  if (eErr || pErr) return;

  try {
    const response = await authService.login(email.trim(), password);
    await saveAuth(response.token, response.user);
    onLogin(response.user);
  } catch (error: any) {
    setMessage(error.message || "Login failed");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      {!!emailError && (
        <Text style={styles.error}>{emailError}</Text>
      )}

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {!!passwordError && (
        <Text style={styles.error}>{passwordError}</Text>
      )}

      {!!message && (
        <Text style={styles.message}>{message}</Text>
      )}

      <Button title="Login" onPress={handleLogin} />

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Don't have an account? Register</Text>
      </Pressable>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  message: {
    color: 'green',
    marginVertical: 10,
  },
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

export default LoginScreen;
