import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Dimensions, FlatList } from 'react-native';
import { Header, Image } from 'react-native-elements';
import axios from 'axios';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class EditShopScreen extends React.Component {

    constructor(props) {
        super(props);
        console.log('params edit shop', this.props.navigation.state);
        this.state = {
            shopName: this.props.navigation.getParam('shopName'),
            shopId: this.props.navigation.getParam('shopId'),
            shopCurr: this.props.navigation.getParam('shopCurr'),
            profileAddress: this.props.navigation.getParam('profileAddress'),
            profileBio: this.props.navigation.getParam('profileBio'),
            profileEmail: this.props.navigation.getParam('profileEmail'),
            followers: '',
            loading: true,
            dataSource: [],
            loading_: true,
            infoSource: [],
            load: true,
            followSource: [],
        };
    }

    componentDidMount() {

        const { navigation } = this.props;

        this.focusListener = navigation.addListener('didFocus', async () => {

            this.setState({
                profileAddress: this.props.navigation.getParam('profileAddress'),
                profileBio: this.props.navigation.getParam('profileBio'),
                profileEmail: this.props.navigation.getParam('profileEmail'),
            })


            // var featuredItems = await axios.get('https://templateapp.azurewebsites.net/api/items/featured/' + this.props.navigation.getParam('shopName'))
            // var json_item = featuredItems['data']

            this.setState({
                loading: false,
                dataSource: json_item
            })
            console.log('featured list--> dataSource.state', json_item);

            // var feedItems = await axios.get('https://templateapp.azurewebsites.net/api/items/feed/' + this.props.navigation.getParam('shopName'))
            // var json_item = feedItems['data']

            this.setState({
                loading_: false,
                infoSource: json_item
            })
            console.log('feed list--> infoSource.state', json_item);

            // var follows = await axios.get('https://templateapp.azurewebsites.net/api/followedshops/shop/' + navigation.getParam('shopId'))
            // var json_item = follows['data']

            this.setState({
                load: false,
                followSource: json_item
            })
            console.log("follow list:", json_item);

            console.log("followers amount " + json_item.length);
            this.setState({
                followers: json_item.length
            })
        })
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        return true;
    }

    renderFeatured = (data) =>
        // FEATURED LIST // *******************************************************************************************************************

        <View style={{ marginTop: 25, marginLeft: 5 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditItem', { itemId: data.item.id, shopCurr: this.state.shopCurr, shopId: this.state.shopId, image: data.item.image, featured: data.item.featured, name: data.item.name, gender: data.item.gender, price: data.item.price, sale: data.item.sale, hashtags: data.item.hashtags, category: data.item.category, size: data.item.size })}>
                <Image style={{ width: 300, height: 300, marginRight: 5 }}
                    source={{ isStatic:true, uri: data.item.image }}>
                </Image>
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 25, marginBottom: 10, marginTop: 10, marginLeft: 5, alignSelf: 'center' }}>{data.item.price}</Text>
        </View>

    renderFeed = (data) =>
        // FEED LIST // *******************************************************************************************************************

        <View style={{ marginLeft: 0, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditItem', { itemId: data.item.id, shopCurr: this.state.shopCurr, shopId: this.state.shopId, image: data.item.image, featured: data.item.featured, name: data.item.name, gender: data.item.gender, price: data.item.price, sale: data.item.sale, hashtags: data.item.hashtags, category: data.item.category, size: data.item.size })}>
                <Image style={styles.images}
                    source={{ isStatic:true, uri: data.item.image }}></Image>
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 25, marginBottom: 10, alignSelf: 'center' }}>{data.item.price}</Text>
        </View>

    FlatListHeader = () => {

        return (

            <View>
                <View style={{ width: '40%', height: 25, backgroundColor: 'gray', alignSelf: 'flex-end', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditShopInfo', { shopId: this.state.shopId, profileAddress: this.state.profileAddress, profileBio: this.state.profileBio, profileEmail: this.state.profileEmail })}>
                        <Text style={styles.edit}>E D I T  I N F O  </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: 'flex-end', width: '60%' }}>
                    <View>
                        <Text style={{ fontSize: 15, color: '#fff', marginTop: 10, alignSelf: 'flex-end' }}>{this.state.profileAddress}</Text>
                        <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'flex-end' }}>{this.state.profileBio}</Text>
                        <Text style={{ fontSize: 15, color: '#fff', alignSelf: 'flex-end' }}>{this.state.profileEmail}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.title}>FEATURED ITEMS</Text>
                    <Text style={{ fontSize: 15, color: '#fff', marginTop: 5, alignSelf: 'center' }}>Featured items : Sales, New Arrivals, Best Sellers...</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddFeatured', { shopName: this.state.shopName, shopId: this.state.shopId, shopCurr: this.state.shopCurr })}>
                        <Text style={{ color: '#fff', fontSize: 60, alignSelf: 'center', marginTop: 10 }}> + </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <FlatList
                            horizontal={true}
                            data={this.state.dataSource}
                            renderItem={item => this.renderFeatured(item)}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                    <View style={{ height: 1, backgroundColor: 'gray', width: '66%', alignSelf: 'center', marginTop: 40 }}></View>
                </View>

                <View style={{ alignItems: 'stretch', alignSelf: 'stretch' }}>
                    <Text style={{ color: '#fff', fontSize: 19, fontWeight: 'bold', marginTop: 45, alignSelf: 'center' }}>SHOP</Text>
                    <View style={{ alignSelf: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('AddItem', { shopName: this.state.shopName, shopId: this.state.shopId, shopCurr: this.state.shopCurr })}>
                            <Text style={{ color: 'white', fontSize: 60, alignSelf: 'center', marginTop: 10 }}> + </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {

        return (

            <View style={styles.container}>
                <View style={{ alignSelf: 'center', marginTop: 40 }}>
                    <Text style={styles.title}>{this.state.shopName}</Text>
                </View>
                <View style={{ backgroundColor: 'black', marginBottom: 20, flexDirection: 'row', width: '50%', marginTop: 10 }}>
                    <View style={{ height: 20, width: '100%', backgroundColor: 'gray', alignSelf: 'flex-start', marginTop: 5 }}>
                        <TouchableOpacity>
                            <Text style={{ color: '#fff', alignSelf: 'center', marginTop: 2, fontWeight: 'bold' }}>F O L L O W E R S  {this.state.followers}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    ListHeaderComponent={this.FlatListHeader}
                    data={this.state.infoSource}
                    renderItem={item => this.renderFeed(item)}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                />
            </View>
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: '5%',
        alignSelf: 'center',
    },
    images: {
        width: screenWidth / 2.25,
        height: 200,
        alignSelf: 'center',
        marginTop: 25,
        marginRight: 10,
        marginLeft: 10,

    },
    activeTitle: {
        color: 'red',
    },
    edit: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        marginTop: 3
    },
});
