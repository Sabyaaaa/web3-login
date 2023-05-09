import { HashConnect } from "hashconnect";
import axios from 'axios';

let hashconnect = new HashConnect(true) //enable true for debug mode

let appMetadata = {
    name: 'dApp Example',
    description: 'An example hedera app',
    icon: 'https://absolute.url/to/icon.png'
}

export const pairHashpack = async () => {
    let initData = await hashconnect.init(appMetadata, "testnet", true);
    console.warn(initData); 

    hashconnect.foundExtensionEvent.once((walletMetadata)=>{
        console.log(walletMetadata);
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata)
    })

   

    hashconnect.pairingEvent.once((pairingData)=> {
        const accountId = pairingData.accountIds[0];
        axios.post('https://642eb37c8ca0fe3352d67f24.mockapi.io/greenarmy', {accountId})
        .then((response)=> {
            console.log(response.data);
        }).catch((error)=>{
            console.error(error);
        })
        console.log(pairingData.accountIds[0])

    })
    return initData
}