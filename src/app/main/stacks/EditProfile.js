import { StyleSheet, Text, View, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppStyles from '../../AppStyles';
import InputCom from '../../com/InputCom';
import { useSelector } from 'react-redux';
import AxiosInstance from '../../helpers/AxiosInstance';

const EditProfile = () => {
    const navigation = useNavigation();
    const appState = useSelector(state => state.app);
    const [name, setName] = useState("");

    const getLabelIPStyle = () => {
        return {
            fontSize: 12,
            fontWeight: '400',
            paddingVertical: 14,
        }
    }

    const onPressEditProfile = async () => {
        console.log('onPressEditProfile')
        if(!name) {
            ToastAndroid.show('Please enter a name', ToastAndroid.SHORT);
            return;
        };

        const body = {
            email: appState.user.email,
            name: name
        }
        const result = await AxiosInstance().put('/users/update', body);
        console.log(result);
        if (result.status == true) {
            ToastAndroid.show('The update is successful, the data will be updated again when you log in!', ToastAndroid.SHORT);
            navigation.navigate("User")
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
                    UPDATE INFOMATION
                </Text>
                <TouchableOpacity>
                    <Image />
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Image
                    style={{ marginVertical: 25 }}
                    source={require('../../../../assets/images/avataredit.png')} />
            </View>

            <View>
                <Text style={{ marginVertical: 15, marginHorizontal: 48, color: '#221F1F', fontSize: 14, fontWeight: '400' }}>
                The information will be saved for the next purchase.
                Click on the details to edit.
                </Text>
            </View>

            <View style={{ marginHorizontal: 48 }}>
                <View>
                    <InputCom
                        placeholder={appState.user.name}
                        onChangeText={text => setName(text)}
                        styles={{
                            container: AppStyles.ipEdit,
                            input: getLabelIPStyle(),
                        }}
                    />
                    <InputCom
                        placeholder={appState.user.email}
                        styles={{
                            container: AppStyles.ipEdit,
                            input: getLabelIPStyle(),
                        }}
                    />
                </View>
            </View>

            <View style={{ position: 'absolute', bottom: 0 }}>
                <TouchableOpacity
                    onPress={onPressEditProfile}
                    style={
                        name ?
                            { marginHorizontal: 15, marginVertical: 15, backgroundColor: '#FE724C', borderRadius: 8, width: 327, height: 50}
                            :
                            { marginHorizontal: 15, marginVertical: 15, backgroundColor: '#7D7B7B', borderRadius: 8, width: 327, height: 50}}
                >
                    <Text
                        style={{ fontSize: 16, fontWeight: '500', textAlign: 'center', paddingVertical: 15, color: 'white' }}
                    >
                        SAVE INFORMATION
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
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
})