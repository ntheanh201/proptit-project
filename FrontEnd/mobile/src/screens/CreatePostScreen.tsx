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
} from 'react-native'
import ClassicHeader from '../components/header/ClassicHeader'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import React from 'react'
import { Icon } from 'native-base'
import { _rightComponentStyle } from '../components/header/ClassicHeader.style'
import ImagePicker, { ImagePickerOptions, ImagePickerResponse } from 'react-native-image-picker'
import ItemTickPoll from '../components/tickpoll/ItemTickPoll'
import TickPoll, { ItemTickPollRef } from '../components/tickpoll/TickPoll'
import ItemTickPollEditor from '../components/tickpolleditor/ItemTickPollEditor'
import TickPollEditor from '../components/tickpolleditor/TickPollEditor'
import ItemPicture from '../components/itempicture/ItemPicture'

interface CreatePostScreenState {
  isHaveTickPoll: boolean,
  listUrlPicture: string[]
}

interface CreatePostScreenProps extends BaseScreenProps {

}

class CreatePostScreen extends BaseScreen<CreatePostScreenProps, CreatePostScreenState> {

  constructor(props: CreatePostScreenProps) {
    super(props)
    this.state = {
      isHaveTickPoll: false,
      listUrlPicture: []
    }
  }

  render() {
    const { isHaveTickPoll, listUrlPicture } = this.state
    return (
      <SafeAreaView style={styles.wrapper}>
        <ClassicHeader
          leftComponentOnPress={() => this.goBack()}
          statusBarHidden={true}
          headerTitle="NEW POST"
          rightComponent={
            <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", marginRight: 10 }}
              onPress={() => this.onPressPost()}>
              <Text style={{ fontSize: 16 }}>POST</Text>
            </TouchableOpacity>
          }
        />
        <KeyboardAvoidingView style={styles.wrapperTextInput}>
          <View style={{ flexDirection: "row" }}>
            <Image source={require("../assets/images/avt_batman.png")} style={styles.avartar} />
            <TextInput
              style={styles.textinput}
              placeholder="Share something!"
              multiline={true}
            />
          </View>
          {
            isHaveTickPoll ?
              <View style={{ width: "100%", alignItems: "center" }}>
                <TickPollEditor onClose={() => this.setState({
                  isHaveTickPoll: false
                })} />
              </View> : null
          }
          <View style={{ width: "100%", height: 100, position: "absolute", bottom: 70, zIndex: 10 }}>
            <FlatList
              horizontal={true}
              style={{ width: "100%", height: "100%" }}
              data={listUrlPicture}
              keyExtractor={
                item => item
              }
              renderItem={({ item }) => {
                // console.log("Render:", listUrlPicture?.length)
                return (
                  <ItemPicture urlPicture={item} onClose={() => {
                    console.log("AppLog", "On Close")
                    const index = listUrlPicture.indexOf(item)
                    delete listUrlPicture[index]
                    this.setState({
                      listUrlPicture: listUrlPicture
                    })
                  }} />
                )
              }}
            />
          </View>
          <TouchableWithoutFeedback
            style={{ width: '100%', height: '100%' }}
            onPress={() => Keyboard.dismiss()}
          />
          <View style={{ flexDirection: "row-reverse", height: 50, width: '100%', position: "absolute", bottom: 0, paddingHorizontal: 10 }}>
            <TouchableOpacity style={styles.icon} onPress={() => this.onPressAddPicture()}>
              <Icon type="AntDesign" name="picture" fontSize={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressChart()}>
              <Icon type="AntDesign" name="areachart" fontSize={30} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }

  listTickPoll: ItemTickPollRef[] = [{ name: "Android", numberTick: 150 }, { name: "React Native", numberTick: 50 }]

  onPressAddPicture() {
    // console.log("Picture clicked!")

    const options: ImagePickerOptions = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * Open gallery
     */
    ImagePicker.showImagePicker(options, (response: ImagePickerResponse) => {
      this.state.listUrlPicture?.push(response.uri)
      this.setState(
        {
          listUrlPicture: this.state.listUrlPicture
        }
      )
    })
  }

  onPressChart() {
    this.setState({
      isHaveTickPoll: true
    })
  }

  onPressPost() {
    console.log("Post clicked!")
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
    flexDirection: "column",
  },
  avartar: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 16
  },
  icon: {
    marginHorizontal: 10
  }
})

export default CreatePostScreen
