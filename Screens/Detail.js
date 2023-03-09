import { View, Text, TextInput, StyleSheet, Pressable } from "react-native-web";
import React, { useState } from "react";
import { firebase } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const Detail = () => {
    const todoRef = firebase.firestore().collection('todos');
    const [textHandling, onChangeHeadingText] = useState(route.params.item.name);
    const navigation = useNavigation();
    console.log(textHandling);

    const updateTodo = () => {
        if (textHandling && textHandling.length > 0) {
            todoRef
            .doc(route.params.item.id)
            .update({
                heading: textHandling,
            }).then (() => {
                navigation.navigate('Home')
            }).catch((error) => {
                alert(error.message)
            })
        }
    }

    return(
        <View style={StyleSheet.constainer}>
            <TextInput
                style= {StyleSheet.textField}
                onChangeText={onChangeHeadingText}
                value={textHandling}
                placeholder="update Todo"
            />
            <Pressable
                style={StyleSheet.buttonUpdate}
                onPress={() => {updateTodo()}}
                >
                    <Text>UPDATE TODO</Text>
            </Pressable>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginLeft: 15,
        marginRight: 15,
    },
    textField: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15, 
        color: "#000000",
        backgroundColor: '#e0e0e0',
        borderRadius: 5
    },
    buttonUpdate: {
        marginTop: 25,
        alignItems: 'center',
        justifyConstent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#0de065',
        }
})