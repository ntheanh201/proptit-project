import React from "react";
import { Image, Container, Text } from 'native-base';
import RoundImage from './RoundImage';
import styles from "../values/styles";
import { View } from "react-native";

const ItemNewFeed = () => {

    return (
        <View style={{ alignSelf: 'baseline', padding: 10, marginTop: 5, backgroundColor: 'white', width: '100%' }}>
            <View style={{ alignSelf: 'baseline', flexDirection: 'row', alignItems: 'center' }}>
                <RoundImage source={require('../data/images/ic_app.png')} />
                <View>
                    <Text style={styles.bold_text}>icongkhanh</Text>
                    <Text style={styles.normal_text}>31/05/1999</Text>
                </View>
            </View>
            <View style={{ marginTop: 5 }}>
                <Text>Content</Text>
            </View>
        </View>
    )
}

export default ItemNewFeed;