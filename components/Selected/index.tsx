import React, { FunctionComponent } from 'react';

import { View, TouchableOpacity, StyleSheet, TextInput, Text, SafeAreaView } from 'react-native';


interface SelectedProps {
    setColors: (color: string, note: string) => void
    month: string
    date: number
    noteProp: string | undefined
    closeColors: () => void
}

const Selected: FunctionComponent<SelectedProps> = ({ setColors, month, date, noteProp, closeColors }) => {


    const [note, setNote] = React.useState<string>(noteProp ? noteProp : '');

    return (
        <View
            style={styles.container}
        >
            <View style={styles.header}>
                <Text
                    style={styles.heading}
                >{month} {date}</Text>
                <TouchableOpacity
                    onPress={() => closeColors()}
                    style={styles.closeButton}
                >   
                <Text
                    style={{
                        color: 'white',
                        fontSize: 22
                    }}
                >
                    {'\u2715'}
                </Text>
                </TouchableOpacity>
            </View>
            <View
                style={styles.infoContainer}
            >
                <View
                    style={styles.selector}
                >
                    <TouchableOpacity
                        style={{
                            ...styles.color,
                            backgroundColor: '#ffffff',
                            borderWidth: 1,
                            borderColor: 'black'
                        }}
                        onPress={() => setColors('#ffffff', note)}
                    >

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            ...styles.color,
                            backgroundColor: '#faab9b'
                        }}
                        onPress={() => setColors('#faab9b', note)}
                    >
                    
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            ...styles.color,
                            backgroundColor: '#fad19b'
                        }}
                        onPress={() => setColors('#fad19b', note)}
                    >
                    
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            ...styles.color,
                            backgroundColor: '#f8fa9b'
                        }}
                        onPress={() => setColors('#f8fa9b', note)}
                    >
                    
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            ...styles.color,
                            backgroundColor: '#d9fa9b'
                        }}
                        onPress={() => setColors('#d9fa9b', note)}
                    >
                    
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={{
                            ...styles.color,
                            backgroundColor: '#a1fa9b'
                        }}
                        onPress={() => setColors('#a1fa9b', note)}
                    >

                    </TouchableOpacity>
                </View>
                <Text style={styles.note}>
                        Write about your day
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Write something here'
                    placeholderTextColor='grey'
                    multiline={true}
                    blurOnSubmit={true}
                    onChangeText={text => setNote(text)}
                    value={note}
                    autoCorrect={false}
                >
                </TextInput>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        marginTop: '0%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6c5ce7',
        paddingTop: '20%',
        paddingBottom: '5%',
        flexDirection: 'row'
    },
    heading: {
        fontSize: 22,
        fontWeight: '500',
        color: 'white',
    },
    closeButton: {
        marginLeft: '10%'
    },
    infoContainer: {
        marginTop: '10%',
        marginLeft: '6%',
        marginRight: '6%',
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    color: {
        height: 30,
        width: 30,
        borderRadius: 100
    },
    note: {
        marginTop: '15%',
        fontSize: 25,
        fontWeight: '600'
    },
    input: {
        marginTop: '5%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        fontSize: 17,
        // height: '20%'
    }
});


export default Selected;