import React, { useState } from 'react'
import styled from 'styled-components'
import { CreateMission } from './components/CreateMission'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Modal, Button } from 'react-bootstrap'

import { Page, Timeline, Form } from 'tabler-react'

import './ProfilePage.css'
import { ImageViewer } from '../Shared/components/ImageViewer/ImageViewer'
import { RenderInformation } from './components/Information/Information'


export const ProfilePage = ({ state, setState }) => {
  const {
    id ,
    avt,
    cover,
    grade,
    gender,
    address,
    email,
    position,
    missions,
    showMenu,
    username,
    displayName,
    dateOfBirth,
    description,
    phoneNumber,
    generation,
    showModal, // show image check
    editingMission, // save mission edit
    editInfo,
    idChoose
  } = state

  // show image
  const onShowImg = image => {
    setState({ showModal: true })
  }

  // close image
  const onCloseImg = () => {
    setState({ showModal: false })
  }
  
  const [showAddMission, setShowAddMission] = useState(false)
  const [showEditMission, setShowEditMission] = useState(false)
  const openAddMission = () => {
    setShowAddMission(true)
  }

  const closeAddMission = () => {
    setShowAddMission(false)
  }
  const RenderMissions = () => {
    return (
      <div></div>
     )
  }
  
  const addNewMission = mission => {
    mission.id = createID()
    setState({ missions: [...missions, mission] })
  }

  const handleInfoChange = (change) => {
    setState({change});
    console.log(state);
  }
 
  return (
    <div>
      <Page>
        <div className='top-profile'>
          <Cover src={cover} />
          <div className='avt'>
            <ImageViewer circleBorder key={id} src={avt} />
          </div>

          <h3 className='name'>{displayName}</h3>
          <p className='description'>{description}</p>
          <ul className='nav nav-tabs nav-stacked menu-profile'>
            <li className='nav-item view-item'>
              <a className='nav-link active'>
                {showMenu === 1
                  ? 'Dòng thời gian'
                  : showMenu === 2
                  ? 'Giới thiệu'
                  : showMenu === 3
                  ? 'Ảnh'
                  : 'Nhiệu vụ hàng tháng'}
              </a>
            </li>

            <li className='nav-item hidden-menu'>
              <a
                onClick={() => setState({ showMenu: 1 })}
                className={showMenu === 1 ? 'nav-link active' : 'nav-link'}
              >
                Dòng thời gian
              </a>
            </li>
            <li className='nav-item hidden-menu'>
              <a
                onClick={() => setState({ showMenu: 2 })}
                className={showMenu === 2 ? 'nav-link active' : 'nav-link'}
              >
                Giới thiệu
              </a>
            </li>
            <li className='nav-item hidden-menu'>
              <a
                onClick={() => setState({ showMenu: 3 })}
                className={showMenu === 3 ? 'nav-link active' : 'nav-link'}
              >
                Ảnh
              </a>
            </li>
            <li className='nav-item hidden-menu'>
              <a
                onClick={() => setState({ showMenu: 4 })}
                className={showMenu === 4 ? 'nav-link active' : 'nav-link'}
              >
                Nhiệm vụ hàng tháng
              </a>
            </li>
            
          </ul>
          
          </div>
      </Page>
      
      <Page>
        <div className='display-body'>
          <div className={showMenu === 1 ? 'right-status' : 'body-profile'}>
            {showMenu === 1 ? (
              <div>Chỗ này là Post cá nhân</div>
            ) : showMenu === 2 ? (
              <RenderInformation {...state}
                onInfoChange={handleInfoChange}
              />
              
            ) : (
              <div>
                <CreateMission
                  addNewMission={addNewMission}
                  showAddMission={showAddMission}
                  closeAddMission={closeAddMission}
                />
                <RenderMissions />
              </div>
            )}
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
