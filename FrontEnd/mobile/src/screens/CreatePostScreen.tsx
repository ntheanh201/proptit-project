import { BaseScreen, BaseScreenProps } from './BaseScreen'
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
} from 'react-native'
import ClassicHeader from '../components/header/ClassicHeader'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import React from 'react'
import ImagePicker, {
  ImagePickerOptions,
  ImagePickerResponse,
} from 'react-native-image-picker'
import { ItemTickPollRef } from '../components/tickpoll/TickPoll'
import TickPollEditor from '../components/tickpolleditor/TickPollEditor'
import ItemPicture from '../components/itempicture/ItemPicture'
import Icon from 'react-native-vector-icons/AntDesign'

interface CreatePostScreenState {
  isHaveTickPoll: boolean
  listUrlPicture: string[]
  padding: number
}

interface CreatePostScreenProps extends BaseScreenProps {}

class CreatePostScreen extends BaseScreen<
  CreatePostScreenProps,
  CreatePostScreenState
> {
  constructor(props: CreatePostScreenProps) {
    super(props)
    this.state = {
      isHaveTickPoll: false,
      listUrlPicture: [],
      padding: 0,
    }
  }

  componentDidMount() {
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      this.onKeyboardShow,
    )
    Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      this.onKeyboardHide,
    )
  }

  onKeyboardShow = (e: any) => {
    this.setState({
      padding: e.endCoordinates.height,
    })
  }

  onKeyboardHide = () => {
    this.setState({
      padding: 0,
    })
  }

  render() {
    const { isHaveTickPoll, listUrlPicture } = this.state
    return (
      <View style={[styles.wrapper, { paddingBottom: this.state.padding }]}>
        {/* <ClassicHeader
          leftComponentOnPress={() => this.goBack()}
          statusBarHidden={true}
          headerTitle="NEW POST"
          rightComponent={
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}
              onPress={() => this.onPressPost()}>
              <Text style={{ fontSize: 16 }}>POST</Text>
            </TouchableOpacity>
          }
        /> */}
        <View style={styles.wrapperTextInput}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../assets/images/avt_batman.png')}
              style={styles.avartar}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Share something!"
              multiline={true}
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
          <View
            style={{
              width: '100%',
              height: 100,
              position: 'absolute',
              bottom: 70,
              zIndex: 10,
            }}>
            <FlatList
              horizontal={true}
              style={{ width: '100%', height: '100%' }}
              data={listUrlPicture}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                // console.log("Render:", listUrlPicture?.length)
                return (
                  <ItemPicture
                    urlPicture={item}
                    onClose={() => {
                      const index = listUrlPicture.indexOf(item)
                      console.log('AppLog', index)
                      listUrlPicture.splice(index, index + 1)
                      this.setState({
                        listUrlPicture: listUrlPicture,
                      })
                    }}
                  />
                )
              }}
            />
          </View>
          <TouchableWithoutFeedback
            style={{ width: '100%', height: '100%' }}
            onPress={() => Keyboard.dismiss()}
          />
          <View
            style={{
              flexDirection: 'row-reverse',
              height: 50,
              width: '100%',
              position: 'absolute',
              bottom: 0,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => this.onPressAddPicture()}>
              <Icon name="picture" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressChart()}>
              <Icon name="areachart" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  listTickPoll: ItemTickPollRef[] = [
    { name: 'Android', numberTick: 150 },
    { name: 'React Native', numberTick: 50 },
  ]

  onPressAddPicture() {
    // console.log("Picture clicked!")

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
      this.state.listUrlPicture?.push(response.uri)
      this.setState({
        listUrlPicture: this.state.listUrlPicture,
      })
    })
  }

  onPressChart() {
    this.setState({
      isHaveTickPoll: true,
    })
  }

  onPressPost() {
    console.log('Post clicked!')
    this.goBack()
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
  avartar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 16,
  },
  icon: {
    marginHorizontal: 10,
  },
})

export default CreatePostScreen
