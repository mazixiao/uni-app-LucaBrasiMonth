import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


// try {
//     uni.setStorageSync('storage_key', 'hello');
// } catch (e) {
//     // error
// }


// 解决uni-app使用vuex刷新后数据失效

// https://segmentfault.com/a/1190000020880434

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo1: {},
		count1: 0,
		message: uni.getStorageSync("message") || "初始化",
	},
	getters: {
		doneTodosCount: (state, getters) => { //通过属性访问
			return state.userInfo1 = {
				a: 1000
			}
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
		},
		updateMessage(state, value) {
			state.message = value.toUpperCase();
			uni.setStorageSync("message", state.message);
			console.log(uni.getStorageSync("message"), "message-vuex");
			
			console.log(state, "state");
			console.log(value, "value");
			
		},
		userInfo1Add(state, value) {

			state.userInfo1.a = state.userInfo1.a + 1;
			
			// userInfo1.a
		}
	},
	actions: {

	}
})


export default store
