import React from 'react';
import {
    Image,
    Container,
    Text,
    Content,
    Row,
    Col,
    Button,
    Icon,
} from 'native-base';
import RoundImage from './RoundImage';
import styles from '../values/styles';
import { View, TouchableOpacity } from 'react-native';
import { Post } from '../core';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

class ItemNewFeed extends React.Component<ItempostProps, ItemNewFeedState> {
    constructor(props: ItempostProps) {
        super(props);

        this.state = {
            isLiked: props.isLiked,
        };
    }

    render() {
        const { post, onPressSave, onPressHeart, onPressComment, onPressItem } = this.props;
        const { isLiked } = this.state;

        return (
            <TouchableOpacity onPress={() => onPressItem("")}>
                <Row style={{ alignSelf: 'baseline', padding: 10, backgroundColor: 'white', width: '100%', borderBottomColor: 'gray', borderBottomWidth: 0.3 }}>
                    <RoundImage source={require('../data/images/ic_app.png')} />
                    <Col style={{ marginLeft: 10 }}>
                        <View>
                            <Text style={styles.bold_text}>icongkhanh</Text>
                            <Text style={styles.normal_text}>31/05/1999</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text>{post.content}</Text>
                        </View>
                        <Row style={{ backgroundColor: 'transparent' }}>
                            <Col style={{ alignItems: 'center' }}>
                                <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0 }}
                                    iconRight
                                    onPressIn={() => onPressComment(post.id)}>
                                    <Icon name="message1" type="AntDesign" style={{ color: 'gray', fontSize: 20 }} />
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center' }}>
                                <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0 }}
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
                                <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0 }}
                                    iconRight
                                    onPressIn={() => onPressSave(post.id)}>
                                    <Icon name="retweet" type="AntDesign" style={{ color: 'gray', fontSize: 20, backgroundColor: 'transparent' }} />
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center' }}>
                                <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0 }}
                                    iconRight
                                    onPressIn={() => onPressSave(post.id)}>
                                    <Icon name="sharealt" type="AntDesign" style={{ color: 'gray', fontSize: 20, backgroundColor: 'transparent' }} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </TouchableOpacity>
        )
    }
}

interface ItempostProps {
    post: Post
    isLiked: boolean
    onPressComment: (id: String) => void
    onPressHeart: (id: String) => void
    onPressSave: (id: String) => void
    onPressItem: (id: String) => void
}

interface ItemNewFeedState {
    isLiked?: boolean;
}

export default ItemNewFeed;
