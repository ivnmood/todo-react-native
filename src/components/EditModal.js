import React, {useState} from 'react'
import {View, StyleSheet, Button, Modal, TextInput, Alert} from 'react-native'
import {THEME} from "../theme";



export const EditModal = ({visible, onCancel, onSave, value}) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Error', `Minimum number of characters 3, now ${title.trim().length}`)
        } else {
            onSave(title)
        }
    }


    const cancelHandler = () => {
        setTitle(value)
        onCancel()
    }
    return (
        <Modal visible={visible}
               animationType="slide"
               transporent={false}
        >
            <View style={styles.wrap}>
                <TextInput
                    onChangeText={setTitle}
                    placeholder='Enter title'
                    maxLength={64}
                    value={title}
                    style={styles.input}/>
                <View style={styles.buttons}>
                    <Button title='Cancel' onPress={()=> cancelHandler()}/>
                    <Button title='Save' onPress={saveHandler}/>
                </View>

            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 15
    },
    input: {
        width: '80%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
        padding: 5,
    }
})