import { BaseScreen } from "./BaseScreen"
import { SafeAreaView, Text, StyleSheet, TextInput, Keyboard } from "react-native"
import ClassicHeader from "../components/header/ClassicHeader"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler"
import React from "react"
import { Icon, View } from "native-base"

class CreatePostScreen extends BaseScreen {

    render() {
        return (
            <SafeAreaView style={styles.wrapper}>
                <ClassicHeader
                    leftComponentOnPress={() => this.goBack()}
                    statusBarHidden={true}
                    headerTitle="NEW POST" />
                <View style={styles.wrapperTextInput}>
                    <TextInput style={styles.textinput} placeholder="Share something!" multiline={true} />
                    <TouchableWithoutFeedback style={{ width: "100%", height: "100%" }} onPress={() => Keyboard.dismiss()} />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "white",
        height: "100%",
        width: "100%"
    },
    textinput: {
        width: "100%",
        fontSize: 20,
    },
    wrapperTextInput: {
        width: "100%",
        flex: 1,
    }
})

export default CreatePostScreen;