import React from 'react'
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Text,
  Image,
  Button,
  ScrollView,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import FloatingButton from '../components/FloatingButton'
import ItemNewsFeed from '../components/ItemNewsFeed'
import styles from '../values/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { color, Value } from 'react-native-reanimated'
import colors from '../values/colors'
import Icon from 'react-native-vector-icons/AntDesign'
import { images } from '../assets'
import { groupService } from '../services/GroupService'
import { RouteProp } from '@react-navigation/native'
import { Group, Post } from '../core'
import { postService } from '../services'

interface Item {
  key: string
}

interface Member {
  key: string
}

interface GroupScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<RootStackParams, 'Group'>
}

interface GroupScreenState {
  refreshing: boolean
  isLoadingMore: boolean
  isLoading: boolean
  isLoadingPost: boolean
  isBottom: boolean
  groupData?: Group
  postData: Post[]
}

class GroupScreen extends React.Component<GroupScreenProps, GroupScreenState> {
  constructor(props: GroupScreenProps) {
    super(props)
    this.state = {
      isLoading: true,
      refreshing: false,
      isLoadingMore: false,
      isLoadingPost: true,
      isBottom: false,
      postData: [],
    }
    this.props.navigation.setOptions({
      title: '',
      headerBackTitleVisible: false,
      headerTintColor: 'black',
    })
    this.loadGroupData()
    this.loadPostGroup()
  }

  componentDidMount() {}

  loadGroupData = async () => {
    const groupData = await groupService.getById(
      this.props.route.params.groupId,
    )
    this.setState({ groupData, isLoading: false })
  }

  loadPostGroup = async () => {
    const postData = await postService.getAllwParams(
      'group',
      this.props.route.params.groupId,
    )
    this.setState({ postData, isLoadingPost: false })
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    })

    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 1000)
  }

  loadMore = () => {
    this.setState({
      isLoadingMore: true,
    })

    setTimeout(() => {
      this.setState({ isLoadingMore: false })
    }, 1000)
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator animating={true} />
    }
    return (
      <SafeAreaView>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={(e) => {
            const y = e.nativeEvent.contentOffset.y
            // console.log('AppLog', y)
            if (y >= 300) {
              this.props.navigation.setOptions({
                headerTitle: () => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{ uri: this.state.groupData?.cover }}
                      style={{ height: 30, width: 30, borderRadius: 5 }}
                    />
                    <Text style={[styles.bold_text, { marginLeft: 10 }]}>
                      {this.state.groupData?.name}
                    </Text>
                  </View>
                ),
              })
            } else {
              this.props.navigation.setOptions({
                headerTitle: () => null,
              })
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'gray',
            flexDirection: 'column',
          }}>
          <View
            style={{
              paddingBottom: 10,
              marginBottom: 10,
              backgroundColor: 'white',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Image
              source={{ uri: this.state.groupData?.cover }}
              style={{ width: '100%', height: 200 }}
            />
            <Text style={[styles.bold_text, { marginTop: 20 }]}>
              {this.state.groupData?.name}
            </Text>
            <Text style={{ color: 'gray' }}>11 members</Text>
            <View
              style={{
                marginTop: 10,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.navigateToMember()
                }}
                style={{
                  flexDirection: 'row',
                }}>
                {this.state.groupData &&
                  this.state.groupData.members.map((member, index) => (
                    <Image
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 25,
                        position: 'relative',
                        top: 0,
                        left: 0,
                      }}
                      source={{ uri: member.avatar }}
                    />
                  ))}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  height: 40,
                  width: 100,
                  marginLeft: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 25,
                  backgroundColor: colors.mainBlue,
                }}>
                <Icon name="plus" color="white" size={20} />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: 10,
                  }}>
                  Invite
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.isLoadingPost ? (
            <ActivityIndicator animating={true} />
          ) : (
            this.state.postData.map((post) => (
              <ItemNewsFeed
                post={post}
                currentGroup={post.assignedGroupId}
                onPressProfile={() => {
                  this.props.navigation.navigate('Profile', {
                    userId: post.assignedUserId,
                  })
                }}
                onPressGroup={() => {}}
                onPressImage={() => {
                  this.props.navigation.navigate('ImageView', {
                    listImage: post.photos,
                  })
                }}
                onPress={() => {
                  this.props.navigation.navigate('PostDetail', {
                    postId: post.id,
                  })
                }}
              />
            ))
          )}
          {this.state.isLoadingMore ? (
            <ActivityIndicator
              animating={this.state.isLoadingMore}
              style={{ marginVertical: 10 }}
            />
          ) : null}
        </ScrollView>
        <FloatingButton
          onPress={() => {
            this.props.navigation.navigate('CreatePost', {
              groupId: this.state.groupData?.id!,
              groupName: this.state.groupData?.name!,
            })
          }}
        />
      </SafeAreaView>
    )
  }
  navigateToInvite = () => {
    throw new Error('Method not implemented.')
  }

  navigateToMember = () => {}
}

export default GroupScreen
