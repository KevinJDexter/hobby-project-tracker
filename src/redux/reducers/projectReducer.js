import { combineReducers } from 'redux';
import { PROJECT_ACTIONS } from '../actions/projectActions';

const all = (state = [], action) => {
  switch (action.type) {
    case PROJECT_ACTIONS.SET_ALL_PROJECTS:
      return action.payload;
    case PROJECT_ACTIONS.UNSET_ALL_PROJECTS:
      return [];
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case PROJECT_ACTIONS.REQUEST_START:
      return true;
    case PROJECT_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
}

export default combineReducers ({
  all,
  isLoading,
})