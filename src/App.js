import routes from "./Routes";

import { useRoutes } from "react-router-dom";
import { useWeb3Context } from "./hooks";
import { useEffect, useState } from "react";

function App() {
  const { connect, hasCachedProvider } = useWeb3Context();

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
