const path = require('path');
const fs = require('fs');
const { Web3 } = require('web3');
const axios = require('axios');
require('dotenv').config();

const ROUTER_ABI = require('./soy_finance_abi.json');
const LP_ABI = require('./lp_abi.json');
const RPC = 'https://rpc.callisto.network/';

const ROUTER = '0xeb5b468faacc6bbdc14c4aacf0eec38abccc13e7'; // Soy Finance Router

// Tokens
const SOY_ADDRESS = '0x9FaE2529863bD691B4A7171bDfCf33C7ebB10a65';
const WCLO_ADDRESS = '0xF5AD6F6EDeC824C7fD54A66d241a227F6503aD3a';
const CLOE_ADDRESS = '0x1eAa43544dAa399b87EEcFcC6Fa579D5ea4A6187';
const BUSDT_ADDRESS = '0xbf6c50889d3a620eb42C0F188b65aDe90De958c4';
const BNB_ADDRESS = '0xcCDe29903E621Ca12DF33BB0aD9D1ADD7261Ace9';
const ETH_ADDRESS = '0xcC208c32Cc6919af5d8026dAB7A3eC7A57CD1796';
const ETC_ADDRESS = '0xCCc766f97629a4E14b3af8C91EC54f0b5664A69F';
const CAKE_ADDRESS = '0xCC2D45F7fE1b8864a13F5D552345eB3f5a005FEd';
const TWT_ADDRESS = '0xCC099e75152ACCda96d54FAbaf6e333ca44AD86e';
const WSG_ADDRESS = '0xccEbb9f0EE6D720DebccEE42f52915037f774A70';
const REEF_ADDRESS = '0xCc1530716A7eBecFdc7572eDCbF01766f042155c';
const BAKE_ADDRESS = '0xCCeC9F26F52E8e0D1d88365004f4F475f5274279';
const SHIB_ADDRESS = '0xccA4F2ED7Fc093461c13f7F5d79870625329549A';
const RACA_ADDRESS = '0xCC8B04c0f7d0797B3BD6b7BE8E0061ac0c3c0A9b';
const LINA_ADDRESS = '0xCC10A4050917f771210407DF7A4C048e8934332c';
const TON_ADDRESS = '0xCC50D400042177B9DAb6bd31ede73aE8e1ED6F08';
const FTM_ADDRESS = '0xcc50aB63766660C6C1157B8d6A5D51ceA82Dff34';
const BTT_ADDRESS = '0xCc99C6635Fae4DAcF967a3fc2913ab9fa2b349C3';
const VVT_ADDRESS = '0x9f9b6DD3DEDB4D2e6C679bCb8782f546400e9A53';
const XMS_ADDRESS = '0xcc45afedd2065EDcA770801055d1E376473a871B';
const BBT_ADDRESS = '0xcCCaC2f22752bbe77D4DAb4e9421F2AC6c988427';
const ANTEX_ADDRESS = '0xCCd792f5D06b73685a1b54A32fE786346cAd1894';
const ZOO_ADDRESS = '0xCC9aFcE1e164fC2b381A3a104909e2D9E52cfB5D';
const BCOIN_ADDRESS = '0xcC6e7E97A46B6F0eD3bC81518Fc816da78F7cb65';

// LPs
const LP_ADDRESS = '0x1ceE27d0627ce8A81dF9B4D7eEE0d753b8c2F613'; // SOY-CLO LP
const LP_BUSDT_ADDRESS = '0x23288A0a9c7ac3bEC523aeED146E4F0bf04d6309'; // SOY-BUSDT LP
const LP_ETC_ADDRESS = '0xcE49b862ED38414C86914Df5E6d854AfBe203563'; // SOY-ETC LP
const LP_ETH_ADDRESS = '0xE0A4D8356c0Ded2e0E7A4Af6DB2a164f7d1aD243'; // SOY-ETH LP
const LP_BNB_ADDRESS = '0x3006b056eA9423804084D6bA9080d6356EC78c10'; // SOY-BNB LP
const LP_CAKE_ADDRESS = '0x4309b1FfF68E4C46abc9c92FB813cAFD1fC05A70'; // SOY-CAKE LP
const LP_TWT_ADDRESS = '0x7f342fEd3A80ea475631196709D2C6c4a94816C8'; // SOY-TWT LP
const LP_WSG_ADDRESS = '0xE92a69F2aCAad1480ec945A60fBFdFB921436F51'; // SOY-WSG LP
const LP_CLOE_ADDRESS = '0x9A95F9cf7Ea14264ef7AaC0798bbbE856246c0B2'; // SOY-CLOE LP
const LP_REEF_ADDRESS = '0x15Bf7d259e0100247dEc1472686509B2Df458059'; // SOY-REEF LP
const LP_BAKE_ADDRESS = '0xB48829bfd203eDa5C259f7609AB5c1d83a88a47b'; // SOY-BAKE LP
const LP_SHIB_ADDRESS = '0x4bf425f5b5bcb76e2b2e5e2A2EF0EF881D53a746'; // SOY-SHIB LP
const LP_RACA_ADDRESS = '0x365F4B80C427EFDD6F2F1D06FF08bc2e2ffcA832'; // SOY-RACA LP
const LP_LINA_ADDRESS = '0xF344E4fc351b6BA97e6dF9DC03f6cCe824aE9FC2'; // SOY-LINA LP
const LP_TON_ADDRESS = '0x2831e574Fe43f0815091596d0e7982d2707A954A'; // SOY-TON LP
const LP_FTM_ADDRESS = '0x6C1D9C58d5221dEdD8B5f4d1f53dEd75a34D8858'; // SOY-FTM LP
const LP_BTT_ADDRESS = '0x7Bfbc45C60bFc6cdbf15aE3C79402dfD704124D8'; // SOY-BTT LP
const LP_VVT_ADDRESS = '0x7a314519C7F9dD5ca8018C3491e6E9aA97Cf67FC'; // SOY-VVT LP
const LP_XMS_ADDRESS = '0x5Fc4Aa80cEDF18dFd1a1066fF0b02bB99DD09069'; // SOY-XMS LP
const LP_BBT_ADDRESS = '0x7698Aa8703623BB4bb149bb529e12Ab712952E26'; // SOY-BBT LP
const LP_ANTEX_ADDRESS = '0x03423DDB47730799c1250BFbd8A150E6d1D4BbBF'; // SOY-ANTEX LP
const LP_ZOO_ADDRESS = '0x0F663DA289eD5E76C1CF7730A317F89D28A0B9E3'; // SOY-ZOO LP
const LP_BCOIN_ADDRESS = '0x7c2DBd65342A472F053CeA6d7Ff46Cdc751Bc6B8'; // SOY-BCOIN LP

// Farms
const FARM_CLO_ADDRESS = ['0xf43Db9BeC8F8626Cb5ADD409C7EBc7272c8f5F8f','0x0cf951123b2d337eb52091babe61afadfff330b4'];
const FARM_BUSDT_ADDRESS = ['0xf16edf5Ba6bc116C17f6769deB470a190e272381', '0xe884eff699177acca9f362d24516fd3763c0489b'];
const FARM_ETC_ADDRESS = ['0xF257e70b0B4A5E75BD351ceA7499b54f29636b0c', '0xe7df85abab6505737713ac6eb53c8ee03232cb14'];
const FARM_ETH_ADDRESS = ['0xC2d33425aD2A25d78252a31d6f2C51A2F4f31394', '0xe59c4537a901640dc3fc3c3b9da7b18f9f589807'];
const FARM_BNB_ADDRESS = ['0xF411Ff92CAcd87Ee7EcB4fD83A5e7AF5D2946c9e', '0xa0412a0cd94adb40e2d3c1dd95909ff446fade35'];
const FARM_CAKE_ADDRESS = ['0xa99E8864A727717F5C4c82031F99D360eb577738'];
const FARM_TWT_ADDRESS = ['0x6eFf6b17d4Ad50a25483Cc8d149fbfC275B05435'];
const FARM_WSG_ADDRESS = ['0xDA979A3878AFF6cf6228740dfA75Da39c1aF141c'];
const FARM_CLOE_ADDRESS = ['0x8c0A982A4193c6bF8Eea6637Db0CF9160dCF91fD', '0x95547a1c6fb6e89b7bd2ba3de5097494cbe696da'];
const FARM_REEF_ADDRESS = ['0x5c70437Fd3a2CC1f328E33bccdC345E8bAe0afD2'];
const FARM_BAKE_ADDRESS = ['0x943c005eD3f77f44f17fF21a95E5043Bc04Bd3Fa'];
const FARM_SHIB_ADDRESS = ['0x23560EE7ccC3791e7Fb6D3371F4BB02Fa81F403c'];
const FARM_RACA_ADDRESS = ['0x9D8D90518e096e337Bd3f32C93579d8D270a2825'];
const FARM_LINA_ADDRESS = ['0xAEE5De40fB9d24006B1b02A51bED7D44eA544A98'];
const FARM_TON_ADDRESS = ['0x53aaFcf7B664DA84743730bc82CDb64F21694922'];
const FARM_FTM_ADDRESS = ['0x755dACb811Bb64F3a1A9DF3dEdf12dAc7d14500B'];
const FARM_BTT_ADDRESS = ['0x8967a2adc0E1B7B0422426e350Fe389a4745eC78'];
const FARM_VVT_ADDRESS = ['0x8967a2adc0E1B7B0422426e350Fe389a4745eC78'];
const FARM_XMS_ADDRESS = ['0xce6599adb4e51d2e4062e87f725461b90a81e636'];
const FARM_BBT_ADDRESS = ['0xa11547041d82e4ccbce8b9793c56964895fe471d'];
const FARM_ANTEX_ADDRESS = ['0x542ab5a505fa2ba75836ae87c6045ee03ef8b41d'];
const FARM_ZOO_ADDRESS = ['0xdad226e5c7a315946f938ea952b7d28548df373d'];
const FARM_BCOIN_ADDRESS = ['0xf995d7628feaf679a776f055c5e211d55ef5d9bd'];

const ZERO_ADDRESS = '0X0000000000000000000000000000000000000000';

const workList = {
    'CLO': {
        token: WCLO_ADDRESS,
        lp: LP_ADDRESS,
        farm: FARM_CLO_ADDRESS
    },
    'ETC': {
        token: ETC_ADDRESS,
        lp: LP_ETC_ADDRESS,
        farm: FARM_ETC_ADDRESS
    },
    'BNB': {
        token: BNB_ADDRESS,
        lp: LP_BNB_ADDRESS,
        farm: FARM_BNB_ADDRESS
    },
    'ETH': {
        token: ETH_ADDRESS,
        lp: LP_ETH_ADDRESS,
        farm: FARM_ETH_ADDRESS
    },
    'CLOE': {
        token: CLOE_ADDRESS,
        lp: LP_CLOE_ADDRESS,
        farm: FARM_CLOE_ADDRESS
    },
    'BUSDT': {
        token: BUSDT_ADDRESS,
        lp: LP_BUSDT_ADDRESS,
        farm: FARM_BUSDT_ADDRESS
    },
    'TWT': {
        token: TWT_ADDRESS,
        lp: LP_TWT_ADDRESS,
        farm: FARM_TWT_ADDRESS
    },
    'CAKE': {
        token: CAKE_ADDRESS,
        lp: LP_CAKE_ADDRESS,
        farm: FARM_CAKE_ADDRESS
    },
    'VVT': {
        token: VVT_ADDRESS,
        lp: LP_VVT_ADDRESS,
        startBlock: 10821333n,
        farm: FARM_VVT_ADDRESS
    },
    'WSG': {
        token: WSG_ADDRESS,
        lp: LP_WSG_ADDRESS,
        startBlock: 8865880n,
        farm: FARM_WSG_ADDRESS
    },
    'REEF': {
        token: REEF_ADDRESS,
        lp: LP_REEF_ADDRESS,
        farm: FARM_REEF_ADDRESS
    },
    'BAKE': {
        token: BAKE_ADDRESS,
        lp: LP_BAKE_ADDRESS,
        startBlock: 8938713n,
        farm: FARM_BAKE_ADDRESS
    },
    'SHIB': {
        token: SHIB_ADDRESS,
        lp: LP_SHIB_ADDRESS,
        startBlock: 8938932n,
        farm: FARM_SHIB_ADDRESS
    },
    'RACA': {
        token: RACA_ADDRESS,
        lp: LP_RACA_ADDRESS,
        startBlock: 8984547n,
        farm: FARM_RACA_ADDRESS
    },
    'LINA': {
        token: LINA_ADDRESS,
        lp: LP_LINA_ADDRESS,
        startBlock: 8984580n,
        farm: FARM_LINA_ADDRESS
    },
    'TON': {
        token: TON_ADDRESS,
        lp: LP_TON_ADDRESS,
        decimals: 9,
        startBlock: 9025049n,
        farm: FARM_TON_ADDRESS
    },
    'FTM': {
        token: FTM_ADDRESS,
        lp: LP_FTM_ADDRESS,
        startBlock: 9119388n,
        farm: FARM_FTM_ADDRESS
    },
    'BTT': {
        token: BTT_ADDRESS,
        lp: LP_BTT_ADDRESS,
        startBlock: 9119384n,
        farm: FARM_BTT_ADDRESS
    },
    'XMS': {
        token: XMS_ADDRESS,
        lp: LP_XMS_ADDRESS,
        startBlock: 9024849n,
        farm: FARM_XMS_ADDRESS
    },
    'BBT': {
        token: BBT_ADDRESS,
        lp: LP_BBT_ADDRESS,
        decimals: 8,
        startBlock: 9163650n,
        farm: FARM_BBT_ADDRESS
    },
    'ANTEX': {
        token: ANTEX_ADDRESS,
        lp: LP_ANTEX_ADDRESS,
        decimals: 8,
        startBlock: 9163687n,
        farm: FARM_ANTEX_ADDRESS
    },
    'ZOO': {
        token: ZOO_ADDRESS,
        lp: LP_ZOO_ADDRESS,
        startBlock: 9216486n,
        farm: FARM_ZOO_ADDRESS
    },
    'BCOIN': {
        token: BCOIN_ADDRESS,
        lp: LP_BCOIN_ADDRESS,
        startBlock: 9216475n,
        farm: FARM_BCOIN_ADDRESS
    }
}

// config
const LAST_BLOCK = BigInt(process.env.ENDBLOCK || '14186359');
const FIRST_BLOCK = BigInt(process.env.STARTBLOCK || '0');
const BATCH_SIZE = BigInt(10000);

const EVENT_TRANSFER = 'Transfer';
const EVENT_REMOVE = 'RemoveLiquidity';

const holders = new Map();

var activeToken = 'VVT';

function addToHolder(address, value) {
    let newVal = value;
    if (holders.has(address)) {
       newVal += holders.get(address);
    }
    holders.set(address, newVal);
}

async function getTransaction(txHash) {
    try {
        const tx = (await axios(`https://explorer.callisto.network/api?module=transaction&action=gettxinfo&txhash=${txHash}`)).data;
        return tx;
    } catch (e) {
        console.log(`Error getting TX: ${txHash}`)
    }
}

function parseTx(tx, web3, idx, lp) {
    let transfer;
    const tokenAddress = (lp || LP_ADDRESS).toLowerCase();
    const srcAddress = tx.result.from.replace(/^0x+/, '');

    for (let log of tx.result.logs) {
        if (log.address === tokenAddress) {
            if (log.topics[idx].indexOf(srcAddress) !== -1) {
                transfer = log;
                break;
            }
        }
    }

    const data = transfer['data'];
    const stripped = '0x' + data.replace(/^0x0+/, '');
    const val = BigInt(stripped);
    // return  web3.utils.fromWei(val, 'ether');
    return val;
}

async function findLPratio(web3, token, lp, decimals) {
    console.log(`findLPratio: ${token} | ${lp}`);
    const contract = new web3.eth.Contract(
        ROUTER_ABI,
        ROUTER
    );

    const pairToken = (token || WCLO_ADDRESS).toUpperCase();
    const testPair = [SOY_ADDRESS.toUpperCase(), pairToken];

    let multi = 1n;

    while (true) {

        const events = await contract.getPastEvents(EVENT_REMOVE, {
            fromBlock: LAST_BLOCK - BATCH_SIZE * 5n * multi,
            toBlock: LAST_BLOCK
        });

        if (events.length) {
            const res = {
                token: 0n,
                soy: 0n,
                lp: 0n
            }
            for (let i = events.length - 1; i > 0; i--) {
                const event = events[i];
                const tokenA = event.returnValues['1'].toUpperCase();
                const tokenB = event.returnValues['2'].toUpperCase();

                if (testPair.includes(tokenB) && testPair.includes(tokenA)) {
                    const tx = await getTransaction(event.transactionHash);
                    if (tx) {
                        // console.dir(event);
                        console.log(`RemoveLiquidity (SOY/${activeToken}) at block ${event.blockNumber}: ${event.transactionHash}`);
                        res.soy = BigInt(event.returnValues['3']);
                        res.token = BigInt(event.returnValues['4']);
                        if (decimals) {
                            res.token *= 10n ** BigInt(18 - decimals);
                        }
                        res.lp = parseTx(tx, web3, 1, lp);
                        console.dir(res);
                        return res;
                    }
                }
            }
        }

        multi *= 2n;
        console.log(`Searching removes with multi: ${Number(multi)}`);
    }
}

// main ()
(async () => {
    for (let token of Object.keys(workList)) {
        activeToken = token;
        holders.clear();
        // setup current token
        console.log(`Searching for ${activeToken} token...`);

        // init Web3 provider
        const web3 = new Web3(RPC);

        const ratio = await findLPratio(web3, workList[activeToken].token, workList[activeToken].lp, workList[activeToken].decimals);
        if (!ratio) {
            console.log('Withdraw event not found');
            return;
        }

        const firstBlock = workList[activeToken].startBlock || FIRST_BLOCK;
        const fullBlocks = (LAST_BLOCK - firstBlock);

        const lpAddress = workList[activeToken].lp.toUpperCase();
        // lp contract
        const contract = new web3.eth.Contract(
            LP_ABI,
            lpAddress
        );

        const farms = workList[activeToken].farm.map((farm) => farm.toUpperCase());

        const contracts = [ZERO_ADDRESS.toUpperCase(), lpAddress, ...farms];
        console.log(`Excluded contracts: ${contracts}`);

        console.time('getEvents');
        let stopFlag = false;
        for (let i = firstBlock; i < LAST_BLOCK; i += BATCH_SIZE) {
            const pcnt = Number(i - firstBlock) / Number(fullBlocks) * 100;
            console.log(`[${activeToken}] block: ${i} -> ${pcnt}%`);
            console.time('getOneBatch');
            const lastBlock = (i + BATCH_SIZE - 1n) > LAST_BLOCK ? LAST_BLOCK : i + BATCH_SIZE - 1n;
            const events = await contract.getPastEvents(EVENT_TRANSFER, {
                fromBlock: i,
                toBlock: lastBlock
            });

            // parse transfer LP
            if (events.length) {
                for (let event of events) {
                    // console.log(event.transactionHash);
                    const tokenA = event.returnValues['0'].toUpperCase();
                    const tokenB = event.returnValues['1'].toUpperCase();
                    const val = BigInt(event.returnValues['2']);

                    if (tokenA === ZERO_ADDRESS && !contracts.includes(tokenB)) { // mint LP
                        addToHolder(tokenB, val);
                    } else if (tokenB === lpAddress && !contracts.includes(tokenA)) {  // burn LP
                        addToHolder(tokenA, val * (-1n));
                    } else if (!contracts.includes(tokenA) && !contracts.includes(tokenB)) {  // move to another holder
                        addToHolder(tokenA, val * (-1n));
                        addToHolder(tokenB, val);
                    }
                }
            }
            console.timeEnd('getOneBatch');
        }

        console.timeEnd('getEvents');

        let outStr = `address;LP wei;LP ether;${activeToken};SOY\n`;
        const tokenRatio = Number(web3.utils.fromWei(ratio.token, 'ether')) / Number(web3.utils.fromWei(ratio.lp, 'ether'));
        const soyRatio = Number(web3.utils.fromWei(ratio.soy, 'ether')) / Number(web3.utils.fromWei(ratio.lp, 'ether'));
        for (const [key, value] of holders) {
            if (value > 0n) {
                const etherValue = Number(web3.utils.fromWei(value, 'ether'))
                const token = tokenRatio * etherValue;
                const soy = soyRatio * etherValue;
                outStr += `${key.toLowerCase()};${value};${etherValue};${token};${soy}\n`;
            }
        }

        // console.dir(holders);
        fs.writeFileSync(path.resolve(__dirname + '/out', `${activeToken.toLowerCase()}_holder_ratio.csv`), outStr, 'utf8');
    }
})();