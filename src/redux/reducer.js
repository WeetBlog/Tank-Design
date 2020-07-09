


export default function user(state = null, action){
	switch(action.type){
        case 'GETUSER':
            return action.data
		case 'UPDATEUSER' :
			return {
                ...state,
                ...action.data
            }
		default : 
			return state
	}
}