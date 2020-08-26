import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Comment } from 'tabler-react'
import './Post.css'
import {Modal} from 'react-bootstrap'

import { Icon, Card } from 'ui'

import * as postActions from '../../../../redux/action-creators/post'
import * as reactionActions from '../../../../redux/action-creators/reaction'

import { EditPostModal } from './components/EditPostModal'
import { ImageViewer } from '../ImageViewer/ImageViewer'
import { TickPoll } from './components/TickPoll/TickPoll'

export const Post = ({
  post,
  postId,
  cursor = false,
  commentVisible: showComment = false
}) => {
  //todo: comment
  const {
    id,
    authorName,
    groupId,
    authorAvatar,
    groupName,
    content,
    authorId,
    reactionNumber,
    commentNumber,
    type,
    photos,
    listPoll,
    time
  } = post

  const [redHeartVisible, setRedHeartVisible] = useState(
    post?.reactionId === -1 ? false : true
  )
  const [reactNumber, setReactNumber] = useState(reactionNumber)
  const [commentVisible, setCommentVisible] = useState(showComment)
  const [menuVisible, setMenuVisible] = useState(false)
  const [editPostVisible, setEditPostVisible] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  moment.locale('vi')

  const onEditPost = () => {
    setEditPostVisible(true)
    setMenuVisible(false)
  }

  const onDeletePost = () => {
    dispatch(postActions.deletePost(id))
    setMenuVisible(false)
  }

  const onClickPost = () => {
    cursor && history.push(`/post/${id || postId}`)
  }

  const onReactPost = () => {
    dispatch(reactionActions.reactPost(id))
    setRedHeartVisible(true)
    setReactNumber(reactNumber + 1)
  }

  const onDeleteReactionPost = () => {
    dispatch(reactionActions.deleteReaction(post?.reactionId))
    setRedHeartVisible(false)
    setReactNumber(reactNumber - 1)
  }

  const onClickReaction = () => {
    redHeartVisible ? onDeleteReactionPost() : onReactPost()
  }
  ///add
  const [showMenuPost, setShowMenuPost] = useState(false)
  const [showMemberTick, setShowMemberTick] = useState(false)
  const [showPost, setShowPost] = useState(false)
  const [comment, setComment] = useState('');
  const handleHiddenMemberTick = () => {
    setShowMemberTick(false);
  }
  const handleShowMemberTick = () => {
    setShowMemberTick(true);
  }
  const handleHiddenPost = () => {
    setShowPost(false);
  }
  const handleShowPost = () => {
    setShowPost(true);
  }
  const handleShowMenuPost = () => {
    setShowMenuPost(true);
  }
  const handleHiddenMenuPost = () => {
    setShowMenuPost(false);
  }
  const handleChange = (event) => {
    setComment(event.target.value);
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="avatar-user">
          <img
            className="user-ava"
            src={authorAvatar}
            alt="avatar-user"
          />
          <div className="name-avatar">
            <strong>{authorName}</strong>
            <small>{moment(time).fromNow()}</small>
          </div>
        </div>
        <div className="menu-post">
          <i className="fas fa-ellipsis-h"
              onClick={handleShowMenuPost}
          ></i>
          <Modal
            show={showMenuPost}
            onHide={handleHiddenMenuPost}
            centered
            size="sm"
          >
            <div className="menu-post-item">
              <button className="btn" onClick={onDeletePost}>Xoá bài viết</button>
              <button className="btn" onClick={onEditPost}>Sửa bài viết</button>
              <button
                className="btn"
                onClick={handleHiddenMenuPost}
              >Cancel</button>
            </div>
          </Modal>
        </div>
      </div>
      <div className="post-content">
        {type == 0 ?
          <div className="just-text">
            <p>{content ? content : ''}</p>
          </div> :
          type == 2 ?
          <div className="text-and-poll">
            <p>{content ? content : ''}</p>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Tuyệt vời</label>
              <div
                className="all-member-tick"
                onClick={handleShowMemberTick}
              >
                <img
                  className="member-tick"
                  src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://thuthuatnhanh.com/wp-content/uploads/2019/07/anh-girl-xinh-facebook-tuyet-dep-387x580.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://soicauvn.com/wp-content/uploads/2020/04/20-hinh-anh-gai-xinh-toc-dai-dep-quyen-ru-va-de-thuong-nhat-1.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://2.bp.blogspot.com/-fjf5yU5r1Jk/WE1VD1BBKpI/AAAAAAAAjgI/bXwGoigAPJYvScMPtzJtzbOJfoGQO2C_ACEw/s1600/15349541_533868826819201_3350340522319981193_n.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://phunugioi.com/wp-content/uploads/2020/04/anh-gai-xinh-2000-de-thuong.jpg"
                  alt="avatar-user"
                />
                <div className="member-tick-more">+34</div>
              </div>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck2" />
              <label className="form-check-label" htmlFor="exampleCheck2">Bình thường, không có gì đặc biệt</label>
              <div
                className="all-member-tick"
                onClick={handleShowMemberTick}
              >
                <img
                  className="member-tick"
                  src="https://img2.thuthuatphanmem.vn/uploads/2018/12/25/nhung-hinh-anh-gai-xinh-cuc-dep_012909400.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://icapi.org/wp-content/uploads/2019/10/anh-gai-xinh-deo-kinh-1.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://www.gocbao.com/wp-content/uploads/2019/09/stt-hay-khi-dang-anh-con-gai1.jpg6_.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://i.a4vn.com/2018/9/1/hot-girl-kute-de-thuong-hoc-sinh-10x-anh-bia-sac-net-nhat-96cc03.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://duhocminhkhang.com/wp-content/uploads/2020/01/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-%C4%91eo-m%E1%BA%AFt-k%C3%ADnh-c%E1%BB%B1c-cute-10-1.jpg"
                  alt="avatar-user"
                />
                <div className="member-tick-more">+21</div>
              </div>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck3" />
              <label className="form-check-label" htmlFor="exampleCheck3">Cực kỳ tệ luôn</label>
              <div
                className="all-member-tick"
                onClick={handleShowMemberTick}
              >
                <img
                  className="member-tick"
                  src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://thuthuatnhanh.com/wp-content/uploads/2019/07/anh-girl-xinh-facebook-tuyet-dep-387x580.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://thuthuatnhanh.com/wp-content/uploads/2019/04/girl-xinh-han-quoc-kute.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://2.bp.blogspot.com/-fjf5yU5r1Jk/WE1VD1BBKpI/AAAAAAAAjgI/bXwGoigAPJYvScMPtzJtzbOJfoGQO2C_ACEw/s1600/15349541_533868826819201_3350340522319981193_n.jpg"
                  alt="avatar-user"
                />
                <img
                  className="member-tick"
                  src="https://phunugioi.com/wp-content/uploads/2020/04/anh-gai-xinh-2000-de-thuong.jpg"
                  alt="avatar-user"
                />
                <div className="member-tick-more">+10</div>
              </div>
            </div>
          </div> :
          <div className="text-and-img"> 
            <p className="content-of-post">{content ? content : ''}</p>
            <img
              className="img-post"
              src="https://thuthuatnhanh.com/wp-content/uploads/2019/05/gai-xinh-toc-ngan-facebook.jpg"
              alt="Không load được ảnh"
            />
          </div>
        }
        <Modal
          show={showMemberTick}
          onHide={handleHiddenMemberTick}
          centered
        >
          <div className="list-member-tick">
            <div className="one-member-tick">
              <div className="ava-member-tick"></div>
              <strong>Trần Văn Thắng</strong>
            </div>
            <div className="one-member-tick">
              <div className="ava-member-tick"></div>
              <strong>Trần Văn Thắng</strong>
            </div>
            <div className="one-member-tick">
              <div className="ava-member-tick"></div>
              <strong>Trần Văn Thắng</strong>
            </div>
            <div className="one-member-tick">
              <div className="ava-member-tick"></div>
              <strong>Trần Văn Thắng</strong>
            </div>
            <div className="one-member-tick">
              <div className="ava-member-tick"></div>
              <strong>Trần Văn Thắng</strong>
            </div>
            <div className="one-member-tick">
              <div className="ava-member-tick"></div>
              <strong>Trần Văn Thắng</strong>
            </div>
            <div className="one-member-tick">
              <div className="ava-member-tick"></div>
              <strong>Trần Văn Thắng</strong>
            </div>
          </div> 
        </Modal>
      </div>
      <div className="post-reaction">
        <div className="like-cmt-share-post">
          {/* <i className="far fa-heart"></i> */}
          <i className="fas fa-heart like-post"></i>
          <label htmlFor={"write-comment-out"+type}>
            <i className="far fa-comment"></i>
          </label>
          <i className="far fa-share-square"></i>
        </div>
        <strong className="count-like">{reactionNumber + ' likes'}</strong>
        <p><strong>Vũ Thành Công</strong> Ui sao tôi chịu nổi chứ, xinh quá trời luôn!</p>
        <p><strong>Nguyễn Hoài Đức</strong> Ui vợ t đây rồi </p>
        <p className="reply">View 2 replies</p>
        <strong
          className="view-all"
          onClick={handleShowPost}
        >View all comments</strong>
        {/* view post */}
        <Modal
            show={showPost}
            onHide={handleHiddenPost}
            centered
            size='lg'
          >
            <div className="in-post">
              <div className="content-in-post">
                <div className="post-header">
                <div className="avatar-user">
                  <img
                    className="user-ava"
                    src={authorAvatar}
                    alt="avatar-user"
                  />
                  <div className="name-avatar">
                  <strong>{authorName}</strong>
                  <small>{moment(time).fromNow()}</small>
                  </div>
                </div>
                <div className="menu-post">
                  <i className="fas fa-ellipsis-h"
                      onClick={handleShowMenuPost}
                  ></i>
                  <Modal
                    show={showMenuPost}
                    onHide={handleHiddenMenuPost}
                    centered
                    size="sm"
                  >
                    <div className="menu-post-item">
                      <button className="btn">Xoá bài viết</button>
                      <button className="btn">Sửa bài viết</button>
                      <button
                        className="btn"
                        onClick={handleHiddenMenuPost}
                      >Cancel</button>
                    </div> 
                  </Modal>
                </div>
                </div>
                <div className="post-content">
                {type == 0 ?
                  <div className="just-text">
                    <p>{content ? content : ''}</p>
                  </div> :
                  type == 2 ?
                  <div className="text-and-poll">
                    <p>{content ? content : ''}</p>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Tuyệt vời</label>
                      <div
                        className="all-member-tick"
                        onClick={handleShowMemberTick}
                      >
                        <img
                          className="member-tick"
                          src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://thuthuatnhanh.com/wp-content/uploads/2019/07/anh-girl-xinh-facebook-tuyet-dep-387x580.jpg"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://lh3.googleusercontent.com/proxy/C6_TFNpHqQY6ZobGP_cVvMkGx1C1EKaGIYz7tTh5n_c8BEBqlg66Y_BDlGiJ0V7WH9s8iwKngqvJMmDG0rV_e6nBvtjJ0jgHUT0GwwZ6m3vUgcEPCQgfp7ESrLdKfgN87DRgxUU78Nvw8PvcvcqyRsatN_Iz"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://2.bp.blogspot.com/-fjf5yU5r1Jk/WE1VD1BBKpI/AAAAAAAAjgI/bXwGoigAPJYvScMPtzJtzbOJfoGQO2C_ACEw/s1600/15349541_533868826819201_3350340522319981193_n.jpg"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://phunugioi.com/wp-content/uploads/2020/04/anh-gai-xinh-2000-de-thuong.jpg"
                          alt="avatar-user"
                        />
                        <div className="member-tick-more">+34</div>
                      </div>
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                      <label className="form-check-label" htmlFor="exampleCheck2">Bình thường, không có gì đặc biệt</label>
                      <div
                        className="all-member-tick"
                        onClick={handleShowMemberTick}
                      >
                        <img
                          className="member-tick"
                          src="https://img2.thuthuatphanmem.vn/uploads/2018/12/25/nhung-hinh-anh-gai-xinh-cuc-dep_012909400.jpg"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://lh3.googleusercontent.com/proxy/5tVuukCwOWLaSdX-vcbnnTG2wkS5IQSx4WnqepIIjjrve6LnRvA5ONkOtQ45orV1Uq549-I1Rz7_e_XPbHgvaD_ug9Z3GeETx9vfLLLVnusACKOoBkZzZFfGZXxJ857D3ExVnQ"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://www.gocbao.com/wp-content/uploads/2019/09/stt-hay-khi-dang-anh-con-gai1.jpg6_.jpg"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://lh3.googleusercontent.com/proxy/2L869Kd4Y_Q8mxopvFXTtIKgieSsoXEZs2qaXAZpnpfxBsoJsuKkO7vDT2yXyTZu_h-Fqbk_Ct3DX72hrJYBrbZlvHN3sC-NUQx5FuSLlwgE6F-w3L2oULDWZlCuDUTxjzlJ"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://duhocminhkhang.com/wp-content/uploads/2020/01/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-%C4%91eo-m%E1%BA%AFt-k%C3%ADnh-c%E1%BB%B1c-cute-10-1.jpg"
                          alt="avatar-user"
                        />
                        <div className="member-tick-more">+21</div>
                      </div>
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck3" />
                      <label className="form-check-label" htmlFor="exampleCheck3">Cực kỳ tệ luôn</label>
                      <div
                        className="all-member-tick"
                        onClick={handleShowMemberTick}
                      >
                        <img
                          className="member-tick"
                          src="https://sohanews.sohacdn.com/2020/2/26/photo-1-158270587240769675748.jpg"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://thuthuatnhanh.com/wp-content/uploads/2019/07/anh-girl-xinh-facebook-tuyet-dep-387x580.jpg"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://lh3.googleusercontent.com/proxy/C6_TFNpHqQY6ZobGP_cVvMkGx1C1EKaGIYz7tTh5n_c8BEBqlg66Y_BDlGiJ0V7WH9s8iwKngqvJMmDG0rV_e6nBvtjJ0jgHUT0GwwZ6m3vUgcEPCQgfp7ESrLdKfgN87DRgxUU78Nvw8PvcvcqyRsatN_Iz"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://2.bp.blogspot.com/-fjf5yU5r1Jk/WE1VD1BBKpI/AAAAAAAAjgI/bXwGoigAPJYvScMPtzJtzbOJfoGQO2C_ACEw/s1600/15349541_533868826819201_3350340522319981193_n.jpg"
                          alt="avatar-user"
                        />
                        <img
                          className="member-tick"
                          src="https://phunugioi.com/wp-content/uploads/2020/04/anh-gai-xinh-2000-de-thuong.jpg"
                          alt="avatar-user"
                        />
                        <div className="member-tick-more">+10</div>
                      </div>
                    </div>
                  </div> :
                  <div className="text-and-img"> 
                    <p className="content-of-post">Đẹp như này thì công sao chịu nổi</p>
                    <img
                      className="img-post"
                      src="https://thuthuatnhanh.com/wp-content/uploads/2019/05/gai-xinh-toc-ngan-facebook.jpg"
                      alt="Không load được ảnh"
                    />
                  </div>
                }
                </div>
              </div>
              <div className="comment-in-post">
                <div className="header-comment">
                  <strong>Comments</strong>
                </div>
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                  <table className="table not-table">
                    <tbody>
                      <tr className="your-comment">
                        <div className="avatar-cmt"></div>
                        <div className="what-cmt">
                          <p><strong>Vũ Thành Công</strong> Ui sao tôi chịu nổi chứ, xinh quá trời luôn!</p>
                          <div className="reaction-cmt">
                            <div className="like-in-post">
                              <i className="fas fa-heart like-post"></i>
                              <p>3</p>  
                            </div>
                            <label
                              htmlFor="write-comment"
                            >Reply</label>  
                          </div>
                        </div>
                      </tr>
                      <tr className="your-comment">
                        <div className="avatar-cmt"></div>
                        <div className="what-cmt">
                          <p><strong>Vũ Thành Công</strong> Ui sao tôi chịu nổi chứ, xinh quá trời luôn!</p>
                          <div className="reaction-cmt">
                            <div className="like-in-post">
                              <i className="fas fa-heart like-post"></i>
                              <p>3</p>  
                            </div>
                            <label
                              htmlFor="write-comment"
                            >Reply</label>  
                          </div>
                        </div>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
                <div className="react-in-post">
                <div className="like-cmt-share-post">
                    {/* <i className="far fa-heart"></i> */}
                    <i className="fas fa-heart like-post"></i>
                    <label htmlFor="write-comment">
                      <i className="far fa-comment"></i>
                    </label>
                    <i className="far fa-share-square"></i>
                  </div>
                <strong className="count-like">{reactionNumber + ' likes'}</strong>
                </div>
                <div className="you-comment">
                  <input
                    value={comment}
                    type="text"
                    className="form-control"
                    placeholder="Add a comment..."
                    onChange={handleChange}
                    id={id}
                  />
                  <button
                    onClick={() => {
                      console.log(comment)
                      setComment('');
                    }}
                    disabled={comment === '' ? true : false}
                  >Post</button>
                </div>
              </div>
            </div>
          </Modal>
          {/* ------ */}
      </div>
      <div className="you-comment">
        <input
          value={comment}
          type="text"
          className="form-control"
          placeholder="Add a comment..."
          onChange={handleChange}
          id={id}
        />
        <button
          onClick={() => {
            console.log(comment)
            setComment('');
          }}
          disabled={comment === '' ? true : false}
        >Post</button>
      </div>
    </div>
  )
}
    // <>
    //   <Card>
    //     <div className='d-flex pt-5 mt-auto pl-5'>
    //       <Wrapper
    //         className='avatar avatar-md mr-3'
    //         style={{ overflow: 'hidden' }}
    //       >
    //         <img src={authorAvatar} />
    //       </Wrapper>
    //       <div>
    //         <CursorLink
    //           className='text-default'
    //           onClick={() => history.push(`/profile/${authorId}`)}
    //         >
    //           {authorName}
    //         </CursorLink>
    //         <small className='d-block text-muted'>
    //           <strong>{moment(time).fromNow()}</strong>
    //         </small>
    //         <PostWrapper
    //           cursor={cursor}
    //           className='d-flex flex-column pt-5 pb-5'
    //           onClick={onClickPost}
    //         >
    //           <Span>{content}</Span>
    //         </PostWrapper>

    //         {type === 1 && (
    //           <div className='tickPoll'>
    //             {type === 1 && (
    //               <TickPoll
    //                 // onCreatePoll={onCreatePoll}
    //                 // listPoll={listPoll}
    //                 postId={id}
    //               />
    //             )}
    //           </div>
    //         )}
    //         {photos && (
    //           <div>
    //             <ImageWrapper>
    //               {photos.map((photo, index) => (
    //                 <ImageViewer key={index} src={photo} />
    //               ))}
    //             </ImageWrapper>
    //           </div>
    //         )}
    //         <CardBottom className='d-flex ml-auto text-muted pt-2 pb-5'>
    //           <div className='icon d-none d-md-inline-block ml-3'>
    //             <Icon
    //               className={redHeartVisible && 'red-heart'}
    //               onClick={onClickReaction}
    //               prefix='fe'
    //               name={'heart'}
    //             />{' '}
    //             {/* onClick={() => this.setState({fade: true})} */}
    //             {/* onAnimationEnd={() => this.setState({fade: false})} */}
    //             {reactNumber}
    //           </div>
    //           <div className='icon d-none d-md-inline-block ml-3'>
    //             <Icon prefix='fa' name={'comment-o'} /> {commentNumber}
    //           </div>
    //           <div className='icon d-none d-md-inline-block ml-3'>
    //             <Icon prefix='fe' name={'external-link'} />
    //           </div>
    //         </CardBottom>
    //       </div>
    //       <ActionBar>
    //         <CursorLink onClick={() => setMenuVisible(!menuVisible)}>
    //           ...
    //         </CursorLink>
    //         {menuVisible && (
    //           <ActionMenu>
    //             <ActionList>
    //               <ActionItem onClick={onEditPost}>Sửa bài viết</ActionItem>
    //               <DeletePost onClick={onDeletePost}>Xóa bài viết</DeletePost>
    //             </ActionList>
    //           </ActionMenu>
    //         )}
    //       </ActionBar>
    //     </div>

    //     {commentNumber > 0 && commentVisible && (
    //       <CardFooter>
    //         <Comment.List>
    //           {comments.map(({ name, date, text, avatarURL }) => (
    //             <Comment
    //               avatarURL={avatarURL}
    //               name={name}
    //               date={date}
    //               text={text}
    //             />
    //           ))}
    //         </Comment.List>
    //       </CardFooter>
    //     )}
    //   </Card>
    //   <EditPostModal
    //     modalVisible={editPostVisible}
    //     post={post}
    //     setEditPostVisible={setEditPostVisible}
    //   />
    // </>