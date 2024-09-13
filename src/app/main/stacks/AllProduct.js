import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../helpers/AxiosInstance';
import { useNavigation } from '@react-navigation/native';

const AllProduct = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [categoryID, setCategoryID] = useState(null);
    console.log(categoryID);

    const renderCategories = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => { setCategoryID(item._id) }}>
                    <Text style={{ marginLeft: 15, color: '#FE724C', fontSize: 14, fontWeight: 'bold'}}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderProduct = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Detail', { _id: item._id })}
            >
                <View style={{ marginRight: 15, marginTop: 15 }}>
                    <Image
                        style={{ width: 155, height: 134, backgroundColor: '#F6F6F6', borderRadius: 10 }}
                        source={{ uri: `${item.images[0]}` }} />
                    <Text style={{ fontSize: 16, width: 115 }} numberOfLines={1}>{item.name}</Text>
                    <Text style={{ color: '#7D7B7B', fontSize: 12, marginVertical: 2 }}>{item.category_id.name}</Text>
                    <Text style={{ fontSize: 16, color: '#FE724C' }}>{item.price}đ</Text>
                </View>
            </TouchableOpacity>
        );
    };


    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await AxiosInstance().get('/categories');
                console.log('Get category successfully: ', response);
                if (response.status === true) {
                    setCategories(response.data);
                } else {
                    console.log("Lấy data từ API thất bại!");
                }
            } catch (error) {
                console.log('Get category error: ', error.message || error);
            }
        }
        getCategory();
    }, []);

    useEffect(() => {
        const getProduct = async () => {
            try {
                if (!categoryID) {
                    const response = await AxiosInstance().get('/products');
                    console.log('Get products successfully: ', response);
                    if (response.status) {
                        setProducts(response.data);
                    } else {
                        console.log("Lấy data từ API thất bại!");
                    }
                } else {
                    const response = await AxiosInstance().get(`/products/get_product_category/${categoryID}`);
                    console.log('Get products successfully: ', response);
                    if (response.status) {
                        setProducts(response.data);
                    } else {
                        console.log("Lấy data từ API thất bại!");
                    }
                }
            } catch (error) {
                console.log('Get products error: ', error.message || error);
            }
        }
        getProduct();
    }, [categoryID]);

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={require('../../../../assets/images/backblack.png')} />
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.labelHeader}>
                    FAST FOOD
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <Image
                        source={require('../../../../assets/images/cartnon.png')} />
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', height: 50, paddingHorizontal: 25 }}>
                <FlatList
                    style={{ paddingVertical: 15, height: 28, width: 305 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={renderCategories}
                />
            </View>

            <View
                style={{ width: '100%', paddingHorizontal: 25, height: '70%'}}
            >
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={products}
                    renderItem={renderProduct}
                    numColumns={2}
                />
            </View>
        </View>
    )
}

export default AllProduct

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    labelHeader: {
        fontSize: 16,
        fontWeight: '500',
        width: 85
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 40,
        fontSize: 16,
        paddingBottom: 16
    },
})