import React from 'react'
import styled from 'styled-components'

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

export const ProfilePage = ({ state, setState }) => {
  const {
    name,
    username,
    avt,
    cover,
    dob,
    gender,
    grade,
    address,
    quotes,
    position,
    tab,
    title,
    missions
  } = state

  const RenderInformation = () => {
    return (
      <Timeline>
        <Timeline.Item title={'Họ và tên: ' + name} badgeColor='red' />
        <Timeline.Item title={'Username: ' + username} badge />
        <Timeline.Item
          title={'Ngày tháng năm sinh: ' + dob}
          badgeColor='blue'
        />
        <Timeline.Item title={'Giới tính: ' + gender} badgeColor='yellow' />
        <Timeline.Item title={'Khoá: ' + grade} badgeColor='wheat' />
        <Timeline.Item title={'Quê quán: ' + address} badge />
        <Timeline.Item
          title={'Châm ngôn yêu thích: ' + quotes}
          badgeColor='green'
        />
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
    <Page>
      <Page.MapHeader>
        <Cover src={cover} />
      </Page.MapHeader>
      <Page.Main>
        <Grid.Row>
          <Grid.Col md={4}>
            <Profile
              name={name}
              backgroundURL={cover}
              avatarURL={avt}
              twitterURL='ntheanh201'
            >
              <strong>{position}</strong>
              <br />
              {quotes}
            </Profile>
          </Grid.Col>
          <Grid.Col md={8}>
            <Card statusColor='blue'>
              <CardHeader>
                <CardTitle>
                  {!tab ? 'Thông tin cá nhân' : 'Nhiệm vụ hàng tháng'}
                </CardTitle>
                <CardOptions>
                  <Form.Switch
                    value={tab ? 1 : 0}
                    className='m-0'
                    onClick={() => setState({ tab: !tab })}
                  />
                </CardOptions>
              </CardHeader>
              <CardBody>
                {!tab ? <RenderInformation /> : <RenderMissions />}
              </CardBody>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Page.Main>
    </Page>
  )
}

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
