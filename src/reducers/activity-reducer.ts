import { Activity } from "../types/index";
// Type para describir el reducer

//?? Las acciones nos ayudan a describir que esta pasando y que informacion va a modificar que parte de nuestro state

//* Una accion consta de dos partes, el type que es la descripcion y el payload que es la informacion que modifica o agregamos a nuestro state
export type ActivityActions =
 { type: 'save-activity', payload: {newActivity: Activity}} |
 { type: 'set-active-id', payload: {id: Activity['id']}} | 
 { type: 'set-deleted-activity', payload: {id: Activity['id']}} |// se le llama lookup al ['id'] 
 { type: 'restar-app' }

export type ActivityState = {
  activities: Activity[]; // Es un elemento de mi state,
  activeId: Activity['id'];
};

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities');

    return activities ? JSON.parse(activities) : []

}

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: '',
};

export const activityReducer = (
    state : ActivityState = initialState,
    action: ActivityActions
) => {
    if(action.type === 'save-activity') {
        // TODO este codigo maneja la logica para actualizar el state
        let updatedActivities : Activity[] = [];
        if( state.activeId ) {
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        console.log(action.payload.newActivity);

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
    }}

    if(action.type === 'set-active-id') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'set-deleted-activity') {

        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id ) // Devuelve las actividades que son diferentes
        }
    }

    if(action.type === 'restar-app') {
        return {
            activities: [],
            activeId: '',
        }
    }

    return state; // Siempre tenemos que retornar un state
};
