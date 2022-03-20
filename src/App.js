import routes from "./Routes";

import { useRoutes } from "react-router-dom";
import {useAddress, useWeb3Context} from "./hooks";
import {useEffect, useState} from "react";

function App() {
  const { connect, provider, hasCachedProvider, chainID, connected } = useWeb3Context();
  const address = useAddress();

  const [walletChecked, setWalletChecked] = useState(false);

  useEffect(() => {
    if (hasCachedProvider()) {
      connect().then(() => {
        setWalletChecked(true);
      });
    } else {
      setWalletChecked(true);
    }
  }, []);

  let element = useRoutes(routes);
  return <>{element}</>;
}

export default App;
