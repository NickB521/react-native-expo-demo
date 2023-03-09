import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable} from "react-native-web";
import { firebase } from "../firebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { query, QuerySnapshot } from "firebase/firestore";



const Home = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setaddData] = useState('');
    const navigation = useNavigation();

    // fetch or read the data from firestore
    useEffect(() =>{
        todoRef
        .orderBy('createAt', 'desc')
        .onSnapshot(
            QuerySnapshot => {
                const todos = []
                QuerySnapshot.forEach((doc) => {
                    const {heading} = doc.data()
                    todos.push({
                        id: doc.id,
                        heading,
                    })
                })
                setTodos(todos)
            }
        )
    }, [])

    // delete a todo from firestore db
    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() => {
                // show a successful alert
                alert('Deleted Successfully')                
            })
            .catch(error => {
                alert(error);
            })
    }
    // add a todo
    const addTodo = () => {
        // check if we have a todo
        if (addData && addData.length > 0){
            // get the timestamp
            const timestamp = firestore = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            todoRef
                .add(data)
                .then(() => {
                    setaddData('');
                    // release Keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }

    return (
            <View>
                <View style={{ flex: 1 }}>
                <View style={StyleSheet.input}
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
                    <view>
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


                    </view>
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