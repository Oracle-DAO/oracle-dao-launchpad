import routes from "./Routes";
import {ADDRESSES, DEFAULT_NETWORK} from "./constants";
import {useWeb3Context} from "./hooks";
import {useRoutes} from "react-router-dom";
import {fetchProjectDetails} from "./store/slices/project_slice";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();
    let element = useRoutes(routes);
    const {provider} = useWeb3Context();

    Object.values(ADDRESSES).map(address => {
        console.log(provider, address, DEFAULT_NETWORK);
        dispatch(fetchProjectDetails({address, provider, networkID: DEFAULT_NETWORK}));
    });

    return <>{element}</>;
}

export default App;
