"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Web3modal instance
let web3Modal,web3

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;


/**
 * Setup the orchestra
 */
function init() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "c3801d6c59c440c893c71de0685c367f",
        rpc: {
          56: 'https://bsc-dataseed.binance.org/'
        },
        network: 'binance',
      }
    },
  };

  web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    // cacheProvider: true,
    providerOptions, // required
    // disableInjectedProvider: false,

  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  const chainData = evmChains.getChain(chainId);
  document.querySelector("#network-name").textContent = chainData.name;

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  document.querySelector("#selected-account").textContent = selectedAccount;


  // Display fully loaded UI for wallet data
  document.querySelector("#prepare").style.display = "none";
  document.querySelector("#connected").style.display = "block";
}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  document.querySelector("#connected").style.display = "none";
  document.querySelector("#prepare").style.display = "block";


  document.querySelectorAll(".btn-connect").forEach(element => {
    element.setAttribute("disabled", "disabled");
  })
  await fetchAccountData(provider);
  document.querySelectorAll(".btn-connect").forEach(element => {
    element.removeAttribute("disabled");
  })
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
    document.querySelectorAll(".connected-message").forEach(element => {
      element.textContent = element.dataset.connected;
    })
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  document.querySelector("#prepare").style.display = "block";
  document.querySelector("#connected").style.display = "none";
  document.querySelectorAll(".connected-message").forEach(element => {
    element.textContent = element.dataset.disconnected;
  })
}

async function onPay() {
  const amount=document.querySelector('#inp-value')
  
  try {
    const res = await web3.eth.sendTransaction({
      from:selectedAccount,
      value:web3.utils.toWei(amount.value, "ether"),
      to: "0x60D636714692aeaec07aE8F7A2AAcC37F487db29"
    })
    if(res.status){
      alert('SUCCESS');

    }
  }catch (e) {
    alert(e.message)
  }


}

/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  document.querySelectorAll(".btn-connect").forEach(element => {
    element.addEventListener("click", onConnect);
  })
  document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
  document.querySelector("#btn-pay").addEventListener("click", onPay);
});
