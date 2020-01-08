import { Body, Button, Col, Container, Header, Icon, Left, Right, Row, Content } from "native-base";
import React from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { TickPoll } from "../components";
import ItemNewFeed from "../components/ItemNewFeed";
import RoundImage from "../components/RoundImage";
import { NewFeed } from "../core/types/newfeed.types";
import colors from '../values/colors';
import styles from "../values/styles";
import { BaseScreen, BaseScreenProps } from "./BaseScreen";


interface DetailPostProps extends BaseScreenProps {
    isLiked?: boolean
    newfeed: NewFeed
    onPressComment: (id: string) => void
    onPressHeart: (id: string) => void
    onPressSave: (id: string) => void
    onPressItem: (id: string) => void
}

interface DetailPostState {
    isLiked?: boolean
}

class DetailPost extends BaseScreen<DetailPostProps, DetailPostState> {

    constructor(props: DetailPostProps) {
        super(props);
        this.state = {
            isLiked: false
        }
    }

    render() {
        const { newfeed, onPressSave, onPressHeart, onPressComment, onPressItem } = this.props;
        const { isLiked } = this.state;
        return (
            <Container>
                <Header style={{ backgroundColor: "white" }}>
                    <Left>
                        <Button onPressIn={() => this.goBack()} transparent>
                            <Icon name="arrow-back" type="MaterialIcons" style={{ color: colors.blue02 }} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={styles.header}>Bài viết</Text>
                    </Body>
                    <Right />
                </Header>
                <Content style={{ margin: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RoundImage source={require('../data/images/ic_app.png')} />
                        <Text style={[styles.bold_text, { margin: 5 }]}>icongkhanh</Text>
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={[styles.large_content, { marginBottom: 5 }]}>Hello World!</Text>
                        <TickPoll tickpoll={{ id: "", listPoll: [], sumVote: 100 }} />
                    </View>
                    <View style={{ alignItems: 'baseline', flexDirection: 'row', borderBottomWidth: 0.3, borderBottomColor: 'gray', paddingVertical: 5 }}>
                        <Text style={styles.normal_text}>4:47 Ngày 20 Tháng 07</Text>
                    </View>
                    <View style={{ alignItems: 'baseline', flexDirection: 'row', borderBottomWidth: 0.3, borderBottomColor: 'gray', paddingVertical: 5 }}>
                        <Text style={styles.bold_text}>24</Text>
                        <Text style={[styles.normal_text, { margin: 5 }]}>Bình luận</Text>
                        <Text style={[styles.bold_text, { marginLeft: 10 }]}>128</Text>
                        <Text style={[styles.normal_text, { margin: 5 }]}>Luợt thích</Text>
                    </View>
                    <Row style={{ backgroundColor: 'transparent', borderBottomColor: 'gray', flex: 0, borderBottomWidth: 0.3, marginBottom: 5 }}>
                        <Col style={{ alignItems: 'center' }}>
                            <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0, justifyContent: 'center' }}
                                iconRight
                                onPressIn={() => onPressComment(newfeed.id)}>
                                <Icon name="message1" type="AntDesign" style={{ color: 'gray', fontSize: 20 }} />
                            </Button>
                        </Col>
                        <Col style={{ alignItems: 'center' }}>
                            <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0, justifyContent: 'center' }}
                                iconRight
                                onPressIn={() => {
                                    this.setState({
                                        isLiked: !isLiked
                                    })
                                    onPressHeart(newfeed.id)
                                }}>
                                <Icon name="heart" type="AntDesign" style={{ color: isLiked ? 'red' : 'gray', fontSize: 20 }} />
                            </Button>
                        </Col>
                        <Col style={{ alignItems: 'center' }}>
                            <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0, justifyContent: 'center' }}
                                iconRight
                                onPressIn={() => onPressSave(newfeed.id)}>
                                <Icon name="retweet" type="AntDesign" style={{ color: 'gray', fontSize: 20, backgroundColor: 'transparent' }} />
                            </Button>
                        </Col>
                        <Col style={{ alignItems: 'center' }}>
                            <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0, justifyContent: 'center' }}
                                iconRight
                                onPressIn={() => onPressSave(newfeed.id)}>
                                <Icon name="sharealt" type="AntDesign" style={{ color: 'gray', fontSize: 20, backgroundColor: 'transparent' }} />
                            </Button>
                        </Col>
                    </Row>
                    <ItemNewFeed
                        isLiked={true}
                        newfeed={{ id: "", content: "Hello" }}
                        onPressItem={id => { }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }} />
                    <ItemNewFeed
                        isLiked={true}
                        newfeed={{ id: "", content: "Hello" }}
                        onPressItem={id => { }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }} />
                    <ItemNewFeed
                        isLiked={true}
                        newfeed={{ id: "", content: "Hello" }}
                        onPressItem={id => { }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }} />
                    <ItemNewFeed
                        isLiked={true}
                        newfeed={{ id: "", content: "Hello" }}
                        onPressItem={id => { }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }} />
                    <ItemNewFeed
                        isLiked={true}
                        newfeed={{ id: "", content: "Hello" }}
                        onPressItem={id => { }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }} />
                    <ItemNewFeed
                        isLiked={true}
                        newfeed={{ id: "", content: "Hello" }}
                        onPressItem={id => { }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }} />
                </Content>
            </Container >
        )
    }
    handleOnPressClose(): void {

    }
    handleOnPressPoste(): void {

    }
}

export default DetailPost