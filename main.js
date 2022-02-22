const onboardButton = document.getElementById('connectButton')

Moralis.start({ serverUrl: "https://nnizhd1ed1xt.usemoralis.com:2053/server", appId: "Qebl78Bh9Q7TJGoVsyNVhWsjGuxgrxvM6w2wSyjQ" });

let isMetaMaskConnected = false;

async function login(){
  console.log("login clicked");
  var user = await Moralis.Web3.authenticate();
  if(user){
    isMetaMaskConnected = true;
    console.log(user);

    console.log(ethereum.selectedAddress);
    const _address = ethereum.selectedAddress
    // get polygon NFTs for address
    const options = { chain: 'polygon', format: 'decimal', address: _address, token_address: "0x434f7e5713100ace27310e45a8b78bd82e43054e" };
    const polygonNFTs = await Moralis.Web3API.account.getNFTs(options);
    const token_ids = polygonNFTs.result;

    let tokens = "";
    for (let i = 0; i < token_ids.length; i++) {
      tokens += "\n" + token_ids[i].token_id;
    }

    document.getElementById('tokens').innerHTML = tokens;

    onboardButton.innerText = 'Connected'
    onboardButton.disabled = true

  }
}

if (isMetaMaskConnected == false) {
  onboardButton.innerText = 'Connect'
  onboardButton.onclick = login
  onboardButton.disabled = false
}