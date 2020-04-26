import React from 'react'
import { View, SafeAreaView, Image, FlatList, StyleSheet } from 'react-native'
import ViewPager from '@react-native-community/viewpager'
import { RouteProp } from '@react-navigation/native'
import { HomeTabParams } from '../navigations/HomeNavigator'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import colors from '../values/colors'

interface ImageViewScreenProps {
  route: RouteProp<HomeTabParams, 'ImageView'>
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
  }

  render() {
    const photos = this.props.route.params.params?.listImage

    return (
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          padding: 10,
          backgroundColor: 'black',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            height: '100%',
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
            {photos.map((v, i) => (
              <Image
                key={i}
                style={{ width: '100%', height: '100%' }}
                source={{ uri: v }}
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
                    source={{ uri: item }}
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
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  selected_image: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: colors.mainBlue,
    borderRadius: 10,
  },
})

export default ImageViewScreen
