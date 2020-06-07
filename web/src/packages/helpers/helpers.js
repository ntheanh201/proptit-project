export const convertCommentType = data => {
  return {
    ...data,
    authorAvatar: data.assigned_user_avatar,
    authorId: data.assigned_user_id,
    authorName: data.assigned_user_display_name,
    postId: data.assigned_post
  }
}

export const convertToServerCommentType = data => {
  return {
    ...data,
    assigned_user_avatar: data.authorAvatar,
    assigned_user_id: data.authorId,
    assigned_user_display_name: data.authorName,
    assigned_post: data.postId
  }
}

export const convertPostType = data => {
  return {
    ...data,
    authorId: data.assigned_user_id,
    authorAvatar: data.assigned_user_avatar,
    authorName: data.assigned_user_display_name,
    groupId: data.assigned_group_id,
    groupName: data.assigned_group_name,
    commentNumber: data.comment_number,
    reactionNumber: data.reaction_number,
    reactionId: data.reaction_id
  }
}

export const convertToServerPostType = data => {
  const {
    authorId,
    authorAvatar,
    authorName,
    groupId,
    groupName,
    commentNumber,
    reactionNumber,
    reactionId
  } = data
  return {
    ...data,
    assigned_user_id: authorId,
    assigned_user_avatar: authorAvatar,
    assigned_user_display_name: authorName,
    assigned_group_id: groupId,
    assigned_group_name: groupName,
    comment_number: commentNumber,
    reaction_number: reactionNumber,
    reaction_id: reactionId
  }
}

export const convertToUserType = data => {
  return {
    ...data,
    displayName: data.display_name,
    dateOfBirth: data.date_of_birth,
    className: data.class_name,
    phoneNumber: data.phone_number,
    regDate: data.reg_date,
    participatingGroup: data.participating_group
  }
}

export const converToServerUserType = data => {
  return {
    ...data,
    display_name: data.displayName,
    date_of_birth: data.dateOfBirth,
    class_name: data.className,
    phone_number: data.phoneNumber,
    reg_date: data.regDate,
    participating_group: data.participatingGroup
  }
}

export const convertToGroupType = data => {
  const { members, admins } = data
  return {
    ...data,
    members: {
      ...members,
      displayName: members.display_name,
      phoneNumber: members.phone_number,
      dateOfBirth: members.date_of_birth,
      participatingGroup: members.participating_group
    },
    admins: {
      ...admins,
      displayName: admins.display_name,
      phoneNumber: admins.phone_number,
      dateOfBirth: admins.date_of_birth,
      participatingGroup: admins.participating_group
    }
  }
}

//todo: conver to server group type
// export const convertServerGroupType = data => {

// }

export const convertToCommentArray = data => {
  return data.map(comment => convertCommentType(comment))
}

export const convertToPostArray = data => {
  return data.map(post => convertPostType(post))
}

export const convertToGroupArray = data => {
  return data.map(group => convertToGroupType(group))
}
