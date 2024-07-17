import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import db from '../components/Database';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

type RootStackParamList = {
  Edit: { bookId?: number };
};

type EditScreenRouteProp = RouteProp<RootStackParamList, 'Edit'>;
type EditScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Edit'>;

type Props = {
  route?: EditScreenRouteProp;
  navigation: EditScreenNavigationProp;
};

interface Book {
  id: number | null;
  title: string;
  author: string;
  rating: number;
  isRead: boolean;
  description: string;
  imageUri: string | null;
}

export default function Edit({ route, navigation }: Props) {
  const [book, setBook] = useState<Book>({
    id: null,
    title: '',
    author: '',
    rating: 0,
    isRead: false,
    description: '',
    imageUri: null,
  });

  useEffect(() => {
    if (route?.params?.bookId) {
      fetchBookDetails(route.params.bookId);
    }
  }, [route?.params?.bookId]);

  const fetchBookDetails = (bookId: number) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Books WHERE id = ?',
        [bookId],
        (_, { rows }) => {
          if (rows.length > 0) {
            setBook(rows.item(0));
          }
        },
        (_, error) => {
          console.log('Error fetching book details:', error);
          return false;
        }
      );
    });
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
      if (response.assets && response.assets.length > 0) {
        setBook({ ...book, imageUri: response.assets[0].uri });
      }
    });
  };

  const saveBook = () => {
    db.transaction((tx) => {
      if (book.id) {
        tx.executeSql(
          `UPDATE Books SET title = ?, author = ?, rating = ?, is_read = ?, description = ?, image_uri = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
          [book.title, book.author, book.rating, book.isRead ? 1 : 0, book.description, book.imageUri, book.id],
          (_, result) => {
            console.log('Book updated successfully');
            navigation.goBack();
          },
          (_, error) => {
            console.log('Error updating book:', error);
            return false;
          }
        );
      } else {
        tx.executeSql(
          `INSERT INTO Books (title, author, rating, is_read, description, image_uri) VALUES (?, ?, ?, ?, ?, ?)`,
          [book.title, book.author, book.rating, book.isRead ? 1 : 0, book.description, book.imageUri],
          (_, result) => {
            console.log('Book inserted successfully');
            navigation.goBack();
          },
          (_, error) => {
            console.log('Error inserting book:', error);
            return false;
          }
        );
      }
    });
  };

  const deleteBook = () => {
    if (book.id) {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM Books WHERE id = ?',
          [book.id],
          (_, result) => {
            console.log('Book deleted successfully');
            navigation.goBack();
          },
          (_, error) => {
            console.log('Error deleting book:', error);
            return false;
          }
        );
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>{book.id ? 'Edit Book' : 'Add New Book'}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={book.title}
        onChangeText={(text) => setBook({ ...book, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={book.author}
        onChangeText={(text) => setBook({ ...book, author: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating (0-5)"
        value={book.rating.toString()}
        onChangeText={(text) => setBook({ ...book, rating: parseInt(text) || 0 })}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setBook({ ...book, isRead: !book.isRead })}
      >
        <Text>Read: {book.isRead ? '✓' : '✗'}</Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Description"
        value={book.description}
        onChangeText={(text) => setBook({ ...book, description: text })}
        multiline
      />
      
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      
      {book.imageUri && <Image source={{ uri: book.imageUri }} style={styles.image} />}
      
      <TouchableOpacity style={styles.button} onPress={saveBook}>
        <Text style={styles.buttonText}>{book.id ? 'Update Book' : 'Add Book'}</Text>
      </TouchableOpacity>
      
      {book.id && (
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteBook}>
          <Text style={styles.buttonText}>Delete Book</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});
