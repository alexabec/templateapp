import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ImageBackground, KeyboardAvoidingView, AsyncStorage, Image } from 'react-native';
import axios from 'axios';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class LoginScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
    }


    updateValue(input, field) {

        if (field == 'username') {
            this.setState({
                username: input,
            })
        }
        else if (field == 'password') {
            this.setState({
                password: input,
            })
        }
    }

    loginFunction = async () => {

        console.log('USERNAME USED' + this.state.username);
        console.log('PWORD USED' + this.state.password);

        var usernameInput = this.state.username;
        var passwordInput = this.state.password;

        var business_acc = await axios.get('http://templateapp.azurewebsites.net/api/businessaccount/login/' + usernameInput)
        var businessUserList = business_acc['data']

        if (businessUserList[0] == null) {
            var customer_acc = await axios.get('http://templateapp.azurewebsites.net/api/customeraccount/login/' + usernameInput)
            var customerUserList = customer_acc['data']

            console.log(customerUserList);
            if (customerUserList[0] == null) {
                alert('Something went wrong. Please try again.')
            }
            else if (customerUserList[0].username != usernameInput || customerUserList[0].password != passwordInput) {
                alert('Sorry customer, you could not be logged in, try again.')
            }
            else if (customerUserList[0].username == usernameInput && customerUserList[0].password == passwordInput) {
                this.props.navigation.navigate('Home', { customerId: customerUserList[0].id, username: customerUserList[0].username, fullName: customerUserList[0].firstName + customerUserList[0].lastName, currency: customerUserList[0].currency });
            }
        }
        else if (businessUserList[0].shopName != usernameInput || businessUserList[0].password != passwordInput) {
            alert('Sorry shop, you could not be logged in, try again.')
        }
        else if (businessUserList[0].shopName == usernameInput && businessUserList[0].password == passwordInput) {

            var shop = await axios.get('http://templateapp.azurewebsites.net/api/shops/shop/' + usernameInput)
            var shopInfo = shop['data']

            this.props.navigation.navigate('EditShop', { shopId: shopInfo[0].id, shopName: businessUserList[0].shopName, shopCurr: businessUserList[0].currency, profileAddress: shopInfo[0].profileAddress, profileBio: shopInfo[0].profileBio, profileEmail: shopInfo[0].profileEmail });
        }
    }

    render() {

        return (

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', padding: 1 }}>
                    <View style={{ width: '50%' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text style={{ marginTop: 60, fontSize: 20, color: '#fff', alignSelf: 'flex-start', marginLeft: 5 }}>S I G N   U P</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{ color: 'white', fontSize: 60, fontWeight: 'bold', marginTop: 100, alignSelf: 'center' }}>
                        YOUR  SHOP
                        </Text>
                </View>
                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 22, color: 'white', alignSelf: 'center', marginBottom: 5 }}>username</Text>
                    <View style={{ height: 40, backgroundColor: '#2c2c2e', opacity: 0.8, marginBottom: 10, alignSelf: 'center', width: '60%', borderWidth: 2, borderColor: 'grey' }}>
                        <TextInput
                            style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginTop: 5 }}
                            onChangeText={(input) => this.updateValue(input, 'username')}
                            placeholder=""
                            value={this.state.username}
                            autoCapitalize="none"></TextInput>
                    </View>
                    <Text style={{ fontSize: 22, color: 'white', alignSelf: 'center', marginBottom: 5 }}>password </Text>
                    <View style={{ height: 40, backgroundColor: '#2c2c2e', opacity: 0.8, marginBottom: 15, alignSelf: 'center', width: '60%', borderWidth: 2, borderColor: 'grey' }}>
                        <TextInput style={{ fontSize: 20, color: 'white', alignSelf: 'center', marginTop: 5 }}
                            onChangeText={(input) => this.updateValue(input, 'password')}
                            placeholder=""
                            value={this.state.password}
                            secureTextEntry={true}></TextInput>
                    </View>
                </View>
                <Text style={styles.credit}>I forgot my password.</Text>

                <View style={{ height: 50, marginBottom: 10, marginTop: 20, alignSelf: 'center', width: '60%' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditShop')}>
                        <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center', marginTop: 2 }}>L O G I N</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    header: {
        flex: 1,
        fontSize: 50,
    },
    title: {
        marginTop: 18,
        fontSize: 18,
        color: '#fff',
        alignSelf: 'flex-end',
    },
    infoText: {
        fontSize: 15,
        color: '#fff',
        alignSelf: 'center',
    },
    credit: {
        fontSize: 15,
        color: 'gray',
        marginTop: 5,
        marginBottom: 10,
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
});

