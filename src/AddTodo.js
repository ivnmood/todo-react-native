import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native'

export const AddTodo = (props) => {

    const [value, setValue] = useState('');


    const addTodo = () => {
        if (value.trim()) {
            props.addTodo(value)
            setValue('')
        } else {
            Alert.alert('Todo can\'t be empty')
        }

    }

    return (
        <View style={styles.block}>
            <TextInput style={styles.input}
                       onChangeText={text => setValue(text)}
                       value={value}
                       placeholder='Enter your task'
            />
            <Button title='add' onPress={addTodo}/>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        width: '80%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        padding: 5,
    }
})