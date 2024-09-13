import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import InputCom from '../../com/InputCom'
import AppStyles from '../../AppStyles'
import AxiosInstance from '../../helpers/AxiosInstance'

const Cart = () => {
  const navigation = useNavigation();

  const [key, setKey] = useState("");
  const [products, setProducts] = useState([]);

  const clearKey = () => {
    if (key !== "") {
      setKey("");
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { _id: item._id })}>
        <View style={styles.containerItem}>
          <Image
            style={styles.image}
            source={{ uri: item.images[0] }} />
          <View style={styles.labelItemContainer}>
            <Text numberOfLines={1} style={styles.nameItem}>
              {item.name}
            </Text>
            <Text numberOfLines={1} style={styles.priceItem}>
              {item.price}đ
            </Text>
            <Text style={styles.desItem}>
              {item.quantity} products left
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await AxiosInstance().get(`/products/search?key=${key}`);
        console.log('Get products successfully: ', response);
        if (response.status === true) {
          setProducts(response.data);
        } else {
          console.log("Lấy data từ API thất bại!");
        }
      } catch (error) {
        console.log('Get products error: ', error.message || error);
      }
    }
    getProducts();
  }, [key]);
  console.log(products);

  const getLabelIPStyle = () => {
    return {
      fontSize: 18,
      fontWeight: '400',
      paddingVertical: 14,
    }
  }

  const getIpStyle = () => {
    return {
      borderWidth: 1,
      borderTopColor: 'white',
      borderRightColor: 'white',
      borderLeftColor: 'white',
      borderBottomColor: '#221F1F',
      width: 280,
      height: 55,
    }
  }
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
          SEARCH
        </Text>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/R.c76ac73708a219e48210c599f3c50b66?rik=adStq0arvqW12w&pid=ImgRaw&r=0' }} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerBody}>
        <View style={{ position: 'relative' }}>
          <InputCom
            placeholder={"Search"}
            value={key}
            placeholderTextColor={"black"}
            onChangeText={text => setKey(text)}
            styles={{
              container: getIpStyle(),
              input: getLabelIPStyle(),
            }} />
        </View>
        <TouchableOpacity onPress={clearKey}
          style={{ position: 'absolute', right: 48, bottom: 15 }}
        >
          <Image
            source={!key ? require('../../../../assets/images/search.png') : require('../../../../assets/images/clear.png')} />
        </TouchableOpacity>
      </View>

      {key &&
        <View style={styles.flatlist}>
          <FlatList
            numColumns={1}
            numberOfLines={1}
            data={products}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>}

      {!key && <Text style={styles.findLabel}>
      Search for your products</Text>}
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  findLabel:{
    textAlign: 'center',
    fontSize: 20,
    color: '#949090',
    marginTop: '50%'
  },

  flatlist: {
    marginTop: 55,
  },

  image: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    height: 77,
    width: 77,
    marginRight: 15
  },

  labelItemContainer: {
    marginTop: 4,
    fontSize: 14
  },
  nameItem: {
    fontWeight: '500',
    color: '#000000',
    fontSize: 16,
    marginBottom: 2
  },

  desItem: {
    color: '#000000',
    fontSize: 14
  },
  priceItem: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2
  },
  containerItem: {
    width: 145,
    height: 110,
    marginRight: 15,
    flexDirection: 'row',
    marginHorizontal: 48
  },

  labelHeader: {
    fontSize: 16
  },

  containerBody: {
    alignItems: 'center',
    paddingHorizontal: 24
  },

  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    fontSize: 16,
    paddingTop: 40,
    paddingBottom: 16
  },

  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  }
})