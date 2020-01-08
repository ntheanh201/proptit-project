import React from "react";
import { Image, Container, Text, Content, Row, Col, Button, Icon } from 'native-base';
import RoundImage from './RoundImage';
import styles from "../values/styles";
import { View, TouchableOpacity } from "react-native";
import { NewFeed } from "../core/types/newfeed.types";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

class ItemNewFeed extends React.Component<ItemNewFeedProps, ItemNewFeedState>{

    constructor(props: ItemNewFeedProps) {
        super(props);

        this.state = {
            isLiked: props.isLiked
        }
    }

    render() {
        const { newfeed, onPressSave, onPressHeart, onPressComment, onPressItem } = this.props;
        const { isLiked } = this.state;

        return (
            <TouchableOpacity style={{ backgroundColor: 'gray', paddingBottom: 0.5 }} onPress={() => onPressItem("")}>
                <Row style={{ alignSelf: 'baseline', padding: 10, backgroundColor: 'white', width: '100%' }}>
                    <RoundImage source={require('../data/images/ic_app.png')} />
                    <Col style={{ marginLeft: 10 }}>
                        <View>
                            <Text style={styles.bold_text}>icongkhanh</Text>
                            <Text style={styles.normal_text}>31/05/1999</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text>{newfeed.content}</Text>
                        </View>
                        <Row style={{ backgroundColor: 'transparent' }}>
                            <Col style={{ alignItems: 'center' }}>
                                <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0 }}
                                    iconRight
                                    onPressIn={() => onPressComment(newfeed.id)}>
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
                                        onPressHeart(newfeed.id)
                                    }}>
                                    <Icon name="heart" type="AntDesign" style={{ color: isLiked ? 'red' : 'gray', fontSize: 20 }} />
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center' }}>
                                <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0 }}
                                    iconRight
                                    onPressIn={() => onPressSave(newfeed.id)}>
                                    <Icon name="retweet" type="AntDesign" style={{ color: 'gray', fontSize: 20, backgroundColor: 'transparent' }} />
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center' }}>
                                <Button style={{ backgroundColor: 'transparent', width: '100%', elevation: 0 }}
                                    iconRight
                                    onPressIn={() => onPressSave(newfeed.id)}>
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

interface ItemNewFeedProps {
    isLiked?: boolean
    newfeed: NewFeed
    onPressComment: (id: string) => void
    onPressHeart: (id: string) => void
    onPressSave: (id: string) => void
    onPressItem: (id: string) => void
}

interface ItemNewFeedState {
    isLiked?: boolean
}

export default ItemNewFeed;