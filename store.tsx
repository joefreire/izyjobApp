import { createStore} from 'redux'
const defaultState = {
  urlProfile: 'https://www.izyjob.com.br/profile',
  key: 1,
  keyVagas: 1,
};
function store(state=defaultState, action) {
  switch(action.type) {
    case "KEY":
      return {...state,
          key: state.key + 1
        };
    case "KEYVAGAS":
      return {...state,
          keyVagas: state.keyVagas + 1
        };
    default:
      return state;
  }
}
export default createStore(store);