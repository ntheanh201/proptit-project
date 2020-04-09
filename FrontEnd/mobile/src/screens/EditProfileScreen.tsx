import * as React from 'react'
import { BaseScreen, BaseScreenProps } from './BaseScreen'
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native'
import { AppState } from '../core'
import { Dispatch, AnyAction, bindActionCreators } from 'redux'
import { signInAction } from '../core/actions'
import { connect } from 'react-redux'
import ClassicHeader from '../components/header/ClassicHeader'
import colors from '../values/colors'

interface EditProfileScreenProps extends BaseScreenProps {}

class EditProfileScreen extends BaseScreen<EditProfileScreenProps> {
  constructor(props: EditProfileScreenProps) {
    super(props)
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        {/* <ClassicHeader /> */}
        <TouchableWithoutFeedback
          style={{
            backgroundColor: 'white',
          }}
          onPress={() => {
            Keyboard.dismiss()
          }}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            {/* <TextField
              label="Name"
              value="Batman"
              keyboardType="default"
              tintColor={colors.mainBlue}
              containerStyle={styles.textField}
            />
            <TextField
              label="Description"
              value="Smart, tough and brutally violent solutions to crime."
              keyboardType="default"
              tintColor={colors.mainBlue}
              containerStyle={styles.textField}
              multiline={true}
            />
            <TextField
              label="Description"
              value="Smart, tough and brutally violent solutions to crime."
              keyboardType="default"
              tintColor={colors.mainBlue}
              containerStyle={styles.textField}
              multiline={true}
            />
            <TextField
              label="Description"
              value="Smart, tough and brutally violent solutions to crime."
              keyboardType="default"
              tintColor={colors.mainBlue}
              containerStyle={styles.textField}
              multiline={true}
            />
            <TextField
              label="Description"
              value="Smart, tough and brutally violent solutions to crime."
              keyboardType="default"
              tintColor={colors.mainBlue}
              containerStyle={styles.textField}
              multiline={true}
            />
            <TextField
              label="Description"
              value="Smart, tough and brutally violent solutions to crime."
              keyboardType="default"
              tintColor={colors.mainBlue}
              containerStyle={styles.textField}
              multiline={true}
            /> */}
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  textField: {
    marginHorizontal: 10,
  },
})

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(signInAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
