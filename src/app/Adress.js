import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Adress = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(response => response.json())
            .then(data => {
                if (data.error === 0) {
                    setProvinces(data.data);
                }
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            fetch(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`)
                .then(response => response.json())
                .then(data => {
                    if (data.error === 0) {
                        setDistricts(data.data);
                        setWards([]); // Clear wards when province changes
                    }
                })
                .catch(error => console.error(error));
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
                .then(response => response.json())
                .then(data => {
                    if (data.error === 0) {
                        setWards(data.data);
                    }
                })
                .catch(error => console.error(error));
        }
    }, [selectedDistrict]);

    return (
        <View style={styles.container}>
            <Text>Select Province:</Text>
            <Picker
                selectedValue={selectedProvince}
                onValueChange={(itemValue) => setSelectedProvince(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Tỉnh Thành" value="" />
                {provinces.map((province) => (
                    <Picker.Item key={province.id} label={province.full_name} value={province.id} />
                ))}
            </Picker>

            <Text>Select District:</Text>
            <Picker
                selectedValue={selectedDistrict}
                onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Quận Huyện" value="" />
                {districts.map((district) => (
                    <Picker.Item key={district.id} label={district.full_name} value={district.id} />
                ))}
            </Picker>

            <Text>Select Ward:</Text>
            <Picker
                selectedValue={selectedWard}
                onValueChange={(itemValue) => setSelectedWard(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Phường Xã" value="" />
                {wards.map((ward) => (
                    <Picker.Item key={ward.id} label={ward.full_name} value={ward.id} />
                ))}
            </Picker>
        </View>
    );
};

export default Adress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
    },
});
