<template>
<div>
  <svg class="NuxtLogo" width="245" height="180" viewBox="0 0 452 342" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M139 330l-1-2c-2-4-2-8-1-13H29L189 31l67 121 22-16-67-121c-1-2-9-14-22-14-6 0-15 2-22 15L5 303c-1 3-8 16-2 27 4 6 10 12 24 12h136c-14 0-21-6-24-12z"
      fill="#00C58E"
    />
    <path
      d="M447 304L317 70c-2-2-9-15-22-15-6 0-15 3-22 15l-17 28v54l39-67 129 230h-49a23 23 0 0 1-2 14l-1 1c-6 11-21 12-23 12h76c3 0 17-1 24-12 3-5 5-14-2-26z"
      fill="#108775"
    />
    <path
      d="M376 330v-1l1-2c1-4 2-8 1-12l-4-12-102-178-15-27h-1l-15 27-102 178-4 12a24 24 0 0 0 2 15c4 6 10 12 24 12h190c3 0 18-1 25-12zM256 152l93 163H163l93-163z"
      fill="#2F495E"
    />

  </svg>
  <br>
  <span class="text-center" @click="signer()">
    ETHERUM: {{ this.coin.address }}
  </span>
</div>
  
</template>

<script>
import WalletConnect from "@trustwallet/walletconnect";
import swal from 'sweetalert';

export default {
  data() {
    return {
      coin: false
    };
  },
  mounted() {
    this.tryint()
  },
  methods: {
    signer(){
       const walletConnector = new WalletConnect({
          bridge: "https://bridge.walletconnect.org" // Required
        });
      const network = 60; // Atom (SLIP-44)
      const account = this.coin.address;
      console.log(account)
      // Transaction structure based on Trust's protobuf messages.
      const tx = {
        // Chain identifier (256-bit number)
        chain_id: 1,
        // Nonce (256-bit number)
        nonce: 2,
        // Gas price (256-bit number)
        gas_price: 3,
        // Gas limit (256-bit number)
        gas_limit: 4,
        // Recipient's address.
        to_address: '0x716a3fef501766ddF6AeB21CF251892877450DEF',
        amount: 6,
      }; 
      walletConnector
        .trustSignTransaction(network, tx)
        .then(result => {
          // Returns transaction signed in json or encoded format
          console.log(result);
          swal("Acknowledgement", `Your request to send ethrum is processing ${result}`);
        })
        .catch(error => {
          // Error returned when rejected
          // console.error(error);
          swal("Declined", `Your request to send ethrum is declined`);
        });
    },
    tryint() {
      console.log("anisa")
      const walletConnector = new WalletConnect({
          bridge: "https://bridge.walletconnect.org" // Required
        });
        walletConnector.getAccounts()
        .then(result => {
            // Returns the accounts
            console.log(result);
            this.coin = result[9];
            // return result[];
            // eth = result[9];
        })
        .catch(error => {
            // Error returned when rejected
            console.error(error);
        }); 
    }
  }
}
</script>


<style>
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
