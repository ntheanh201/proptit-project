import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { AppState, Point, Target } from '../core'
import { RootStackParams } from '../navigations/AppNavigator'
import { pointService, targetService } from '../services'
import moment from 'moment'
import colors from '../values/colors'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Picker } from '@react-native-community/picker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface TargetScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<RootStackParams, 'Target'>
}

interface TargetScreenState {
  targets: Target[]
  modalVisible: boolean
  currentFocusedTarget?: Target
  pointChosing: boolean
  pointList: Point[]
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
      pointChosing: false,
      pointList: [],
    }
    this.props.navigation.setOptions({
      headerBackTitleVisible: false,
      title: this.props.route.params.adminMode ? 'Target (Admin)' : 'Target',
    })
  }

  componentDidMount() {
    this.getTargets()
  }

  getTargets = async () => {
    if (this.props.route.params.userId) {
    }
    const targets = this.props.route.params.adminMode
      ? await targetService.getAll()
      : await targetService.getCurrentMonthTarget()
    if (targets) {
      this.setState({ targets })
    }
    if (this.props.route.params.adminMode) {
      const pointList = await pointService.getAll()
      if (pointList) {
        this.setState({ pointList })
      }
    }
  }

  render() {
    const {
      currentFocusedTarget,
      targets,
      modalVisible,
      pointChosing,
      pointList,
    } = this.state
    const { adminMode } = this.props.route.params
    return (
      <>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text style={styles.title}>Tháng 11</Text>
          </View>
          {targets.map((target) => {
            return (
              <TouchableOpacity
                style={styles.cardWrapper}
                onPress={() => {
                  this.setState({
                    modalVisible: true,
                    currentFocusedTarget: target,
                    pointChosing: false,
                  })
                }}>
                <View>
                  <Text style={styles.title}>{target.name}</Text>
                  <Text style={styles.description}>
                    {moment(target.createdTime).format('MMM DD').toString()}
                  </Text>
                </View>
                <Text>{this.convertStatus(target.status)}</Text>
                {target.point && (
                  <View style={styles.pointWrapper}>
                    <Text style={styles.point}>{target.point.score} pts</Text>
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
          {!adminMode && (
            <TouchableOpacity style={styles.addButton}>
              <AntDesign name="pluscircle" color="white" size={20} />
              <Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }}>
                Add Target
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => {
            this.setState({ modalVisible: false })
          }}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}>
          <View style={styles.modalWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.title}>{currentFocusedTarget?.name}</Text>
              {currentFocusedTarget?.point && (
                <View
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#00C853',
                    padding: 5,
                  }}>
                  <Text style={styles.point}>
                    {currentFocusedTarget?.point.score} pts
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.description}>
              {this.convertStatus(currentFocusedTarget?.status)}
            </Text>
            <Text style={styles.description}>
              {moment(currentFocusedTarget?.createdTime)
                .format('MMM DD')
                .toString()}
            </Text>
            {adminMode ? (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>Point: </Text>
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: '#e0e0e0',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingRight: 5,
                    }}
                    onPress={() => {
                      this.setState({ pointChosing: !pointChosing })
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        alignContent: 'center',
                      }}>
                      {currentFocusedTarget?.point
                        ? currentFocusedTarget.point.score + ' pts'
                        : 'null'}
                    </Text>
                    <MaterialIcons name="arrow-drop-down" size={20} />
                  </TouchableOpacity>
                </View>
                {pointChosing && (
                  <Picker
                    selectedValue={JSON.stringify(currentFocusedTarget?.point)}
                    onValueChange={(value, index) => {
                      const point: Point = JSON.parse(value.toString())
                      this.setState((prevState) => {
                        return {
                          currentFocusedTarget: {
                            ...prevState.currentFocusedTarget!,
                            point,
                          },
                        }
                      })
                    }}>
                    {pointList.map((point) => (
                      <Picker.Item
                        label={`${point.score} pts`}
                        value={JSON.stringify(point)}
                      />
                    ))}
                  </Picker>
                )}
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={async () => {
                      const response = await targetService.update(
                        currentFocusedTarget!,
                      )
                      if (response === 'success') {
                        this.setState({ modalVisible: false })
                      }
                    }}>
                    <Text style={{ color: 'white' }}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.dangerButton}
                    onPress={() => {
                      Alert.alert(
                        'Reject Target?',
                        'Do you really want to reject this target?',
                        [
                          {
                            text: 'Reject',
                            onPress: () => {
                              this.setState({ modalVisible: false })
                            },
                            style: 'destructive',
                          },
                          {
                            text: 'Cancel',
                            onPress: () => {
                              this.setState({ modalVisible: false })
                            },
                            style: 'cancel',
                          },
                        ],
                        { cancelable: false },
                      )
                    }}>
                    <Text style={{ color: 'red' }}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={{ color: 'white' }}>Send Result</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dangerButton}>
                  <Text style={{ color: 'red' }}>Give up!</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      </>
    )
  }

  convertStatus(status?: number): string {
    switch (status) {
      case 0:
        return 'Pending'
      case 1:
        return 'Doing'
      case 2:
        return 'Done'
      default:
        return 'Unknown'
    }
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
    backgroundColor: '#00C853',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 5,
  },
  modalWrapper: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 15,
    padding: 15,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: 'gray',
  },
  point: {
    color: 'white',
  },
  dangerButton: {
    alignItems: 'center',
    padding: 10,
  },
  acceptButton: {
    borderRadius: 10,
    backgroundColor: '#00C853',
    alignItems: 'center',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#3865a3',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
})

const mapStateToProps = (state: AppState) => ({
  signInState: state.signin,
})
export default connect(mapStateToProps)(TargetScreen)
