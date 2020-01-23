import { View, TouchableOpacity, Image, Text } from "react-native"
import { Post } from "../core"
import React from "react"
import { Icon } from "native-base"

interface ItemNewsFeedProps {
    post?: Post,
}

const ItemNewsFeed = (props: ItemNewsFeedProps) => {
    const { post } = props
    return (
        <View style={{ width: "100%", height: 500, backgroundColor: "white" }}>
            <TouchableOpacity activeOpacity={0.8} >
                <View style={{ width: '100%', flexDirection: "column" }}>
                    <View style={{ width: '100%', padding: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <Image source={{ uri: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80" }}
                                    style={{ height: 50, width: 50, borderRadius: 100 }} />
                                <Text style={{ marginLeft: 10 }}>icongkhanh</Text>
                            </View>
                            <Text>2 phut truoc</Text>
                        </View>
                        <Text style={{ marginTop: 10 }}>Hello ProPTIT</Text>
                    </View>
                    <Image source={{ uri: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80" }}
                        resizeMode="cover" style={{ width: "100%", height: "70%" }} />
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Icon type="EvilIcons" name="comment" fontSize={30} />
                        <Text style={{ marginLeft: 5 }}>200</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Icon type="EvilIcons" name="heart" fontSize={30} />
                        <Text style={{ marginLeft: 5 }}>200</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Icon type="EvilIcons" name="retweet" fontSize={30} />
                        <Text style={{ marginLeft: 5 }}>200</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemNewsFeed