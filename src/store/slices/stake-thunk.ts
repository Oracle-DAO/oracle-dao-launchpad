import { ethers } from "ethers";
import { clearPendingTxn, fetchPendingTxns } from "./pending_txn_slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import { warning, success, info } from "../../store/slices";
import { getAddress, messages } from "../../constants";
import { metamaskErrorWrap, getGasPrice, sleep } from "../../helpers";
import { PublicSale, StableCoin } from "../../abis";

interface IChangeApproval {
    token: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
    idoAddress: string;
}

export const changeApproval = createAsyncThunk("stake/changeApproval", async ({ token, provider, address, networkID, idoAddress }: IChangeApproval, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const signer = provider.getSigner();
    const stableCoinContract = new ethers.Contract(getAddress("STABLE_COIN_ADDRESS"), StableCoin, signer);

    let approveTx;
    try {
        const gasPrice = await getGasPrice(provider);
        approveTx = await stableCoinContract.approve(idoAddress, ethers.constants.MaxUint256, { gasPrice });
        dispatch(fetchPendingTxns({
            txnHash: approveTx.hash,
            text: "Approve Investment",
            type: "approve_investment"
        }));
        await approveTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (approveTx) {
            dispatch(clearPendingTxn(approveTx.hash));
        }
    }

    await sleep(2);
    return await stableCoinContract.allowance(address, idoAddress);
});

interface IChangeStake {
    action: string;
    value: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
    idoAddress: string;
}

export const changeStake = createAsyncThunk("stake/changeStake", async ({ action, value, provider, idoAddress, address, networkID }: IChangeStake, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const signer = provider.getSigner();
    const publicSale = new ethers.Contract(idoAddress, PublicSale, signer);

    let stakeTx;

    try {
        const gasPrice = await getGasPrice(provider);
        stakeTx = await publicSale.participate(address, ethers.utils.parseUnits(value, "gwei"), { gasPrice });
        dispatch(fetchPendingTxns({ txnHash: stakeTx.hash, text: "Investing", type: "investing" }));
        await stakeTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (stakeTx) {
            dispatch(clearPendingTxn(stakeTx.hash));
        }
    }
    dispatch(info({ text: messages.your_balance_update_soon }));
    await sleep(10);
    dispatch(info({ text: messages.your_balance_updated }));
    return;
});
