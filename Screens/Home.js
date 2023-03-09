import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable} from "react-native";
import { db } from "../firebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";



const Home = () => {
    const [todos, setTodos] = useState([]);
    const navigation = useNavigation();
    const [addData, setAddData] = useState('');

    const addTodo = () =>{

    }

    const deleteTodo = (todos) =>{

    }

    return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.input}
                        placeholder='Add A New Todo'
                        placeholderTextColor='#aaaaaa'
                        onChangeText={(heading) => setAddData(heading)}
                        value={addData}
                        underlineColorAndroid='transparent'
                        autoCapitalize='none' />
                    <TouchableOpacity style={styles.button} onPress={addTodo}>
                        <Text style={styles.buttonText}> Add </Text>
                    </TouchableOpacity>
                </View>
            <FlatList
                data={todos}
                numColumns={1}
                renderItem={({ item }) => (
                    <View>
                        <Pressable
                            style={styles.container}
                            onPress={() => navigation.navigate('Detail', {item})}
                        >
                            <FontAwesome 
                                name='trash-o'
                                color='red'
                                onPress={() => deleteTodo(item)}
                                style={styles.todoIcon}
                            />
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {item.heading[0].toupperCase() + item.headingslice(1)}
                                </Text>
                            </View>

                        </Pressable>


                    </View>
                )} 
                />
        </View>
    )

}

export default Home

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e5e5e5',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:45,
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,
    },
    formContainer:{
        flexDirection:'row',
        height:80,
        marginLeft:10,
        marginRight:10,
        marginTop:100,
    },
    input:{
        height:48, 
        borderRadius:5, 
        overflow:'hidden', 
        backgroundColor:'white', 
        paddingLeft:16, 
        flex:1, 
        marginRight:5,
    },
    buttonText: {
        color:'white',
        fontSize:20,
    },
    todoIcon: {
        marginTop:5,
        fontSize:20,
        marginLeft:14
    }
})