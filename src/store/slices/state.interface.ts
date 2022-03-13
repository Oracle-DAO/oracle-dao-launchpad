import {IProjectDetailsSlice} from "./project_slice";

export interface IReduxState {
    // pendingTransactions: IPendingTxn[];
    project: IProjectDetailsSlice;
}