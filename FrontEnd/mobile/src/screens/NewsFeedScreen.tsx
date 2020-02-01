import { SafeAreaView, Platform, Image } from "react-native";
import React from "react";
import ClassicHeader from "../components/header/ClassicHeader";
import { View, Text } from "native-base";
import colors from "../values/colors";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { BaseScreen } from "./BaseScreen";
import { _rightComponentStyle } from "../components/header/ClassicHeader.style";
import { Post } from "../core";
import ItemNewsFeed from "../components/ItemNewsFeed";
import FloatingButton from "../components/FloatingButton";

class NewsFeedScreen extends BaseScreen {

    list = [1, 2, 3, 4, 5]

    render() {
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'gray', flexDirection: "column" }}>
                    <ClassicHeader
                        statusBarHidden={true}
                        backgroundColor="white"
                        leftComponent={
                            <TouchableOpacity style={{ marginLeft: 16 }} onPressIn={() => this.handleOnPressProfile()}>
                                <Image source={require("../assets/images/bgr_batman.png")} style={{ width: 30, height: 30 }} borderRadius={100} />
                            </TouchableOpacity>
                        }
                        headerTitle="HOME" />
                    <ScrollView style={{ width: '100%', height: "100%" }}>
                        <ItemNewsFeed />
                        <ItemNewsFeed />
                    </ScrollView>
                    <FloatingButton onPress={() => { }} />
                </View>
            </SafeAreaView>
        )
    }

    handleOnPressProfile() {
        this.navigate("Profile");
    }
}

export default NewsFeedScreen