import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {JsonRpcProvider, StaticJsonRpcProvider} from "@ethersproject/providers";
import {Networks} from "../../constants/blockchain";
import {ADDRESSES} from "../../constants";
import {PublicSale} from "../../abis";
import { ethers } from "ethers";
// import {add} from "husky";


export interface IProjectTime {
    startTime: number;
    endTime: number;
}

export interface ITokenInfo {
    totalIDOTokenSupply: string;
    projectTokenAddress: string;
    tokenPrice: number;
}

export interface IAmountInfo {
    totalAmountToRaise: string;
    totalAmountRaised: string;
}

export interface IProjectDetails {
    projectAddress: string,
    amount: IAmountInfo;
    tokenInfo: ITokenInfo;
    projectTime: IProjectTime;
    ipfsId: string;
    pricipleTokenAddress: string;
    enabled: boolean;
}

interface ICalcProjectDetails {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
}

export const fetchProjectDetails = createAsyncThunk("project/fetchProjectDetails", async ({provider, networkID }: ICalcProjectDetails, { dispatch }) => {

    const addresses = ADDRESSES;
    const projectContract = new ethers.Contract(addresses.project1, PublicSale, provider);
    console.log(projectContract);
    const address = await projectContract.getProjectTokenAddress();
    console.log(address);
    const ipfsId = await projectContract.getIpfsId();
    const enabled = await projectContract.contractStatus();
    const pricipleTokenAddress = await projectContract.getProjectDetails().pricipleTokenAddress;
    const amount = await projectContract.getAmountInfo();
    const tokenInfo = await projectContract.getTokenInfo();
    const projectTime = await projectContract.getProjectTimeInfo();
    console.log({
        address,
        amount,
        tokenInfo,
        projectTime,
        ipfsId,
        pricipleTokenAddress,
        enabled,
    });
    return {
        address,
        amount,
        tokenInfo,
        projectTime,
        ipfsId,
        pricipleTokenAddress,
        enabled,
    };
})

export interface IProjectDetailsSlice {
    loading: boolean;
    [key: string]: any;
}

const initialState: IProjectDetailsSlice = {
    loading: true
};

const setProjectState = (state: IProjectDetailsSlice, payload: any) => {
    const projectAddress = payload.projectAddress;
    state[projectAddress] = {...state[projectAddress], ...payload};
    state.loading = false;
    console.log(state);
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        fetchProjectDetailSuccess(state, action) {
            state[action.payload.projectAddress] = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProjectDetails.pending, state => {
                state.loading = true;
            })
            .addCase(fetchProjectDetails.fulfilled, (state, action) => {
                setProjectState(state, action.payload);
                state.loading = false;
            })
            .addCase(fetchProjectDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
    },
});

export default projectSlice.reducer;

export const { fetchProjectDetailSuccess } = projectSlice.actions;

const baseInfo = (state: RootState) => state.project;

// Uncomment if required
// export const getAccountState = createSelector(baseInfo, account => account);