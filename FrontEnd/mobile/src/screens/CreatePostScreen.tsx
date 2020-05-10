import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  View,
  Image,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  Animated,
  Easing,
} from 'react-native'
import ClassicHeader from '../components/header/ClassicHeader'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import React, { Component } from 'react'
// import ImagePicker, {
//   ImagePickerOptions,
//   ImagePickerResponse,
// } from 'react-native-image-picker'
import { ItemTickPollRef } from '../components/tickpoll/TickPoll'
import TickPollEditor from '../components/tickpolleditor/TickPollEditor'
import ItemPicture from '../components/itempicture/ItemPicture'
import Icon from 'react-native-vector-icons/AntDesign'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import colors from '../values/colors'
import { postService } from '../services'
import { Post, ImageFormData } from '../core'
import { RouteProp } from '@react-navigation/native'
import { HomeTabParams } from '../navigations/HomeNavigator'
import { convertToPostType } from '../configs/Function'

import ImagePicker, { Image as ImageP } from 'react-native-image-crop-picker'

interface CreatePostScreenState {
  isHaveTickPoll: boolean
  images: ImageFormData[]
  padding: number
  content: string
  defaultContent?: string
}

interface CreatePostScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<HomeTabParams, 'CreatePost'>
}

class CreatePostScreen extends Component<
  CreatePostScreenProps,
  CreatePostScreenState
> {
  scaleValue: Animated.Value = new Animated.Value(0)

  constructor(props: CreatePostScreenProps) {
    super(props)
    this.state = {
      isHaveTickPoll: false,
      images: [],
      padding: 0,
      content: '',
      defaultContent: '',
    }

    this.props.navigation.setOptions({
      title: '',
      headerBackTitleVisible: false,
      headerRight: () => (
        <TouchableOpacity onPress={() => this.onPressPost()}>
          <Text
            style={{
              color: colors.mainBlue,
              marginEnd: 10,
              fontWeight: 'bold',
            }}>
            POST
          </Text>
        </TouchableOpacity>
      ),
    })
  }

  componentDidMount() {
    if (this.props.route.params) {
      this.getContentIfEditPost()
    }
  }

  render() {
    const { isHaveTickPoll, images } = this.state
    Keyboard.addListener('keyboardDidShow', (e) => {
      this.onFocusEditText()
    })

    Keyboard.addListener('keyboardDidHide', (e) => {
      this.onUnfocusEditText()
    })

    const menuStyle = {
      zIndex: 10,
      paddingBottom: 50,
      elevation: 4,
      flexDirection: 'column',
      alignSelf: 'baseline',
      width: '100%',
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: 10,
      transform: [
        {
          translateY: this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 200, 400],
          }),
        },
      ],
    }

    // console.log('AppLog', this.state.images)

    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperTextInput}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../assets/images/avt_batman.png')}
              style={styles.avatar}
            />
            <TextInput
              defaultValue={this.state.defaultContent}
              style={styles.textinput}
              placeholder="Share something!"
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  content: text,
                })
              }}
            />
          </View>
          {isHaveTickPoll ? (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <TickPollEditor
                onClose={() =>
                  this.setState({
                    isHaveTickPoll: false,
                  })
                }
              />
            </View>
          ) : null}
          <TouchableWithoutFeedback
            style={{ width: '100%', height: '100%' }}
            onPress={() => Keyboard.dismiss()}
          />
          <Animated.View style={menuStyle}>
            <FlatList
              horizontal={true}
              style={{
                width: '100%',
                height: 100,
                marginBottom: 10,
              }}
              data={images}
              renderItem={({ item, index }) => {
                // console.log("Render:", listUrlPicture?.length)
                return (
                  <ItemPicture
                    urlPicture={item.uri}
                    onClose={() => {
                      const imageState: ImageFormData[] = JSON.parse(
                        JSON.stringify(this.state.images),
                      )
                      const newImageState = imageState.filter(
                        (image, index1) => {
                          return index1 !== index ? image : null
                        },
                      )
                      console.log(newImageState)
                      this.setState({
                        images: newImageState,
                      })
                    }}
                  />
                )
              }}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => this.onPressAddPicture()}>
              <Icon name="picture" size={30} />
              <Text style={styles.title}>Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.icon,
                { borderColor: 'gray', borderBottomWidth: 0.3 },
              ]}
              onPress={() => this.onPressChart()}>
              <Icon name="areachart" size={30} />
              <Text style={styles.title}>Tick Poll</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    )
  }

  listTickPoll: ItemTickPollRef[] = [
    { name: 'Android', numberTick: 150 },
    { name: 'React Native', numberTick: 50 },
  ]

  async getContentIfEditPost() {
    const id = this.props.route.params.params?.postId
    if (id) {
      const data = await postService.getFullPostById(id)
      const post = convertToPostType(data.post)
      const imageState = JSON.parse(JSON.stringify(this.state.images))
      post.photos.forEach((v) => {
        imageState.push({
          uri: v,
        })
      })
      this.setState({
        defaultContent: post.content,
        images: imageState,
      })
    }
  }

  onPressAddPicture() {
    // const options: ImagePickerOptions = {
    //   title: 'Select Picture',
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // }

    // /**
    //  * Open gallery
    //  */
    // ImagePicker.showImagePicker(options, (response: ImagePickerResponse) => {
    //   console.log(response.path)
    //   const imageState = JSON.parse(JSON.stringify(this.state.images))
    //   imageState.push({
    //     uri: Platform.OS === 'ios' ? response.uri : 'file://' + response.path,
    //     name: response.fileName!,
    //     type: response.type!,
    //   })
    //   this.setState({
    //     images: imageState,
    //   })
    // })

    ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
      includeExif: true,
      multiple: true,
      cropping: true,
    }).then((res) => {
      // console.log('AppLog', image)
      const image = res as ImageP[]
      const imageState = JSON.parse(JSON.stringify(this.state.images))
      image.forEach((element) => {
        const arr = element.path.split('/')
        const name = arr[arr.length - 1]
        imageState.push({
          uri: element.path,
          name: name,
          type: element.mime,
        })
      })
      this.setState({
        images: imageState,
      })
    })
  }

  onPressChart() {
    this.setState({
      isHaveTickPoll: true,
    })
  }

  onFocusEditText() {
    Animated.timing(this.scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: 250,
    }).start()
  }

  onUnfocusEditText() {
    Animated.timing(this.scaleValue, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: 250,
    }).start()
  }

  onPressPost = async () => {
    console.log('Post clicked!')

    // console.log(this.state.images)
    if (this.props.route.params) {
      const post: Post = {
        id: this.props.route.params.params?.postId,
        content: this.state.content,
        groupId: 1,
        type: 1,
        photos: [],
      }
      // console.log(this.state.images)
      const status = await postService.updatePost(post, this.state.images)
    } else {
      const post: Post = {
        content: this.state.content,
        groupId: 1,
        type: 1,
        photos: [],
      }
      const status = await postService.addPost(post, this.state.images)
    }
    // this.props.navigation.goBack()
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  textinput: {
    flex: 1,
    marginRight: 20,
    fontSize: 20,
    marginTop: 16,
  },
  wrapperTextInput: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 16,
  },
  icon: {
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: 'gray',
    borderTopWidth: 0.3,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  title: {
    margin: 10,
  },
})

export default CreatePostScreen
