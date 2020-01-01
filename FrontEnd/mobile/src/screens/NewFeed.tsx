import { BaseScreenProps, BaseScreen } from "./BaseScreen";
import { Container, Header, Left, Button, Icon, Title, Body, Right, Text, Content } from "native-base";
import React from "react";
import ItemNewFeed from "../components/ItemNewFeed";
import RoundImage from "../components/RoundImage";
import { logD } from "../common/LogTool";
import { RefreshControl, ScrollView, NativeScrollEvent } from "react-native";

interface NewFeedsProps extends BaseScreenProps {

}

interface NewFeedsState {
    isRefresh: boolean;
}

export default class NewFeeds extends BaseScreen<NewFeedsProps, NewFeedsState> {

    constructor(props: NewFeedsProps) {
        super(props);
        this.state = {
            isRefresh: false
        }
    }

    isEndNewFeedsList({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    }

    handleScrollEndOfNewFeeds() {
        //TODO load page 2 when user scroll end of list new fist
    }

    handleOnScroll(e: NativeScrollEvent) {
        if (this.isEndNewFeedsList(e)) {
            this.handleScrollEndOfNewFeeds()
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'gray' }}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.showDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tin tức</Title>
                    </Body>
                    <Right />
                </Header>
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={(even) => { this.handleScrollEndOfNewFeeds() }}
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefresh} onRefresh={() => { this.setState({ isRefresh: true }) }} />
                    }
                >
                    <ItemNewFeed />
                    <ItemNewFeed />
                    <ItemNewFeed />
                    <ItemNewFeed />
                    <ItemNewFeed />
                    <ItemNewFeed />
                    <ItemNewFeed />
                    <ItemNewFeed />
                    <ItemNewFeed />
                    <ItemNewFeed />
                    <ItemNewFeed />
                    <ItemNewFeed />
                </ScrollView>
            </Container>
        )
    }
}