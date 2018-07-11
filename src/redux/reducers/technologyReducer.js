import { combineReducers } from 'redux';
import { TECHNOLOGY_ACTIONS } from '../actions/technologyActions';

const all = (state = [], action) => {
  switch (action.type) {
    case TECHNOLOGY_ACTIONS.SET_ALL_TECHNOLOGIES:
      return action.payload;
    case TECHNOLOGY_ACTIONS.UNSET_ALL_TECHNOLOGIES:
      return [];
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case TECHNOLOGY_ACTIONS.REQUEST_START:
      return true;
    case TECHNOLOGY_ACTIONS.REQUEST_DONE:
      return false;
    default: 
      return state;
  }
}

export default combineReducers ({
  all,
  isLoading,
})