import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants";
import { PublicSale } from "../../abis";
import { ethers } from "ethers";
import {loadIpfsIdPerProject, loadProjectInfo} from "../../helpers/get_ipfs_ids";

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

export interface IImageIpfsIds {
    bannerImageId: string;
    logoImageId: string;
}

export interface IProjectSocials {
    website: string,
    telegram: string,
    twitter: string,
    discord: string,
    github: string
}

export interface IProjectInfo {
    socials: IProjectSocials,
    description: string
}

export interface IProjectDetails {
    projectAddress: string,
    amount: IAmountInfo;
    tokenInfo: ITokenInfo;
    projectTime: IProjectTime;
    pricipleTokenAddress: string;
    imageIpfsIds: IImageIpfsIds;
    projectInfo: IProjectInfo;
    enabled: boolean;
}

interface ICalcProjectDetails {
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    networkID: Networks;
    address: string;
}

export const fetchProjectDetails = createAsyncThunk("project/fetchProjectDetails", async ({ provider, networkID, address }: ICalcProjectDetails, { dispatch }) => {

    const projectContract = new ethers.Contract(address, PublicSale, provider);
    const ipfsId = await projectContract.getIpfsId();
    const allIpfsIds = await loadIpfsIdPerProject(ipfsId);

    const imageIpfsId : IImageIpfsIds  = {
        bannerImageId : allIpfsIds["bannerImageId"],
        logoImageId: allIpfsIds["logoImageId"]
    };
    const projectInfo = await loadProjectInfo(allIpfsIds["projectDetailsId"])

    const enabled = await projectContract.contractStatus();
    const pricipleTokenAddress = await projectContract.getProjectDetails().pricipleTokenAddress;
    const amount = await projectContract.getAmountInfo();
    const tokenInfo = await projectContract.getTokenInfo();
    const projectTime = await projectContract.getProjectTimeInfo();

    return {
        address: address,
        amount,
        tokenInfo,
        projectTime,
        pricipleTokenAddress,
        imageIpfsId,
        projectInfo,
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
