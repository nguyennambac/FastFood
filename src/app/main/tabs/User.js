import { StyleSheet, Text, View, TouchableOpacity, Image, ToastAndroid, Modal } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducer';
import { useNavigation } from '@react-navigation/native';

const User = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const [isModalVisible, setIsModalVisible] = useState(false);


  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#FE724C" }}
                onPress={() => {
                  setIsModalVisible(!isModalVisible);
                  dispatch(logout());
                  ToastAndroid.show('Successful logout', ToastAndroid.SHORT);
                }}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#FE724C" }}
                onPress={() => {
                  setIsModalVisible(!isModalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.containerHeader}>
        <Text numberOfLines={1} style={styles.labelHeader}>
          PROFILE
        </Text>
        <View style={styles.containerInfo}>
          <Image
            style={styles.avt}
            source={require('../../../../assets/images/ava.png')} />
          <View>
            <Text style={styles.name}>
              {appState.user.name}
            </Text>
            <Text style={styles.email}>
              {appState.user.email}
            </Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.labelDetail}>
          General
          </Text>
          <Text
          onPress={()=> navigation.navigate("EditProfile")}
          style={styles.labelInfo}>
            Edit information
          </Text>
          <Text style={styles.labelInfoChild}>
          Trading History
          </Text>
          <Text style={styles.labelInfoChild}>
            Q & A
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.labelDetail}>
          Privacy and Terms
          </Text>
          <Text style={styles.labelInfo}>
          Terms and Conditions
          </Text>
          <Text style={styles.labelInfoChild}>
          Privacy Policy
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}
          >
            <Text style={styles.labelInfoLogout}>
              Log out
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default User

const styles = StyleSheet.create({
  labelInfoLogout: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FE724C',
    marginTop: 15
  },

  labelInfoChild: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginTop: 15
  },

  labelInfo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginTop: 17
  },

  info: {
    marginLeft: 48,
  },

  labelDetail: {
    marginTop: 28,
    width: 275,
    height: 27,
    borderWidth: 1,
    borderTopColor: 'white',
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderBottomColor: '#ABABAB',
    fontSize: 16,
    fontWeight: '500',
    color: '#3A3A3A'
  },

  email: {
    color: '#7F7F7F'
  },

  avt: {
    marginLeft: 48,
    marginRight: 26,
    width: 50,
    height: 50,
    borderRadius: 50
  },

  containerInfo: {
    flexDirection: 'row',
  },

  labelHeader: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 25
  },

  container: {
    white: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  containerHeader: {
    paddingTop: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
    marginHorizontal: 10,
    width: 100
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})