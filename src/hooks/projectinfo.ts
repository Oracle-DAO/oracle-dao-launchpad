import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { IReduxState } from "../store/slices/state.interface";
import {fetchProjectDetails, IProjectDetails, IProjectDetailsSlice} from "../store/slices/project_slice";
import {useWeb3Context} from "./web3-context";
import {DEFAULT_NETWORK} from "../constants";


function useProject(){
    const [project, setProject] = useState<IProjectDetailsSlice>();
    const projectDetail = useSelector<IReduxState, IProjectDetailsSlice>(state => state.project);

    const {provider} = useWeb3Context();
    const dispatch = useDispatch();

    useEffect(() => {
        setProject(projectDetail);
        dispatch(fetchProjectDetails({provider, networkID : DEFAULT_NETWORK}));
        // setProject(projectDetails);
    }, []);

    return {project} ;
}

export default useProject;