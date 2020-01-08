import { Body, Button, Col, Container, Header, Icon, Left, Right, Row, Content } from "native-base";
import React from "react";
import { Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { TickPoll } from "../components";
import ItemNewFeed from "../components/ItemNewFeed";
import RoundImage from "../components/RoundImage";
import { Post } from "../core";
import colors from '../values/colors';
import styles from "../values/styles";
import { BaseScreen, BaseScreenProps } from "./BaseScreen";


interface DetailPostProps extends BaseScreenProps {
    isLiked?: boolean
    post: Post
    onPressComment: (id: String) => void
    onPressHeart: (id: String) => void
    onPressSave: (id: String) => void
    onPressItem: (id: String) => void
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
        const { post, onPressSave, onPressHeart, onPressComment, onPressItem } = this.props;
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
                                onPressIn={() => onPressComment(post.id)}>
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
                                    onPressHeart(post.id)
                                }}>
                                <Icon name="heart" type="AntDesign" style={{ color: isLiked ? 'red' : 'gray', fontSize: 20 }} />
                            </Button>
                        </Col>
                        <Col style={{ alignItems: 'center' }}>
                            <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0, justifyContent: 'center' }}
                                iconRight
                                onPressIn={() => onPressSave(post.id)}>
                                <Icon name="retweet" type="AntDesign" style={{ color: 'gray', fontSize: 20, backgroundColor: 'transparent' }} />
                            </Button>
                        </Col>
                        <Col style={{ alignItems: 'center' }}>
                            <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0, justifyContent: 'center' }}
                                iconRight
                                onPressIn={() => onPressSave(post.id)}>
                                <Icon name="sharealt" type="AntDesign" style={{ color: 'gray', fontSize: 20, backgroundColor: 'transparent' }} />
                            </Button>
                        </Col>
                    </Row>
                    <ItemNewFeed isLiked={true}
                        post={{ id: "", content: "Hello", groupId: "", time: new Date(), type: 1, userId: "" }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }}
                        onPressItem={id => { }} />
                    <ItemNewFeed isLiked={true}
                        post={{ id: "", content: "Hello", groupId: "", time: new Date(), type: 1, userId: "" }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }}
                        onPressItem={id => { }} />
                    <ItemNewFeed isLiked={true}
                        post={{ id: "", content: "Hello", groupId: "", time: new Date(), type: 1, userId: "" }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }}
                        onPressItem={id => { }} />
                    <ItemNewFeed isLiked={true}
                        post={{ id: "", content: "Hello", groupId: "", time: new Date(), type: 1, userId: "" }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }}
                        onPressItem={id => { }} />
                    <ItemNewFeed isLiked={true}
                        post={{ id: "", content: "Hello", groupId: "", time: new Date(), type: 1, userId: "" }}
                        onPressComment={id => { }}
                        onPressHeart={id => { }}
                        onPressSave={id => { }}
                        onPressItem={id => { }} />

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