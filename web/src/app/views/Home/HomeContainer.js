import React, { createContext, useEffect } from 'react'
import { useState } from 'core'
import { Home } from './Home'

import dodo from '../../assets/dodo.jpg'
import pro from '../../assets/pro.png'
import ngocmai from '../../assets/ngocmai.jpg'
import prologo from '../../assets/ProPTIT.png'

import { buildFileSelector } from '../../Shared/helpers/helpers'

export const HomeContext = createContext()

export const HomeContainer = () => {
  const initialValues = {
    groups: [
      {
        id: 1,
        name: 'Ban Điều Hành Gen 6',
        description: 'Ban điều hành'
      },
      {
        id: 2,
        name: 'Ban Sự kiện Gen 6',
        description: ''
      }
    ],
    posts: [
      {
        id: 1,
        userId: 1,
        name: 'Nguyễn Mạnh Cường',
        username: 'do.do.5',
        groupId: 1,
        content:
          'Chúc mừng năm mới 2020. Chúc cả nhà ProPTIT một năm mới an khang thịnh vượng. Code ngày càng "trâu"',
        time: '24/01/2020',
        type: 0,
        img: dodo,
        avatarImg: prologo,
        // listPoll = [],
        comments: [
          {
            avatarUrl: '',
            name: 'Nguyễn Thế Anh',
            date: '4 phút trước',
            text: 'Chúc mừng năm mới Chủ tịch, 2 bạn đẹp đôi quá ạ ^^',
            replies: [
              {
                name: 'Nguyễn Mạnh Cường',
                avatarUrl: prologo,
                date: '1 phút trước',
                text: 'Cảm ơn cậu <3'
              }
            ]
          }
        ],
        likeCount: '10k',
        commentCount: 2
      },
      {
        id: 2,
        userId: 1,
        name: 'Nguyễn Mạnh Cường',
        username: 'do.do.5',
        groupId: 1,
        content: 'Thông báo họp CLB tháng 1',
        time: '24/01/2020',
        type: 0,
        img: pro,
        avatarImg: prologo,
        // listPoll = [],
        // comments: [
        //   {
        //     avatarUrl: '',
        //     name: '',
        //     date: '4 phút trước',
        //     text: '',
        //     replies: [
        //       {
        //         name: '',
        //         avatarUrl: '',
        //         date: '',
        //         text: ''
        //       }
        //     ]
        //   }
        // ],
        likeCount: 69,
        commentCount: 0
      },
      {
        id: 3,
        userId: 1,
        name: 'Bùi Phương Ngọc Mai',
        username: 'ngocmai.buiphuong',
        groupId: 1,
        content: 'Cứ chơi đi, đừng để thằng nào lừa :v',
        time: '24/01/2020',
        type: 0,
        img: ngocmai,
        avatarImg: ngocmai,
        // listPoll = [],
        // comments: [
        //   {
        //     avatarUrl: '',
        //     name: '',
        //     date: '4 phút trước',
        //     text: ''
        //   }
        // ],
        likeCount: 999,
        commentCount: 0
      },
      {
        id: 4,
        userId: 1,
        name: 'Nguyễn Mạnh Cường',
        username: 'do.do.5',
        groupId: 1,
        content: 'Make your choice',
        time: '16/04/2020',
        type: 1,
        img: dodo,
        avatarImg: prologo,
        comments: [
          {
            id: 1,
            avatarUrl: '',
            name: 'Nguyễn Thế Anh',
            date: '4 phút trước',
            text: 'OMG!!!',
            replies: [
              {
                id: 1,
                name: 'Nguyễn Mạnh Cường',
                avatarUrl: prologo,
                date: '1 phút trước',
                text: 'haha'
              }
            ]
          }
        ],
        likeCount: '10k',
        commentCount: 2,
        listPoll: [
          {
            id: 1,
            text: 'one'
          },
          {
            id: 2,
            text: 'two'
          },
          {
            id: 3,
            text: 'three'
          }
        ]
      }
    ],
    fileSelector: buildFileSelector()
  }
  const [state, setState] = useState(initialValues)

  // useEffect(() => {
  //   testService.getAll()
  // }, [])

  const onCreatePost = post => {
    setState({ posts: [{ ...post, avatarImg: ngocmai }, ...state.posts] })
  }

  const handleFileSelect = e => {
    e.preventDefault()
    state.fileSelector.click()
  }

  const onCreatePoll = (poll, postId) => {
    state.posts[postId - 1].listPoll.push(poll)
  }

  const props = {
    state,
    setState,
    onCreatePost,
    handleFileSelect,
    onCreatePoll
  }

  return (
    <HomeContext.Provider value={props}>
      <Home {...props} />
    </HomeContext.Provider>
  )
}
