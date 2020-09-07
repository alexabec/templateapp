import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class OrderDetailsScreen extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            shipped: this.props.navigation.getParam('shipped'),
            order_id: this.props.navigation.getParam('order_id'),
            username: this.props.navigation.getParam('username'),
            fullName: this.props.navigation.getParam('fullName'),
            shippingAddress: this.props.navigation.getParam('shippingAddress'),
            total: this.props.navigation.getParam('total'),
            confirmation: this.props.navigation.getParam('confirmation'),
            createdAt: this.props.navigation.getParam('createdAt'),
            loading: true,
            dataSource: [],
            itemsSource: [],
        }
    }

    componentDidMount() {
        this._isMounted = true;

        console.log('refreshed_od', this.props.navigation.state);
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', async () => {
            fetch("https://templateapp.azurewebsites.net/api/orderdetails/order/" + this.state.order_id)
                .then(response => response.json())
                .then((responseJson) => {
                    this.setState({
                        loading: false,
                        dataSource: responseJson
                    })
                    console.log("response:" + JSON.stringify(responseJson));
                });
            this.setState({
                shipped: this.state.shipped
            })
            console.log('shipped status', this.state.shipped);
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    emailCopy() {
        // on press, email copy to business_acc_email.
        console.log('email sent');

        Alert.alert(
            'Email Sent!',
            'A copy of this order has been sent to your email.',
            [
                {
                    text: 'OK',
                    onPress: () => this.props.navigation.pop()
                },
            ],
            { cancelable: false },
        );
    }

    renderOrderItems = (data) =>

        <View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View style={{ width: '50%' }}>
                    <Text style={{ fontSize: 15, color: 'white', alignSelf: 'flex-start', marginBottom: 5 }}>{data.item.itemName} {data.item.itemSize}</Text>
                    <Image style={{ height: 50, width: 50, marginBottom: 10, backgroundColor: 'cyan', alignSelf: 'center' }}
                        source={{ isStatic:true, uri: data.item.itemImage }}></Image>
                </View>
                <View style={{ width: '50%', flexDirection: 'row-reverse' }}>
                    <Text style={{ color: 'white', alignSelf: 'flex-end', marginBottom: 15 }}>{data.item.itemPrice}</Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: 'grey', width: '66%', marginTop: 10, marginBottom: 10, alignSelf: 'flex-start' }}></View>
        </View>

    ListHeaderContent = () => {
        return (
            <View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <View style={{ backgroundColor: 'gray', width: '50%' }}>
                        <Text style={{ fontSize: 19, color: 'white', }}> {this.state.username}</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: 19, color: 'white', alignSelf: 'flex-end' }}>{this.state.createdAt}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '30%', backgroundColor: 'white', height: 120 }}>
                        <Text style={{ fontSize: 15, color: 'black', alignSelf: 'flex-start', marginBottom: 5, marginTop: 10 }}> Order Number: </Text>
                        <Text style={{ fontSize: 15, color: 'black', alignSelf: 'flex-start', marginBottom: 5 }}> Username: </Text>
                        <Text style={{ fontSize: 15, color: 'black', alignSelf: 'flex-start', marginBottom: 5 }}> Shipping Address: </Text>
                        <Text style={{ fontSize: 15, color: 'black', alignSelf: 'flex-start', marginBottom: 5 }}> Payment Confirmation: </Text>
                    </View>

                    <View style={{ width: '70%', backgroundColor: 'black', marginLeft: 5, height: 130 }}>
                        <Text style={{ color: 'white', alignSelf: 'flex-start', marginBottom: 5, marginTop: 10 }}> {this.state.order_id} </Text>
                        <Text style={{ color: 'white', alignSelf: 'flex-start', marginBottom: 5 }}> {this.state.fullName} </Text>
                        <Text style={{ color: 'white', alignSelf: 'flex-start', marginBottom: 5 }}> {this.state.shippingAddress} </Text>
                        <Text style={{ color: 'white', alignSelf: 'flex-start', marginBottom: 5, marginTop: 5, fontWeight: 'bold' }}> {this.state.confirmation} </Text>
                    </View>
                </View>
            </View>
        )
    }

    listFooter = () => {
        return (
            <View>
                <Text style={{ color: 'white', alignSelf: 'flex-end', fontSize: 20, marginTop: 20, fontWeight: 'bold', marginBottom: 0 }}>{this.state.total}</Text>
                <View style={{ width: '50%', backgroundColor: 'white', marginTop: 20, alignSelf: 'center', marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => this.emailCopy()}>
                        <Text style={{ marginTop: 18, fontSize: 16, color: '#000', alignSelf: 'center', marginBottom: 18 }}>EMAIL COPY</Text>
                    </TouchableOpacity>
                </View>
                {this.state.shipped ? (
                    <Text style={{ color: 'white' }}>Shipped.</Text>
                ) : null
                }
                <View style={{ height: 1, backgroundColor: 'white', width: '66%', marginTop: 10, marginBottom: 30, alignSelf: 'flex-end' }}></View>
            </View>
        )
    }

    render() {

        return (

            <View style={styles.container}>
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
                    <Text style={styles.title}>ORDER DETAILS</Text>
                </View>
                <View style={{ height: 1, backgroundColor: 'gray', marginTop: 20, marginBottom: 20, width: '66%', alignSelf: 'flex-end' }}></View>

                <FlatList
                    data={this.state.dataSource}
                    renderItem={item => this.renderOrderItems(item)}
                    keyExtractor={item => item.id.toString()}
                    ListHeaderComponent={this.ListHeaderContent}
                    ListFooterComponent={this.listFooter}
                />
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
        borderLeftWidth: 5,
        borderRightWidth: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
        alignSelf: 'flex-end'
    },
});

