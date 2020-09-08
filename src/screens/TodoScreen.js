import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {THEME} from "../theme";
import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/EditModal";
import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/screenContext";


export const TodoScreen = () => {
    const [modal, setModal] = useState(false)
    const {todos, updateTodo, removeTodo} = useContext(TodoContext)
    const {todoId, changeScreen} = useContext(ScreenContext)

    const todo = todos.find(t => t.id === todoId)

    const saveHandler = async title => {
       await updateTodo(todo.id, title)
        setModal(false)
    }

    return (
        <View>

            <EditModal visible={modal}
                       value={todo.title}
                       onSave={saveHandler}
                       onCancel={() => setModal(false)}/>

            <AppCard>
                <Text style={styles.text}>
                    {todo.title}
                </Text>
                <View style={styles.button}>
                    <Button title='Edit' onPress={() => setModal(true)}/>
                </View>

            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title="Back"
                            color={THEME.GREY_COLOR}
                            onPress={() => changeScreen(null)}/>
                </View>

                <View style={styles.button}>
                    <Button title="Delete"
                            color={THEME.DANGER_COLOR}
                            onPress={() => {
                                removeTodo(todo.id)
                            }}/>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '40%'
    },
    text: {
        fontSize: 20
    }
})