import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import BookDetailScreen from "./src/screens/BookDetailScreen";
import { User } from "./src/utils/type";
import { getAuth } from "./src/stores/auth";

type Screen = "Home" | "Login" | "Register" | "Checkout" | "BookDetail";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<Screen>("Home");
  const [redirectTo, setRedirectTo] = useState<Screen | null>(null);
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    getAuth().then(({ token, user }) => {
      if (token && user) setUser(user);
    });
  }, []);

  const navigate = (name: Screen, selectedBook?: any) => {
    if (name === "Checkout" && !user) {
      setRedirectTo("Checkout");
      setScreen("Login");
      return;
    }
    if (selectedBook) setBook(selectedBook);
    setScreen(name);
  };

  const handleLogin = (u: User) => {
    setUser(u);
    setScreen(redirectTo ?? "Home");
    setRedirectTo(null);
  };

  const handleLogout = () => {
    setUser(null);
    setScreen("Home");
  };

  const navigation = { navigate };

  if (screen === "Login")
    return <LoginScreen navigation={navigation} onLogin={handleLogin} />;
  if (screen === "Register")
    return <RegisterScreen navigation={navigation} onLogin={handleLogin} />;
  if (screen === "Checkout" && user)
    return <CheckoutScreen navigation={navigation} />;
  if (screen === "BookDetail" && book)
    return (
      <View style={{ flex: 1, paddingTop: 30 ,backgroundColor: "#fff"}}>
        <Button title="Home" onPress={() => setScreen("Home")} />
        <BookDetailScreen key={book.id} book={book} user={user} navigation={navigation} />
      </View>
    );

  return <HomeScreen user={user} onLogout={handleLogout} navigation={navigation} />;
}