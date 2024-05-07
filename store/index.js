import { Children, createContext, useContext, useMemo, useReducer } from "react";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyContext = createContext();
MyContext.displayName = 'MyContextContext'

const reducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, userLogin: action.value }
        case "LOGOUT":
            return { ...state, userLogin: null }
        default:
            return new Error("Action not found")
    }
}

const MyContextControllerProvider = ({ children }) => {
    const initialState = {
        userLogin: null,
        jobs: []
    }

    const [controller, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => [controller, dispatch]);
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

//{ admin: "AAA", gmail: "abc@gmail.com" }

const useMyContextController = () => {
    const context = useContext(MyContext)
    if (!context) {
        throw new Error("useMyContextController must inside in MyContextControllerProvider");
    }
    return context;
}

const USERS = firestore().collection('USERS');

const CreateAccount = (email, password, fullName) => {
    auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            Alert.alert('Tạo tài khoản thành công với email:' + email)
            USERS.doc(email)
                .set({
                    email,
                    password,
                    fullName,
                })
        })
        .catch(e => Alert.alert('Tài khoản đã tồn tại'))
}

const login = (dispatch, email, password) => {
    auth().signInWithEmailAndPassword(email, password)
        .then(
            () => USERS.doc(email)
                .onSnapshot(u => {
                    const value = u.data();
                    console.log('Đăng nhập thành công với user: ', value);
                    dispatch({ type: "USER_LOGIN", value })
                })
            
        )
        .catch(e => Alert.alert("Sai user và password"))
}

const logout = (dispatch) => {
    auth().signOut()
    .then(() => dispatch({type: "LOGOUT"}))
}


export { MyContextControllerProvider, useMyContextController, login, logout, CreateAccount}


