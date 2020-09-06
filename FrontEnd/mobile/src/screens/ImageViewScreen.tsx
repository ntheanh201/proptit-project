import React from 'react'
import { View, SafeAreaView, Image, FlatList, StyleSheet } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import { RouteProp } from '@react-navigation/native'
import { HomeTabParams } from '../navigations/HomeNavigator'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import colors from '../values/colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'

interface ImageViewScreenProps {
  route: RouteProp<RootStackParams, 'ImageView'>
  navigation: StackNavigationProp<RootStackParams>
}

interface ImageViewScreenState {
  seletedPosition: number
}

class ImageViewScreen extends React.Component<
  ImageViewScreenProps,
  ImageViewScreenState
> {
  viewPagerRef = React.createRef<ViewPager>()

  constructor(props: ImageViewScreenProps) {
    super(props)

    this.state = {
      seletedPosition: 0,
    }

    this.props.navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerTintColor: 'white',
    })
  }

  render() {
    const photos = this.props.route.params.listImage

    return (
      <SafeAreaView
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: 'black',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <ViewPager
            ref={this.viewPagerRef}
            style={{ width: '100%', height: '100%', flex: 1 }}
            onPageSelected={(e) => {
              const positon = e.nativeEvent.position
              this.setState({
                seletedPosition: positon,
              })
            }}>
            {photos.map((photo, index) => (
              <Image
                key={index}
                style={{ width: '100%', height: '100%' }}
                source={{ uri: photo.imgUrl }}
                resizeMode="contain"
              />
            ))}
          </ViewPager>
          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <FlatList
              horizontal={true}
              data={photos}
              style={{ width: '100%' }}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.viewPagerRef.current?.setPage(index)
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 10,
                  }}>
                  <Image
                    style={
                      this.state.seletedPosition === index
                        ? styles.selected_image
                        : styles.normal_image
                    }
                    source={{ uri: item.imgUrl }}
                  />
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  normal_image: {
    flex: 1,
    borderRadius: 10,
  },
  selected_image: {
    flex: 1,
    borderWidth: 4,
    borderColor: colors.mainBlue,
    borderRadius: 10,
  },
})

export default ImageViewScreen
