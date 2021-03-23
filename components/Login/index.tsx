import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text, TextInput, ActivityIndicator, TouchableHighlight } from 'react-native';

import { firebase } from '../../firebase/config';

type LoginProps = {
    loginCallback: (user: firebase.User) => void
    navigation: any
}

const Login: FunctionComponent<LoginProps> = ({ loginCallback, navigation }) => {

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    const onLoginPress = () => {
        setLoading(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                if (response.user === null) {
                    alert('An error occured! here');
                    return;
                }
                loginCallback(response.user);
            })
            .catch(error => {
                setLoading(false);
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mentsio</Text>
            </View>
            <View
                style={styles.form}
            >
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    autoCompleteType="email" 
                    placeholder="Email Address" 
                    placeholderTextColor='grey'
                    onChangeText={text => setEmail(text)}
                    autoCorrect={false}
                    autoFocus
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    secureTextEntry={true} 
                    autoCompleteType="password" 
                    placeholder="Password" 
                    placeholderTextColor='grey'
                    onChangeText={text => setPassword(text)}
                />
            </View>
            {loading ? <ActivityIndicator style={styles.loading}/> : 
                <TouchableHighlight style={styles.loginButton} onPress={() => onLoginPress()}>
                    <Text style={styles.loginButtonText}>Log In</Text>
                </TouchableHighlight>
            }
            </View>
            <View style={styles.registerTextContainer}>
                <Text style={styles.registerText}>
                    First time here? 
                </Text>
                <TouchableHighlight onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerLink}>
                        Sign Up
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
    },
    header: {
        backgroundColor: '#6c5ce7',
        height: '40%',
        width: '100%',
        paddingTop: '40%',
        paddingLeft: '5%',
    },
    title: {
        color: 'white',
        fontSize: 50,
        fontWeight: '700'
    },
    form: {
        marginTop: '10%',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    input: {
        fontSize: 20,
        marginBottom: 50,
        marginLeft: 10,
        color: 'black',
        width: '100%',
        paddingTop: 2,
        paddingBottom: 2,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    inputContainer: {
        width: '85%',
        display: 'flex',
        flexDirection: 'row'
    },
    loginButton: {
        alignSelf: 'center',
        marginTop: 30,
        width: '50%',
        borderRadius: 30
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
    loading: {
        width: '100%'
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
})

export default Login;