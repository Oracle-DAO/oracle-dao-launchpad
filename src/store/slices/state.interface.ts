import { IProjectDetailsSlice } from "./project_slice";
import { IPendingTxn } from "./pending_txn_slice";

export interface IReduxState {
    pendingTransactions: IPendingTxn[];
    projects: IProjectDetailsSlice;
}