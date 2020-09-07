import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SellerScreen extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        console.log('params seller screen', this.props.navigation.state);
        this.state = {
            shopName: this.props.navigation.getParam('shopName'),
            shopId: this.props.navigation.getParam('shopId'),
            businessUserList: this.props.navigation.getParam('businessUserList'),
            loading: true,
            dataSource: [],
            refundsView: false,
            salesView: true,
        };
    }

    componentDidMount() {
        this._isMounted = true;

        console.log('refreshed_ss', this.state.shopName);
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', async () => {
            await fetch("https://templateapp.azurewebsites.net/api/orders/history/" + this.state.shopName)
                .then(response => response.json())
                .then((responseJson) => {
                    this.setState({
                        loading: false,
                        dataSource: responseJson.reverse(),
                    })
                    console.log("response:" + JSON.stringify(responseJson));
                });

            // API FOR REFUNDS!!!
            // await fetch("https://templateapp.azurewebsites.net/api/orders/history/" + this.state.shopName)
            // .then(response => response.json())
            // .then((responseJson) => {
            //     this.setState({
            //         loading: false,
            //         dataSource: responseJson.reverse(),
            //     })
            //     console.log("response:" + JSON.stringify(responseJson));
            // });
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    displaySales() {
        this.setState({
            salesView: false,
            refundsView: true,
        })
    }
    displayRefunds() {
        this.setState({
            refundsView: false,
            salesView: true,
        })
    }

    renderSalesHistory = (data) =>

        <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderDetails', { order_id: data.item.id, username: data.item.customerUsername, fullName: data.item.fullName, shippingAddress: data.item.shippingAddress, createdAt: data.item.createdAt, total: data.item.total, confirmation: data.item.paymentConfirmation, shipped: data.item.shipped })}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 10 }}>
                    <View style={{ backgroundColor: 'gray', width: '50%' }}>
                        <Text style={{ fontSize: 19, color: 'white', marginLeft: 2, }}>{data.item.customerUsername}</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontSize: 19, color: 'white', alignSelf: 'flex-end' }}>{data.item.date}</Text>
                    </View>
                </View>
                <Text style={{ color: 'white', alignSelf: 'flex-end', fontSize: 20, marginTop: 0, fontWeight: 'bold' }}>TOTAL: {data.item.total}</Text>
                <Text style={styles.infoText}>Shipped on {data.item.shippingDate}</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: 'white', width: '66%', marginTop: 10, marginBottom: 10, alignSelf: 'flex-end' }}></View>
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
                    <Text style={styles.title}> {this.state.shopName} </Text>

                    <View style={{ width: '25%', height: 25, backgroundColor: 'gray', alignSelf: 'flex-end', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditSeller', { shopId: this.state.shopId, shopName: this.state.shopName, businessUserList: this.state.businessUserList })}>
                            <Text style={{ color: 'black', alignSelf: 'flex-end', marginTop: 2, marginLeft: 2, fontWeight: 'bold', fontSize: 16 }}> E D I T </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: 'gray', marginTop: 10, width: '66%', alignSelf: 'flex-end', marginBottom: 10 }}></View>

                {this.state.salesView ? (
                    <View style={{ flex: 1}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.active} onPress={() => this.displayRefunds()}> SALES HISTORY</Text>
                        <Text style={styles.inactive} onPress={() => this.displaySales()}>REFUNDS</Text>
                    </View>
                    
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={item => this.renderSalesHistory(item)}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                ) : <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.inactive} onPress={() => this.displayRefunds()}> SALES HISTORY</Text>
                        <Text style={styles.active} onPress={() => this.displaySales()}>REFUNDS</Text>
                    </View>
                }



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
    header: {
        flex: 1,
        fontSize: 50,
    },
    active: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 18,
        marginBottom: 12,
    },
    inactive: {
        fontSize: 19,
        color: 'lightgrey',
        marginTop: 18,
        marginBottom: 10,
    },
    edit: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        marginTop: 3
    },
    infoText: {
        fontSize: 15,
        color: '#fff',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
});

