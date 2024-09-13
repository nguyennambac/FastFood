import { StyleSheet, Text, View, Image, ToastAndroid, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import PagerView from 'react-native-pager-view'
import ButtonCom from '../../com/ButtonCom';
import AppStyles from '../../AppStyles';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../helpers/AxiosInstance';
import { addItemToCart } from '../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';

const Detail = (props) => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [product, setProduct] = useState({});

  const [quantity, setQuantity] = useState(0)

  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);

  const images = [].concat(product.images);

  let total = quantity * product.price;

  const { _id } = props?.route?.params;

  useEffect(() => {
    const getProduct = async () => {
      if (!_id) return;
      try {
        const response = await AxiosInstance().get(`/products?id=${_id}`);
        setProduct(...response.data);
      } catch (error) {
        console.log('Get product error: ', error.message || error);
      }
    }
    getProduct();
  }, [_id]);

  const renderImages = () => {
    return (
      <View key={selectedIndex}>
        <Image
          resizeMode='contain'
          source={{ uri: images[selectedIndex] }}
          style={{ width: '100%', height: 300 }}
        />
      </View>
    );
  };



  const renderDots = () => {
    return images.map((item, index) => (
      <View
        key={index}
        style={{
          width: 8,
          height: 8,
          borderRadius: 5,
          backgroundColor: selectedIndex === index ? '#221F1F' : '#ABABAB',
          margin: 5,
        }}
      />
    ));
  };

  const goToNextImage = () => {
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const touLabel = () => {
    return {
      fontSize: 16,
      fontWeight: '500',
      color: '#FFFFFF',
      textAlign: 'center',
      paddingVertical: 15
    }
  }

  const add = () => {
    if (quantity <= 0) {
      ToastAndroid.show('Select the number of products', ToastAndroid.SHORT);
      return;
    }

    const item = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      images: product.images,
    }
    dispatch(addItemToCart(item));
    console.log(appState.cart)
    ToastAndroid.show('Added to cart', ToastAndroid.SHORT);
    navigation.goBack();
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
          {product.name}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
        >
          <Image
            source={require('../../../../assets/images/cartnon.png')} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerBody}>
          <TouchableOpacity style={[styles.previous, styles.icon]} onPress={goToPreviousImage}>
            <Image
              source={require('../../../../assets/images/prepaper.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.next, styles.icon]} onPress={goToNextImage}>
            <Image
              source={require('../../../../assets/images/nextpaper.png')} />
          </TouchableOpacity>
          <PagerView style={styles.pagerView}
            initialPage={selectedIndex}>
            {renderImages()}
          </PagerView>
          <View style={styles.Dots}>
            {renderDots()}
          </View>
        </View>

        <View style={styles.category}>
          <Text style={styles.cateStyle} numberOfLines={1}>
            Fast Food
          </Text>
        </View>

        <Text style={styles.priceStyle}>
          {product.price}đ
        </Text>

        <View style={styles.detailStyle}>
          <Text numberOfLines={1} style={styles.labelDetail}>
            {product.description}
          </Text>
          <View style={styles.detail}>
            <Text>
              Size
            </Text>
            <Text>
              Medium
            </Text>
          </View>

          <View style={styles.detail}>
            <Text>
            Remaining quantity
            </Text>
            <Text style={styles.labelQuantity}>
              {product.quantity <= 0 ? 'Out of Stock' : `${product.quantity}`}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.containerFooter}>
        <View style={styles.FooterLeft}>
          <Text style={styles.colorChose}>
          Selected {quantity} product
          </Text>
          <View style={styles.editQuantity}>
            <TouchableOpacity style={quantity > 0 ? styles.box : AppStyles.boxErr}
              onPress={() => {
                if (quantity <= 0) {
                  ToastAndroid.show('The number must not be less than 0', ToastAndroid.SHORT);
                  return;
                }
                setQuantity(quantity - 1);
              }}>
              <Text style={quantity > 0 ? styles.labelEdit : AppStyles.labelEditErr}>
                -
              </Text>
            </TouchableOpacity>
            <Text>
              {quantity}
            </Text>
            <TouchableOpacity style={styles.box}
              onPress={() => {
                if (quantity >= product.quantity) {
                  ToastAndroid.show('The quantity has reached the limit', ToastAndroid.SHORT);
                  return;
                }
                setQuantity(quantity + 1);
              }}>
              <Text style={styles.labelEdit}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.FooterRight}>
          <Text style={styles.colorChose}>
            Total
          </Text>
          <Text style={styles.totalPrice}>{total}đ</Text>
        </View>
      </View>
      <ButtonCom
        title={product.quantity <= 0 ? 'Out of Stock' : 'Add to cart'}
        onpress={add}
        styles={{
          tou: quantity <= 0 ? AppStyles.touBuyProduct : AppStyles.touBuyProductPay,
          touLabel: touLabel(),
          containerButton: AppStyles.containerButton
        }}
      />
    </View>
  )
}

export default Detail

const styles = StyleSheet.create({
  totalPrice: {
    fontSize: 24
  },

  colorChose: {
    color: '#221F1F',
    fontSize: 14
  },

  labelEdit: {
    fontSize: 16,
    textAlign: 'center'
  },

  box: {
    borderWidth: 1,
    width: 23,
    height: 23,
  },

  editQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3
  },

  containerFooter: {
    paddingBottom: 15,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  labelQuantity: {
    color: '#FE724C'
  },

  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 24,
    borderWidth: 1,
    marginTop: 15,
    fontSize: 14,
    fontWeight: "400",
    borderTopColor: 'white',
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderBottomColor: '#ABABAB',
    color: '#3A3A3A'
  },

  labelDetail: {
    height: 27,
    borderWidth: 1,
    borderTopColor: 'white',
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderBottomColor: '#221F1F',
    fontSize: 16,
    fontWeight: '500',
    color: '#3A3A3A'
  },

  detailStyle: {
    paddingHorizontal: 48,
    paddingVertical: 15
  },

  priceStyle: {
    color: '#FE724C',
    fontSize: 24,
    fontWeight: '500',
    paddingLeft: 48,
    paddingBottom: 16
  },

  cateStyle: {
    width: 76,
    height: 28,
    borderRadius: 4,
    paddingVertical: 4,
    textAlign: 'center',
    backgroundColor: '#FE724C',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    marginRight: 8
  },

  category: {
    flexDirection: 'row',
    marginVertical: 15,
    paddingLeft: 48
  },

  Dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 9
  },

  containerBody: {
    alignItems: 'center',
    height: 270,
    position: 'relative',
    backgroundColor: '#F6F6F6'
  },

  next: {
    right: 24,
  },
  previous: {
    left: 24,
  },
  icon: {
    position: 'absolute',
    top: 150,
  },

  pagerView: {
    width: '60%',
    height: 300,
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

  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  }
})