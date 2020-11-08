import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Target } from '../core'
import { RootStackParams } from '../navigations/AppNavigator'
import { targetService } from '../services'
import moment from 'moment'
import colors from '../values/colors'
import Modal from 'react-native-modal'

interface TargetScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<RootStackParams, 'Target'>
}

interface TargetScreenState {
  targets: Target[]
  modalVisible: boolean
}

class TargetScreen extends React.Component<
  TargetScreenProps,
  TargetScreenState
> {
  constructor(props: TargetScreenProps) {
    super(props)
    this.state = {
      targets: [],
      modalVisible: false,
    }
    this.props.navigation.setOptions({
      headerBackTitleVisible: false,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Text
            style={{
              fontSize: 16,
              color: colors.mainBlue,
              fontWeight: 'bold',
            }}>
            Add
          </Text>
        </TouchableOpacity>
      ),
    })
  }

  componentDidMount() {
    this.getTargets()
  }

  getTargets = async () => {
    if (this.props.route.params.userId) {
    }
    const targets = await targetService.getAll()
    if (targets) {
      this.setState({ targets })
    }
  }

  render() {
    return (
      <>
        <ScrollView>
          {/* <Text>Tháng 11</Text> */}
          {this.state.targets.map((target) => {
            return (
              <TouchableOpacity style={styles.cardWrapper}>
                <View>
                  <Text style={styles.title}>{target.name}</Text>
                  <Text style={styles.description}>
                    {moment(target.createdTime).format('MMM DD').toString()}
                  </Text>
                </View>
                <Text>Pending</Text>
                {target.point && (
                  <View style={styles.pointWrapper}>
                    <Text style={styles.point}>{target.point.score} pts</Text>
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <Modal isVisible={this.state.modalVisible}>
          <View>
            <Text>Modal</Text>
          </View>
        </Modal>
      </>
    )
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderLeftColor: '#ffcc00',
    borderLeftWidth: 5,
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  pointWrapper: {
    backgroundColor: '#64a338',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: 'gray',
  },
  point: {
    color: 'white',
  },
})

export default TargetScreen
