import {
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  View,
  Image,
  FlatList,
  Platform,
  Animated,
  Easing,
  Alert,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React, { Component, createRef } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import colors from '../values/colors'
import { postService } from '../services'
import {
  Post,
  ImageFormData,
  AppState,
  SignInState,
  addPost,
  PostsState,
} from '../core'
import { RouteProp } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import ImagePicker, { Image as ImageP } from 'react-native-image-crop-picker'
import { connect } from 'react-redux'
import { ItemPicture, TickPollEditor } from '../components'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { postsAction } from '../core/actions'

interface CreatePostScreenState {
  isHaveTickPoll: boolean
  isHavePhoto: boolean
  imagesData: ImageFormData[]
  listPolls: string[]
  padding: number
  content: string
  defaultContent?: string
}

interface CreatePostScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<RootStackParams, 'CreatePost'>
  signInState: SignInState
  postState: PostsState
  addPost: typeof addPost
}

class CreatePostScreen extends Component<
  CreatePostScreenProps,
  CreatePostScreenState
> {
  constructor(props: CreatePostScreenProps) {
    super(props)
    this.state = {
      isHaveTickPoll: false,
      isHavePhoto: false,
      imagesData: [],
      padding: 0,
      content: '',
      defaultContent: '',
      listPolls: ['', ''],
    }

    this.props.navigation.setOptions({
      title: '',
      headerBackTitleVisible: false,
      headerRight: () => (
        <TouchableOpacity disabled={true} onPress={() => this.onPressPost()}>
          <Text
            style={{
              color: colors.mainBlue,
              opacity: 0.5,
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
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      this.onKeyboardShow,
    )
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      this.onKeyboardHide,
    )
  }

  render() {
    const { isHaveTickPoll, imagesData, isHavePhoto } = this.state
    this.checkValid()

    return (
      <View style={styles.wrapper}>
        <View style={styles.wrapperTextInput}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}>
            <Image
              source={{ uri: this.props.signInState.currentUser?.avatar }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  {this.props.signInState.currentUser?.displayName}
                </Text>
                {this.props.route.params.groupId !== 1 ? (
                  <>
                    <AntDesign
                      name={'caretright'}
                      style={{ marginLeft: 5, alignSelf: 'center' }}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      {this.props.route.params.groupName}
                    </Text>
                  </>
                ) : null}
              </View>
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
                autoFocus={true}
              />
              {isHavePhoto && (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={{
                    marginTop: 10,
                  }}
                  data={imagesData}
                  renderItem={({ item, index }) => {
                    return (
                      <ItemPicture
                        urlPicture={item.uri}
                        onClose={() => {
                          const imageState: ImageFormData[] = JSON.parse(
                            JSON.stringify(this.state.imagesData),
                          )
                          const newImageState = imageState.filter(
                            (image, index1) => {
                              return index1 !== index ? image : null
                            },
                          )
                          let havePhotoLeft = true
                          if (newImageState.length === 0) {
                            havePhotoLeft = false
                          }
                          this.setState({
                            imagesData: newImageState,
                            isHavePhoto: havePhotoLeft,
                          })
                        }}
                      />
                    )
                  }}
                />
              )}
              {isHaveTickPoll && (
                <View
                  style={{
                    width: '100%',
                    marginTop: 10,
                  }}>
                  <TickPollEditor
                    listPolls={this.state.listPolls}
                    deleteItem={this.deleteItem}
                    onPressAddOptions={this.onPressAddPoll}
                    onTextChange={(text, index) => {
                      const newState = JSON.parse(
                        JSON.stringify(this.state.listPolls),
                      )
                      newState[index] = text
                      this.setState({ listPolls: newState })
                    }}
                    onClose={() =>
                      this.setState({
                        isHaveTickPoll: false,
                      })
                    }
                  />
                </View>
              )}
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: this.state.padding,
          }}>
          <TouchableOpacity
            style={{ padding: 10 }}
            disabled={this.state.isHaveTickPoll}
            onPress={this.onPressAddPicture}>
            <MaterialCommunityIcon
              name={this.state.isHavePhoto ? 'image' : 'image-outline'}
              size={35}
              style={{
                color: colors.mainBlue,
                opacity: this.state.isHaveTickPoll ? 0.6 : 1,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10 }}
            disabled={this.state.isHavePhoto}
            onPress={() => {
              this.setState({
                isHaveTickPoll: true,
                listPolls: ['', ''],
              })
            }}>
            <MaterialCommunityIcon
              name={this.state.isHaveTickPoll ? 'poll-box' : 'poll'}
              size={this.state.isHaveTickPoll ? 35 : 28}
              style={{
                color: colors.mainBlue,
                opacity: this.state.isHavePhoto ? 0.6 : 1,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  checkValid() {
    let valid = true
    if (this.state.isHaveTickPoll) {
      const checkBlank = this.state.listPolls.filter((item) => {
        return item === ''
      })
      if (checkBlank.length > 0) {
        valid = false
      }
    }

    if (this.state.content === '') {
      valid = false
    }

    this.props.navigation.setOptions({
      title: '',
      headerBackTitleVisible: false,
      headerRight: () => (
        <TouchableOpacity disabled={!valid} onPress={() => this.onPressPost()}>
          <Text
            style={{
              color: colors.mainBlue,
              opacity: valid ? 1 : 0.5,
              marginEnd: 10,
              fontWeight: 'bold',
            }}>
            POST
          </Text>
        </TouchableOpacity>
      ),
    })
  }

  async getContentIfEditPost() {
    const id = this.props.route.params?.postId
    if (id) {
      const data = await postService.getFullPostById(id)
      const imageState = JSON.parse(JSON.stringify(this.state.imagesData))
      data.photos.forEach((photo) => {
        imageState.push({
          uri: photo,
        })
      })
      this.setState({
        defaultContent: data.content,
        imagesData: imageState,
      })
    }
  }

  onPressAddPicture = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
      includeExif: true,
      multiple: true,
      cropping: true,
      showsSelectedCount: true,
    })
      .then((res) => {
        // console.log('AppLog', image)
        const image = res as ImageP[]
        const imageState = JSON.parse(JSON.stringify(this.state.imagesData))
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
          imagesData: imageState,
          isHavePhoto: true,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteItem = (itemIndex: number) => {
    const stateClone: string[] = JSON.parse(
      JSON.stringify(this.state.listPolls),
    )
    const newState = stateClone.filter((option, index) => {
      return index !== itemIndex
    })

    this.setState({
      listPolls: newState,
    })
  }

  onPressAddPoll = () => {
    const stateClone: string[] = JSON.parse(
      JSON.stringify(this.state.listPolls),
    )

    stateClone.push('')

    this.setState({
      listPolls: stateClone,
    })
  }

  onPressChart() {
    this.setState({
      isHaveTickPoll: true,
    })
  }

  onKeyboardShow = (e: any) => {
    Platform.OS === 'ios' &&
      this.setState({
        padding: e.endCoordinates.height,
      })
  }

  onKeyboardHide = () => {
    Platform.OS === 'ios' &&
      this.setState({
        padding: 0,
      })
  }

  onPressPost = async () => {
    console.log('Post clicked!')
    if (this.props.route.params.postId) {
      const post = {
        id: this.props.route.params?.postId,
        content: this.state.content,
        assignedGroupId: this.props.route.params?.groupId,
        type: 1,
      }
      // console.log(this.state.images)
      // const status = await postService.updatePost(post)
      // status === 'success' && this.props.navigation.goBack()
    } else {
      const postData = {
        content: this.state.content,
        assignedGroup: {
          id: this.props.route.params?.groupId,
          name: '',
          cover: '',
        },
        type: this.state.isHaveTickPoll ? 1 : 0,
      }
      await this.props.addPost(
        postData,
        this.state.imagesData,
        this.state.listPolls,
      )
      if (this.props.postState.postingSuccess) {
        this.props.navigation.goBack()
      } else {
        Alert.alert('Check your Internet connection!')
      }
    }
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
  },
  textinput: {
    marginRight: 10,
    fontSize: 20,
    marginTop: 5,
    textAlignVertical: 'top',
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

const mapStateToProps = (state: AppState) => ({
  signInState: state.signin,
  postState: state.post,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(postsAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostScreen)
