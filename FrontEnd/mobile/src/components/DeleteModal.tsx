import * as React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import styles from '../values/styles'

interface DeleteModalState {
  isActive: boolean
}

export class DeleteModal extends React.Component<{}, DeleteModalState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isActive: false,
    }
  }

  public trigger() {
    this.setState({ isActive: true })
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isActive}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
            }}>
            <View
              style={{
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.bold_text,
                  {
                    width: '100%',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  },
                ]}>
                Do you want delete this post?
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    isActive: false,
                  })
                }}
                style={{
                  flex: 1,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[styles.bold_text]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    isActive: false,
                  })
                }}
                style={{
                  flex: 1,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[styles.bold_text, { color: 'red' }]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
