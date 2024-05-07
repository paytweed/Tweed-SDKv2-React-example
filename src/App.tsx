import { Network } from "@paytweed/core-js";
import { TweedProvider } from "@paytweed/core-react";
import DemoPage from "pages/demo";

function App() {
  return (
    <>
      <TweedProvider
        applicationId="YOUR_APPLICATION_ID"
        options={{
          chains: [Network.POLYGON, Network.ETHEREUM],
          rpcMap: {
            // [Network.ETHEREUM_SEPOLIA]: "http://localhost:8545",
          },
        }}
      >
        <DemoPage />
      </TweedProvider>
    </>
  );
}

export default App;
