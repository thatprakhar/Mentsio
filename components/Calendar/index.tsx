import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, DatePickerIOS } from 'react-native';
import Selected from '../Selected';
import { firebase } from '../../firebase/config';


interface CalendarProps {
    userId: string
}

interface CalendarState {
    month: number
    year: number
    numDays: number
    showSelectors: boolean
    colorMap: Map<number, string> 
    noteMap: Map<number, string> 
    selectedDate: number
    loading: boolean
    showMonthSelection: boolean
    showYearSelection: boolean
}

export default class Calendar extends React.Component<CalendarProps, CalendarState> {

    constructor(props: CalendarProps) {
        super(props);
        this.state = {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            numDays: this.daysInMonth(new Date().getMonth(), new Date().getFullYear()),
            colorMap: new Map(),
            noteMap: new Map(),
            showSelectors: false,
            selectedDate: -1,
            loading: true,
            showMonthSelection: false,
            showYearSelection: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const userId = this.props.userId;
        this.setState({
            loading: true
        })
        if (userId === undefined) {
            this.setState({
                loading: false
            })
            return;        
        }

        const { noteMap, colorMap } = this.state;
        colorMap.clear();
        firebase.firestore().collection(userId).get()
        .then(snapshot => {
            const data = snapshot.docs.map(doc => doc.data());
            data.forEach(item => {
                if (item.month == this.state.month && item.year == this.state.year) {
                    colorMap.set(item.date, item.color);
                    if (item.note !== undefined) {
                        noteMap.set(item.date, item.note);
                    } else {
                        noteMap.set(item.date, '');
                    }
                }
            });
            this.setState({
                loading: false
            });
        })
        .catch(err => {
            alert(err)
            this.setState({
                loading: false
            })
        });
    }


    weekDays = [
        "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
    ];
    months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ];

    mapNumToMonth = (idx: number): string => {
        return this.months[idx];
    }

    daysInMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate();
    }

    closeColors = () => {
        this.setState({
            selectedDate: -1,
            showSelectors: false
        })
    }

    setColors = (color: string, note: string) => {
        const { selectedDate, month, colorMap, year, noteMap } = this.state;
        const userId = this.props.userId;
        if (userId === undefined) {
            this.setState({
                loading: false
            })
            return;        
        }
        firebase.firestore().collection(userId).doc(selectedDate.toString() + month.toString() + year.toString()).set({
            color: color,
            date: selectedDate,
            month: month,
            year: year,
            note: note
        })
        .then(() => {
            colorMap.set(selectedDate, color);
            noteMap.set(selectedDate, note);
            this.setState({
                selectedDate: -1,
                showSelectors: false
            })
        })
        .catch(err => alert(err));
    }


    renderYearSelection = () => {
        let arr = []

        for (let i = new Date().getFullYear(); i >= new Date().getFullYear() - 3; i--) {
            arr.push(
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                        year: i,
                        showYearSelection: false
                    })
                    this.getData();
                    }}
                    key={i}
                >
                    <Text
                        style={{
                            ...styles.month,
                            marginTop: '6%',
                            marginLeft: '5%'
                        }}
                    >{i}</Text>
            </TouchableOpacity>
            )
        }

        return (
            <View>
                {arr}
            </View>
        )
    }

    renderDates = (num: number) => {
        const { colorMap, loading } = this.state;
        if (loading) {
            return <ActivityIndicator style={{
                alignSelf: 'center',
                marginLeft: '50%'
            }}/>
        }
        let dates = [];
        const today = new Date().getDate();
        for (let i = 1; i <= num; i++) {
            dates.push(
                <TouchableOpacity 
                    key={i} 
                    style={{
                        ...styles.dateContainer,
                        backgroundColor: colorMap.has(i) ? colorMap.get(i) : 'white'
                    }} 
                    onPress={() => this.setState({
                        selectedDate: i,
                        showSelectors: !this.state.showSelectors
                    })}
                >
                    <Text style={{
                        fontSize: 17,
                        color: today == i ? '#6c5ce7' : 'black'
                    }}>{i}</Text>
                </TouchableOpacity>
            )
        }
        return dates;
    }

    render() {        
        const { month, year, numDays, showSelectors, loading } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.date}>
                    <TouchableOpacity
                        onPress={() => this.setState({
                            showMonthSelection: true
                        })}
                    >
                        <Text style={styles.month}>{this.mapNumToMonth(month)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({
                            showYearSelection: true
                        })}
                    >
                        <Text style={styles.year}>{year}</Text>
                    </TouchableOpacity>
                </View>
                {
                    <View style={styles.dates}>
                        {this.renderDates(numDays)}
                    </View>
                }
                {
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showSelectors && this.state.selectedDate !== -1}
                        style={styles.modal}
                    >
                        <Selected
                            closeColors={this.closeColors}
                            setColors={this.setColors} 
                            month={this.mapNumToMonth(this.state.month)} 
                            date={this.state.selectedDate}
                            noteProp={
                                this.state.noteMap.has(this.state.selectedDate) ? 
                                    this.state.noteMap.get(this.state.selectedDate)
                                    :
                                    ''
                            }
                        />
                    </Modal>
                }
                {
                    this.state.showMonthSelection && 
                    <Modal
                        animationType="slide"
                        transparent={true}
                        style={styles.modal}
                    >
                        <View
                            style={styles.monthPicker}
                        >
                            {
                                // @ts-ignore
                                this.months.map((m, i) => 
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                            month: i,
                                            showMonthSelection: false
                                        })
                                        this.getData();
                                        }}
                                        key={m}
                                    >
                                        <Text
                                            style={{
                                                ...styles.month,
                                                marginTop: '6%',
                                                marginLeft: '5%'
                                            }}
                                        >{m}</Text>
                                    </TouchableOpacity>
                                    )
                            }
                        </View>
                    </Modal>
                }
                {
                    this.state.showYearSelection && 
                    <Modal
                        animationType="slide"
                        transparent={true}
                        style={styles.modal}
                    >
                        <View
                            style={styles.monthPicker}
                        >
                            {
                                this.renderYearSelection()
                            }
                        </View>
                    </Modal>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    date: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '10%'
    },
    month: {
        fontSize: 30,
        fontWeight: '200',
        marginRight: '10%'
    },
    year: {
        fontSize: 30,
        fontWeight: '200',
        color: 'red'
    },
    dateContainer: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    dates: {
        flexDirection: 'row',
        marginTop: '10%',
        marginLeft: '6%',
        marginRight: '6%',
        flexWrap: 'wrap',
    },
    modal: {
        backgroundColor: 'red'
    },
    monthPicker: {
        marginTop: '10%',
        backgroundColor: 'white',
        flex: 1
    }
})