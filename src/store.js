import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { router } from "./router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: "",
        apiKey: "AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
        activeUser: "",
        getData1: [],
        getData2: [],
        api1: "http://www.mocky.io/v2/5a74519d2d0000430bfe0fa0",
        api2: "http://www.mocky.io/v2/5a74524e2d0000430bfe0fa3",
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== "";
            //True yada false değeri döner. Bu dönüt bağlamında kullanıcıya gezebileceği sayfa izinleri verilir.
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            // Oturum açan kullanıcının firebase id'sini token değişkenine aktarır.
        },
        clearToken(state) {
            state.token = ""
            // Oturum kapatan kullancının firebase id'sini token değişkeninden siler.
        },
        setActiveUser(state, activeUserEmail) {
            state.activeUser = activeUserEmail
            // Oturum açan kullanıcının email adresini activeUserEmail değişkenine aktarır.
        },
        setData1(state, result) {
            state.getData1 = result
            //Apiden çekilen veriler getData1 değişkenine aktarılır.
        },
        setData2(state, data) {
            state.getData2 = data
            //Apiden çekilen veriler getData2 değişkenine aktarılır.
        }
    },
    actions: {
        initAuth({ dispatch, commit }) {
            let activeUser = localStorage.getItem("activeUserEmail")
            let token = localStorage.getItem("token");
            if (token) {
                commit("setToken", token);
                commit("setActiveUser", activeUser);
                dispatch("getData1");
                dispatch("getData2");
                router.push("/home");
            } else {
                router.push("/login").catch(() => { });
            }
            //Bu fonksiyon ile sayfa yenilenmelerinde otomatik oturum kapatmaların önüne geçilir. Ve her yenilemede apiden veri çekme için gerekli fonksiyon tetiklenir.
        },

        signUp({ commit }, data) {
            return axios
                .post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
                    {
                        email: data.email,
                        password: data.password,
                        returnSecureToken: true,
                    }
                )
                .then((response) => {
                    commit("setToken", response.data.idToken);
                })
            // Bu fonksiyon ile yeni kullanıcı kaydı oluşturulur.
        },

        login({ commit, dispatch }, data) {
            return axios
                .post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
                    {
                        email: data.email,
                        password: data.password,
                        returnSecureToken: true,
                    }
                )
                .then((response) => {
                    commit("setActiveUser", response.data.email);
                    localStorage.setItem("activeUserEmail", response.data.email);
                    commit("setToken", response.data.idToken);
                    localStorage.setItem("token", response.data.idToken);
                    dispatch("getData1");
                    dispatch("getData2");
                });
            // Bu fonksiyon ile kullanıcı oturum açar. Ve apilerden data getirecek fonksiyonlar tetiklenir.
        },

        logout({ commit }) {
            commit("clearToken");
            localStorage.removeItem("token");
            router.push("/login").catch(() => { });
        },

        passwordReset({ }, data) {
            return axios
                .post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
                    {
                        email: data.email,
                        requestType: "PASSWORD_RESET"
                    }
                ).then((response) => {
                    router.push("/login");
                })
            // Bu fonksiyon ile unutulan parola sıfırlanır.(Gerçek email kayıtları)
        },

        passwordRefnesh({ state }, data) {
            return axios
                .post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
                    {
                        password: data.newPassword,
                        idToken: state.token,
                        returnSecureToken: true,
                    }
                ).then((response) => {
                })
            // Oturum açan kullanıcının şifre değiştirmesini sağlar.
        },

        deleteUser({ dispatch, state }) {
            return axios
                .post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBRZbXmXrDEsV47Y3Qti0HoeKJqjXiWFSM",
                    {
                        idToken: state.token
                    }
                ).then((response) => {
                    dispatch("logout")
                })
            // Oturum açan kullanıcının hesabı firebase'den silinir.
        },

        getData1({ commit }) {
            return axios
                .get("http://www.mocky.io/v2/5a74519d2d0000430bfe0fa0")
                .then((response) => {
                    commit('setData1', response.data.result)
                })
            // Bu fonksiyon ile apiden data çekilir.
        },

        getData2({ commit }) {
            return axios
                .get("http://www.mocky.io/v2/5a74524e2d0000430bfe0fa3")
                .then((response) => {
                    commit('setData2', response.data)
                })
            // Bu fonksiyon ile api2'den data çekilir.
        }
    },
})
export default store