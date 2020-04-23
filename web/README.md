### ProSocial - FrontEnd WEB

##1. To run development: yarn dev

##2. To build: yarn build


## DEV:
 import { useSelector } from 'react-redux'
 
 How to use:
    
    const { user } = useSelector(state => state.homeReducer)
    to get the user information
    
    const { isLogged } = useSelector(state => state.homeReducer)
    to check if the user is logged in or not
    
    const { posts } = useSelector(state => state.postReducer)
    to get all posts
    
    const { groups } = useSelector(state => state.groupReducer)
    to get all groups