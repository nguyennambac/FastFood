import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { changeQuantity, removeItemFromCart } from '../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/reducer';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../helpers/AxiosInstance';

const Cart = () => {
  const appState = useSelector(state => state.app);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  let total = appState.cart.reduce((sum, item) => {
    return sum += item.quantity * item.price;
  }, 0);

  const openDeleteConfirmationModal = () => {
    if (selectedItems.length <= 0) {
      appState.cart.length <= 0 ?
        ToastAndroid.show('No products to delete?', ToastAndroid.SHORT)
        :
        ToastAndroid.show('Please select the product you want to delete?', ToastAndroid.SHORT);
      return
    }
    setIsDeleteConfirmationVisible(true);
  };

  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationVisible(false);
  };

  const deleteSelectedItems = () => {
    // Lặp qua các ID trong selectedItems và gọi dispatch để xóa từng mục
    selectedItems.forEach(itemId => {
      dispatch(removeItemFromCart({ productId: itemId }));
    });

    // Sau khi xóa xong, cập nhật lại selectedItems để rỗng
    setSelectedItems([]);
    closeDeleteConfirmationModal();
    ToastAndroid.show('Deleted', ToastAndroid.SHORT);
  };

  const handleCheckout = () => {
    if (appState.cart.length <= 0) {
      ToastAndroid.show('There are no products to checkout!', ToastAndroid.SHORT);
      return;
    }
    setIsCheckoutModalVisible(true);
  };

  const checkoutCart = async () => {
    try {
      const body = {
        user: appState.user._id,
        products: appState.cart.map(item => ({
          _id: item._id,
          quantity: item.quantity
        }))
      }
      const result = await AxiosInstance().post("/carts", body);
      if (result.status) {
        dispatch(clearCart());
        ToastAndroid.show('Successful payment', ToastAndroid.SHORT);
        navigation.navigate('Home');
      } else {
        ToastAndroid.show('Fail payment', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Error', ToastAndroid.SHORT);
      console.log(error);
    }
  }

  const handleCheckbox = (id) => {
    // Kiểm tra xem item đã được chọn trước đó chưa
    const selectedIndex = selectedItems.indexOf(id);
    if (selectedIndex === -1) {
      // Nếu chưa được chọn, thêm id của item vào state selectedItems
      setSelectedItems([...selectedItems, id]);
    } else {
      // Nếu đã được chọn, xoá id của item khỏi state selectedItems
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems.splice(selectedIndex, 1);
      setSelectedItems(updatedSelectedItems);
    }
  };

  const showDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(removeItemFromCart({ productId: itemToDelete._id }));
      setIsDeleteModalVisible(false);
      ToastAndroid.show(`Removed ${itemToDelete.name} from the cart!`, ToastAndroid.SHORT);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const renderItemCart = ({ item }) => {

    const increaseQuantity = () => {
      const newQuantity = item.quantity + 1;
      dispatch(changeQuantity({ productId: item._id, newQuantity }));
    };

    const decreaseQuantity = () => {
      const newQuantity = item.quantity - 1;
      if (newQuantity === 0) {
        showDeleteModal(item);
      } else {
        dispatch(changeQuantity({ productId: item._id, newQuantity }));
      }
    };
    // console.log(appState.cart)
    return (
      <View>
        <Modal
          visible={isDeleteModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsDeleteModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to remove this product from your cart?</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={confirmDelete}>
                  <Text style={styles.modalButton}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelDelete}>
                  <Text style={styles.modalButton}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={isCheckoutModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsCheckoutModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to pay?</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={checkoutCart}>
                  <Text style={styles.modalButton}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsCheckoutModalVisible(false)}>
                  <Text style={styles.modalButton}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ flexDirection: 'row', paddingHorizontal: 25, paddingTop: 10, height: 107 }}>
          <TouchableOpacity onPress={() => handleCheckbox(item._id)}>
            <Image
              style={{ marginVertical: 35, marginRight: 28 }}
              source={selectedItems.includes(item._id) ? require('../../../../assets/images/dachon.png') : require('../../../../assets/images/chuachon.png')} />
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={{ uri: `${item.images[0]}` }} />
          <View>
            <Text style={{ fontWeight: '500', fontSize: 16 }} numberOfLines={1}>{item.name}</Text>
            <Text style={{ color: '#FE724C', fontSize: 16, fontWeight: '500' }}>{item.price}đ</Text>
            <View style={{ flexDirection: 'row', marginTop: 13 }}>
              <TouchableOpacity
                style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 5, alignItems: 'center' }}
                onPress={decreaseQuantity}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 18 }}>{item.quantity}</Text>
              <TouchableOpacity
                style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 5, alignItems: 'center' }}
                onPress={increaseQuantity}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={isDeleteConfirmationVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDeleteConfirmationModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete the selected product?</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={deleteSelectedItems}>
                <Text style={styles.modalButton}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeDeleteConfirmationModal}>
                <Text style={styles.modalButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.containerHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../../../assets/images/backblack.png')} />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.labelHeader}>
          MY CART
        </Text>
        <TouchableOpacity onPress={openDeleteConfirmationModal}>
          <Image
            source={require('../../../../assets/images/delete.png')} />
        </TouchableOpacity>
      </View>

      {appState.cart &&
        <FlatList
          data={appState.cart}
          renderItem={renderItemCart}
        />
      }

      {appState.cart.length <= 0 &&
        <Text style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>There are no products in the cart!</Text>}
      <View style={{ paddingBottom: 20, paddingHorizontal: 25 }}>
        <View style={{ flexDirection: 'row', paddingBottom: 15, justifyContent: 'space-between' }}>
          <Text style={{ color: '#7D7B7B', fontSize: 14 }}>
            Total
          </Text>
          <Text style={{ fontSize: 16 }}>
            {total}đ
          </Text>
        </View>
        <TouchableOpacity onPress={handleCheckout}>
          <View style={{ backgroundColor: '#FE724C', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 5 }}>
            <Text style={{ fontWeight: '500', fontSize: 18, color: 'white' }}>Proceed to checkout</Text>
            <Image
              source={require('../../../../assets/images/rightwhite.png')} />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  image: {
    width: 77,
    height: 77,
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    marginRight: 15
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
  },

  labelHeader: {
    fontSize: 16,
    fontWeight: '500',
    width: 85
  },

  modalContainer: {
    flex: 1,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // màu nền mờ
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    marginHorizontal: 10,
    fontSize: 15,
    color: '#FE724C',
    marginVertical: 10,
  },
})