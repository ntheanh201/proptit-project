import * as React from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { AppState, User, updateUser, UserInfo } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import colors from '../values/colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { Picker } from '@react-native-community/picker'
import { ScrollViewCustomProps, FloatingLabelInput } from '../components'

interface EditProfileScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  currentUser?: User
  updateUser: typeof updateUser
  isUpdatingUser: boolean
  updateUserSuccess: boolean
}

interface EditProfileScreenState {
  padding: number
  isShowingDatePicker: boolean
  isShowingGenderPicker: boolean
  birthday: Date
  gender: number
  displayName: string
  phoneNumber: string
  email: string
  facebook: string
  description: string
  className: string
}

class EditProfileScreen extends React.Component<
  EditProfileScreenProps,
  EditProfileScreenState
> {
  scrollViewRef: ScrollViewCustomProps

  constructor(props: EditProfileScreenProps) {
    super(props)
    this.state = {
      padding: 0,
      isShowingDatePicker: false,
      isShowingGenderPicker: false,
      birthday: moment(this.props.currentUser?.dateOfBirth!).toDate(),
      gender: this.props.currentUser?.gender ?? 1,
      className: this.props.currentUser?.className ?? '',
      description: this.props.currentUser?.description ?? '',
      displayName: this.props.currentUser?.displayName ?? '',
      email: this.props.currentUser?.email ?? '',
      facebook: this.props.currentUser?.facebook ?? '',
      phoneNumber: this.props.currentUser?.phoneNumber ?? '',
    }
    this.props.navigation.setOptions({
      title: 'Edit Profile',
      headerBackTitleVisible: false,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={this.onPressSave}
          disabled={this.props.isUpdatingUser}>
          <Text
            style={{
              fontSize: 16,
              color: colors.mainBlue,
              fontWeight: 'bold',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    })
    this.scrollViewRef = {
      position: {
        x: 0,
        y: 0,
      },
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

  onPressSave = async () => {
    const userData: UserInfo = {
      displayName: this.state.displayName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      facebook: this.state.facebook,
      description: this.state.description,
      dateOfBirth: this.state.birthday.toISOString(),
      gender: this.state.gender,
    }
    await this.props.updateUser(this.props.currentUser!, userData)
    if (this.props.updateUserSuccess) {
      console.log(this.props.currentUser)
      this.props.navigation.goBack()
    } else {
      console.log('error')
    }
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

  convertGenderType = (gender: number) => {
    switch (gender) {
      case 1:
        return 'Male'
      case 2:
        return 'Female'
      case 3:
        return 'Other'
    }
  }

  render() {
    const { currentUser } = this.props
    return (
      <SafeAreaView>
        <KeyboardAwareScrollView
          ref={(ref) => (this.scrollViewRef.ref = ref!)}
          extraScrollHeight={15}>
          <FloatingLabelInput
            label={'Name'}
            value={currentUser?.displayName}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
            onTextChange={(text) => {
              this.setState({ displayName: text })
            }}
          />
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                marginHorizontal: 10,
                borderBottomWidth: 1,
                borderColor: '#aaa',
              }}
              onPress={() => {
                this.setState({
                  isShowingDatePicker: !this.state.isShowingDatePicker,
                })
                this.state.isShowingGenderPicker &&
                  this.setState({ isShowingGenderPicker: false })
              }}>
              <Text>Birthday </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 5,
                }}>
                {moment(this.state.birthday).format('DD/MM/YYYY').toString()}
              </Text>
            </TouchableOpacity>
            {Platform.OS === 'ios' ? (
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  borderColor: '#aaa',
                }}
                onPress={() => {
                  this.setState({
                    isShowingGenderPicker: !this.state.isShowingGenderPicker,
                  })
                  this.state.isShowingDatePicker &&
                    this.setState({ isShowingDatePicker: false })
                }}>
                <Text>Gender </Text>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 5,
                  }}>
                  {this.convertGenderType(this.state.gender)}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  borderColor: '#aaa',
                }}>
                <Text>Gender </Text>
                <Picker
                  mode={'dropdown'}
                  selectedValue={this.convertGenderType(this.state.gender)}
                  onValueChange={(value, index) => {
                    this.setState({ gender: index + 1 })
                  }}>
                  <Picker.Item label={'Male'} value={'Male'} />
                  <Picker.Item label={'Female'} value={'Female'} />
                  <Picker.Item label={'Other'} value={'Other'} />
                </Picker>
              </View>
            )}
          </View>
          {this.state.isShowingDatePicker && (
            <DateTimePicker
              value={this.state.birthday}
              mode={'date'}
              onChange={(event, date) => {
                Platform.OS === 'android' &&
                  this.setState({ isShowingDatePicker: false })
                date && this.setState({ birthday: date })
              }}
            />
          )}
          {this.state.isShowingGenderPicker && Platform.OS === 'ios' && (
            <Picker
              selectedValue={this.convertGenderType(this.state.gender)}
              onValueChange={(value, index) => {
                this.setState({ gender: index + 1 })
              }}>
              <Picker.Item label={'Male'} value={'Male'} />
              <Picker.Item label={'Female'} value={'Female'} />
              <Picker.Item label={'Other'} value={'Other'} />
            </Picker>
          )}
          <FloatingLabelInput
            label={'Phone Number'}
            value={currentUser?.phoneNumber}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
            onTextChange={(text) => {
              this.setState({ phoneNumber: text })
            }}
          />
          <FloatingLabelInput
            label={'Class'}
            value={currentUser?.className}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
            onTextChange={(text) => {
              this.setState({ className: text })
            }}
          />
          <FloatingLabelInput
            label={'Email'}
            value={currentUser?.email}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
            onTextChange={(text) => {
              this.setState({ email: text })
            }}
          />
          <FloatingLabelInput
            label={'Facebook'}
            value={currentUser?.facebook}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
            onTextChange={(text) => {
              this.setState({ facebook: text })
            }}
          />
          <FloatingLabelInput
            label={'Description'}
            value={currentUser?.description}
            containerStyle={styles.textField}
            multiline={true}
            scrollView={this.scrollViewRef}
            onTextChange={(text) => {
              this.setState({ description: text })
            }}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  textField: {
    marginHorizontal: 10,
    marginTop: 50,
  },
})

const mapStateToProps = (state: AppState) => ({
  currentUser: state.signin.currentUser,
  isUpdatingUser: state.signin.isUpdatingUser,
  updateUserSuccess: state.signin.updateUserSuccess,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
