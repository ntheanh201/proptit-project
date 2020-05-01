import * as React from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  NativeScrollEvent,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { AppState, User } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import ClassicHeader from '../components/header/ClassicHeader'
import colors from '../values/colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigations/AppNavigator'
import {
  FloatingLabelInput,
  ScrollViewCustomProps,
} from '../components/inputtext/FloatingLabelInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import { RadioButton } from 'react-native-paper'
import { Picker } from '@react-native-community/picker'

interface EditProfileScreenProps {
  navigation: StackNavigationProp<RootStackParams>
  currentUser?: User
}

interface EditProfileScreenState {
  padding: number
  isShowingDatePicker: boolean
  isShowingGenderPicker: boolean
  birthday: Date
  gender: string
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
      gender: 'Male',
    }
    this.props.navigation.setOptions({
      title: 'Edit Profile',
      headerBackTitleVisible: false,
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Text style={{ fontSize: 16, color: colors.mainBlue }}>Save</Text>
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
    const { currentUser } = this.props
    return (
      <SafeAreaView>
        <KeyboardAwareScrollView
          ref={(ref) => (this.scrollViewRef.ref = ref!)}
          extraScrollHeight={15}>
          <FloatingLabelInput
            label={'Name'}
            value={currentUser?.displayName}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
          />
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                marginHorizontal: 10,
                borderBottomWidth: 0.5,
                borderColor: 'gray',
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
            <TouchableOpacity
              style={{
                flex: 1,
                marginHorizontal: 10,
                borderBottomWidth: 0.5,
                borderColor: 'gray',
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
                {this.state.gender}
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.isShowingDatePicker && (
            <DateTimePicker
              value={this.state.birthday}
              mode={'date'}
              onChange={(event, date) => {
                this.setState({ birthday: date! })
              }}
            />
          )}
          {this.state.isShowingGenderPicker && (
            <Picker
              selectedValue={this.state.gender}
              onValueChange={(value, index) => {
                this.setState({ gender: value.toString() })
              }}>
              <Picker.Item label={'Male'} value={'Male'} />
              <Picker.Item label={'Female'} value={'Female'} />
              <Picker.Item label={'Other'} value={'Other'} />
            </Picker>
          )}
          <FloatingLabelInput
            label={'Phone Number'}
            value={currentUser?.phoneNumber}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Email'}
            value={currentUser?.email}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Facebook'}
            value={currentUser?.facebook}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            scrollView={this.scrollViewRef}
          />
          <FloatingLabelInput
            label={'Description'}
            value={currentUser?.description}
            borderColor={colors.mainBlue}
            containerStyle={styles.textField}
            multiline={true}
            scrollView={this.scrollViewRef}
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
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
