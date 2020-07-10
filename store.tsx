import { createStore} from 'redux'
const defaultState = {
  urlProfile: 'https://www.izyjob.com.br/profile',
  key: 1,
};
function perfilStore(state=defaultState, action) {
  switch(action.type) {
    case "KEY":
      return {...state,
          key: state.key + 1
        };
    default:
      return state;
  }
}
export default createStore(perfilStore);