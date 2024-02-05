import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerSplash: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        color: 'white',
        fontSize: 30
    },
    containerLogin: {
        flex: 1,
        backgroundColor: 'white'
    },
    heading: {
        fontSize: 30,
        color: 'black',
        fontWeight: '500',
        marginLeft: 20,
        marginTop: 100
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        marginTop: 20,
        alignSelf: 'center',
        paddingLeft: 20,
        borderRadius: 10
    },
    btnLogin: {
        width: '90%',
        height: 50,
        backgroundColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        marginTop: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        color: 'white',
        fontSize: 16
    },
    errorText: {
        color: 'red',
        marginLeft: 20,
        marginTop: 5
    },
    headerHome: {
        width:'100%',
        height: 60,
        backgroundColor: 'white', elevation: 5,
        justifyContent: 'center', paddingLeft: 20
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500'
    },
    btnAdd: {
        width: 200,
        height: 50,
        borderRadius: 30,
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    notesItem: {
        width: '90%',
        height: 80,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    notesText: {
        color: 'black',
        fontWeight: '500',
    },
    noDataView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles