import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TextInput, Picker, Alert } from 'react-native';
import { Image } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

export const Dropdown = () => {
    return (
        <View style={{ marginTop: 5, marginLeft: 3 }}>
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={[
                    { label: 'MAN', value: 'MAN' },
                    { label: 'WOMAN', value: 'WOMAN' },
                    { label: 'BOTH', value: 'BOTH' },
                ]}
            />
        </View>
    );
};

export default class AddFeaturedScreen extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        console.log('data params add featured', this.props.navigation.state)
        this.state = {
            name: 'first',
            shopName: this.props.navigation.getParam('shopName'),
            shopId: this.props.navigation.getParam('shopId'),
            shopCurr: this.props.navigation.getParam('shopCurr'),
            price: '',
            gender: 'women',
            size: '5',
            hashtags: 'testingonly',
            description: 'realreal',
            sale: '',
            featured: true,
            image: '',
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPermissionAsync();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateGender = (gender) => {
        this.setState({ gender: gender })
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

    async addItem() {

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
            collection.shopName = this.state.shopName,
            collection.shopId = this.state.shopId,
            collection.price = this.state.price + ' ' + this.state.shopCurr,
            collection.gender = this.state.gender,
            collection.size = this.state.size,
            collection.image = this.state.image,
            collection.hashtags = this.state.hashtags,
            collection.category = this.state.category,
            collection.description = this.state.description,
            collection.sale = this.state.sale,
            collection.featured = this.state.featured
        console.warn(collection);

        await fetch("https://templateapp.azurewebsites.net/api/items/", {
            method: 'POST', // or 'PUT'
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(collection),
        })
            .then((response) => response.json())
            .then((collection) => {
                console.log('Success post item:', collection);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        this.props.navigation.navigate('EditShop');
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
                aspect: [5, 7],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
            console.log('results', result);
        } catch (E) {
            console.log(E);
        }
    };

    render() {

        let { image } = this.state;

        return (

            <KeyboardAvoidingView style={styles.container}
                behavior='height'>

                <View style={{ height: 100, backgroundColor: 'black', flexDirection: 'row' }}>
                    <View style={{ width: '33%' }}>
                    </View>
                    <View style={{ width: '33%' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15, marginTop: 50, alignSelf: 'center' }}>Y O U R    S H O P</Text>
                    </View>
                    <View style={{ width: '33%' }}>
                    </View>
                </View>

                <ScrollView>

                    <Text style={styles.title}>ADD FEATURED ITEM</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={this._pickImage}>
                            <Text style={{ alignSelf: 'center', fontSize: 70, color: '#fff' }}> + </Text>
                        </TouchableOpacity>
                        {/* {image && <Image source={{ isStatic:true, uri: image }} style={{ width: 400, height: 500, resizeMode:'contain' }} />} */}
                    </View>

                    <View>
                        <Text style={styles.infoText}>NAME:</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'name')}
                                autoCapitalize={"none"}></TextInput>
                        </View>

                        <Text style={styles.infoText}>PRICE:</Text>
                        <Text style={styles.smallText}>Please round your prices up or down and only enter full numbers.</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'price')}></TextInput>
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
                        <Text style={styles.smallText}>Please do not use commas, separate your sizes with spaces only.</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'size')}></TextInput>
                        </View>

                        <Text style={styles.infoText}>CATEGORY:</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'category')}
                                autoCapitalize={"none"}></TextInput>
                        </View>

                        <Text style={styles.infoText}>HASHTAGS:</Text>
                        <View style={{ height: 60, backgroundColor: 'gray', marginBottom: 10, width: '66%', alignSelf: 'center', borderWidth: 2, borderColor: 'lightgrey' }}>
                            <TextInput multiline style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'hashtags')}
                                autoCapitalize={"none"}></TextInput>
                        </View>

                        <Text style={styles.infoText}>DESCRIPTION:</Text>
                        <View style={{ height: 90, backgroundColor: 'gray', marginBottom: 10, width: '66%', alignSelf: 'center', borderWidth: 2, borderColor: 'lightgrey' }}>
                            <TextInput multiline style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'description')}></TextInput>
                        </View>

                        <Text style={styles.infoText}>SALE:</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText}
                                onChangeText={(input) => this.updateValue(input, 'sale')}></TextInput>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: '50%', backgroundColor: 'white', marginRight: 3, marginBottom: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditShop')}>
                                    <Text style={{ marginTop: 15, fontSize: 13, color: '#ff0000', alignSelf: 'center', marginBottom: 15 }}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '50%', backgroundColor: 'white', marginBottom: 10 }}>
                                <TouchableOpacity onPress={() => this.addItem()}>
                                    <Text style={{ marginTop: 15, fontSize: 13, color: '#000', alignSelf: 'center', marginBottom: 15 }}>ADD ITEM</Text>
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
        marginBottom: 5,
        alignSelf: 'center',
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
    infoText: {
        fontSize: 15,
        color: '#fff',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    smallText: {
        fontSize: 12,
        color: '#fff',
        alignSelf: 'center',
        marginBottom: 5,
    },
    inputText: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#fff',
        marginLeft: 3,
        marginRight: 3
    },
});

