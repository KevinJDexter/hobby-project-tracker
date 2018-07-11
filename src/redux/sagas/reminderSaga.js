import { put, takeEvery } from 'redux-saga/effects';
import { REMINDER_ACTIONS } from '../actions/reminderActions';
import { callDeleteReminder, callEditReminder, callPostReminder, callAllReminders } from '../requests/reminderRequests';

function* fetchAllReminders () {
  try {
    yield put ({ type: REMINDER_ACTIONS.REQUEST_START });
    const reminders = yield callAllReminders();
    yield put ({ 
      type: REMINDER_ACTIONS.SET_ALL_REMINDERS, 
      payload: reminders,
    })
    yield put ({ type: REMINDER_ACTIONS.REQUEST_DONE});
  } catch (error) {
    yield put ({ type: REMINDER_ACTIONS.REQUEST_DONE});
  }
} 

function* fetchAddReminder (action) {
  try {
    yield callPostReminder(action.payload);
    yield put ({ type: REMINDER_ACTIONS.FETCH_ALL_REMINDERS });
  } catch (error) {

  }
} 

function* fetchDeleteReminder (action) {
  try {
    yield callDeleteReminder(action.id);
    yield put ({ type: REMINDER_ACTIONS.FETCH_ALL_REMINDERS })
  } catch (error) {

  }
} 

function* fetchEditReminder (action) {
  try {
    yield callEditReminder(action);
    yield put ({ type: REMINDER_ACTIONS.FETCH_ALL_REMINDERS });
  } catch (error) {

  }
} 

function* technologySaga() {
  yield takeEvery(REMINDER_ACTIONS.FETCH_ALL_REMINDERS, fetchAllReminders);
  yield takeEvery(REMINDER_ACTIONS.FETCH_ADD_REMINDER, fetchAddReminder);
  yield takeEvery(REMINDER_ACTIONS.FETCH_DELETE_REMINDER, fetchDeleteReminder);
  yield takeEvery(REMINDER_ACTIONS.FETCH_EDIT_REMINDER, fetchEditReminder);
}

export default technologySaga;
