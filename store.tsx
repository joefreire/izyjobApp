import { createStore} from 'redux'
const defaultState = {
  urlProfile: 'https://www.izyjob.com.br/profile',
  urlVagas: 'https://www.izyjob.com.br/vagas',
  key: 1,
  keyVagas: 1,
  userId: null,
  token: null,
  tokenDB: null,
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
    case "USERID":
      return {...state,
          userId: action.value
        };
    case "TOKEN":
      return {...state,
          token: action.value
        };
    case "TOKENDB":
      return {...state,
          tokenDB: action.value
        };
    default:
      return state;
  }
}
export default createStore(store);