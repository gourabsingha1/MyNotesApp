import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../components/Loader';

const AddNotes = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [title, setTitle] = useState<string>(
        route.params.type == 'EDIT' ? route.params.data.title : ''
    )
    const [badTitle, setBadTitle] = useState<boolean>(false)
    const [note, setNote] = useState<string>(
        route.params.type == 'EDIT' ? route.params.data.note : ''
    )
    const [badNote, setBadNote] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const validate = () => {
        let valid = true
        if (title == '') {
            setBadTitle(true)
            valid = false
        }
        else {
            setBadTitle(false)
        }
        if (note == '') {
            setBadNote(true)
            valid = false
        }
        else {
            setBadNote(false)
        }
        return valid
    }

    const addNote = async () => {
        setLoading(true)
        const body = { title: title, note: note, postedBy: route.params.id }
        const res = await fetch(
            'https://good-puce-xerus-suit.cyclic.app/api/notes/addNote',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(body)
            }
        )
        const data = await res.json()
        setLoading(false)
        navigation.goBack()
    }

    const updateNote = async () => {
        try {
            setLoading(true)
            const body = { title: title, note: note, postedBy: route.params.id }
            const res = await fetch(
                'https://good-puce-xerus-suit.cyclic.app/api/notes/updateNote/' + route.params.data._id,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT',
                    body: JSON.stringify(body)
                }
            )
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json()
            setLoading(false)
            navigation.goBack()
        } catch (error) {
            console.error('An error occurred while updating the note', error);
            setLoading(false)
        }
    }

    return (
        <View style={styles.containerLogin}>
            <Text style={styles.heading}>Add Notes</Text>

            <TextInput
                placeholder='Title'
                style={styles.input}
                value={title}
                onChangeText={text => setTitle(text)} />

            {badTitle && <Text style={styles.errorText} >Enter Title</Text>}

            <TextInput
                placeholder='Note'
                style={styles.input}
                value={note}
                onChangeText={text => setNote(text)} />

            {badNote && <Text style={styles.errorText} >Enter Note</Text>}

            <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => {
                    if (validate()) {
                        if(route.params.type == 'NEW') {
                            addNote()
                        }
                        else {
                            updateNote()
                        }
                    }
                    else {

                    }
                }}>

                <Text style={styles.textBtn}>
                    {route.params.type == 'NEW' ? 'Add Note' : 'Update'}
                </Text>
            </TouchableOpacity>

            <Loader visible={loading} />
        </View>
    )
}

export default AddNotes