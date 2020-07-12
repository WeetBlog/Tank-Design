import {GET_USER_INFO} from '../constants/user.js'


let user = {}

export default function count(state = user , action){
	switch(action.type){
		case GET_USER_INFO :
			return action.data
		default : 
			return state
	}
}