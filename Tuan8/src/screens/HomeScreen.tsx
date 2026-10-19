import React, { useEffect, useState } from 'react';
import { clearAuth } from '../stores/auth';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ user, onLogout, navigation }: any) => {
    const [books, setBooks] = useState<any[]>([]);
    useEffect(() => {
        axios
            .get("https://6acc3473ef37b15040785e03.mockapi.io/books")
            .then((res) => setBooks(res.data));
    }, []);
    const handleLogout = async () => {
        await clearAuth();
        onLogout();
    };

    return (
        <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome, {user?.email ?? "Guest"}!</Text>
            {books.map((b) => (
                <Pressable key={b.id} style={styles.buttonBook} onPress={() => navigation.navigate("BookDetail", b)}>
                    <Text style={styles.buttonTextBook}>{b.title}</Text>
                </Pressable>
            ))}
            <Pressable style={styles.button} onPress={() => navigation.navigate("Checkout")}>
                <Text style={styles.buttonText}>Checkout</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
    },
    button: {
        marginTop: 10,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    buttonBook: {
        marginTop: 10,
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
    },
    buttonTextBook: {
        color: 'black',
        fontSize: 16,
    },
});

export default HomeScreen;