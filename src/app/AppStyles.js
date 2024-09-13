import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
export default styles = StyleSheet.create({
    ip: {
        borderWidth: 1,
        borderColor: "#8B8B8B",
        width: 300,
        height: 46,
        borderRadius: 10
    },

    ipEdit: {
        borderWidth: 1,
        borderTopColor: "white",
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderBottomColor : '#ABABAB',
        height: 46,
    },

    ipError: {
        borderWidth: 1,
        borderColor: "red",
        width: 300,
        height: 46,
        borderRadius: 10
    },

    tou: {
        width: 300,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#FE724C'
    },

    touBuyProduct: {
        width: 327,
        height: 50,
        marginBottom: 15,
        borderRadius: 15,
        backgroundColor: '#ABABAB',
        borderRadius: 8
    },

    touBuyProductPay: {
        width: 327,
        height: 50,
        marginBottom: 15,
        borderRadius: 15,
        backgroundColor: '#FE724C',
        borderRadius: 8
    },

    boxErr: {
        borderWidth: 1,
        width: 23,
        height: 23,
        borderColor: '#ABABAB'
    },

    labelEditErr: {
        fontSize: 16,
        textAlign: 'center',
        color: '#ABABAB'
    },

    containerButton: {
        alignItems: 'center'
    }
})