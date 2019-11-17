const initialState = {
  navShowing: false,
  flashMessages: null,
  messageType: null,
};

export default function ui(state=initialState, action) {
  switch (action.type) {
    case 'SHOW_NAV': {
      return {
        ...state,
        navShowing: action.showing,
      }
    }
    case 'SET_FLASH': {
      return {
        ...state,
        messageType: action.messageType,
        flashMessages: action.flash,
      }
    }
    case 'EMPTY_FLASH': {
      return {
        ...state,
        messageType: null,
        flashMessages: null,
      }
    }
    default:
      return state;
  }
}