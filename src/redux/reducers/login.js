import {LOGIN_SUCCESS,QUIT_LOGIN} from '../constants/login.js'

let user = sessionStorage.getItem("token") || ""

export default function count(state = user , action){
	switch(action.type){
		case LOGIN_SUCCESS :
			sessionStorage.setItem('token',action.data.uid)
			sessionStorage.setItem('type',action.data.utype)
			return action.data
		case QUIT_LOGIN :
			sessionStorage.removeItem(action.data)
			return ""
		default : 
			return state
	}
}