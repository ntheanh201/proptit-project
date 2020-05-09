import React, { useState } from 'react'
import styled from 'styled-components'
import './Styles/ProfilePage.css'

import {
  Grid,
  Button,
  Profile,
  Page,
  Timeline,
  Table,
  Icon,
  Form
} from 'tabler-react'

import { Card, CardBody, CardHeader, CardOptions, CardTitle } from 'ui'
import { ImageView } from '../../../packages/ui/components/Post/ImageView/ImageView'

export const ProfilePage = ({ state, setState }) => {
  const {
    displayName,
    username,
    avt,
    cover,
    dateOfBirth,
    gender,
    grade,
    address,
    description,
    position,
    email,
    phoneNumber,
    missions,
    showMenu,
    generation,
    showModal = false // show image check
  } = state

  // show image
  const onShowImg = (image) => {
    setState({showModal: true})
  }

  // close image
  const onCloseImg = () => {
    setState({showModal: false})
  }

  const RenderInformation = () => {
    return (
      <Timeline>
        <Timeline.Item title={'Họ và tên: ' + displayName} badgeColor='red' />
        <Timeline.Item title={'Username: ' + username} badge />
        <Timeline.Item
          title={'Ngày tháng năm sinh: ' + dateOfBirth}
          badgeColor='blue'
        />
        <Timeline.Item title={'Giới tính: ' + gender} badgeColor='yellow' />
        <Timeline.Item title={'Khoá: ' + grade} badgeColor='wheat' />
        <Timeline.Item title={'Làm việc tại: ' + position  + " Gen " + generation} badgeColor='orange' />
        <Timeline.Item title={'Quê quán: ' + address} badge />
        {phoneNumber && (
          <Timeline.Item
            title={'Số điện thoại: ' + phoneNumber}
            badgeColor={'pink'}
          />
        )}
        {email && (
          <Timeline.Item title={'Email: ' + email} badgeColor='yellow' />
        )}
        {description && (
          <Timeline.Item
            title={'Châm ngôn yêu thích: ' + description}
            badgeColor='green'
          />
        )}
      </Timeline>
    )
  }

  const RenderMissions = () => {
    return (
      <Table
        responsive
        highlightRowOnHover
        hasOutline
        verticalAlign='center'
        cards
        className='text-nowrap'
      >
        <Table.Header>
          <Table.Row>
            <Table.ColHeader>Tên nhiệm vụ</Table.ColHeader>
            <Table.ColHeader>Trạng thái</Table.ColHeader>
            <Table.ColHeader alignContent='center'>
              <i className='icon-settings' />
            </Table.ColHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {missions.map(({ id, content, completed }) => (
            <Table.Row key={id}>
              <Table.Col>
                <div>{content}</div>
              </Table.Col>
              <Table.Col>
                <strong>{completed ? 'Hoàn thành' : 'Chưa hoàn thành'}</strong>
              </Table.Col>
              <Table.Col alignContent='center'>
                <Icon link name='check' />
              </Table.Col>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
  return (
    <div>
      <Page>
        <div className="top-profile">
          <Cover src={cover}  />
          <div
            className="avt"
            style={{ backgroundImage: 'url(' + avt + ')' }} 
            onClick={()=>{onShowImg()}}
          >
          </div>

          <ImageView 
            img={avt} 
            show={showModal}
            close={onCloseImg}
          />
          
          <h3 className="name">{displayName}</h3>
          <p className="description">{description}</p>
          <ul className="nav nav-tabs nav-stacked menu-profile">
            <li className="nav-item hidden-menu">
              <a
                onClick={() => setState({showMenu: 1})}
                className={showMenu === 1 ? "nav-link active" : "nav-link"}
              >Dòng thời gian</a>
            </li>
            <li className="nav-item view-item">
              <a
                className="nav-link active"
              >
                {
                  showMenu === 1 ? "Dòng thời gian" : showMenu === 2 ? "Giới thiệu" : "Nhiệu vụ hàng tháng"
                }
              </a>
            </li>
            <li className="nav-item hidden-menu">
              <a
                onClick={() => setState({showMenu: 2})}
                className={showMenu === 2 ? "nav-link active" : "nav-link"}
              >Giới thiệu</a>
            </li>
            <li className="nav-item hidden-menu">
              <a
                onClick={() => setState({showMenu: 3})}
                className={showMenu === 3 ? "nav-link active" : "nav-link"}
              >Nhiệm vụ hàng tháng</a>
            </li>
          </ul>
          <button
              className="more-menu"
              type="button" id="triggerId"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-h"></i>
            </button>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              <button
                className="dropdown-item"
                onClick = {() => {
                  if (showMenu === 1) {
                    setState({showMenu: 2})
                  }
                  else if (showMenu === 2) {
                    setState({showMenu: 3})
                  }
                  else setState({showMenu: 1})
                }}
              >
                {
                  showMenu === 1 ? "Giới thiệu" : showMenu === 2 ? "Nhiệu vụ hàng tháng" : "Dòng thời gian"
                }
              </button>
              <button
                onClick = {() => {
                  if (showMenu === 1) {
                    setState({showMenu: 3})
                  }
                  else if (showMenu === 2) {
                    setState({showMenu: 1})
                  }
                  else setState({showMenu: 2})
                }}
                className="dropdown-item"
              >
                {
                  showMenu === 1 ? "Nhiệu vụ hàng tháng" : showMenu === 2 ? "Dòng thời gian" : "Giới thiệu"
                }
              </button>
            </div>
        </div>
      </Page>
      <Page>
        <div className="display-body">
          <div
            className={showMenu === 1 ? 'left-status' : 'show-false'}
          >
            <h3 className="title-body">
              Giới thiệu
            </h3>
            <p>
              <i className="far fa-user"></i>
              {" "+"Khóa: "}
              <strong>{grade}</strong>
            </p>
            <p>
              <i className="fas fa-briefcase"></i>
              {" "+"Làm việc tại: "}
              <strong>{generation && position ? position + " Gen " + generation : ''}</strong>
            </p>
          </div>
          <div
            className={showMenu === 1 ? 'right-status' : 'body-profile'}
          >
            {
              showMenu === 1 ?
                  <div>Chỗ này là Post cá nhân</div>
              : showMenu === 2 ?
                <div>
                  <h3 className="title-body">
                    Giới thiệu
                    <i className="fas fa-edit edit-profile"></i>
                  </h3>
                  <RenderInformation />
                </div>
              : 
                <div>
                  <h3 className="title-body">
                    Nhiệm vụ
                    <i className="fas fa-edit edit-profile"></i>
                  </h3>
                  <RenderMissions />
                </div>
            }
          </div>
        </div>
      </Page>
    </div>
  )
}

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`
