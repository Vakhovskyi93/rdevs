import {Action} from "@ngrx/store";

export enum dateAction {
  update = "[DATE] update"
}

export class UpdateDate implements Action{


  readonly type = dateAction.update
  constructor(public payload: any){}
}
export type DateActions = UpdateDate;

