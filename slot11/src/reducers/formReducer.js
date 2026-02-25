export const initialState = {
    formData: {
        firstName: 'Mark',
        lastName: 'Otto',
        username: '',
        city: '',
        state: '',
        zip: '',
        agree: false
    },
    validated: false
};

export function formReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                formData: { ...state.formData, [action.field]: action.value }
            };
        case 'SET_VALIDATED':
            return { ...state, validated: true };
        default:
            return state;
    }
}