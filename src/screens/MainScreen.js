import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, FlatList, Image, Text, Dimensions, Button} from 'react-native';
import {AddTodo} from "../components/AddTodo";
import {Todo} from "../components/Todo";
import {THEME} from "../theme";
import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/screenContext";
import {AppLoader} from "../components/ui/AppLoader";


export const MainScreen = () => {

    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)
    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    )

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

    useEffect(() => {
        loadTodos()
    }, [])

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(width)
        }

        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })

    if (loading) {
        return <AppLoader/>
    }

    if (error) {
        return <View style={styles.center}>
            <Text style={styles.error}>{error}</Text>
            <Button onPress={loadTodos} title="Refresh" color={THEME.DANGER_COLOR}/>
        </View>
    }

    let content =
        <View style={{width: deviceWidth}}>
            <FlatList
                keyExtractor={item => item.id}
                data={todos}
                renderItem={({item}) => <Todo todo={item} removeTodo={removeTodo} openTodo={changeScreen}/>}
            />
        </View>


    if (todos.length === 0) {
        content = <View style={styles.imgWrapper}>
            <Image style={styles.image} source={require('../../assets/no-items.png')}/>
            <Text style={styles.text}>Todos not found</Text>
        </View>
    }

    return (
        <View>
            <AddTodo addTodo={addTodo}/>

            {content}
        </View>
    )
}


const styles = StyleSheet.create({
    imgWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        margin: 20
    },
    text: {
        fontSize: 20
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR,
        marginBottom: 10
    }
})