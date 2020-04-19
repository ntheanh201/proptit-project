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

interface Item {
  key: string
}

interface Member {
  key: string
}

interface GroupScreenProps {
  navigation: StackNavigationProp<RootStackParams>
}

interface GroupScreenState {
  refreshing: boolean
  isLoadingMore: boolean
  isBottom: boolean
  listItems: Item[]
  listMember: Member[]
}

class GroupScreen extends React.Component<GroupScreenProps, GroupScreenState> {
  constructor(props: GroupScreenProps) {
    super(props)
    this.state = {
      refreshing: false,
      isLoadingMore: false,
      isBottom: false,
      listItems: [
        {
          key: '1',
        },
        {
          key: '2',
        },
        {
          key: '3',
        },
      ],
      listMember: [
        {
          key: '1',
        },
        {
          key: '2',
        },
        {
          key: '3',
        },
        {
          key: '4',
        },
        {
          key: '5',
        },
      ],
    }
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
    return (
      <SafeAreaView>
        <ScrollView
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
              source={require('../assets/images/avt_batman.png')}
              style={{ width: '100%', height: 200 }}
            />
            <Text style={[styles.bold_text, { marginTop: 20 }]}>
              Mobile ProPTIT
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
              {this.state.listMember.map((member, index) => {
                if (index == this.state.listMember.length - 1) {
                  return (
                    <TouchableOpacity
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
                  )
                } else {
                  return (
                    <Image
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 25,
                        position: 'relative',
                        top: 0,
                        left: 0,
                      }}
                      source={require('../assets/images/avt_batman.png')}
                    />
                  )
                }
              })}
            </View>
          </View>
          {this.state.listItems.map(() => (
            <ItemNewsFeed
              onPress={() => {
                console.log('AppLog', this.props)
                this.props.navigation.navigate('PostDetail')
              }}
            />
          ))}
          {this.state.isLoadingMore ? (
            <ActivityIndicator
              animating={this.state.isLoadingMore}
              style={{ marginVertical: 10 }}
            />
          ) : null}
        </ScrollView>
        <FloatingButton
          onPress={() => {
            this.props.navigation.navigate('CreatePost')
          }}
        />
      </SafeAreaView>
    )
  }
}

export default GroupScreen
