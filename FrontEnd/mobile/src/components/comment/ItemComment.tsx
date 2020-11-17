import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
} from 'react-native'
import React, { Component } from 'react'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { commentService } from '../../services'
import { Comment } from '../../core'
import colors from '../../values/colors'

interface ItemCommentProps {
  comment: Comment
  currentUserId: number
  paddingAvoidKeyboard: number
  onPressDelete: () => void
}

interface ItemCommentState {
  modalVisible: boolean
  editModalVisible: boolean
  editingComment: boolean
  newComment: string
}

export class ItemComment extends Component<ItemCommentProps, ItemCommentState> {
  constructor(props: ItemCommentProps) {
    super(props)
    this.state = {
      modalVisible: false,
      editModalVisible: false,
      editingComment: false,
      newComment: '',
    }
  }
  render() {
    return (
      <>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 10,
            borderColor: 'rgb(203, 204, 204)',
            borderTopWidth: 1,
            backgroundColor: 'white',
          }}>
          <Image
            source={{ uri: this.props.comment.assignedUser.avatar }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>
              {this.props.comment.assignedUser.displayName}
            </Text>
            <Text style={{ fontSize: 16 }}>{this.props.comment.content}</Text>
          </View>
          {this.props.currentUserId === this.props.comment.assignedUser.id && (
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ modalVisible: true })
              }}
              style={{ height: 30, width: 30 }}>
              <MIcon name="more-horiz" size={20} />
            </TouchableWithoutFeedback>
          )}
        </View>
        <Modal
          isVisible={this.state.modalVisible}
          backdropOpacity={0.5}
          style={{ margin: 0, justifyContent: 'flex-end' }}
          onBackdropPress={() => {
            this.setState({ modalVisible: false })
          }}
          onModalHide={() => {
            if (this.state.editingComment) {
              this.setState({ editModalVisible: true })
            }
          }}>
          <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false, editingComment: true })
                }}
                style={{ flexDirection: 'row', padding: 10 }}>
                <AntDesign name="edit" size={20} />
                <Text style={{ marginLeft: 10, fontSize: 20 }}>
                  Edit Comment
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', padding: 10 }}
                onPress={() => {
                  Alert.alert(
                    'Delete Post?',
                    'Do you really want to delete this comment?',
                    [
                      {
                        text: 'Delete',
                        onPress: async () => {
                          this.setState({ modalVisible: false })
                          const status = await commentService.delete(
                            this.props.comment.id,
                          )
                          if (status === 'success') {
                            this.props.onPressDelete()
                          }
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
                <AntDesign name="delete" size={20} />
                <Text style={{ marginLeft: 10, fontSize: 20 }}>
                  Delete Comment
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
        <Modal
          isVisible={this.state.editModalVisible}
          // backdropOpacity={0.5}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
            paddingBottom: this.props.paddingAvoidKeyboard,
          }}
          onBackdropPress={() => {
            this.setState({ editModalVisible: false, editingComment: false })
          }}>
          <SafeAreaView style={{ backgroundColor: 'white' }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                paddingBottom: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: 10,
                  backgroundColor: 'white',
                }}>
                <Image
                  source={{ uri: this.props.comment.assignedUser.avatar }}
                  style={{ height: 40, width: 40, borderRadius: 20 }}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                    {this.props.comment.assignedUser.displayName}
                  </Text>
                  <TextInput
                    style={{
                      fontSize: 16,
                      borderWidth: 1,
                      padding: 5,
                      paddingBottom: 10,
                      borderRadius: 10,
                      borderColor: colors.mainBlue,
                    }}
                    defaultValue={this.props.comment.content}
                    autoFocus={true}
                    onChangeText={(text) => {
                      this.setState({ newComment: text })
                    }}
                  />
                </View>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                  onPress={() => {
                    this.setState({
                      editModalVisible: false,
                      editingComment: false,
                    })
                  }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor:
                      this.state.newComment.length > 0
                        ? colors.mainBlue
                        : '#e3e3e3',
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                  disabled={this.state.newComment.length === 0}
                  onPress={async () => {
                    const status = await commentService.updateComment(
                      this.state.newComment,
                      this.props.comment.id,
                    )
                    if (status === 'success') {
                      this.setState({
                        editModalVisible: false,
                        editingComment: false,
                      })
                      this.props.onPressDelete()
                    } else {
                      Alert.alert('Check your Internet connection!')
                    }
                  }}>
                  <Text
                    style={{
                      color:
                        this.state.newComment.length > 0 ? 'white' : '#b0b0b0',
                    }}>
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </>
    )
  }
}
