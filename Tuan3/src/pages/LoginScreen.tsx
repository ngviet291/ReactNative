import React, { useReducer } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
type FormState = {
  email: string;
  password: string;
  error: string;
  isSubmitting?: boolean;
};
const initialState: FormState = {
  email: "",
  password: "",
  error: "",
  isSubmitting: false,
};
type FormAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "RESET" };

const LoginScreen = () => {
  function formReducer(state: FormState, action: FormAction) {
    switch (action.type) {
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
      case "SET_ERROR":
        return { ...state, error: action.payload };
      case "SET_SUBMITTING":
        return { ...state, isSubmitting: action.payload };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(formReducer, initialState);
  const handleLogin = () => {
    if (!state.email || !state.password) {
      dispatch({
        type: "SET_ERROR",
        payload: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }
    if (!state.email.includes("@")) {
      dispatch({
        type: "SET_ERROR",
        payload: "Email phải chứa ký tự @",
      });
      return;
    }
    if (state.password.length < 6) {
      dispatch({
        type: "SET_ERROR",
        payload: "Mật khẩu phải có ít nhất 6 ký tự",
      });
      return;
    }
    dispatch({ type: "SET_SUBMITTING", payload: true });
    setTimeout(() => {
      dispatch({
        type: "SET_SUBMITTING",
        payload: false,
      });

      dispatch({
        type: "SET_ERROR",
        payload: "",
      });
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={state.email}
        onChangeText={(text) => dispatch({ type: "SET_EMAIL", payload: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={state.password}
        onChangeText={(text) =>
          dispatch({ type: "SET_PASSWORD", payload: text })
        }
        secureTextEntry
        style={styles.input}
      />
      {state.error ? <Text style={styles.error}>{state.error}</Text> : null}
      <Pressable
        style={styles.button}
        onPress={handleLogin}
        disabled={state.isSubmitting}
      >
        <Text>{state.isSubmitting ? "Logging in..." : "Login"}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => dispatch({ type: "RESET" })}
      >
        <Text>Reset</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },

  error: {
    color: "red",
    marginBottom: 5,
  },

  button: {
    width: 120,
    padding: 10,
    backgroundColor: "#2196F3",
    alignSelf: "center",
    borderRadius: 5,
  },
});
export default LoginScreen;
