import {dateAction, DateActions} from "./date.actions";
const actions: DateActions | (() => DateActions) = null;
export const DATE_REDUCER_NODE = 'date';
export interface DateState {

  day: any,
  month: any
}
const initialState: DateState = {
  day: 1,
  month: "June"
}
export const  dateReduser = ( state = initialState, action: DateActions ) => {

  switch (action.type) {
    case dateAction.update:
      const newDate:DateState = action.payload
      return {
        ...state,
        month: newDate.month,
        day: newDate.day
      }
    default: return state

  }
  return state
};
