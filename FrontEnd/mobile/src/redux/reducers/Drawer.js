import {OPEN_DRAWER, CLOSE_DRAWER} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        isOpen: true,
      };
    case CLOSE_DRAWER:
      console.log('Close Drawer!');
      return {
        isOpen: false,
      };
    default: {
      return {};
    }
  }
};
