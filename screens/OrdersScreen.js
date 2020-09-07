import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { DrawerActions } from 'react-navigation-drawer';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default class OrdersScreen extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        console.log('pending order params ', this.props.navigation.state)
        this.state = {
            shopId: this.props.navigation.dangerouslyGetParent().getParam('shopId'),
            shopName: this.props.navigation.dangerouslyGetParent().getParam('shopName'),
            total: '',
            loading: true,
            dataSource: [],
        }
    }

    componentDidMount() {
        this._isMounted = true;

        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', async () => {
            fetch("https://templateapp.azurewebsites.net/api/orders/pending/" + this.state.shopName)
                .then(response => response.json())
                .then((responseJson) => {
                    this.setState({
                        loading: false,
                        dataSource: responseJson.reverse(),
                    })
                    console.log("response:" + JSON.stringify(responseJson));
                    console.log('wthell is going on : ', this.props.navigation.state);
                    console.log('where is my nameee: ', this.state.shopName);
                });
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async shipItem(order_id) {
        console.log('this state orderid', order_id)

        await axios.put('https://templateapp.azurewebsites.net/api/orders/' + order_id + '/shipped', {
            shippingDate: new Date()
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response)
                this.setState({ shipped: true });
                console.log('Order shipped!');
                this.props.navigation.navigate('Seller');
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    confirmShip(order_id) {
        console.log('ORDER ID CONFIRM', order_id)
        Alert.alert(
            'Order shipped?',
            'Please confirm you shipped this order.',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => this.shipItem(order_id) },
            ],
            { cancelable: false },
        );

    }

    renderPending = (data) =>
        <View>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
                <View style={{ backgroundColor: 'gray', width: '50%' }}>
                    <Text style={{ fontSize: 19, color: 'white', }}
                        onPress={() => this.props.navigation.navigate('OrderDetails', { order_id: data.item.id, username: data.item.customerUsername, fullName: data.item.fullName, total: data.item.total, confirmation: data.item.paymentConfirmation, shipped: data.item.shipped, shippingAddress: data.item.shippingAddress })}>{data.item.customerUsername}</Text>
                </View>
                <View style={{ width: '50%' }}>
                    <Text style={{ fontSize: 16, color: 'white', alignSelf: 'flex-end' }}>{data.item.createdAt}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%', backgroundColor: 'white', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => this.confirmShip(data.item.id)}>
                        <Text style={{ marginTop: 18, fontSize: 16, color: '#000', alignSelf: 'center', marginBottom: 18 }}>SHIPPED</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column-reverse', alignSelf: 'flex-end', width: '50%' }}>
                    <Text style={{ color: 'white', alignSelf: 'flex-end', fontSize: 20, marginTop: 0, fontWeight: 'bold' }}>TOTAL: {data.item.total}</Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: 'white', width: '66%', marginTop: 10, marginBottom: 30, alignSelf: 'flex-end' }}></View>
        </View>

    render() {

        return (

            <View style={styles.container}>

                <View style={{ height: 100, backgroundColor: 'black', flexDirection: 'row' }}>
                    <View style={{ width: '33%' }}>
                    </View>
                    <View style={{ width: '33%' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginTop: 50, alignSelf: 'center' }}>Y O U R    S H O P</Text>
                    </View>
                    <View style={{ width: '33%' }}>
                    </View>
                </View>

                <View>
                    <Text style={styles.title}>PENDING ORDERS</Text>
                    <Text style={styles.infoText}>Click on customer name to view order</Text>
                    <Text style={styles.infoText}>Click on shipped once the order is shipped to remove from pending</Text>
                </View>

                <View style={{ height: 1, backgroundColor: 'gray', marginTop: 20, marginBottom: 10, width: '66%', alignSelf: 'flex-end' }}></View>

                <FlatList
                    data={this.state.dataSource}
                    renderItem={item => this.renderPending(item)}
                    keyExtractor={item => item.id.toString()}
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
        alignSelf: 'flex-end'
    },
    infoText: {
        fontSize: 15,
        color: '#fff',
        alignSelf: 'flex-end',
        marginTop: 10,
    },
});

