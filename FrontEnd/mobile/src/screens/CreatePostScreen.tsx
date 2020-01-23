import { BaseScreen } from "./BaseScreen"
import { SafeAreaView, Text } from "react-native"
import ClassicHeader from "../components/header/ClassicHeader"
import { TouchableOpacity } from "react-native-gesture-handler"
import React from "react"

class CreatePostScreen extends BaseScreen {

    render() {
        return (
            <SafeAreaView>
                <ClassicHeader
                    rightComponent={
                        <TouchableOpacity style={{ margin: 16 }}>
                            <Text style={{ fontSize: 30 }}>
                                SEND
                            </Text>
                        </TouchableOpacity>
                    }
                    headerTitle="New Post" />
            </SafeAreaView>
        )
    }
}

export default CreatePostScreen;