import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ActivityIndicator, TouchableOpacity } from 'react-native';
import { firebase } from '../../firebase/config'

export default function Register({
    navigation,
    loginCallback
}: {
    navigation: any
    loginCallback: (user: firebase.User) => void

}) {

    const [loading, setLoading] = React.useState<boolean>(false);

    const [userEmail, setUserEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const onRegisterPress = () => {
        setLoading(true);
        firebase
            .auth()
            .createUserWithEmailAndPassword(userEmail, password)
            .then((response) => {
                setLoading(false);
                if (response.user === null) {
                    alert('Error occured');
                    return;
                }
                loginCallback(response.user);
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Register a New Account
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    autoCompleteType="email" 
                    placeholder="Email Address" 
                    placeholderTextColor='grey'
                    value={userEmail}
                    onChangeText={e => setUserEmail(e)}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    secureTextEntry={true} 
                    autoCompleteType="password" 
                    placeholder="Password" 
                    placeholderTextColor='grey'
                    value={password}
                    onChangeText={e => setPassword(e)}
                />
            </View>
            {loading ? <ActivityIndicator style={styles.loading}/> : 
                <TouchableHighlight style={styles.loginButton} onPress={() => onRegisterPress()}>
                    <Text style={styles.loginButtonText}>Register</Text>
                </TouchableHighlight>
            }
            <View style={styles.registerTextContainer}>
                <Text style={styles.registerText}>
                    Already have an account?
                </Text>
                <TouchableHighlight onPress={() => navigation.navigate('Login')} disabled={loading}>
                    <Text style={styles.registerLink}>
                        Log In
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: '40%',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 40,
        alignSelf: 'flex-start',
        marginBottom: 50,
        fontWeight: "bold",
        color: '#6c5ce7'
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        color: 'black',
        width: '100%',
        paddingTop: 2,
        paddingBottom: 2
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: '10%'
    },
    loginButton: {
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 30,
        width: '100%',
        borderRadius: 30,
    },
    loginButtonText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 10,
        paddingRight: 10,
    },
    borderBottomGrey: {
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    borderBottomYellow: {
        borderBottomColor: '#e94560',
        borderBottomWidth: 1
    },
    registerTextContainer: {
        marginTop: 25,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    registerText: {
        color: 'black',
        fontSize: 15,
        marginRight: 5
    },
    registerLink: {
        fontWeight: '900',
        color: '#e94560',
        fontSize: 15,
    },
    loading: {
        width: '100%'
    }
});