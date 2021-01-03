import { createStore } from "vuex";
import actions from './actions';
import mutations from './mutations';

export default createStore({
  state: {
    books: [],
    currentBook: {
      title: null,
      price: null
    },
    bookFormAction: 'Add',
    token: ''
  },
  mutations,
  actions,
  getters: {
    getAuthToken: state => {
      if(state.token) return state.token

      const token = localStorage.getItem('token')
      
      return token
    }
  },
  modules: {}
});
