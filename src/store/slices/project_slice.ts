import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {JsonRpcProvider, StaticJsonRpcProvider} from "@ethersproject/providers";
import {Networks} from "../../constants";
import {PublicSale} from "../../abis";
import {ethers} from "ethers";


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

export const fetchProjectDetails = createAsyncThunk("project/fetchProjectDetails", async ({
                                                                                              provider,
                                                                                              networkID,
                                                                                              address
                                                                                          }: ICalcProjectDetails, {dispatch}) => {

    const projectContract = new ethers.Contract(address, PublicSale, provider);
    // console.log(projectContract);
    const ipfsId = await projectContract.getIpfsId();
    // console.log(ipfsId);
    const enabled = await projectContract.contractStatus();
    // console.log(enabled);
    const pricipleTokenAddress = await projectContract.getProjectDetails().pricipleTokenAddress;
    // console.log(pricipleTokenAddress);
    const amount = await projectContract.getAmountInfo();
    // console.log(amount);
    const tokenInfo = await projectContract.getTokenInfo();
    // console.log(tokenInfo);
    const projectTime = await projectContract.getProjectTimeInfo();
    // console.log(projectTime);

    return {
        address: address,
        amount,
        tokenInfo,
        projectTime,
        ipfsId,
        pricipleTokenAddress,
        enabled,
    };
})
//,{
//     condition: (data, { getState, extra }) => {
//         const { projects }: any = getState();
//         const projDetails = projects[data.address];
//         if (projDetails.loading || (!projDetails.loading && !projDetails.error)) {
//             return false;
//         }
//     },
// }

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

export const {fetchProjectDetailSuccess} = projectSlice.actions;
