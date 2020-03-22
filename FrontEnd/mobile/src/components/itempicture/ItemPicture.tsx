import React from "react"
import { View, Image } from "react-native"
import { Icon } from "native-base"
import colors from "../../values/colors"

interface ItemPictureProps {
    urlPicture: string,
    onClose: () => void
}

const ItemPicture = ({ onClose, urlPicture }: ItemPictureProps) => {

    return (
        <View style={{ width: 100, height: 100, marginHorizontal: 5 }}>
            <Image style={{ width: "100%", height: "100%", borderRadius: 10 }} source={{ uri: urlPicture }} />
            <Icon name="closecircle" type="AntDesign" style={{ position: "relative", top: -100, right: -70, color: "white" }} onPress={() => {
                onClose()
            }} />
        </View>
    )
}

export default ItemPicture