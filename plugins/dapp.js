import WalletConnect from "@trustwallet/walletconnect";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

export default ({ app }, inject) => {
    inject('initial', msg =>  {
        // Create a walletConnector
        const walletConnector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org" // Required
        });

        // Check if connection is already established
        if (!walletConnector.connected) {
        // create new session
            walletConnector.createSession().then(() => {
                // get uri for QR Code modal
                const uri = walletConnector.uri;
                // display QR Code modal
                WalletConnectQRCodeModal.open(uri, () => {
                console.log("QR Code Modal closed");
                });
            });
        } else {
            return true;
        }

        // Subscribe to connection events
        walletConnector.on("connect", (error, payload) => {
        if (error) {
            throw error;
        }

        // Close QR Code Modal
        WalletConnectQRCodeModal.close();

        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];
        console.log({ accounts, chainId });
        
        });

        walletConnector.on("session_update", (error, payload) => {
        if (error) {
            throw error;
        }

        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
        return { accounts, chainId };
        });

        walletConnector.on("disconnect", (error, payload) => {
            if (error) {
                throw error;
            }
            location.reload();
        // Delete walletConnector
        });
        
    });    
}        