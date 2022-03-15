import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants";
import { PublicSale } from "../../abis";
import { ethers } from "ethers";


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
    address: string;
}

export const fetchProjectDetails = createAsyncThunk("project/fetchProjectDetails", async ({ provider, networkID, address }: ICalcProjectDetails, { dispatch }) => {

    const projectContract = new ethers.Contract(address, PublicSale, provider);
    const tokenAddress = await projectContract.getProjectTokenAddress();
    const ipfsId = await projectContract.getIpfsId();
    const enabled = await projectContract.contractStatus();
    const pricipleTokenAddress = await projectContract.getProjectDetails().pricipleTokenAddress;
    const amount = await projectContract.getAmountInfo();
    const tokenInfo = await projectContract.getTokenInfo();
    const projectTime = await projectContract.getProjectTimeInfo();

    return {
        address: tokenAddress,
        amount,
        tokenInfo,
        projectTime,
        ipfsId,
        pricipleTokenAddress,
        enabled,
    };
}, {
    condition: (data, { getState, extra }) => {
        const { projects }: any = getState();
        const projDetails = projects[data.address];
        if (projDetails.loading || (!projDetails.loading && !projDetails.error)) {
            return false;
        }
    },
})

export interface IProjectDetailsSlice {
    [key: string]: any;
}

const initialState: IProjectDetailsSlice = {};

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        fetchProjectDetailSuccess(state, action) {
            state[action.payload.projectAddress] = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProjectDetails.pending, (state, action) => {
                state[action.meta.arg.address] = {
                    loading: true
                }
            })
            .addCase(fetchProjectDetails.fulfilled, (state, action) => {
                state[action.meta.arg.address] = {
                    loading: false,
                    ...action.payload
                }
            })
            .addCase(fetchProjectDetails.rejected, (state, action) => {
                state[action.meta.arg.address] = {
                    loading: false,
                    error: action.error
                }
            })
    },
});

export default projectSlice.reducer;

export const { fetchProjectDetailSuccess } = projectSlice.actions;
