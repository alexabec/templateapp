import React from 'react';
import { Picker, View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Alert, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import Constants from 'expo-constants';
import RNPickerSelect from 'react-native-picker-select';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class CustomerSignUpScreen extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            customerId: 0,
            username: '',
            password: '',
            cpassword: '',
            firstName: '',
            lastName: '',
            email: '',
            curr: '',
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateCurr = (curr) => {
        this.setState({ curr: curr })
        console.log('currency', curr);
    }

    updateCheck() {

        if (!this.state.checked) {
            this.setState({ checked: !this.state.checked })

            this.state.featured = true
        }
        else if (this.state.checked) {
            this.setState({ checked: !this.state.checked })

            this.state.featured = false
        }
    }

    validateUsername(input, field) {
        if (field == 'username') {
            this.setState({
                username: input,
            })

            this.getUsernamesList(input);
        }
    }

    async getUsernamesList(input) {
        var usernames = []
        var list = await axios.get('https://templateapp.azurewebsites.net/api/customeraccount/')
        var list2 = list['data']

        for (var i = 0; i < list2.length; i++) {
            usernames.push(list2[i]['username']);
        }
        // API get list of all customer_account_username
        if (usernames.includes(input)) {
            alert('username already taken, choose another one');
        }
    }

    updateValue(input, field) {

        if (field == 'password') {
            this.setState({
                password: input,
            })
        }
        else if (field == 'cpassword') {
            this.setState({
                cpassword: input,
            })
        }
        else if (field == 'firstName') {
            this.setState({
                firstName: input,
            })
        }
        else if (field == 'lastName') {
            this.setState({
                lastName: input,
            })
        }
        else if (field == 'email') {
            this.setState({
                email: input,
            })
        }
    }

    signUp() {

        let collection = {}
        collection.username = this.state.username,
            collection.password = this.state.password,
            collection.cpassword = this.state.cpassword,
            collection.firstName = this.state.firstName,
            collection.lastName = this.state.lastName,
            collection.email = this.state.email,
            collection.currency = this.state.curr,
            collection.createdAt = new Date(),
            console.warn(collection);

        // fetch('https://templateapp.azurewebsites.net/api/customeraccount', {
        //     method: 'POST', // or 'PUT'
        //     headers: new Headers({
        //         'Content-Type': 'application/json',
        //     }),
        //     body: JSON.stringify(collection),
        // })
        //     .then((response) => response.json())
        //     .then((collection) => {
        //         console.log('Success:', collection);
        //         this.setState({
        //             customerId: collection.id
        //         })
                console.log('customer id is :', this.state.customerId)

                if (this.state.checked && this.state.password == this.state.cpassword && this.state.email.includes('@')) {
                    this.props.navigation.pop();
                    this.props.navigation.navigate('EditShop')
        
                }
                else if (!this.state.checked) {
                    Alert.alert(
                        'Alert',
                        'Please read and accept the Terms and Conditons.',
                        [
                            { text: 'Ok' },
                        ],
                        { cancelable: false },
                    );
                }
                else if (this.state.password !== this.state.cpassword) {
                    Alert.alert(
                        'Alert',
                        'Your passwords do not match. Please try again',
                        [
                            { text: 'Ok' },
                        ],
                        { cancelable: false },
                    );
                }
                else if (!this.state.password) {
                    Alert.alert(
                        'Alert',
                        'Password cannot be empty. Please try again',
                        [
                            { text: 'Ok' },
                        ],
                        { cancelable: false },
                    );
                }
                else if (!this.state.email.includes('@')) {
                    alert('Email invalid.')
                }
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    }

    render() {

        return (

            <KeyboardAvoidingView style={styles.container}
                behavior='padding'>

                <View style={{ height: 100, backgroundColor: 'black', flexDirection: 'row' }}>
                    <View style={{ width: '33%' }}>
                    </View>
                    <View style={{ width: '33%' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginTop: 50, alignSelf: 'center' }}>  Y  O  U  R    S  H  O  P  </Text>
                    </View>
                    <View style={{ width: '33%' }}>
                    </View>
                </View>

                <Text style={styles.title}>SIGN UP</Text>

                <ScrollView>

                    <View style={{ width: '80%', alignSelf: 'flex-start' }}>
                        <Text style={styles.questions}
                        >Username: </Text>
                    </View>

                    <View style={styles.input}>
                        <TextInput style={styles.questions}
                            onChangeText={(input) => this.validateUsername(input, 'username')}
                            autoCapitalize="none"></TextInput>
                    </View>

                    <View style={{ width: '80%', alignSelf: 'flex-start' }}>
                        <Text style={styles.questions}>Password: </Text>
                    </View>

                    <View style={styles.input}>
                        <TextInput style={styles.questions}
                            onChangeText={(input) => this.updateValue(input, 'password')}
                            secureTextEntry={true}></TextInput>
                    </View>

                    <View style={{ width: '80%', alignSelf: 'flex-start' }}>
                        <Text style={styles.questions}
                        >Confirm Password: </Text>
                    </View>

                    <View style={styles.input}>
                        <TextInput style={styles.questions}
                            onChangeText={(input) => this.updateValue(input, 'cpassword')}
                            secureTextEntry={true}></TextInput>
                    </View>

                    <View style={{ width: '80%', alignSelf: 'flex-start' }}>
                        <Text style={styles.questions}>First Name: </Text>
                    </View>

                    <View style={styles.input}>
                        <TextInput style={styles.questions}
                            onChangeText={(input) => this.updateValue(input, 'firstName')}></TextInput>
                    </View>

                    <View style={{ width: '80%', alignSelf: 'flex-start' }}>
                        <Text style={styles.questions}>Last Name: </Text>
                    </View>

                    <View style={styles.input}>
                        <TextInput style={styles.questions}
                            onChangeText={(input) => this.updateValue(input, 'lastName')}></TextInput>
                    </View>

                    <View style={{ width: '80%', alignSelf: 'flex-start' }}>
                        <Text style={styles.questions}>Email: </Text>
                    </View>

                    <View style={styles.input}>
                        <TextInput style={styles.questions}
                            onChangeText={(input) => this.updateValue(input, 'email')}
                            autoCapitalize="none"></TextInput>
                    </View>

                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}>Gender: </Text>
                    </View>
                    <View style={styles.input}>
                        {Constants.platform.ios ? (
                            <View style={{ marginTop: 8, marginLeft: 3 }}>
                                <RNPickerSelect
                                    onValueChange={this.updateCurr}
                                    items={[
                                        { label: 'Man', value: 'man' },
                                        { label: 'Woman', value: 'woman' },
                                        { label: 'Prefer not to say', value: 'none' },
                                    ]}
                                    style={{ color: '#fff' }}
                                />
                            </View>
                        ) :
                            <Picker selectedValue={this.state.curr} onValueChange={this.updateCurr}
                                style={{ height: 35, color: '#fff' }}
                            >
                                <Picker.Item label="Select" value="Select" />
                                <Picker.Item label="Man" value="man" />
                                <Picker.Item label="Woman" value="woman" />
                                <Picker.Item label="Prefer not to say" value="none" />
                            </Picker>
                        }
                    </View>

                    <View style={{ alignSelf: 'center', marginBottom: -10 }}>
                        <CheckBox
                            checked={this.state.checked}
                            onPress={() => this.updateCheck()}
                            containerStyle={{ backgroundColor: 'black', borderColor: 'transparent', alignItems: 'flex-start' }}
                            checkedColor='lightgray'
                        />
                    </View>
                    <View style={{ marginTop: -10, alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CustomerTerms')}>
                            <Text style={styles.credit}>I have read and accept the Terms and Conditions.</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 30, marginBottom: 15, alignSelf: 'center', width: '60%', marginTop: 15 }}>
                        <TouchableOpacity onPress={() => this.signUp()}>
                            <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginTop: 2 }}>S I G N  U P</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        backgroundColor: '#000',
        justifyContent: 'flex-start',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        width: screenWidth,
        height: screenHeight,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    questions: {
        fontSize: 20,
        color: 'lightgrey',
        marginTop: 5,
        alignSelf: 'flex-start',
        marginLeft: 5
    },
    small: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-start',
        marginLeft: 5
    },
    credit: {
        fontSize: 15,
        color: 'gray',
        marginTop: 5,
        marginLeft: -10,
        marginBottom: 1,
        textDecorationLine: 'underline'
    },
    input: {
        backgroundColor: '#2c2c2e',
        opacity: 0.8,
        marginBottom: 5,
        marginTop: 7,
        height: 40,
        width: '80%',
        borderColor: 'grey',
        borderWidth: 2,
    },
    infoText: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
    },
});
