import React from 'react'
import { Timeline } from 'tabler-react'

export const RenderInformation = ({
  displayName,
  username,
  dateOfBirth,
  gender,
  grade,
  position,
  generation,
  address,
  phoneNumber,
  email,
  description
}) => {
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
      <Timeline.Item
        title={'Làm việc tại: ' + position + ' Gen ' + generation}
        badgeColor='orange'
      />
      <Timeline.Item title={'Quê quán: ' + address} badge />
      {phoneNumber && (
        <Timeline.Item
          title={'Số điện thoại: ' + phoneNumber}
          badgeColor={'pink'}
        />
      )}
      {email && <Timeline.Item title={'Email: ' + email} badgeColor='yellow' />}
      {description && (
        <Timeline.Item
          title={'Châm ngôn yêu thích: ' + description}
          badgeColor='green'
        />
      )}
    </Timeline>
  )
}
