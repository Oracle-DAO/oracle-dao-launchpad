import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./slices/project_slice";
import pendingTransactionsReducer from "./slices/pending_txn_slice";

const store = configureStore({
    reducer: {
        project: projectReducer,
        pendingTransactions: pendingTransactionsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;