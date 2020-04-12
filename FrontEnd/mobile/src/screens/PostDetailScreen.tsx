import * as React from 'react'
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native'
import ItemNewsFeed from '../components/ItemNewsFeed'
import { images } from '../assets'
import ItemComment from '../components/comment/ItemComment'
import { StackNavigationProp } from '@react-navigation/stack'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RootStackParams } from '../navigations/AppNavigator'

interface PostDetailScreenProps {
  navigation: StackNavigationProp<RootStackParams>
}

interface PostDetailScreenState {
  padding: number
}

class PostDetailScreen extends React.Component<
  PostDetailScreenProps,
  PostDetailScreenState
> {
  constructor(props: PostDetailScreenProps) {
    super(props)
    this.state = {
      padding: 0,
    }
    this.props.navigation.setOptions({
      title: 'Post',
      headerLeft: () => (
        <IonIcon
          name="md-arrow-round-back"
          size={25}
          style={{ marginLeft: 10 }}
        />
      ),
      headerRight: () => (
        <MCIcons name="magnify" size={25} style={{ marginRight: 10 }} />
      ),
    })
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
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          paddingBottom: this.state.padding,
        }}>
        <ScrollView
          style={{
            width: '100%',
            height: '90%',
          }}>
          <ItemNewsFeed />
          <View
            style={{
              width: '100%',
              height: 30,
              backgroundColor: 'rgb(245, 245, 245)',
              borderColor: 'rgb(203, 204, 204)',
              borderTopWidth: 0.5,
              justifyContent: 'center',
            }}>
            <Text style={{ marginLeft: 20, color: 'gray' }}>Comment</Text>
          </View>
          {[
            'Good! dddddddddddddddddddddddddddddddd d d d d d  d d d d d d d d d d d d d ',
            'Nice! Bro',
            'Awesome!',
          ].map((content) => (
            <ItemComment content={content} urlAvatar="" />
          ))}
          <View
            style={{
              width: '100%',
              height: 30,
              backgroundColor: 'rgb(245, 245, 245)',
              borderColor: 'rgb(203, 204, 204)',
              borderTopWidth: 0.5,
              justifyContent: 'center',
            }}>
            <Text style={{ marginLeft: 20, color: 'gray' }}>Liked</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              backgroundColor: 'white',
            }}>
            <FlatList
              data={[1, 2, 3, 4]}
              style={{ padding: 5 }}
              renderItem={({ item }) => (
                <Image
                  source={images.AVT_BATMAN}
                  style={{ height: 40, width: 40, borderRadius: 100 }}
                />
              )}
              horizontal={true}
            />
          </View>
        </ScrollView>
        <View
          style={{
            width: '100%',
            elevation: 10,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
            backgroundColor: 'white',
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/images/avt_batman.png')}
            style={{ height: 60, width: 60, borderRadius: 100 }}
          />
          <TextInput
            placeholder="Leave Reply"
            multiline={true}
            style={{ width: '100%', fontSize: 20, marginLeft: 10 }}
          />
        </View>
      </View>
    )
  }
}

export default PostDetailScreen
