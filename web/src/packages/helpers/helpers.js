const convertCommentType = (data) => {
  return {
    authorAvatar: data.assigned_user_avatar,
    authorId: data.assigned_user_id,
    authorName: data.assigned_user_display_name,
    content: data.content,
    postId: data.assigned_post
  }
}

const convertPostType = (data) => {
  return {
    id: data.id,
    authorId: data.assigned_user_id,
    authorAvatar: data.assigned_user_avatar,
    authorName: data.assigned_user_display_name,
    groupId: data.assigned_group_id,
    groupName: data.assigned_group_name,
    content: data.content,
    commentNumber: data.comment_number,
    reactionNumber: data.reaction_number,
    time: data.time,
    type: data.type,
    photos: data.photos,
    reactionId: data.reaction_id
  }
}

export const convertToUserType = (data) => {
  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    avatar: data.avatar,
    dateOfBirth: data.date_of_birth,
    description: data.description,
    className: data.class_name,
    email: data.email,
    facebook: data.facebook,
    phoneNumber: data.phone_number,
    regDate: data.reg_date,
    gender: data.gender
  }
}

export const convertToCommentArray = (data) => {
  return data.map((comment) => convertCommentType(comment))
}

export const convertToPostArray = (data) => {
  return data.map((post) => convertPostType(post))
}
