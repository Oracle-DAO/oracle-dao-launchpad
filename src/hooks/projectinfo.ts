import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IReduxState } from "../store/slices/state.interface";
import { fetchProjectDetails, IProjectDetailsSlice } from "../store/slices/project_slice";
import { useWeb3Context } from "./web3-context";
import { DEFAULT_NETWORK } from "../constants";


export function useProject(address: string) {
    const [project, setProject] = useState<IProjectDetailsSlice>({ loading: true });

    const projectDetail = useSelector<IReduxState, IProjectDetailsSlice>((state) => {
        return state.projects[address];
    });

    const { provider } = useWeb3Context();
    const dispatch = useDispatch();

    useEffect(() => {
        setProject(projectDetail);
        dispatch(fetchProjectDetails({ address, provider, networkID: DEFAULT_NETWORK }));
    }, []);

    return { project };
}
