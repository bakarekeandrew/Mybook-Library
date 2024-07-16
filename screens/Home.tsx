import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Replace this with your actual image path
// const defaultImage = require('../assets/default-book-cover.png');

const BOOKS = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: require('../assets/facebook.png') },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', image: require('../assets/facebook.png') },
  { id: '3', title: '1984', author: 'George Orwell', image: require('../assets/facebook.png') },
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', image: require('../assets/facebook.png') },
  { id: '5', title: 'The Catcher in the Rye', author: 'J.D. Salinger', image: require('../assets/facebook.png') },
  { id: '6', title: 'Moby-Dick', author: 'Herman Melville', image: require('../assets/facebook.png') },
  // Add more books as needed
];

const BookItem = ({ title, author, image }) => (
  <TouchableOpacity style={styles.bookItem}>
    <Image 
      source={image} 
      style={styles.bookImage} 
      resizeMode="cover"
      // defaultSource={defaultImage}
    />
    <Text style={styles.bookTitle} numberOfLines={1}>{title}</Text>
    <Text style={styles.bookAuthor} numberOfLines={1}>{author}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const renderItem = ({ item }) => (
    <BookItem title={item.title} author={item.author} image={item.image} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Books</Text>
      <FlatList
        data={BOOKS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bookItem: {
    width: '30%',
    alignItems: 'center',
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});