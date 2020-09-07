import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class EditShopInfoScreen extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        console.log('dataaaa EDIT INFO', this.props.navigation.state);
        this.state = {
            shopId: this.props.navigation.getParam('shopId'),
            profileAddress: this.props.navigation.getParam('profileAddress'),
            profileBio: this.props.navigation.getParam('profileBio'),
            profileEmail: this.props.navigation.getParam('profileEmail')
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateValue(input, field) {

        if (field == 'shopAddress') {
            this.setState({
                profileAddress: input,
            })
        }
        else if (field == 'bioMessage') {
            this.setState({
                profileBio: input,
            })
        }
        else if (field == 'contactEmail') {
            this.setState({
                profileEmail: input,
            })
        }
        else if (field == 'category') {
            this.setState({
                category: input,
            })
        }
    }

    async saveInfo() {

        let collection = {}
        collection.profileAddress = this.state.profileAddress,
            collection.profileBio = this.state.profileBio,
            collection.profileEmail = this.state.profileEmail,
            collection.category = this.state.category,
            console.warn(collection);
        console.log('IDDDDDDDD', this.props.navigation.getParam('shopId'));


        // if (collection.profileAddress != null) {
        //     await axios.put('https://templateapp.azurewebsites.net/api/shops/' + this.state.shopId + '/address/' + collection.profileAddress, {
        //         profileAddress: this.state.profileAddress,
        //     }, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //         .then(response => {
        //             console.log(response)
        //         })
        //         .catch(error => {
        //             console.log(error.response)
        //         });
        //     this.setState({ profileAddress: collection.profileAddress })
        // }
        // if (collection.profileBio != null) {
        //     await axios.put('https://templateapp.azurewebsites.net/api/shops/' + this.state.shopId + '/infobio/' + collection.profileBio, {
        //         profileBio: this.state.profileBio,
        //     }, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //         .then(response => {
        //             console.log(response)
        //         })
        //         .catch(error => {
        //             console.log(error.response)
        //         });
        //     this.setState({ profileBio: collection.profileBio })
        // }
        // if (collection.profileEmail != null || collection.profileEmail == null) {
        //     await axios.put('https://templateapp.azurewebsites.net/api/shops/' + this.state.shopId + '/contact/' + collection.profileEmail, {
        //         profileEmail: this.state.profileEmail,
        //     }, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //         .then(response => {
        //             console.log(response)
        //         })
        //         .catch(error => {
        //             console.log(error.response)
        //         });
        //     this.setState({ profileEmail: collection.profileEmail })
        // }

        this.props.navigation.navigate('EditShop', { shopId: this.state.shopId, profileAddress: this.state.profileAddress, profileBio: this.state.profileBio, profileEmail: this.state.profileEmail });
    }

    render() {

        return (
            <KeyboardAvoidingView style={styles.container}
                behavior='height'>

                <View style={{ height: 100, backgroundColor: 'black', flexDirection: 'row' }}>
                    <View style={{ width: '33%' }}>
                        <Icon name="ios-arrow-back" color={'#fff'} size={22} style={{ marginTop: 55, marginLeft: 10 }}
                            onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <View style={{ width: '33%' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginTop: 50, alignSelf: 'center' }}>Y O U R    S H O P</Text>
                    </View>
                    <View style={{ width: '33%' }}>
                    </View>
                </View>


                <View>
                    <View style={{ width: '55%', height: 25, backgroundColor: 'white', alignSelf: 'flex-end', marginTop: 20 }}>
                        <Text style={styles.edit}>E D I T  S H O P  I N F O  </Text>
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: 'gray', marginTop: 10, width: '66%', alignSelf: 'flex-end', marginBottom: 20 }}></View>

                <ScrollView>

                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}>Shop Address: </Text>
                    </View>

                    <View style={{ backgroundColor: 'gray', opacity: 0.3, marginBottom: 5, marginTop: 7, height: 40, width: '80%', borderWidth: 2, borderColor: 'white' }}>
                        <TextInput style={styles.answers}
                            onChangeText={(input) => this.updateValue(input, 'shopAddress')}
                            placeholder={this.props.navigation.getParam('profileAddress')}></TextInput>
                    </View>

                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}>Info, bio, message: </Text>
                    </View>

                    <View style={{ backgroundColor: 'gray', opacity: 0.3, marginBottom: 5, marginTop: 7, height: 40, width: '80%', borderWidth: 2, borderColor: 'white' }}>

                        <TextInput style={styles.answers}
                            onChangeText={(input) => this.updateValue(input, 'bioMessage')}
                            placeholder={this.props.navigation.getParam('profileBio')}></TextInput>

                    </View>

                    <View style={{ marginLeft: 0 }}>
                        <Text style={styles.questions}>Contact email: </Text>
                    </View>

                    <View style={{ backgroundColor: 'gray', opacity: 0.3, marginBottom: 5, marginTop: 7, height: 40, width: '80%', borderWidth: 2, borderColor: 'white' }}>
                        <TextInput style={styles.answers}
                            onChangeText={(input) => this.updateValue(input, 'contactEmail')}
                            placeholder={this.props.navigation.getParam('profileEmail')}></TextInput>
                    </View>

                    <View style={{ width: '60%', height: 35, backgroundColor: 'gray', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>

                        <TouchableOpacity onPress={() => this.saveInfo()}>
                            <Text style={styles.save}>S A V E  </Text>
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
    small: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-start',
        marginLeft: 5
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
    activeTitle: {
        color: 'red',
    },
});

