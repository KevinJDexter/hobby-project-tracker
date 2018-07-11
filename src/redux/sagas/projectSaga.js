import { put, takeEvery } from 'redux-saga/effects';
import { PROJECT_ACTIONS } from '../actions/projectActions';
import { callAllProjects, callDeleteProject, callEditProject, callPostProject } from '../requests/projectRequests';

function* fetchAllProjects () {
  try {
    yield put ({ type: PROJECT_ACTIONS.REQUEST_START });
    const reminders = yield callAllProjects();
    yield put ({ 
      type: PROJECT_ACTIONS.SET_ALL_REMINDERS, 
      payload: reminders,
    })
    yield put ({ type: PROJECT_ACTIONS.REQUEST_DONE});
  } catch (error) {
    yield put ({ type: PROJECT_ACTIONS.REQUEST_DONE});
  }
} 

function* fetchAddProject (action) {
  try {
    yield callPostProject(action.payload);
    yield put ({ type: PROJECT_ACTIONS.FETCH_ALL_PROJECTS });
  } catch (error) {

  }
} 

function* fetchDeleteProject (action) {
  try {
    yield callDeleteProject(action.id);
    yield put ({ type: PROJECT_ACTIONS.FETCH_ALL_PROJECTS })
  } catch (error) {

  }
} 

function* fetchEditProject (action) {
  try {
    yield callEditProject(action);
    yield put ({ type: PROJECT_ACTIONS.FETCH_ALL_PROJECTS });
  } catch (error) {

  }
} 

function* projectSaga() {
  yield takeEvery(PROJECT_ACTIONS.FETCH_ALL_PROJECTS, fetchAllProjects);
  yield takeEvery(PROJECT_ACTIONS.FETCH_ADD_PROJECT, fetchAddProject);
  yield takeEvery(PROJECT_ACTIONS.FETCH_DELETE_PROJECT, fetchDeleteProject);
  yield takeEvery(PROJECT_ACTIONS.FETCH_EDIT_PROJECT, fetchEditProject);
}

export default projectSaga;
