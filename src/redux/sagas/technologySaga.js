import { put, takeEvery } from 'redux-saga/effects';
import { TECHNOLOGY_ACTIONS } from '../actions/technologyActions';
import { callAllTechnologies, callDeleteTechnology, callEditTechnology, callPostTechnology } from '../requests/technologyRequests';

function* fetchAllTechnologies () {
  try {
    yield put ({ type: TECHNOLOGY_ACTIONS.REQUEST_START });
    const technologies = yield callAllTechnologies();
    yield put ({ 
      type: TECHNOLOGY_ACTIONS.SET_ALL_TECHNOLOGIES, 
      payload: technologies,
    })
    yield put ({ type: TECHNOLOGY_ACTIONS.REQUEST_DONE});
  } catch (error) {
    yield put ({ type: TECHNOLOGY_ACTIONS.REQUEST_DONE});
  }
} 

function* fetchAddTechnology (action) {
  try {
    yield callAddTechnology(action.payload);
    yield put ({ type: TECHNOLOGY_ACTIONS.FETCH_ALL_TECHNOLOGIES });
  } catch (error) {

  }
} 

function* fetchDeleteTechnology (action) {
  try {
    yield callDeleteTechnology(action.id);
    yield put ({ type: TECHNOLOGY_ACTIONS.FETCH_ALL_TECHNOLOGIES })
  } catch (error) {

  }
} 

function* fetchEditTechnology (action) {
  try {
    yield callEditTechnology(action);
    yield put ({ type: TECHNOLOGY_ACTIONS.FETCH_ALL_TECHNOLOGIES });
  } catch (error) {

  }
} 

function* technologySaga() {
  yield takeEvery(TECHNOLOGY_ACTIONS.FETCH_ALL_TECHNOLOGIES, fetchAllTechnologies);
  yield takeEvery(TECHNOLOGY_ACTIONS.FETCH_ADD_TECHNOLOGY, fetchAddTechnology);
  yield takeEvery(TECHNOLOGY_ACTIONS.FETCH_DELETE_TECHNOLOGY, fetchDeleteTechnology);
  yield takeEvery(TECHNOLOGY_ACTIONS.FETCH_EDIT_TECHNOLOGY, fetchEditTechnology);
}

export default technologySaga;
