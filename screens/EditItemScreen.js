import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, TextInput, Picker, Alert, FlatList } from 'react-native';
import { Image, CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class EditItemScreen extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        console.log('dataaaa edit item screen', this.props.navigation.state);
        this.state = {
            itemId: this.props.navigation.getParam('itemId'),
            image: this.props.navigation.getParam('image'),
            shopCurr: this.props.navigation.getParam('shopCurr'),
            name: '',
            price: '',
            gender: '',
            size: '',
            category: '',
            hashtags: '',
            description: '',
            sale: '',
            featured: this.props.navigation.getParam('featured'),
            dataSource:[]
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPermissionAsync();
        if (this.state.featured == true) {
            this.setState({ checked: !this.state.checked })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [10, 10],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }

            console.log('results', result);
        } catch (E) {
            console.log(E);
        }

        console.log('chosen pic uri', this.state.image);
    };

    updateGender = (gender) => {
        this.setState({ gender: gender })
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

    updateValue(input, field) {

        if (field == 'name') {
            this.setState({
                name: input,
            })
        }
        else if (field == 'price') {
            this.setState({
                price: input,
            })
        }
        else if (field == 'size') {
            this.setState({
                size: input,
            })
        }
        else if (field == 'category') {
            this.setState({
                category: input,
            })
        }
        else if (field == 'hashtags') {
            this.setState({
                hashtags: input,
            })
        }
        else if (field == 'description') {
            this.setState({
                description: input,
            })
        }
        else if (field == 'sale') {
            this.setState({
                sale: input,
            })
        }
    }

    async submitItem() {

        if (this.state.size.includes(',')) {
            alert('Please delete the commas in your size field.')
            return;
        }

        if (this.state.price.includes(',') || this.state.price.includes('.')) {
            alert('Please round your prices up or down.')
            return;
        }

        let collection = {}
        collection.name = this.state.name,
            collection.price = this.state.price,
            collection.gender = this.state.gender,
            collection.size = this.state.size,
            collection.image = this.state.image,
            collection.hashtags = this.state.hashtags,
            collection.category = this.state.category,
            collection.description = this.state.description,
            collection.sale = this.state.sale,
            collection.featured = this.state.featured,
            console.warn(collection);


        if (collection.image != this.props.navigation.getParam('image') || this.props.navigation.getParam('image') == null) {

            console.log('item to change ID', this.state.id);
            console.log('uri from old pic', this.props.navigation.getParam('image'));
            console.log('uri from new pic', collection.image);
            await axios.put('https://templateapp.azurewebsites.net/api/items/' + this.state.itemId + '/image/', {
                image: this.state.image,
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
            this.setState({ image: collection.image })
        }

        if (collection.featured != this.props.navigation.getParam('featured')) {

            console.log('item to change ID', this.state.id);
            console.log('uri from old pic', this.props.navigation.getParam('image'));
            console.log('uri from new pic', collection.image);
            await axios.put('https://templateapp.azurewebsites.net/api/items/' + this.state.itemId + '/feat/' + collection.featured, {
                featured: this.state.featured,
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
            this.setState({ featured: collection.featured })
        }

        if (collection.name != '') {
            await axios.put('https://templateapp.azurewebsites.net/api/items/' + this.state.itemId + '/name/' + collection.name, {
                name: this.state.name,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                });
            this.setState({ name: collection.name })
        }

        if (collection.price != '') {
            await axios.put('https://templateapp.azurewebsites.net/api/items/' + this.state.itemId + '/price/' + collection.price, {
                price: this.state.price,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                });
            this.setState({ price: collection.price })
        }

        if (collection.gender != '') {
            await axios.put('https://templateapp.azurewebsites.net/api/items/' + this.state.itemId + '/gender/' + collection.gender, {
                gender: this.state.gender,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                });
            this.setState({ gender: collection.gender })
        }

        if (collection.size != '') {
            await axios.put('https://templateapp.azurewebsites.net/api/items/' + this.state.itemId + '/size/' + collection.size, {
                size: this.state.size,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                });
            this.setState({ size: collection.size })
        }

        if (collection.description != '') {
            await axios.put('https://templateapp.azurewebsites.net/api/items/' + this.state.itemId + '/desc/' + collection.description, {
                description: this.state.description,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                });
            this.setState({ description: collection.description })
        }

        if (collection.hashtags != '') {
            await axios.put('https://templateapp.azurewebsites.net/api/items/' + this.state.itemId + '/hash/' + collection.hashtags, {
                hashtags: this.state.hashtags,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                });
            this.setState({ hashtags: collection.hashtags })
        }

        if (collection.category != '') {
            await axios.put('https://templateapp.azurewebsites.net/api/items/' + this.state.itemId + '/cat/' + collection.category, {
                cateogry: this.state.cateogry,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                });
            this.setState({ category: collection.category })
        }

        if (collection.sale != '') {
            await axios.put('https://templateapp.azurewebsites.net/api/items/' + this.state.itemId + '/sale/' + collection.sale, {
                sale: this.state.sale,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error.response)
                });
            this.setState({ sale: collection.sale })
        }

        console.log('featured item added!');
        this.props.navigation.navigate('EditShop');

    }


    deleteItem() {
        let collection = {}
        collection.image = this.state.image,
            collection.name = this.state.name,
            collection.price = this.state.price,
            collection.gender = this.state.gender,
            collection.size = this.state.size,
            collection.category = this.state.category,
            collection.hashtags = this.state.hashtags,
            collection.description = this.state.description,
            collection.sale = this.state.sale,
            collection.featured = this.state.featured,
            console.warn(collection);

        fetch("https://templateapp.azurewebsites.net/api/items/" + this.state.id, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(collection),
        })
            .then((response) => response.json())
            .then((collection) => {
                console.log('Success:', collection);
                console.log('featured item deleted');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        this.props.navigation.navigate('EditShop');
    }

    alertDeleteItem() {

        Alert.alert(
            'Delete Item?',
            'Are you sure you want to delete this item from your shop?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => this.deleteItem() },
            ],
            { cancelable: false },
        );
    }

    renderReview = (data) =>
        <View style={{ backgroundColor: 'gray', marginBottom: 5 }}>
            <View style={{ backgroundColor: 'lightgrey', width: '55%', opacity: 0.9 }}>
                <Text style={{ fontSize: 15, color: 'black', marginTop: 5, alignSelf: 'flex-end', fontWeight: 'bold' }}>{data.item.CustomerUsername}</Text>
            </View>
            {this.state.ranking = 5 ? (
                <View style={{ flexDirection: 'row', backgroundColor: 'black', opacity: 0.8, width: '30%' }}>
                    <Text style={{ fontSize: 25, color: 'white', marginTop: 5, fontWeight: 'bold' }}> * * * * * </Text>
                    <Text style={{ fontSize: 25, color: 'gray', marginTop: 5, fontWeight: 'bold' }}>  </Text>
                </View>
            ) : this.state.ranking = 4 ? (
                <View style={{ flexDirection: 'row', backgroundColor: 'black', opacity: 0.8, width: '30%' }}>
                    <Text style={{ fontSize: 25, color: 'white', marginTop: 5, fontWeight: 'bold' }}> * * * *</Text>
                    <Text style={{ fontSize: 25, color: 'gray', marginTop: 5, fontWeight: 'bold' }}> * </Text>
                </View>
            ) : this.state.ranking = 3 ? (
                <View style={{ flexDirection: 'row', backgroundColor: 'black', opacity: 0.8, width: '30%' }}>
                    <Text style={{ fontSize: 25, color: 'white', marginTop: 5, fontWeight: 'bold' }}> * * * </Text>
                    <Text style={{ fontSize: 25, color: 'gray', marginTop: 5, fontWeight: 'bold' }}> * * </Text>
                </View>
            ) : this.state.ranking = 2 ? (
                <View style={{ flexDirection: 'row', backgroundColor: 'black', opacity: 0.8, width: '30%' }}>
                    <Text style={{ fontSize: 25, color: 'white', marginTop: 5, fontWeight: 'bold' }}> * * </Text>
                    <Text style={{ fontSize: 25, color: 'gray', marginTop: 5, fontWeight: 'bold' }}> * * * </Text>
                </View>
            ) : this.state.ranking = 1 ? (
                <View style={{ flexDirection: 'row', backgroundColor: 'black', opacity: 0.8, width: '30%' }}>
                    <Text style={{ fontSize: 25, color: 'white', marginTop: 5, fontWeight: 'bold' }}> * </Text>
                    <Text style={{ fontSize: 25, color: 'gray', marginTop: 5, fontWeight: 'bold' }}> * * * * </Text>
                </View>
            ) : null}

            <View style={{ borderWidth: 0.5, borderColor: 'grey', marginBottom: 1 }}>
                <Text style={{ fontSize: 16, color: 'white', marginBottom: 10, marginTop: 0, marginRight: 5, marginLeft: 5, alignSelf: 'center' }}>{data.item.comment}</Text>
            </View>
        </View>


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

                <ScrollView>

                    <Text style={styles.title}>EDIT ITEM</Text>

                    <View>
                        <View style={{ width: '25%', height: 25, backgroundColor: 'red', alignSelf: 'flex-end', marginTop: 5 }}>

                            <TouchableOpacity onPress={() => this.alertDeleteItem()}>
                                <Text style={{ color: '#fff', alignSelf: 'center', marginTop: 2, fontWeight: 'bold', fontSize: 16 }}>D E L E T E</Text>
                            </TouchableOpacity>
                        </View>
                        <Image style={{ width: screenWidth, height: 500, alignSelf: 'center', marginTop: 5, marginBottom: 10 }}
                            source={{ isStatic:true, uri: this.state.image }}>
                            <TouchableOpacity onPress={() => this._pickImage()}>
                                <Text style={{ alignSelf: 'center', marginTop: 190, fontSize: 100, }}> + </Text>
                            </TouchableOpacity>
                        </Image>
                    </View>

                    <View>
                        <Text style={styles.infoText}>NAME:</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'name')}
                                placeholder={this.props.navigation.getParam('name')}
                                autoCapitalize={"none"}></TextInput>
                        </View>

                        <Text style={styles.infoText}>PRICE:</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'price')}
                                placeholder={this.props.navigation.getParam('price')}></TextInput>
                        </View>

                        <Text style={styles.infoText}>GENDER:</Text>
                        <View style={styles.inputView}>
                            {Constants.platform.ios ? (
                                <View style={{ marginTop: 5, marginLeft: 3 }}>
                                    <RNPickerSelect
                                        onValueChange={this.updateGender}
                                        items={[
                                            { label: 'MAN', value: 'MAN' },
                                            { label: 'WOMAN', value: 'WOMAN' },
                                            { label: 'BOTH', value: 'BOTH' },
                                        ]}
                                    />
                                </View>
                            ) :
                                <Picker selectedValue={this.state.gender} onValueChange={this.updateGender}
                                    style={{ height: 25, backgroundColor: 'gray', marginBottom: 1, width: '66%', color: '#fff' }}>
                                    <Picker.Item label="Select" value="Select" />
                                    <Picker.Item label="MEN" value="MEN" />
                                    <Picker.Item label="WOMEN" value="WOMEN" />
                                    <Picker.Item label="BOTH" value="BOTH" />
                                </Picker>
                            }
                        </View>

                        <Text style={styles.infoText}>SIZE:</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'size')}
                                placeholder={this.props.navigation.getParam('size')}></TextInput>
                        </View>

                        <Text style={styles.infoText}>CATEGORY:</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'category')}
                                placeholder={this.props.navigation.getParam('category')}
                                autoCapitalize={"none"}></TextInput>
                        </View>

                        <Text style={styles.infoText}>HASHTAGS:</Text>
                        <View style={{ height: 60, backgroundColor: 'gray', marginBottom: 10, width: '66%', alignSelf: 'center', borderWidth: 2, borderColor: 'lightgrey' }}>
                            <TextInput multiline style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'hashtags')}
                                autoCapitalize={"none"}>{this.props.navigation.getParam('hashtags')}</TextInput>
                        </View>

                        <Text style={styles.infoText}>DESCRIPTION:</Text>
                        <View style={{ height: 90, backgroundColor: 'gray', marginBottom: 10, width: '66%', alignSelf: 'center', borderWidth: 2, borderColor: 'lightgrey' }}>
                            <TextInput multiline style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'description')}></TextInput>
                        </View>

                        <Text style={styles.infoText}>SALE:</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'sale')}
                                placeholder={this.props.navigation.getParam('sale')}></TextInput>
                        </View>

                        <Text style={styles.infoText}>FEATURED:</Text>

                        <CheckBox
                            checked={this.state.checked}
                            onPress={() => this.updateCheck()}
                            containerStyle={{ backgroundColor: 'black', borderColor: 'transparent', alignItems: 'center' }}
                            checkedColor='lightgray'
                        />

                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                            <View style={{ width: '50%', backgroundColor: 'white', marginRight: 3, marginBottom: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditShop')}>
                                    <Text style={{ marginTop: 15, fontSize: 13, color: '#ff0000', alignSelf: 'center', marginBottom: 15 }}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '50%', backgroundColor: 'white', marginBottom: 10 }}>
                                <TouchableOpacity onPress={() => this.submitItem()}>
                                    <Text style={{ marginTop: 15, fontSize: 13, color: '#000', alignSelf: 'center', marginBottom: 15 }}>EDIT ITEM</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
    },
    header: {
        flex: 1,
        fontSize: 50,
    },
    title: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 0,
        alignSelf: 'center',
    },
    infoText: {
        fontSize: 15,
        color: '#fff',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    inputView: {
        height: 30,
        backgroundColor: 'gray',
        marginBottom: 10,
        width: '66%',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'lightgrey',
    },
    inputText: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#fff',
        marginLeft: 3,
        marginRight: 3
    },
});

