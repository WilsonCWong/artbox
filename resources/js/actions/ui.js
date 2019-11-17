export const showNav = (showing) => {
  return {
    type: 'SHOW_NAV',
    showing
  }
};

export const setFlash = (flash, messageType) => {
  return {
    type: 'SET_FLASH',
    messageType,
    flash
  }
};

export const emptyFlash = () => {
  return {
    type: 'EMPTY_FLASH'
  }
};