import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { RootNavigationProps } from '../AppNavigator';
import styles from '../../styles';
import { useIsFocused, useRoute } from '@react-navigation/native';
import Loader from '../components/Loader';

interface MyProps {
    navigation: NativeStackNavigationProp<RootNavigationProps, 'Home'>
}

type Notes = {
    title: string,
    note: string,
    _id: string
}

const Home = ({ navigation }: MyProps) => {
    const [notes, setNotes] = useState<Notes[]>([])
    const route = useRoute()
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState<boolean>(false)

    const getNotes = async () => {
        const res = await fetch(
            'https://mynotesapp.cyclic.app/api/notes/getNotes/' + route.params.id,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            }
        )
        const data = await res.json()
        setNotes(data)
        console.log(data)
    }

    const deleteNote = async (id: string) => {
        setLoading(true)

        const res = await fetch(
            'https://good-puce-xerus-suit.cyclic.app/api/notes/deleteNote/' + id,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            }
        )
        const data = await res.json()
        setLoading(false)
        getNotes()
    }

    useEffect(() => {
        getNotes()
    }, [isFocused])

    return (
        <View style={styles.containerLogin}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

            <View style={styles.headerHome}>
                <Text style={styles.title}>Home</Text>
            </View>

            {notes.length > 0 ? (
                <FlatList data={notes} renderItem={({ item, index }: { item: Notes, index: number }) => {
                    return (
                        <View style={styles.notesItem}>
                            <View>
                                <Text style={styles.notesText}>{item.title}</Text>
                                <Text style={styles.notesText}>{item.note}</Text>
                            </View>

                            <View>
                                <Text
                                    style={[styles.notesText, {color: 'blue'}]}
                                    onPress={() => {
                                        navigation.navigate('AddNotes', {
                                            id: route.params.id,
                                            type: 'EDIT',
                                            data: item
                                        })
                                    }}>
                                    Edit
                                </Text>
                                <Text
                                    style={[styles.notesText, {color: 'red', marginTop: 5}]}
                                    onPress={() => {
                                        deleteNote(item._id)
                                    }}>
                                    Delete
                                </Text>
                            </View>
                        </View>
                    )
                }} />
            ) : (
                <View style={styles.noDataView}>
                    <Text style={styles.title}>Notes Not Found</Text>
                </View>
            )}

            <TouchableOpacity
                style={styles.btnAdd}
                onPress={() => {
                    navigation.navigate('AddNotes', {id: route.params.id, type: 'NEW'})
                }}>

                <Text style={styles.textBtn}>
                    Add New Note
                </Text>
            </TouchableOpacity>

            <Loader visible={loading} />
        </View>
    )
}

export default Home