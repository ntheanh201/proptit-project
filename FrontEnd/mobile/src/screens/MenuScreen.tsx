import React, { Component } from 'react'
import {
  View,
  Button,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import colors from '../values/colors'
import styles from '../values/styles'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import ItemGroup from '../components/itemgroup/ItemGroup'

interface MenuScreenProps {
  navigation: StackNavigationProp<RootStackParams>
}

interface Group {
  id: string
  imgUrl: string
  name: string
}

interface MenuScreenState {
  isExpened: boolean
  listGroup: Group[]
}

class MenuScreen extends Component<MenuScreenProps, MenuScreenState> {
  constructor(props: MenuScreenProps) {
    super(props)

    this.state = {
      isExpened: false,
      listGroup: [
        {
          id: '1',
          imgUrl:
            'https://cellphones.com.vn/sforum/wp-content/uploads/2019/08/Android-new.jpg',
          name: 'Android',
        },
        {
          id: '2',
          imgUrl:
            'https://pbs.twimg.com/profile_images/1110319067280269312/iEqpsbUA_400x400.png',
          name: 'Ios',
        },
      ],
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={{ width: '100%', height: '100%', padding: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[styles.bold_text, { fontSize: 25, marginBottom: 20 }]}>
              Menu
            </Text>
            <TouchableOpacity>
              <Ionicon name="md-search" size={30} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/images/avt_batman.png')}
              style={styles.normal_icon}
            />
            <Text style={[styles.bold_text, { marginLeft: 10 }]}>Batman</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.onPressGroup()
            }}>
            <View
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.3,
                width: '100%',
                height: 50,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcon name="group" size={20} />
              <Text
                style={[
                  styles.bold_text,
                  { fontSize: 15, flex: 1, marginLeft: 20 },
                ]}>
                Group
              </Text>
              <Ionicon
                name={this.state.isExpened ? 'ios-arrow-up' : 'ios-arrow-down'}
                size={20}
              />
            </View>
          </TouchableOpacity>
          <View style={{ paddingLeft: 20 }}>
            {this.state.isExpened
              ? this.state.listGroup.map((v) => this.renderItemGroup(v))
              : null}
          </View>
          <TouchableOpacity
            onPress={() => {
              this.onPressSetting()
            }}>
            <View
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.3,
                width: '100%',
                height: 50,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicon name="md-settings" size={20} />
              <Text
                style={[
                  styles.bold_text,
                  { fontSize: 15, flex: 1, marginLeft: 20 },
                ]}>
                Setting
              </Text>
              <Ionicon
                name={this.state.isExpened ? 'ios-arrow-up' : 'ios-arrow-down'}
                size={20}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.onPressLogout()
            }}>
            <View
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.3,
                width: '100%',
                height: 50,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcon name="power-settings-new" size={20} />
              <Text
                style={[
                  styles.bold_text,
                  { fontSize: 15, flex: 1, marginLeft: 20 },
                ]}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
  onPressLogout() {}
  onPressSetting() {}
  onPressGroup() {
    this.setState({
      isExpened: !this.state.isExpened,
    })
  }

  renderItemGroup(item: Group) {
    return (
      <ItemGroup
        name={item.name}
        imgUrl={item.imgUrl}
        onPress={() => this.onPressItemGroup()}
      />
    )
  }
  onPressItemGroup(): void {}
}

export default MenuScreen
