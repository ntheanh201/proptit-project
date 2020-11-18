import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { AppState, ImageFormData, Point, Target, User } from '../core'
import { RootStackParams } from '../navigations/AppNavigator'
import { pointService, targetService } from '../services'
import moment from 'moment'
import colors from '../values/colors'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Picker } from '@react-native-community/picker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FloatingLabelInput } from '../components'
import ImagePicker, { Image as ImageP } from 'react-native-image-crop-picker'
import { HEIGHT } from '../configs/Function'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface TargetScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  route: RouteProp<RootStackParams, 'Target'>
  currentUser?: User
}

interface TargetScreenState {
  targets: Target[]
  infoModalVisible: boolean
  addModalVisible: boolean
  currentFocusedTarget: Target
  pointChosing: boolean
  pointList: Point[]
  status: number
  statusChosing: boolean
  newTarget: string
}

const defaultTarget: Target = {
  id: 0,
  assignedUser: { avatar: '', displayName: '', id: 0 },
  createdTime: new Date(),
  isDone: false,
  name: '',
  status: 0,
}

class TargetScreen extends React.Component<
  TargetScreenProps,
  TargetScreenState
> {
  constructor(props: TargetScreenProps) {
    super(props)
    this.state = {
      targets: [],
      currentFocusedTarget: defaultTarget,
      infoModalVisible: false,
      addModalVisible: false,
      pointChosing: false,
      statusChosing: false,
      pointList: [],
      status: 0,
      newTarget: '',
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
      const targets = this.props.route.params.adminMode
        ? await targetService.getAll()
        : await targetService.getCurrentMonthTarget(
            this.props.route.params.userId,
          )
      if (targets) {
        this.setState({ targets })
      }
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
      infoModalVisible,
      addModalVisible,
      pointChosing,
      pointList,
      status,
      statusChosing,
      newTarget,
    } = this.state
    const { adminMode, userId } = this.props.route.params
    const { currentUser } = this.props
    const statusList = [0, 1, 2, -1]
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
            {Platform.OS === 'ios' ? (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ statusChosing: !statusChosing })
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text>{this.convertStatus(status, true).title}</Text>
                  <MaterialIcons name="arrow-drop-down" size={20} />
                </View>
              </TouchableOpacity>
            ) : (
              <Picker
                style={{ width: 130 }}
                selectedValue={status}
                onValueChange={(value, index) => {
                  this.setState({ status: index !== 3 ? index : -1 })
                }}
                mode="dropdown">
                {statusList.map((stt) => (
                  <Picker.Item
                    label={this.convertStatus(stt, true).title}
                    value={stt}
                  />
                ))}
              </Picker>
            )}
          </View>
          {statusChosing && (
            <Picker
              selectedValue={status}
              onValueChange={(value, index) => {
                this.setState({
                  status: index !== 3 ? index : -1,
                })
              }}>
              {statusList.map((stt) => (
                <Picker.Item
                  label={this.convertStatus(stt, true).title}
                  value={stt}
                />
              ))}
            </Picker>
          )}
          {targets.map((target) => {
            if (target.status === status) {
              return (
                <TouchableOpacity
                  style={[
                    styles.cardWrapper,
                    {
                      borderLeftColor: this.convertStatus(
                        target.status,
                        target.isDone,
                      ).color,
                    },
                  ]}
                  onPress={() => {
                    this.setState({
                      infoModalVisible: true,
                      currentFocusedTarget: target,
                      pointChosing: false,
                    })
                  }}>
                  <View>
                    <Text style={styles.title}>{target.name}</Text>
                    <Text style={styles.description}>
                      {moment(target.createdTime).format('MMM DD').toString()}
                    </Text>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.description}>By: </Text>
                      <Image
                        source={{ uri: target.assignedUser.avatar }}
                        style={{ width: 20, height: 20 }}
                      />
                      <Text style={[styles.description, { marginLeft: 5 }]}>
                        {target.assignedUser.displayName}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: this.convertStatus(target.status, target.isDone)
                        .color,
                      fontWeight: 'bold',
                    }}>
                    {this.convertStatus(target.status, target.isDone).title}
                  </Text>
                  {target.point && (
                    <View style={styles.pointWrapper}>
                      <Text style={styles.point}>{target.point.score} pts</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )
            }
          })}
          {!adminMode && userId === currentUser?.id && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                this.setState({ addModalVisible: true })
              }}>
              <AntDesign name="pluscircle" color="white" size={20} />
              <Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }}>
                Add Target
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <Modal
          isVisible={infoModalVisible}
          onBackdropPress={() => {
            this.setState({ infoModalVisible: false })
          }}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}>
          <View
            style={[styles.modalWrapper, { padding: 0, overflow: 'hidden' }]}>
            {currentFocusedTarget.status === 2 && (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ infoModalVisible: false })
                  this.props.navigation.navigate('ImageView', {
                    listImage: [
                      { id: 0, imgUrl: currentFocusedTarget.resultImage! },
                    ],
                  })
                }}>
                <Image
                  source={{ uri: currentFocusedTarget.resultImage }}
                  style={{
                    width: '100%',
                    height: HEIGHT(150),
                  }}
                  resizeMode={'cover'}
                />
              </TouchableWithoutFeedback>
            )}
            <View style={{ padding: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.title}>{currentFocusedTarget.name}</Text>
                {currentFocusedTarget.point && (
                  <View
                    style={{
                      borderRadius: 15,
                      backgroundColor: '#34A853',
                      padding: 5,
                    }}>
                    <Text style={styles.point}>
                      {currentFocusedTarget.point.score} pts
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.title}>
                <Text>Status: </Text>
                <Text
                  style={{
                    color: this.convertStatus(
                      currentFocusedTarget.status,
                      currentFocusedTarget.isDone,
                    ).color,
                  }}>
                  {
                    this.convertStatus(
                      currentFocusedTarget.status,
                      currentFocusedTarget.isDone,
                    ).title
                  }
                </Text>
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.description}>By: </Text>
                <Image
                  source={{ uri: currentFocusedTarget.assignedUser.avatar }}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={[styles.description, { marginLeft: 5 }]}>
                  {currentFocusedTarget.assignedUser.displayName}
                </Text>
              </View>
              <Text style={styles.description}>
                {moment(currentFocusedTarget.createdTime)
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
                        this.setState((prevState) => {
                          return {
                            pointChosing: !pointChosing,
                            currentFocusedTarget: {
                              ...prevState.currentFocusedTarget,
                              point: pointList[0],
                            },
                          }
                        })
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          alignContent: 'center',
                        }}>
                        {currentFocusedTarget.point
                          ? currentFocusedTarget.point.score + ' pts'
                          : 'null'}
                      </Text>
                      <MaterialIcons name="arrow-drop-down" size={20} />
                    </TouchableOpacity>
                  </View>
                  {pointChosing && (
                    <Picker
                      selectedValue={JSON.stringify(currentFocusedTarget.point)}
                      onValueChange={(value, index) => {
                        const point: Point = JSON.parse(value.toString())
                        this.setState((prevState) => {
                          return {
                            currentFocusedTarget: {
                              ...prevState.currentFocusedTarget,
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
                  {currentFocusedTarget.status !== -1 &&
                    !currentFocusedTarget.isDone && (
                      <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                          style={styles.acceptButton}
                          onPress={async () => {
                            const target = this.changeStatusAfterSave()
                            if (target.point) {
                              const response = await targetService.updateTarget(
                                target,
                              )
                              if (response === 'success') {
                                this.getTargets()
                                this.setState({ infoModalVisible: false })
                              }
                            }
                          }}>
                          <Text style={{ color: 'white' }}>
                            {currentFocusedTarget.status === 0 ||
                            currentFocusedTarget.status === 2
                              ? 'Accept'
                              : 'Save'}
                          </Text>
                        </TouchableOpacity>
                        {!currentFocusedTarget.isDone && (
                          <TouchableOpacity
                            style={styles.dangerButton}
                            onPress={() => {
                              Alert.alert(
                                'Reject Target?',
                                'Do you really want to reject this target?',
                                [
                                  {
                                    text: 'Reject',
                                    onPress: async () => {
                                      const target: Target = JSON.parse(
                                        JSON.stringify(currentFocusedTarget),
                                      )
                                      target.status = -1
                                      const response = await targetService.updateTarget(
                                        target,
                                      )
                                      if (response === 'success') {
                                        this.getTargets()
                                        this.setState({
                                          infoModalVisible: false,
                                        })
                                      }
                                    },
                                    style: 'destructive',
                                  },
                                  {
                                    text: 'Cancel',
                                    onPress: () => {},
                                    style: 'cancel',
                                  },
                                ],
                                { cancelable: false },
                              )
                            }}>
                            <Text style={{ color: 'red' }}>Reject</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                </>
              ) : (
                <View style={styles.buttonWrapper}>
                  {currentFocusedTarget.status === 1 && (
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={this.onPressSendResult}>
                      <Text style={{ color: 'white' }}>Send Result</Text>
                    </TouchableOpacity>
                  )}
                  {currentFocusedTarget.status !== 2 && (
                    <TouchableOpacity style={styles.dangerButton}>
                      <Text style={{ color: 'red' }}>Give up!</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={addModalVisible}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}>
          <View style={styles.modalWrapper}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ addModalVisible: false })
                }}>
                <Text style={{ color: 'red' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  if (newTarget.length > 0) {
                    const response = await targetService.addTarget(newTarget)
                    if (response === 'success') {
                      await this.getTargets()
                      this.setState({ addModalVisible: false, status: 0 })
                    }
                  } else {
                    Alert.alert('Warning', 'Name cannot be empty!')
                  }
                }}>
                <Text style={{ color: '#4285F4', fontWeight: 'bold' }}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>
            <FloatingLabelInput
              label={'Name'}
              containerStyle={styles.input}
              onTextChange={(text) => this.setState({ newTarget: text })}
            />
          </View>
        </Modal>
      </>
    )
  }

  convertStatus(
    status: number,
    isDone: boolean,
  ): { title: string; color: string } {
    switch (status) {
      case 0:
        return { title: 'Pending', color: '#FBBC05' }
      case 1:
        return { title: 'Doing', color: '#4285F4' }
      case 2:
        return { title: isDone ? 'Done' : 'Result Sent', color: '#34A853' }
      case -1:
        return { title: 'Rejected', color: '#EA4335' }
      default:
        return { title: 'Unknown', color: '#EA4335' }
    }
  }

  changeStatusAfterSave(): Target {
    const { adminMode } = this.props.route.params
    const target: Target = JSON.parse(
      JSON.stringify(this.state.currentFocusedTarget),
    )
    switch (target.status) {
      case 0:
        if (!target.point) {
          Alert.alert('Point still null!')
        } else {
          target.status = 1
        }
        return target
      case 1:
        if (!adminMode) {
          target.status = 2
        }
        return target
      case 2:
        if (adminMode) {
          target.isDone = true
        }
        return target
      default:
        return target
    }
  }
  onPressSendResult = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      writeTempFile: true,
      includeExif: true,
      multiple: false,
      cropping: true,
    })
      .then(async (res) => {
        const image = res as ImageP
        const arr = image.path.split('/')
        const name = arr[arr.length - 1]
        const imageFormData: ImageFormData = {
          name,
          type: image.mime,
          uri: image.path,
        }
        const target = this.changeStatusAfterSave()
        const response = await targetService.updateTarget(target, imageFormData)
        if (response === 'success') {
          this.setState({ infoModalVisible: false })
          this.getTargets()
        }
      })
      .catch((reason) => {
        console.log(reason)
      })
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
    borderLeftWidth: 5,
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  pointWrapper: {
    backgroundColor: '#34A853',
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 5,
  },
  modalWrapper: {
    backgroundColor: 'white',
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
    backgroundColor: '#34A853',
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
  input: {
    marginTop: 30,
  },
})

const mapStateToProps = (state: AppState) => ({
  currentUser: state.signin.currentUser,
})
export default connect(mapStateToProps)(TargetScreen)
