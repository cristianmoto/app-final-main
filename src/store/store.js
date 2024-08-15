import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/AuthSlice"
import {authApi} from '../services/authService'
import { perfilApi } from "../services/perfilService";
import { setupListeners } from "@reduxjs/toolkit/query";
import perfilReducer from '../slice/PerfilSlice'

const store = configureStore({
    reducer: {
        perfil:perfilReducer,
        auth: authReducer,
        [perfilApi.reducerPath]: perfilApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware ()
    .concat(authApi.middleware)
    .concat(perfilApi.middleware)
});

setupListeners(store.dispatch)

export default store