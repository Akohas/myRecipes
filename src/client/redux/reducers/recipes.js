import {
    GET_RECIPES
} from '../actionTypes'

function recipesReducer(state = [], {type,response}) {
    switch (type) {
        case GET_RECIPES:
            return response
        default:
            return state
    }
}

export default recipesReducer