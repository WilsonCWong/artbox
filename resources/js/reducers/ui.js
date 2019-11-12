const initialState = {
  navShowing: false
};

export default function ui(state=initialState, action) {
  switch (action.type) {
    case 'SHOW_NAV': {
      return {
        ...state,
        navShowing: action.showing,
      }
    }
    default:
      return state;
  }
}