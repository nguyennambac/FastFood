import { StyleSheet, Text, View, Image, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../helpers/AxiosInstance';

const Home = (props) => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const response = await AxiosInstance().get('/products?limit=4');
      console.log('Get products successfully: ', response);
      if (response.status === true) {
        setData(response.data);
      } else {
        console.log("Lấy data từ API thất bại!");
      }
    } catch (error) {
      console.log('Get products error: ', error.message || error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = (item) => {
    return (
      <TouchableOpacity key={item._id} onPress={() => navigation.navigate('Detail', { _id: item._id })}>
        <View style={styles.containerItem}>
          <Image style={styles.image} source={{ uri: item.images[0] }} />
          <View style={styles.labelItemContainer}>
            <Text numberOfLines={1} style={styles.nameItem}>
              {item.name}
            </Text>
            <Text numberOfLines={1} style={styles.desItem}>
              {item.description}
            </Text>
            <Text style={styles.priceItem}>
              {item.price}đ
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#007537"]} tintColor={"#007537"} />
      }>
      <View style={styles.container}>
        <View>
          <Image style={{ marginTop: 130, width: '100%', height: 200}} source={require('../../../../assets/images/banner.png')} />
          <Text style={styles.labelPlanta}>What would you like to order</Text>
          <View style={styles.viewContainer}>
            <Text style={styles.viewLabel}>View food offers</Text>
            <Image style={{marginTop: 8}} source={require('../../../../assets/images/iconview.png')} />
          </View>
          <TouchableOpacity style={{ position: 'absolute', top: 25, right: 25 }} onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../../../../assets/images/cart.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.containerChild}>
          <Text style={styles.labelChild}>Fast food</Text>
          <View style={styles.listContainer}>
            {data.map((item) => renderItem(item))}
          </View>
          <Text onPress={() => navigation.navigate('AllProduct')} style={styles.viewMore}>
          View All Food
          </Text>
        </View>

        <View style={styles.containerChild}>
          <Text style={styles.labelChild}>New combos</Text>
          <View style={styles.containerCombo}>
            <View style={styles.labelCombo}>
              <Text style={styles.labelComboTitle}>Fried Fish + Coca</Text>
              <Text numberOfLines={3} style={styles.labelComboContent}>
              Including: 1 can of coke, 1 portion of Fried Fish and a gratitude gift card...
              </Text>
            </View>
            <Image style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, width: 100, height: 110}} source={require('../../../../assets/images/garan.png')} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  labelComboTitle: {
    fontSize: 16,
    fontWeight: '500',
  },

  labelComboContent: {
    fontWeight: '400',
    color: '#7D7B7B',
    fontSize: 13,
    paddingTop: 2,
  },

  labelCombo: {
    padding: 20,
    backgroundColor: '#F6F6F6',
    width: 205,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  containerCombo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },

  viewContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 25,
    top: 95,
  },

  viewMore: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 15,
    color: '#FE724C'
  },

  viewLabel: {
    color: '#FE724C',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  labelPlanta: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 25,
    left: 25,
    right: 126,
  },

  labelChild: {
    color: '#221F1F',
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 24,
    paddingBottom: 15,
  },
  nameItem: {
    fontWeight: '700',
    color: '#221F1F',
  },

  desItem: {
    color: '#7D7B7B',
  },

  priceItem: {
    color: '#FE724C',
  },

  labelItemContainer: {
    marginTop: 4,
    fontSize: 14,
  },

  containerChild: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },

  containerItem: {
    width: 145,
    height: 217,
    marginBottom: 10,
  },

  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

  image: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    height: 134,
  },

  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
