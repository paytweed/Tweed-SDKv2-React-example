import { useEffect, useState } from "react";
import { useAuth, useTweed, useWallet, useWeb3 } from "@paytweed/core-react";
import { BrowserProvider } from "ethers";
import "../App.css";
import { Network } from "@paytweed/core-js";

function DemoPage() {
  const { client, loading, setPaletteMode } = useTweed();

  const { getEthereumProvider } = useWeb3();
  const { isAuthenticated, connect, logout } = useAuth();
  const { getPrivateKey } = useWallet();

  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  async function onClick() {
    if (!provider) return;
    const signer = await provider.getSigner();
    const txHash = await signer.sendTransaction({
      to: "0x7f8e0B31dd7e8C12cF907225E25Ed83C649bCc62",
      value: "0",
    });
    console.log(txHash);
  }

  async function handleGetPrivateKey() {
    const pk = await getPrivateKey();
    console.log(pk);
  }

  async function handleGetAccessToken() {
    if (!client) return;
    const accessToken = await connect({ oauth: true });
    console.log({ accessToken });
    getEthereumProvider(Network.ETHEREUM_SEPOLIA)
      .then((provider) => {
        const web3provider = new BrowserProvider(provider);
        setProvider(web3provider);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePaletteMode() {
    if (!client) return;
    setPaletteMode((mode) => (mode === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    if (!loading) {
      handleGetAccessToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <h1>Vite + React</h1>
      <h5>is authenticated: {JSON.stringify(isAuthenticated)}</h5>
      <div className="card">
        <button onClick={handlePaletteMode}>switch theme</button>
        <button onClick={handleGetAccessToken}>get access token</button>
        <button onClick={onClick}>send tx </button>
        <button onClick={handleGetPrivateKey}>get private key</button>
        <button onClick={logout}>logout</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default DemoPage;
