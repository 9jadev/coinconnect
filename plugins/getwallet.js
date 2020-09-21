import WalletConnect from "@trustwallet/walletconnect";

export default ({ app }, inject) => {
    inject('getcoin', msg => {
        var eth;
        const walletConnector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org" // Required
        });
        walletConnector.getAccounts()
        .then(result => {
            // Returns the accounts
            console.log(result[9]);
            // return result[];
            eth = result[9];
        })
        .catch(error => {
            // Error returned when rejected
            console.error(error);
        }); 
        console.log(eth)   
    });
};