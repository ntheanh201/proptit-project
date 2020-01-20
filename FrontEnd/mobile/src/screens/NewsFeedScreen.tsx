import { SafeAreaView } from "react-native";
import React from "react";
import ClassicHeader from "../components/header/ClassicHeader";

class NewsFeedScreen extends React.Component {

    render() {
        return (
            <SafeAreaView>
                <ClassicHeader
                    headerTitle="Header"
                    rightComponentDisable
                    leftComponentOnPress={() => { }}
                />
            </SafeAreaView>
        )
    }
}

export default NewsFeedScreen