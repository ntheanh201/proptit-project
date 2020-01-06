import { Container, Header, Left, Button, Icon, Title, Body, Right, Row } from "native-base";
import React from "react";
import colors from "../values/colors";
import { BaseScreen, BaseScreenProps } from "./BaseScreen";
import { Text, TextInput, View, KeyboardAvoidingView, Platform } from "react-native";
import TickPoll from "../components/TickPoll";

class CreatePost extends BaseScreen<CreatePostProps, CreatePostState> {

    constructor(props: CreatePostProps) {
        super(props);

        this.state = {
            hasTickPoll: false,
        }
    }

    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
        const { hasTickPoll } = this.state
        return (
            <Container>
                <Header style={{ backgroundColor: "white", elevation: 0, borderWidth: 0 }}>
                    <Left>
                        <Button transparent onPressIn={() => this.handleOnPressClose()}>
                            <Icon name='close' type="AntDesign" style={{ color: colors.blue01 }} />
                        </Button>
                    </Left>
                    <Right>
                        <Button rounded style={{ backgroundColor: colors.blue02, width: 100, justifyContent: 'center' }}
                            onPressIn={() => this.handleOnPressPoste()}>
                            <Text style={{ color: 'white' }}>Đăng</Text>
                        </Button>
                    </Right>
                </Header>
                <TextInput placeholder="Viết gì đó đi :)" style={{ fontSize: 25 }} multiline />
                {
                    hasTickPoll ? <TickPoll /> : null
                }
                <View style={{ position: 'absolute', bottom: 0, left: 0, flexDirection: 'row', height: 50, width: '100%', alignItems: 'center' }}>
                    <Button transparent>
                        <Icon name="picture" type="AntDesign" style={{ color: colors.blue01, marginHorizontal: 10 }} />
                    </Button>
                    <Button transparent onPress={() => this.handleOnPressTickPoll()}>
                        <Icon name="barschart" type="AntDesign" style={{ color: colors.blue01, marginHorizontal: 10 }} />
                    </Button>
                </View>
            </Container>
        )
    }
    handleOnPressTickPoll(): void {
        this.setState({
            hasTickPoll: true
        })
    }
    handleOnPressPoste(): void {
        this.props.navigation.goBack()
    }
    handleOnPressClose(): void {
        this.props.navigation.goBack()
    }
}

interface CreatePostProps extends BaseScreenProps {

}

interface CreatePostState {
    hasTickPoll: boolean
}

export default CreatePost