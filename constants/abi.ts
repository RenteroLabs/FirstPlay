
export const FIRSTPLYA_MARKET_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"packageId","type":"bytes32"}],"name":"Abort","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"packageId","type":"bytes32"}],"name":"ForceReclaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"gameId","type":"string"},{"indexed":false,"internalType":"address[]","name":"nftAddresses","type":"address[]"},{"indexed":false,"internalType":"uint16","name":"maxPlayTimes","type":"uint16"}],"name":"Game","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":true,"internalType":"bytes32","name":"packageId","type":"bytes32"},{"indexed":false,"internalType":"uint64","name":"expires","type":"uint64"}],"name":"Play","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"packageId","type":"bytes32"}],"name":"Reclaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"supplier","type":"address"},{"indexed":true,"internalType":"bytes32","name":"packageId","type":"bytes32"},{"indexed":false,"internalType":"uint16","name":"playDays","type":"uint16"},{"indexed":false,"internalType":"address[]","name":"nftAddresses","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"}],"name":"Supply","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"bytes32[]","name":"packageIds","type":"bytes32[]"}],"name":"abort","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"player","type":"address"}],"name":"addToWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"packageIds","type":"bytes32[]"}],"name":"forceReclaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"gameMaxPlayTimes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"gamePlayable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"multiChainKeeper","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nftAddressToRenteroAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"packageGameId","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"packageNfts","outputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"packagePlayDays","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"passNft","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"packageId","type":"bytes32"}],"name":"play","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"playerBlacklist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"}],"name":"playerGamePlayTimes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"playerWhitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"packageIds","type":"bytes32[]"}],"name":"reclaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"players","type":"address[]"},{"internalType":"bool","name":"forbidden","type":"bool"}],"name":"setBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"feeReceiver_","type":"address"}],"name":"setFeeReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"nftAddresses","type":"address[]"},{"internalType":"address[]","name":"renteroAddresses","type":"address[]"},{"internalType":"string","name":"gameId","type":"string"},{"internalType":"uint16","name":"maxPlayTimes","type":"uint16"}],"name":"setGameParameter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"gameId","type":"string"},{"internalType":"bool","name":"playable","type":"bool"}],"name":"setGamePlayable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"multiChainKeeper_","type":"address"}],"name":"setMultiChainKeeper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"passNft_","type":"address"}],"name":"setPassNft","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"nftAddresses","type":"address[]"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"string","name":"gameId","type":"string"},{"internalType":"uint16","name":"playDays","type":"uint16"}],"name":"supply","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"nftAddresses","type":"address[]"},{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"string","name":"gameId","type":"string"},{"internalType":"uint16","name":"playDays","type":"uint16"}],"name":"supplyPackage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}]