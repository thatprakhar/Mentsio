import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Calendar from '../Calendar';


interface HomeProps {
    logout: () => void
    user: firebase.User
}

interface HomeState {
    quote: string
}

export default class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
        this.state =  {
            quote: '""'
        }
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET'
        }
    
        fetch('https://www.affirmations.dev/', requestOptions)
        .then(res => res.json())
        .then(data => {
            this.setState({
                quote: '"' + data.affirmation + '"'
            })
        })
        .catch(err => alert(err));
    }



    render() {
        const { logout, user } = this.props;
        const { quote } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Mentsio</Text>
                    <TouchableOpacity
                        onPress={() => logout()}
                    >
                        <Text style={styles.caption}>Log Out</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.quote}>{quote}</Text>
                <Calendar userId={user.uid}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    header: {
        backgroundColor: '#6c5ce7',
        height: '15%',
        width: '100%',
        paddingTop: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 40,
        fontWeight: '300'
    },
    quote: {
        marginTop: '4%',
        fontSize: 17,
        color: 'grey',
        width: '100%',
        textAlign: 'center'
    },
    caption: {
        fontSize: 15,
        alignSelf: 'flex-end',
        color: 'white'
    }
})