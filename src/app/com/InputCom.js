import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const InputCom = (props) => {
    const { title, placeholder, styles, err,
        value, onChangeText, description, imageError, secureTextEntry, color } = props
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={color}
                style={styles.input}
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
            />
            {
                err && <Text style={styles.err}>{err}</Text>
            }
            {
                err && <Image style={styles.imError} source={imageError} />
            }
            <Text style={styles.des}>{description}</Text>
        </View>
    )
}

export default InputCom

const styles = StyleSheet.create({})