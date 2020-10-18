import {createFeatureSelector, createSelector} from "@ngrx/store";
import { DateState, dateReduser, DATE_REDUCER_NODE  } from "./date.reducer";

const selectDateFeature = createFeatureSelector<DateState>( DATE_REDUCER_NODE)
export const selectDate  = createSelector(
  selectDateFeature, (state: DateState): number => state.day
)
export const selectUpdateDate  = createSelector(
  selectDateFeature, (state: DateState): number => state.month
)
