import { SafeAreaView, Platform, Image } from "react-native";
import React from "react";
import ClassicHeader from "../components/header/ClassicHeader";
import { View, Text } from "native-base";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import colors from "../values/colors";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { BaseScreen } from "./BaseScreen";
import IconIonicons from "react-native-vector-icons/Ionicons"
import { _rightComponentStyle } from "../components/header/ClassicHeader.style";
import { Post } from "../core";

interface ItemNewsFeedProps {
    post?: Post,
}

const ItemNewsFeed = (props: ItemNewsFeedProps) => {
    const { post } = props
    return (
        <View style={{ width: "100%", height: 500, backgroundColor: "white" }}>
            <TouchableOpacity activeOpacity={0.8} >
                <View style={{ width: '100%', flexDirection: "column" }}>
                    <View style={{ width: '100%', padding: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Image source={{ uri: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80" }}
                                    style={{ height: 50, width: 50, borderRadius: 100 }} />
                                <Text style={{ marginLeft: 10 }}>icongkhanh</Text>
                            </View>
                            <Text>2 phut truoc</Text>
                        </View>
                        <Text style={{ marginTop: 10 }}>Hello ProPTIT</Text>
                    </View>
                    <Image source={{ uri: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80" }}
                        resizeMode="cover" style={{ width: "100%", height: "70%" }} />
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <EvilIcons name="comment" size={30} />
                        <Text style={{ marginLeft: 5 }}>200</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <EvilIcons name="heart" size={30} />
                        <Text style={{ marginLeft: 5 }}>200</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <EvilIcons name="retweet" size={30} />
                        <Text style={{ marginLeft: 5 }}>200</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

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
                </View>
            </SafeAreaView>
        )
    }

    handleOnPressProfile() {
        this.navigate("Profile");
    }
}

export default NewsFeedScreen