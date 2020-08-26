import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'tabler-react'
import { useState } from 'core'
import { Card, CardBody, Icon, CardFooter } from 'ui'
import {Modal} from 'react-bootstrap'
import './CreatePost.css'

import * as Actions from '../../../../../redux/action-creators/post'

const PostInput = ({ isEdit = false, groupId, post, setEditPostVisible }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.homeReducer)
  const [content, setContent] = useState((isEdit && post.content) || null)
  const [type, setType] = useState((isEdit && post.type) || 0)
  const [show, setShow] = useState(false)
  const onChangeValue = event => {
    setContent(event.target.value)
  }

  const onCreatePost = () => {
    dispatch(
      Actions.createPost({
        content,
        type,
        authorId: user.id,
        groupId,
        reactionNumber: -1
      })
    )
    setContent('')
    setShow(false)
  }

  const onEditPost = () => {
    dispatch(
      Actions.updatePost({
        ...post,
        content,
        type,
        authorId: user.id,
        groupId
      })
    )
    setEditPostVisible(false)
  }
  
  const [polls, setPolls] = useState([
    {
      id: 1,
      text: '',
      listMemberTick: []
    },
    {
      id: 2,
      text: '',
      listMemberTick: []
    },
    {
      id: 3,
      text: '',
      listMemberTick: []
    }
  ])

  const handlePreviewImage =(e) => {
    console.log(e.target.files[0])
    // preview file
  }

  const clickTypePoll = () => {
    setType(2);
    setShow(true);
  }

  const clickTypeImage = () => {
    setType(1);
    setShow(true);
  }

  const addOption = () => {
    const option = {
      id: 4,
      text: '',
      listMemberTick: []
    }
    
    setPolls([...polls, option]);
  }

  return (
    <div className='create-post'>
      <div className = 'create-post__container-content' id= "content">
        <img
          className="user-avatar-create"
          src={user.avatar}
          alt="avatar-user"
        />
        <button
          className="create-new-post-button"
          onClick={() => {
            setShow(true)
            setType(0)
          }}
        >
          <p>{content ? content : user.displayName+ " ơi, bạn đang nghĩ gì?"}</p>
        </button>
      </div>

      <div className = "create-post__footer">
        <label
          htmlFor = "choose-image"
          className="choose-type-new-post"
          onClick={clickTypeImage}
        > 
          <i className="fas fa-images"></i>
          Photo/Video
        </label>
        <input type = "file" id="choose-image" onChange ={(e) => handlePreviewImage(e)} />
        <button
          className="choose-type-new-post"
          onClick={clickTypePoll}
        >
          <i className="fas fa-poll create-poll"/>
          Polls
        </button>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header className="header-create-post">
          <i
            className="fas fa-times-circle btn-close-modal"
            onClick={() => setShow(false)}
          ></i>
          <Modal.Title className="title-create-post">Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className= 'write-post'>
          <div className = 'write-post-header'>
            <img
              className="user-avatar-create"
              src={user.avatar}
              alt="avatar-user"
            />
            <strong>{user.displayName}</strong>
          </div>
          <textarea
            type="text"
            rows="6"
            placeholder={user.displayName+ " ơi, bạn đang nghĩ gì?"}
            className="write-on-post"
            value={content}
            onChange={onChangeValue}
          ></textarea>
          <div
            className = {type === 2 ? "preview-polls" : type === 1 ? "preview-images" : ""}
          >
            <i
              className={type === 0 ? "" : "fas fa-times-circle btn-close-preview"}
              onClick={() => setType(0)}
            ></i>
            {type === 2 ?
            <>
              <div className = "preview__polls">
                <strong>Add Poll</strong>
                {polls.map((poll, index) => {
                    return(
                      <div className="poll-option" key={index}>
                        <input type = 'text' placeholder ={"Option " + (index + 1)}/>
                        <i
                          className="fas fa-times-circle btn-close-option"
                        ></i>
                      </div>
                    )
                  })}
              </div>
              <div className="more-option">
                <button onClick = {addOption}>
                  <i className="fas fa-plus"></i>
                  Add option
                </button>
                <button>
                  Poll options
                  <i className="fas fa-sort-down"></i>
                </button>
              </div>
            </> :
            type === 1 ?
            <>
              <img
                src="https://phunugioi.com/wp-content/uploads/2020/04/anh-gai-xinh-2000-de-thuong.jpg"
                alt="import-img"
                className="image-import"
              />
              <img
                src="https://soicauvn.com/wp-content/uploads/2020/04/20-hinh-anh-gai-xinh-toc-dai-dep-quyen-ru-va-de-thuong-nhat-1.jpg"
                alt="import-img"
                className="image-import"
              />
              {/* <img
                src="https://icapi.org/wp-content/uploads/2019/10/anh-gai-xinh-deo-kinh-1.jpg"
                alt="import-img"
                className="image-import"
              /> */}
            </> : <div></div>
            }
          </div>
        </div>

        <div className = "create-post__footer create-post-modal">
          <label
            htmlFor = "choose-image"
            className="choose-type-new-post"
            onClick={clickTypeImage}
          > 
            <i className="fas fa-images"></i>
            Photo/Video
          </label>
          <input type = "file" id="choose-image" onChange ={(e) => handlePreviewImage(e)} />
          <button
            className="choose-type-new-post"
            onClick={clickTypePoll}
          >
            <i className="fas fa-poll create-poll"/>
            Polls
          </button>
        </div>
        </Modal.Body>
        <Modal.Footer className="footer-create-post">
          <button
            type="submit"
            className="btn btn-primary submit-create-post"
            onClick={isEdit ? onEditPost : onCreatePost}
          >{isEdit ? 'Save' : 'Post'}</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
//   return (
//     <>
//       <Form.Textarea
//         rows={3}
//         placeholder='Bạn đang nghĩ gì?'
//         onChange={onChangeValue}
//         value={content}
//       />
//       <Bottom>
//         <div className='icon d-none d-md-inline-block ml-3'>
//           <Icon prefix='fa' name={'file-picture-o'} />
//         </div>
//         <div className='icon d-none d-md-inline-block ml-3'>
//           <Icon prefix='fa' name={'list-ul'} onClick={() => setType(1)} />
//         </div>
//         <div className='icon d-none d-md-inline-block ml-3'>
//           <Icon prefix='fa' name={'smile'} />
//         </div>
//       </Bottom>
//       <CardFooter>
//         <div className='text-right'>
//           <Button
//             type='submit'
//             color='primary'
//             onClick={isEdit ? onEditPost : onCreatePost}
//           >
//             {isEdit ? 'Sửa bài' : 'Đăng bài'}
//           </Button>
//         </div>
//       </CardFooter>
//     </>
//   )
// }

export const CreatePost = ({
  groupId = 1,
  post = null,
  isEdit = false,
  setEditPostVisible
}) => {
  return isEdit ? (
    <PostInput
      isEdit
      post={post}
      groupId={groupId}
      setEditPostVisible={setEditPostVisible}
    />
  ) : (
        <PostInput groupId={groupId} />
  )
}

const Bottom = styled.div``
