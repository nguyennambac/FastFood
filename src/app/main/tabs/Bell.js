import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const Bell = () => {
  const navigation = useNavigation();
  const appState = useSelector(state => state.app);
  const [refreshing, setRefreshing] = useState(false);

  const cartHistory = appState.user.carts;

  const cartHistoryRender = ({ item }) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const parsedDate = new Date(item.date);

    const dayOfWeekIndex = parsedDate.getDay();
    const dayOfWeek = daysOfWeek[dayOfWeekIndex];

    const formattedDate = `${dayOfWeek}, ${parsedDate.getDate()}/${parsedDate.getMonth() + 1}/${parsedDate.getFullYear()}`;

    return (
      <View style={{ marginHorizontal: 48 }}>
        <View>
          <Text style={{ color: '#221F1F', fontSize: 16, fontWeight: '500', marginTop: 14 }}>
            {formattedDate}</Text>
          <Text style={{ width: 279, height: 1, backgroundColor: '#7D7B7B', marginBottom: 15 }}>

          </Text>
        </View>

        <Text
          style={{ fontSize: 16, fontWeight: '500', color: '#007537' }}
        >Order Successfully</Text>
        <Text style={{ marginTop: 2, fontSize: 16, marginBottom: 20 }}>
        Becoming money: <Text style={{ fontWeight: 'bold' }}>
            {item.total}đ
          </Text>
        </Text>
      </View>
    );
  };


  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
          NOTIFICATION
        </Text>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/R.c76ac73708a219e48210c599f3c50b66?rik=adStq0arvqW12w&pid=ImgRaw&r=0' }} />
        </TouchableOpacity>
      </View>

      {cartHistory.length <= 0 &&
        <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'center', paddingTop: 10 }}>
          No announcement for you at the moment
        </Text>
      }

      {cartHistory &&
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartHistory}
          renderItem={cartHistoryRender}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      }
    </View>
  )
}

export default Bell

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    fontSize: 16,
    paddingTop: 40,
    paddingBottom: 16
  },

  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  labelHeader: {
    fontSize: 16
  },
})