const convertCommentType = (data) => {
  return {
    ...data,
    authorAvatar: data.assigned_user_avatar,
    authorId: data.assigned_user_id,
    authorName: data.assigned_user_display_name,
    postId: data.assigned_post
  }
}

export const convertPostType = (data) => {
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

export const convertToUserType = (data) => {
  return {
    ...data,
    displayName: data.display_name,
    dateOfBirth: data.date_of_birth,
    className: data.class_name,
    phoneNumber: data.phone_number,
    regDate: data.reg_date
  }
}

export const convertToGroupType = (data) => {
  const { members, admin } = data
  return {
    ...data,
    members: {
      ...members,
      displayName: members.display_name,
      phoneNumber: members.phone_number,
      dateOfBirth: members.date_of_birth,
      participatingGroup: members.participating_group
    }
  }
}

export const convertToCommentArray = (data) => {
  return data.map((comment) => convertCommentType(comment))
}

export const convertToPostArray = (data) => {
  return data.map((post) => convertPostType(post))
}

export const convertToGroupArray = (data) => {
  return data.map((group) => convertToGroupType(group))
}
