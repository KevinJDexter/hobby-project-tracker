import { combineReducers } from 'redux';
import { REMINDER_ACTIONS } from '../actions/reminderActions';

const all = (state = [], action) => {
  switch (action.type) {
    case REMINDER_ACTIONS.SET_ALL_REMINDERS:
      return action.payload;
    case REMINDER_ACTIONS.UNSET_ALL_REMINDERS:
      return [];
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case REMINDER_ACTIONS.REQUEST_START:
      return true;
    case REMINDER_ACTIONS.REQUEST_DONE:
      return false;
    default: 
      return state;
  }
}

export default combineReducers ({
  all,
  isLoading,
})