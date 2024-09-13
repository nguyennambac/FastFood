import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonCom = (props) => {
    const { styles, title, onpress } = props;
    return (
        <View style={styles.containerButton}>
            <TouchableOpacity onPress={onpress} style={styles.tou}>
                <Text style={styles.touLabel}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonCom

const styles = StyleSheet.create({})