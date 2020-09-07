import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions, Picker, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class EditInfoSellerScreen extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            shopName: this.props.navigation.getParam('shopName'),
            shopId: this.props.navigation.getParam('shopId'),
            fpassword: '',
            npassword: '',
            cpassword: '',
            email: '',
            cemail: '',
            businessAddress: '',
            curr: ''
        }
    };

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

    updateValue(input, field) {

        if (field == 'fpassword') {
            this.setState({
                fpassword: input,
            })
        }
        else if (field == 'npassword') {
            this.setState({
                npassword: input,
            })
        }
        else if (field == 'cpassword') {
            this.setState({
                cpassword: input,
            })
        }
        else if (field == 'email') {
            this.setState({
                email: input,
            })
        }
        else if (field == 'cemail') {
            this.setState({
                cemail: input,
            })
        }
        else if (field == 'businessAddress') {
            this.setState({
                businessAddress: input,
            })
        }
    }

    saveInfo = async () => {
        const { navigation } = this.props;

        var passwordInput = this.state.fpassword;
        var business_acc = await axios.get('http://templateapp.azurewebsites.net/api/businessaccount/login/' + this.state.shopName)
        var businessUserList = business_acc['data']
        console.log(' credential information :', businessUserList)


        if (businessUserList[0].password != passwordInput) {
            alert('Sorry, you have entered a wrong password.')
        }
        else if (businessUserList[0].password == passwordInput) {

            let collection = {}
            collection.password = this.state.npassword,
                collection.email = this.state.email,
                collection.cemail = this.state.cemail,
                collection.businessAddress = this.state.businessAddress,
                collection.currency = this.state.curr,
                console.warn(collection);

            if (this.state.npassword != '') {

                if (this.state.npassword == this.state.cpassword) {
                    await axios.put('https://templateapp.azurewebsites.net/api/businessaccount/' + businessUserList[0].id + '/pword/' + this.state.npassword, {
                        npassword: this.state.npassword,
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error.response)
                        });
                    this.setState({ npassword: collection.password })
                }
                else if (this.state.npassword !== this.state.cpassword) {
                    Alert.alert(
                        'Alert',
                        'Your passwords do not match. Please try again.',
                        [
                            { text: 'Ok' },
                        ],
                        { cancelable: false },
                    );
                }
            }
            if (this.state.email != '') {

                if (!this.state.email.includes('@')) {
                    alert('Email invalid.');
                    return;
                }
                else {
                    if (this.state.email == this.state.cemail) {
                        await axios.put('https://templateapp.azurewebsites.net/api/businessaccount/' + businessUserList[0].id + '/email/' + this.state.email, {
                            email: this.state.email,
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                console.log(response)
                            })
                            .catch(error => {
                                console.log(error.response)
                            });
                        this.setState({ email: collection.email })
                    }
                    else if (this.state.email !== this.state.cemail) {
                        Alert.alert(
                            'Alert',
                            'Your emails do not match. Please try again.',
                            [
                                { text: 'Ok' },
                            ],
                            { cancelable: false },
                        );
                    }
                }
            }
            if (collection.businessAddress != '') {

                await axios.put('https://templateapp.azurewebsites.net/api/businessaccount/' + businessUserList[0].id + '/dir/' + this.state.businessAddress, {
                    businessAddress: this.state.businessAddress,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
                this.setState({ businessAddress: collection.businessAddress })
            }

            if (this.state.curr != '') {

                await axios.put('https://templateapp.azurewebsites.net/api/businessaccount/' + businessUserList[0].id + '/curr/' + this.state.curr, {
                    curr: this.state.curr,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
                this.setState({ curr: collection.currency })
            }
            this.props.navigation.navigate('Seller');
        }
    }

    render() {

        return (

            <KeyboardAvoidingView style={styles.container}
                behavior='height'>

                <View style={{ height: 100, backgroundColor: 'black', flexDirection: 'row' }}>
                    <View style={{ width: '33%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back" color={'#fff'} size={22} style={{ marginTop: 55, marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '33%' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginTop: 50, alignSelf: 'center' }}>Y O U R    S H O P</Text>
                    </View>
                    <View style={{ width: '33%' }}>
                    </View>
                </View>

                <View>
                    <View style={{ width: '55%', height: 25, backgroundColor: 'white', alignSelf: 'flex-end', marginTop: 10 }}>
                        <Text style={styles.edit}>E D I T  A C C O U N T  </Text>
                    </View>
                </View>

                <View style={{ alignSelf: 'flex-end' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessTerms')}>
                        <Text style={styles.terms}>View Terms and Conditions</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 1, backgroundColor: 'gray', marginTop: 0, width: '66%', alignSelf: 'flex-end', marginBottom: 20, }}></View>

                <ScrollView>
                    <Text style={styles.infoText}>*   Please enter your current password to update your information.</Text>

                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}>Password: </Text>
                    </View>

                    <View style={styles.inputBox}>
                        <TextInput style={styles.answers}
                            secureTextEntry={true}
                            onChangeText={(input) => this.updateValue(input, 'fpassword')}></TextInput>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.infoText}>*   Only fill the fields you want to update</Text>
                    </View>
                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}> New Password: </Text>
                    </View>

                    <View style={styles.inputBox}>
                        <TextInput style={styles.answers}
                            secureTextEntry={true}
                            onChangeText={(input) => this.updateValue(input, 'npassword')}></TextInput>
                    </View>

                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}>Confirm Password: </Text>
                    </View>

                    <View style={styles.inputBox}>
                        <TextInput style={styles.answers}
                            secureTextEntry={true}
                            onChangeText={(input) => this.updateValue(input, 'cpassword')}></TextInput>
                    </View>

                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}>Email: </Text>
                    </View>

                    <View style={styles.inputBox}>
                        <TextInput style={styles.answers}
                            onChangeText={(input) => this.updateValue(input, 'email')}></TextInput>
                    </View>

                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}>Confirm Email: </Text>
                    </View>

                    <View style={styles.inputBox}>
                        <TextInput style={styles.answers}
                            onChangeText={(input) => this.updateValue(input, 'cemail')}></TextInput>
                    </View>

                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}>Business Address: </Text>
                    </View>

                    <View style={styles.inputBox}>
                        <TextInput style={styles.answers}
                            onChangeText={(input) => this.updateValue(input, 'businessAddress')}></TextInput>
                    </View>

                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}>Currency: </Text>
                    </View>

                    <View style={styles.inputBox}>
                        <Picker selectedValue={this.state.curr} onValueChange={this.updateCurr}
                            style={{ height: 35, color: '#fff' }}
                        >
                            <Picker.Item label="Select" value="Select" />
                            <Picker.Item label="US Dollar" value="USD" />
                            <Picker.Item label="Canadian Dollar" value="CAD" />
                            <Picker.Item label="Euro" value="EUR" />
                            <Picker.Item label="Pound" value="PND" />
                        </Picker>
                    </View>

                    <View style={{ marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreditCard')}>
                            <Text style={styles.credit}>Bank | Paypal Details</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '60%', height: 35, backgroundColor: 'gray', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => this.saveInfo()}>
                            <Text style={styles.save}>S A V E</Text>
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
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#000',
        justifyContent: 'flex-start',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        width: screenWidth,
        height: screenHeight,
    },
    terms: {
        fontSize: 15,
        color: 'gray',
        marginTop: 20,
        marginBottom: 10,
        textDecorationLine: 'underline'
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 18,
    },
    header: {
        flex: 1,
        fontSize: 50,
    },
    edit: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        marginTop: 3
    },
    save: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 8
    },
    infoText: {
        fontSize: 15,
        color: '#fff',
        alignSelf: 'center',
        marginBottom: 20
    },
    questions: {
        fontSize: 20,
        color: 'lightgray',
        marginTop: 5,
        marginLeft: 5
    },
    answers: {
        fontSize: 20,
        color: 'lightgray',
        marginTop: 5,
        alignSelf: 'flex-start',
        marginLeft: 5
    },
    inputBox: {
        backgroundColor: 'gray',
        opacity: 0.3,
        marginBottom: 5,
        marginTop: 7,
        height: 40,
        width: '80%',
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
    },
    currency: {
        backgroundColor: 'lightgray',
        marginBottom: 5,
        marginTop: 7,
        height: 40,
        width: '30%',
        borderWidth: 2,
        borderColor: 'pink',
    },
    credit: {
        fontSize: 20,
        color: 'lightgray',
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 10,
        textDecorationLine: 'underline'
    },
    picker: {
        width: 200,
        backgroundColor: '#FFF0E0',
        borderColor: 'pink',
        borderWidth: 5,
        color: 'pink'

    },
    pickerItem: {
        color: 'red'
    },
});

