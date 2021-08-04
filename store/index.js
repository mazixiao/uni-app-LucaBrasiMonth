import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo1: {},
		count1: 0
	},
	getters: {
		doneTodosCount: (state, getters) => { //通过属性访问
		
		
			return state.userInfo1 = {a: 1000}
		},
		
		
		       getStateCount1: state => {
		            return state.count1 + 88;
		        }
		

	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		}
	},
	actions: {

	}
})


export default store
