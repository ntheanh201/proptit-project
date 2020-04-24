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
import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse,
} from 'react-native-image-picker'
import { ItemTickPollRef } from '../components/tickpoll/TickPoll'
import TickPollEditor from '../components/tickpolleditor/TickPollEditor'
import ItemPicture from '../components/itempicture/ItemPicture'
import Icon from 'react-native-vector-icons/AntDesign'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import colors from '../values/colors'
import { postService } from '../services'
import { Post, ImageFormData } from '../core'

interface CreatePostScreenState {
  isHaveTickPoll: boolean
  images: ImageFormData[]
  padding: number
  content: string
}

interface CreatePostScreenProps {
  navigation: StackNavigationProp<RootStackParams>
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
    }

    this.props.navigation.setOptions({
      title: '',
      headerBackTitle: '',
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

  render() {
    const { isHaveTickPoll, images } = this.state

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

    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperTextInput}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../assets/images/avt_batman.png')}
              style={styles.avatar}
            />
            <TextInput
              onFocus={() => this.onFocusEditText()}
              onBlur={() => this.onUnfocusEditText()}
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
                      images.splice(index, index + 1)
                      this.setState({
                        images: images,
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

  onPressAddPicture() {
    const options: ImagePickerOptions = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    /**
     * Open gallery
     */
    ImagePicker.showImagePicker(options, (response: ImagePickerResponse) => {
      console.log(response.path)
      const imageState = JSON.parse(JSON.stringify(this.state.images))
      imageState.push({
        uri: 'file://' + response.path,
        name: response.fileName!,
        type: response.type!,
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
    const post: Post = {
      content: this.state.content,
      groupId: 1,
      type: 1,
      photos: [],
    }
    // console.log(this.state.images)
    const status = await postService.addPost(post, this.state.images)
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
    width: '100%',
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
