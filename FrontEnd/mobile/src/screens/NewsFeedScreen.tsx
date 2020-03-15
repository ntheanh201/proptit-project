import { SafeAreaView, Platform, Image, RefreshControl, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator } from "react-native";
import React from "react";
import ClassicHeader from "../components/header/ClassicHeader";
import { View, Text, List } from "native-base";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { BaseScreen, BaseScreenProps } from "./BaseScreen";
import { _rightComponentStyle } from "../components/header/ClassicHeader.style";
import ItemNewsFeed from "../components/ItemNewsFeed";
import FloatingButton from "../components/FloatingButton";


interface NewsFeedScreenState {
    refreshing: boolean,
    isBottom: boolean,
    listItems: number[]
}

interface NewsFeedScreenProps extends BaseScreenProps {

}

class NewsFeedScreen extends BaseScreen<NewsFeedScreenProps, NewsFeedScreenState> {



    constructor(props: NewsFeedScreenProps) {
        super(props);
        this.state = {
            refreshing: false,
            isBottom: false,
            listItems: [1, 2, 3, 4, 5]
        }
    }

    onRefresh = (): void => {

        this.setState({
            refreshing: true
        })

        this.wait(3000).then(() => {
            this.setState(
                {
                    refreshing: false
                }
            )
        })

    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'white', flexDirection: "column" }}>
                    <ClassicHeader
                        statusBarHidden={true}
                        backgroundColor="white"
                        leftComponent={
                            <TouchableOpacity style={{ marginLeft: 16 }} onPressIn={() => this.handleOnPressProfile()}>
                                <Image source={require("../assets/images/bgr_batman.png")} style={{ width: 30, height: 30 }} borderRadius={100} />
                            </TouchableOpacity>
                        }
                        headerTitle="HOME" />
                    <ScrollView style={{ width: '100%', height: "100%" }}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                        }
                        onScroll={event => this.isCloseToBottom(event.nativeEvent) ? this.handleOnBottomList() : null}>
                        {
                            this.state.listItems.map(
                                () => <ItemNewsFeed />
                            )
                        }
                    </ScrollView>
                    {
                        this.state.isBottom ? (
                            <View style={{ height: 100, alignItems: "center", justifyContent: "center" }}>
                                <ActivityIndicator size="small" color="#000000" animating={true} />
                            </View>
                        ) : null
                    }
                    <FloatingButton onPress={() => { this.navigate("CreatePost") }} />
                </View>
            </SafeAreaView>
        )
    }

    handleOnPressProfile() {
        this.navigate("Profile");
    }

    handleOnBottomList() {
        this.setState(
            {
                isBottom: true
            }
        )

        this.state.listItems.push(1)

        this.wait(1000).then(() => {
            this.setState(
                {
                    isBottom: false
                }
            )
        })
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    }

    wait = (timeout: number) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

}

export default NewsFeedScreen
