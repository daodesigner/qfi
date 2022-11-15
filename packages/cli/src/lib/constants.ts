import figlet from "figlet"
import { G1Point, G2Point } from "qaci-crypto"
import { VerifyingKey } from "qaci-domainobjs"
import { Recipient } from "types"

/** dir/file names */
export const outputDirName = `output`
export const mnemonicDirName = `mnemonic`
export const generatedKeysGlobalDirName = `keys`
export const ethBaseDirName = `eth`
export const maciBaseDirName = `maci`
export const baseSkFileName = `sk`
export const basePkFileName = `pk`
export const baseAddressFileName = `address`
export const baseMnemonicFileName = `mnemonic`
export const baseTxtDirName = `txt`
export const baseQrPngDirName = `qr_png`
export const baseQrSvgDirName = `qr_svg`
export const basePkDirName = `public_keys`
export const baseSkDirName = `secret_keys`
export const baseAddressDirName = `addresses`
export const baseMnemonicDirName = `mnemonics`
export const ethMnemonicsCsvFileName = `mnemonics`
export const maciPrivateKeysCsvFileName = `secretKeys`
export const maciPublicKeysCsvFileName = `publicKeys`
export const deployedContractsFileName = `deployedContracts`
export const csvUserSignupFileName = `userSignup`
export const deployedContractsFileExt = `.json`
export const csvUserSignupFileExt = `.csv`
export const usersStateIndexesFileName = `signedUsersStateIndexes`
export const hacksFileName = `hacks`
export const mnemonicFileName = `mnemonic`
export const mnemonicFileExt = `.txt`

/** dir/file paths */
export const outputDirPath = `./${outputDirName}`
export const generatedKeysGlobalDirPath = `${outputDirPath}/${generatedKeysGlobalDirName}`
export const ethBaseDirPath = `${outputDirPath}/${generatedKeysGlobalDirName}/${ethBaseDirName}`
export const maciBaseDirPath = `${outputDirPath}/${generatedKeysGlobalDirName}/${maciBaseDirName}`

export const ethBasePkDirPath = `${ethBaseDirPath}/${basePkDirName}`
export const ethBaseSkDirPath = `${ethBaseDirPath}/${baseSkDirName}`
export const ethBaseAddressDirPath = `${ethBaseDirPath}/${baseAddressDirName}`
export const ethBaseMnemonicDirPath = `${ethBaseDirPath}/${baseMnemonicDirName}`
export const maciBasePkDirPath = `${maciBaseDirPath}/${basePkDirName}`
export const maciBaseSkDirPath = `${maciBaseDirPath}/${baseSkDirName}`

export const ethBasePkTxtDirPath = `${ethBasePkDirPath}/${baseTxtDirName}`
export const ethBaseSkTxtDirPath = `${ethBaseSkDirPath}/${baseTxtDirName}`
export const ethBaseAddressTxtDirPath = `${ethBaseAddressDirPath}/${baseTxtDirName}`
export const ethBaseMnemonicTxtDirPath = `${ethBaseMnemonicDirPath}/${baseTxtDirName}`
export const ethBasePkQrPngDirPath = `${ethBasePkDirPath}/${baseQrPngDirName}`
export const ethBaseSkQrPngDirPath = `${ethBaseSkDirPath}/${baseQrPngDirName}`
export const ethBaseAddressQrPngDirPath = `${ethBaseAddressDirPath}/${baseQrPngDirName}`
export const ethBaseMnemonicQrPngDirPath = `${ethBaseMnemonicDirPath}/${baseQrPngDirName}`
export const ethBasePkQrSvgDirPath = `${ethBasePkDirPath}/${baseQrSvgDirName}`
export const ethBaseSkQrSvgDirPath = `${ethBaseSkDirPath}/${baseQrSvgDirName}`
export const ethBaseAddressQrSvgDirPath = `${ethBaseAddressDirPath}/${baseQrSvgDirName}`
export const ethBaseMnemonicQrSvgDirPath = `${ethBaseMnemonicDirPath}/${baseQrSvgDirName}`

export const maciBasePkTxtDirPath = `${maciBasePkDirPath}/${baseTxtDirName}`
export const maciBaseSkTxtDirPath = `${maciBaseSkDirPath}/${baseTxtDirName}`
export const maciBasePkQrPngDirPath = `${maciBasePkDirPath}/${baseQrPngDirName}`
export const maciBaseSkQrPngDirPath = `${maciBaseSkDirPath}/${baseQrPngDirName}`
export const maciBasePkQrSvgDirPath = `${maciBasePkDirPath}/${baseQrSvgDirName}`
export const maciBaseSkQrSvgDirPath = `${maciBaseSkDirPath}/${baseQrSvgDirName}`

export const ethBasePkFilePath = `${ethBasePkDirPath}/${basePkFileName}`
export const ethBaseSkFilePath = `${ethBaseSkDirPath}/${baseSkFileName}`
export const ethBaseAddressFilePath = `${ethBaseAddressDirPath}/${baseAddressFileName}`
export const ethBaseMnemonicFilePath = `${ethBaseMnemonicDirPath}/${baseMnemonicFileName}`
export const maciBasePkFilePath = `${maciBasePkDirPath}/${basePkFileName}`
export const maciBaseSkFilePath = `${maciBaseSkDirPath}/${baseSkFileName}`

export const ethBaseCsvFilePath = `${ethBaseMnemonicDirPath}/${ethMnemonicsCsvFileName}`
export const maciBaseCsvFilePath = `${maciBaseSkDirPath}/${maciPrivateKeysCsvFileName}`

export const maciPkBaseCsvFilePath = `${maciBasePkDirPath}/${maciPublicKeysCsvFileName}`
export const csvUserSignupBaseDirPath = `${outputDirPath}/${csvUserSignupFileName}`
export const deployedContractsBaseDirPath = `${outputDirPath}/${deployedContractsFileName}`
export const usersStateIndexesBaseDirPath = `${outputDirPath}/${usersStateIndexesFileName}`
export const mnemonicBaseDirPath = `${outputDirPath}/${mnemonicFileName}`
export const deployedContractsFilePath = `${deployedContractsBaseDirPath}/${deployedContractsFileName}${deployedContractsFileExt}`

export const csvUserSignupFilePath = `${csvUserSignupBaseDirPath}/${csvUserSignupFileName}${csvUserSignupFileExt}`
export const usersStateIndexesFilePath = `${usersStateIndexesBaseDirPath}/${usersStateIndexesFileName}`
export const hacksFilePath = `${usersStateIndexesBaseDirPath}/${hacksFileName}`
export const mnemonicFilePath = `${mnemonicBaseDirPath}/${mnemonicFileName}${mnemonicFileExt}`

/** Header */
export const header = figlet.textSync("ETH Taiwan CLI", {
  font: "ANSI Regular",
  horizontalLayout: "full",
  verticalLayout: "default",
  whitespaceBreak: false
})

/** Networks */
export const networks = {
  localhost: {
    name: "localhost",
    rpcUrl: "http://localhost:8545", // Hardhat
    chainId: 1337,
    explorer: "http://localhost:8545/"
  },
  arbitrumRinkeby: {
    name: "arbitrum-rinkeby",
    rpcUrl: "https://rinkeby.arbitrum.io/rpc",
    chainId: 421611,
    explorer: "https://testnet.arbiscan.io/"
  },
  xdai: {
    name: "xdai",
    rpcUrl: "https://rpc.gnosischain.com/",
    chainId: 100,
    explorer: "https://blockscout.com/xdai/mainnet/"
  },
  kovan: {
    name: "kovan",
    rpcUrl: "https://kovan.poa.network",
    chainId: 42,
    explorer: "https://kovan.etherscan.io/"
  },
  matic: {
    name: "matic",
    rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/7afvptVsZxjFBz8Mcdm4dpu84IekOGds",
    chainId: 137,
    explorer: "https://polygonscan.com/"
  },
  goerli: {
    name: "goerli",
    rpcUrl: "https://eth-goerli.g.alchemy.com/v2/Yj6TVGlMl_otB1yDvpMTsb8vLFm1oGqg",
    chainId: 5,
    explorer: "https://goerli.etherscan.io/"
  }
}

/** Parameters */
export const initialVoiceCreditBalance = 99
export const baseERC20TokenInitialSupply = "100000000000000000000000"
export const numberOfMaxRecipients = 125

export const jsonRecipientsRecords: Recipient[] = [
  {
    projectName: "Hedgespa Digital Assets for both Private and Public Market Investments",
    tagline:
      "HedgeSPA is an investment analytics boutique with serial-award-winning expertise in public market and private market investments.",
    description:
      "Copy of WAGMI Pitch Battle- Projects Information for Q Copy of WAGMI Pitch Battle- Projects Information for Q 100% 10 D4 HedgeSPA is an investment analytics boutique with serial-award-winning expertise in public market and private market investments. Our founder was a Managing Director at BlackRock’s Portfolio Management Group in New York, where he built the multi-asset functionality on BlackRock’s Aladdin platform, based on his own background IP.  That’s how we got funded by the Singapore Government to rebuild from scratch. We offer our expertise in both technology and investment formats.  We also offer a Digital Asset/Web3 solution that combines both, with a sophisticated settlement choice settlement mechanism on which we are working with a bank consortium to seek regulatory approvals.  https://youtu.be/Mh-eNY5ip7M To enable screen reader support, press ⌘+Option+Z To learn about keyboard shortcuts, press ⌘slash HedgeSPA is an investment analytics boutique with serial-award-winning expertise in public market and private market investments. Our founder was a Managing Director at BlackRock’s Portfolio Management Group in New York, where he built the multi-asset functionality on BlackRock’s Aladdin platform, based on his own background IP.  That’s how we got funded by the Singapore Government to rebuild from scratch. We offer our expertise in both technology and investment formats.  We also offer a Digital Asset/Web3 solution that combines both, with a sophisticated settlement choice settlement mechanism on which we are working with a bank consortium to seek regulatory approvals.  https://youtu.be/Mh-eNY5ip7M Turn on screen reader support.",
    ethereumAddress: "0x68f81ef49C9008c9B7dAD587f021b80f600Ec0a4",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "Decentralized Fact Auditor (DFA)",
    tagline: "DFA's goal is to decrease fake news on the internet which allows users to stake their tokens to prove...",
    description:
      "DFA's goal is to decrease fake news on the internet which allows users to stake their tokens to prove the fact of the news they publish. Users can also stake tokens to prove that news are fake. Also, unlike Web2 media which is centralized, the DFA DAO will verify whether the news is fact or fake.",
    ethereumAddress: "0xa58Dfc01606D39Cf14aa2f7394318C9B06E0Bb0E",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "gotEM",
    tagline:
      "TA-WEI CHANG - Founder. Internet Serial Entrepreneur with experience in Internet Marketplaces, Internet Marketing, and Blockchain Technology. Founded gotEM, MeetMySpy and ... ",
    description:
      "TA-WEI CHANG - Founder Internet Serial Entrepreneur with experience in Internet Marketplaces, Internet Marketing, and Blockchain Technology. Founded gotEM, MeetMySpy and Co-Founded Digix, one of the first dApps on Ethereum BC. Studied Economics at San Francisco State University. https://www.linkedin.com/in/tawei-c-6a2640126/ Thomas Chang - Lead Blockchain Developer Over 15 years as a system admin and senior engineer. Has experience with C / C++, Python, AWS server, and Solidity and hardhat. Has worked previously at Foxconn, Cyberlink, InQuartik. He is currently lead blockchain developer at gotEM. RAFIQ AL SHAHBAZ - Attorney and Advisory Senior Legal Advisor and Attorney at Empower Energy Solutions, MBA London Business School AHMED SHAHZAIB - Lead Product Developer Full-stack Developer with a focus in Bootstrap, SQL, PHP, LARAVEL, HTML and JavaScript. Engineering background and studied Computer. Studied Science from GC University, Faisalabad. Dr. League Imparable - Marketing / Strategy Imparable has been working in the digital marketing space for over four years and has extensive experience with marketing within the crypto space. He specializes in blockchain technology, community outreach, and building alliances with relevant teams and organizations. His experience spans from working with Medicalveda, Tycoon.io, Mahadao, Freela, and Porkswap. He is currently VP and Director of marketing with gotEM. Perryn Kitiwanprasarn - Administrative Assistant A junior year student, from Ming Chuan University, currently work as Administrative Assistant at gotEM.",
    ethereumAddress: "0x8c1a7845956b73e5da7747ffb62891cc5a24faa4",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "MotionsCloud",
    tagline:
      "MotionsCloud automates damage detection & assessment processes via 4 modules: M1: IoT sensor device to automate damage notification & get 1st insight of the accident (In partnership with BOSCH)...",
    description:
      "MotionsCloud automates damage detection & assessment processes via 4 modules: M1: IoT sensor device to automate damage notification & get 1st insight of the accident (In partnership with BOSCH). M2: An augmented reality guidance mobile web-based app for users to perform a simple self-inspection. M3: An AI computer vision technology to evaluate & analyze photos/videos taken from M2, which generates a damage assessment report in minutes. M4: An optional remote live video inspection for more complicated cases in which an expert can perform remote inspections & check via mobile web app. MotionsCloud collaborates with Ensuro, the first decentralized, licensed (re)insurer on a public blockchain for smartphone screen guarantee with smart contract and insurance on blockchain.",
    ethereumAddress: "0xcCA126D69c386811F9C260c48Bf2F940A8dFABBB",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "zero-knowledge orderbook system ZK(OBS)",
    tagline:
      "The team members are from TKSpring, including front-end and back-end and smart contract engineers. We are building a new generation of DeFi products, the fixed-income and structured products, which will become the most stable cornerstone of DeFi. We will use the ZKP technology to solve the scalability problem on Ethereum, and establish an order book trading system based on ZKP...",
    description:
      "The team members are from TKSpring, including front-end and back-end and smart contract engineers. We are building a new generation of DeFi products, the fixed-income and structured products, which will become the most stable cornerstone of DeFi. We will use the ZKP technology to solve the scalability problem on Ethereum, and establish an order book trading system based on ZKP, so that users can enjoy the most efficient transactions without gas fees in DeFi.",
    ethereumAddress: "0x4B933cD816C86783B116D070818C6FCDf5bfF17a",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "1TM",
    tagline: "We are a group of strategists, designers, and engineers teamed up to enable creators...",
    description:
      "We are a group of strategists, designers, and engineers teamed up to enable creators around the globe and create a culture of collaboration. We are doing this by building 1TM, a decentralized collaboration platform where everyone gets rewarded for their work and participation.",
    ethereumAddress: "0x54e21D5E824Af796ED6201295ca0e7173cb20F32",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "G-Click",
    tagline:
      "G-Click is a concept of decentralize-ESG project... We aim to provide a service for corporations and customers to realize SDGs with just a click, earn the honorable NFT as a receipt, and record their sustainable actions in a trustworthy and easy way.",
    description:
      "G-Click is a concept of decentralize-ESG project.  Due to the global trend of ESG and SDGs, we believed the feature of blockchain 3T (Trust, Transparency & Traceability) can be fully applied for the MRV (Measure, Reporting & Verification) when cooperates work on ESG. We aim to provide a service for corporations and customers to realize SDGs with just a click, earn the honorable NFT as a receipt, and record their sustainable actions in a trustworthy and easy way.",
    ethereumAddress: "0x6609CeCa0b73C16931b182c2A58Db297D69A1284",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "Hepta Protocol",
    tagline:
      "Hepta Protocol is a blockchain-based platform where corporates can subscribe to well-curated ESG initiatives...",
    description:
      "Hepta Protocol is a blockchain-based platform where corporates can subscribe to well-curated ESG initiatives. We believe the transparency embedded in blockchain technology will  boost the efficiency and save extra costs for enterprises.",
    ethereumAddress: "0x3134Fbaa0e37e7EE5FcbDC8eAb78EE206EFE8fcF",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "Edu-Fi",
    tagline:
      "Edu-Fi is a learn-to-earn platform aiming to motivate children in remote countrysides to learn. Cooperating with enterprises to reward the children to learn and get skills certificates.",
    description:
      "Edu-Fi is a learn-to-earn platform aiming to motivate children in remote countrysides to learn. Cooperating with enterprises to reward the children to learn and get skills certificates.",
    ethereumAddress: "0x3A91b9B2Ce2c3326cf9e49aBDc9BDd8bbEABce58",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "Mr3",
    tagline: "MR3 provides services to build medical records on the blockchain...",
    description:
      "MR3 provides services to build medical records on the blockchain. Give people more flexibility in choosing where to seek medical care and help. At the same time, people can get better business applications and privacy.",
    ethereumAddress: "0x17569A4163F1B1DC10096FfCE96E3921B61526b6",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "Zomma Protocol",
    tagline: "ZOMMA aims to be the underlying fuel for all on-chain financial products...",
    description:
      "ZOMMA aims to be the underlying fuel for all on-chain financial products, focusing to contribute to the DeFi world by building an array of innovative and diversified products, that include staking, yield mining, buy & sell European style options, settlements and with the highest capital efficiency to achieve a win-win for all our ecosystem participants.",
    ethereumAddress: "0xccd7Dabc3E6B15FD62137c1e01971004e8F889c6",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "X-CITY",
    tagline:
      "We are team X-city. We are dedicated to creating a fair, just, and transparent online social environment. Our team members come from computer science and legal areas...",
    description:
      "We are team X-city. We are dedicated to creating a fair, just, and transparent online social environment. Our team members come from computer science and legal areas; we believe the combination is promising for implementing such radical online social and organizational reform. All members have dived into the crypto area for years; some are experienced smart contract developers and researchers, and some are experienced software engineers in the internet industry. We are trying to develop some exciting applications which can realize the ideal. We hope we can present some attractive and practical in making the world better.",
    ethereumAddress: "0xDdC9b9e424E630994386a55Eddc9281A693330D1",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "Rooit",
    tagline:
      "Founded in 2019, Rooit has 1.2M users around the world, creates 300K+ matches every month. Rooit is backed by Rakuten, Techstars Accelerator, Expara Venture and more...",
    description:
      "Founded in 2019, Rooit has 1.2M users around the world, creates 300K+ matches every month. Rooit is backed by Rakuten, Techstars Accelerator, Expara Venture and more. Rooit’s mission is to make everyone find a confidant, end loneliness. Rooit is moving forward to become the No.1 Web3 Friend-making app based on Ethereum. Users can create their own identity, stories and earn $STAR tokens by raising their alien pet: 'ROO'.",
    ethereumAddress: "0xb6f59f79F0526d326BB25B57fcCd45Fd8d960AA5",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "pRoots",
    tagline:
      "Founded in 2019, Rooit has 1.2M users around the world, creates 300K+ matches every month. Rooit is backed by Rakuten, Techstars Accelerator, Expara Venture and more...",
    description:
      "Founded in 2019, Rooit has 1.2M users around the world, creates 300K+ matches every month. Rooit is backed by Rakuten, Techstars Accelerator, Expara Venture and more. Rooit’s mission is to make everyone find a confidant, end loneliness. Rooit is moving forward to become the No.1 Web3 Friend-making app based on Ethereum. Users can create their own identity, stories and earn $STAR tokens by raising their alien pet: 'ROO'.",
    ethereumAddress: "0xbcd496ead2415bD438269aE0c4f50cE20242a29A  ",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  },
  {
    projectName: "From Learners to Learners",
    tagline:
      "Junyiacademy is an education NGO, providing digital learning platform for students from elementary school to high school...",
    description:
      "Junyiacademy is an education NGO, providing digital learning platform for students from elementary school to high school. We believe that “every child, from all backgrounds, can be a lifelong learner.” In the past 10 years, we have more than 4,200k registration and 83k active users in Taiwan. With this energy and power, we would like to keep helping students by moving from web2 to web3. Therefore, there will be more interaction among our donators, users and us, and it’s an important step to complete the vision.",
    ethereumAddress: "0x7623b7a9B74D8D2b4005cEfc87C3a5C592d0f1CB",
    website: "-",
    thumbnailImageLink: "https://source.unsplash.com/random",
    logoCdnUrl: "https://source.unsplash.com/random",
    bannerImageLink: "https://source.unsplash.com/random"
  }
]

export const deployedContracts = {
  PoseidonT3: "0xd6E3F1b7D098ED668b37A3493AaA78c3DB0A9175",
  PoseidonT4: "0x99c42C6D9C6C1E31D72D0A85ff0B66e06933133b",
  PoseidonT5: "0x14558e7a08B9dE5D5Be1AC72BC6CCaDDF70868B6",
  PoseidonT6: "0x43475437385E5491807d9bddc4F908770233F122",
  GrantRoundFactory: "0x41f16A3C47580B8391C7Ea405d7530b5d08f6243",
  PollFactory: "0x9AdF4b8f9ddA5d1065feB714C4e48aDF58881c08",
  MessageAqFactory: "0xe20982eb383aDEe6Ad6240D86FDc2b220Ff296ba",
  MessageAqFactoryGrants: "0x86829f67c77489781642daBF330018d204158bB2",
  SimpleHackathon: "0x9F5220ba8a8DAb34540534eA58CD3AaDd3c256eB",
  VKRegistry: "0xC76d35f2000550bfBB0b1C9c4B2038b41cE279e8",
  BaseERC20Token: "0x6C38dDB7B7C1a2cB05C33fada53CD2Fa19D0fB6E",
  MockVerifier: "0x1E23C8B4DbDe09063854c44937aE7264E3d6b7A6",
  PollProcessorAndTallier: "0x340502DaE5105D421aA0890C88a4b523723CC44D",
  QFI: "0x342B55688aD07AFEFCF30069fAEA4213eFd09ce1"
}

export const coordinatorPubkey = "macipk.ec4173e95d2bf03100f4c694d5c26ba6ab9817c0a5a0df593536a8ee2ec7af04"
export const userWallets = ["0x8fC402C39AA931f5f4FFd804CE85D4CC59899D64"]
export const ProcessVk = new VerifyingKey(
  new G1Point(BigInt(0), BigInt(1)),
  new G2Point([BigInt(2), BigInt(3)], [BigInt(4), BigInt(5)]),
  new G2Point([BigInt(6), BigInt(7)], [BigInt(8), BigInt(9)]),
  new G2Point([BigInt(10), BigInt(11)], [BigInt(12), BigInt(13)]),
  [new G1Point(BigInt(14), BigInt(15)), new G1Point(BigInt(16), BigInt(17))]
)

export const TallyVk = new VerifyingKey(
  new G1Point(BigInt(0), BigInt(1)),
  new G2Point([BigInt(2), BigInt(3)], [BigInt(4), BigInt(5)]),
  new G2Point([BigInt(6), BigInt(7)], [BigInt(8), BigInt(9)]),
  new G2Point([BigInt(10), BigInt(11)], [BigInt(12), BigInt(13)]),
  [new G1Point(BigInt(14), BigInt(15)), new G1Point(BigInt(16), BigInt(17))]
)

export const STATE_TREE_DEPTH = 10
export const STATE_TREE_ARITY = 5
export const MESSAGE_TREE_ARITY = 5

export const treeDepths = {
  intStateTreeDepth: 3,
  messageTreeDepth: 9,
  messageTreeSubDepth: 2,
  voteOptionTreeDepth: 3
}

export const messageBatchSize = MESSAGE_TREE_ARITY ** treeDepths.messageTreeSubDepth
export const tallyBatchSize = STATE_TREE_ARITY ** treeDepths.intStateTreeDepth

export const maxValues = {
  maxUsers: STATE_TREE_ARITY ** STATE_TREE_DEPTH,
  maxMessages: MESSAGE_TREE_ARITY ** treeDepths.messageTreeDepth,
  maxVoteOptions: MESSAGE_TREE_ARITY ** treeDepths.voteOptionTreeDepth
}
export const userSignUps = [
  "macipk.4c082b8524319b02c05e475e3cb40936eee8def1f29007e644d023518497db2b",
"macipk.ebcebbdf187eafe3829c914d9110c6c689f044f1c4d5440b4ee11dfd2ee4e31d",
"macipk.e7ea7c91332e48f71a6d881816550ecf1ea7ab228b7a8f07c4bc03aad8806d11",
"macipk.7138f4d541fbcc30e7d3ffc259c034925ebb71fa964a0eee1c1b65408da28d88",
"macipk.5cf874c5eead6eef9cd22573a5a3c8b6f731454217a450c1b4cda99b4e6c1586",
"macipk.0f8fff54903dcdd3fc83255ef0b7d15a1cb45c8ec698464374541e409f2d328f",
"macipk.bb72a31724780e6941221e356a98ca13f355e6889591b1622704eddd26f7fe2c",
"macipk.5942b3d2336fad68b0af1cdc1e5cf341d8894dadd01a275e76bdbd4d8c6be716",
"macipk.055bc09b0b1cafb11f315889ad85f91018102db548062b641888778972e3b505",
"macipk.11c71b49b270765ffbfaa60dc365e06e4d89e8eb922e1df1fccc92f5c5771b94",
"macipk.a2a95be42d044b2da49ead6edeee75edfefde8954b5eb36802de371053d54dad",
"macipk.a3ea07d17cd1d18eacff1c0ffe277effef59b6843e8df48e0c81a1938ad7d819",
"macipk.3e863c22ef1db03ba54b0dd3463ebd16bb85f9d5d5de2e6cf776da8aa1de3c08",
"macipk.0ce84a78cc15f416e3abe371ea2fbc9c6772d2834e5dfadbc71dca8b8ff1371a",
"macipk.a99e2625f05e9b4e17909d27c21c9040e0adc7ee04bc0a676c7a77a312271491",
"macipk.e45ef3df85b3629468117c1d5dadca7b10e43706dd01342d8b0aa06a102b4c81",
"macipk.66a125adef9326158694a6e88a3f54ffe2db8ed3c4537794c41766eda42a4d9b",
"macipk.af0583aea355780e90bb1b07cd92bb289414551f5d9ec3ca8a29669ffc4c369e",
"macipk.14caec7b8eae7e0db49b1c1a696b3e656ea1818256f7d5677308e91b978a4c26",
"macipk.e2e8fdd0259db7b0af543b0f6a1f4416d7c1b1147d0b2da5482a2dc7ef45402f",
"macipk.d36927779020e700d124b9225131fbfeb8cccfcf827e7f6d62081acf5dd69393",
"macipk.da251eb2ba5209ec23e7aa0b4c9642e3d57b021dfc5e0adc027628e49d44492a",
"macipk.465595285f3c5b5168bf4d4377028e49482212f70820bb247762ea7aa7ef5791",
"macipk.290d249a78e085b0b8640efaf980545a4111dd84c20f601ab374cec572875b91",
"macipk.c70bc617cf05be6d3b49ab693dc02bf8f9dccc1ace760a8133002f5b34a1d285",
"macipk.a9271d22ac48973570ad3c93c993a5f3f894a84a76536af50a51b65c7d93e42a",
"macipk.494cf599381d9bd9eee7e754b750dc8e953a4eea0ee7857337f3d32cb042fc14",
"macipk.67c1a3dbedcd88fd1ca79afe340a510a3b3c9b867b624737b9329101ef24599a",
"macipk.4bb43d3229dd73883a3992004389a9d5c196e0443ef065482f12a4cc6bfd6caa",
"macipk.a7eba5590bddf5bf229ae1c779ac6e34b06fe716dce1b9894af552f66e71262c",
"macipk.2e15f3c5e4a673a7d05620b407dab3a047907becbbe51977af51d82f7afb4812",
"macipk.2d459158833ad18e27c298c926ac9c7df78b896b68372edf7aa1ad7a3ccaa902",
"macipk.9cc21f5e11cad4496d80877bed0d97d32cf9c4981720113452e6240bcfbc7e8e",
"macipk.80b74569be7d4cc9d346a74a11d17552b881814171601ad86caf8c0247a82aa4",
"macipk.effe4121e06fb97194f6f4c6c847fa408ef3b3e17093a68df75efbf4614a7728",
"macipk.0ff1ac471a2e66b1e95f258d7aee67da08b31d6e0da3c4f4b9816881ed40d696",
"macipk.057bc18a84d146a0f3427e93accd94f5206c63893b5fb827ad8ec6ca44dca3af",
"macipk.843d81e4322f7ee8eb58c12ce1f215da1dd5cc85430c5fc6a29cdee920813f93",
"macipk.9f855b6b66fdcb15f3c2f2e4f7343fa090a4a88eee00711b01d81195615fed02",
"macipk.6b28bbf06ac65382d90c9afa72cc42d00fe5897f5639ed1500b8569085878416",
"macipk.ccd6adf9aa032a665d0d0bf11fd177489484375e3ef80ab8c092c9d284ca582a",
"macipk.5bbd86eca3ac99b14e533a001de45db6b127583c7d8c35ec9e73fdb092738105",
"macipk.2ec2ea5a7759ac20376578fdc3c7f517613c949dbfbae52c5525660bd8c06b8a",
"macipk.ac7d73a6d5fc72ec5c6736c65e36d99e6dd829f8b1e2f21208a3ae386c94612e",
"macipk.4bec5dbb16cd75cc7fa9cdd84fb3416a2d3cbd380bb89a3ef27bc761bc67fc28",
"macipk.3f0beb3a8b1f0f54c4b9a66d6148427d37941d89910cf3f755e58d0f2e16c685",
"macipk.a5b6fccf6f9759d324caa870d753ae9a8760ca6f11438d5eb46c4c216854692c",
"macipk.7b4ea2bd887f84e03c8ed83a41fd550dddfa7fccce0d2c430bdacb7bfb4c1296",
"macipk.ef9753c0c99c2b9d05b6b52456c1cad55554d7cc5391eaf70c92c4cd0e6d9e81",
"macipk.f9291e460f9896bf2b569e4248eecb685d02d97817bb90a74409530a9d920e08",
"macipk.8b698cc8ad22c08860fa056c03731ca4bc0deacadbba27284bfae0085e01529c",
"macipk.3eafee4813f5ef62bb026e4e3f203d6e195f8cc4a06ef29602a9bf60aebb598b",
"macipk.93c64dfe6d6ca2ff8f89ddc09d71962f2d134c9902728b2e1366ae9c384df60c",
"macipk.8959302cd1db4c8e1e4dfefa4d447d5dd39a53abfabe3ac2ebb0f9e3d8ba3397",
"macipk.0a9985085529aa2d83aa752219004aab1365c5d6582b093fbcb832ab1a328c8a",
"macipk.8e7b20c356f25a760a2c854abf640bbf1362788ec95e12bce40f8e0d0f3cc1a5",
"macipk.9437488d9cf6f8d6f20e175cded8da6d1a8786778aa94bca635cd06e1a3c9327",
"macipk.f5de018d61cf8d5929155e4f388a4bbf9b721744adbdff1a7b354b0a74a7c582",
"macipk.9ae707430c19cd305d7320ebf467c4594be03e4ae77461b2cb8a2e68efea07aa",
"macipk.bc74077314f5d0eee9a75c74cef25b48d8dab51e6690666eeb3abcd867f92e0a",
"macipk.e09b2b31fc8e5ee717eea81a0e152509d7b9aec58aa23df5e243e29ba9e4ae2a",
"macipk.d994680eae76ccf8dd1f8c0bdd57da7735fcd6b975dad6e4da92e7729f267299",
"macipk.709c8a71fc10aeff89a63cdbd5a8132ccfd661c6e7a2a0a25e07fce6c15a99a2",
"macipk.0c2b4da91910bae3c448b08969d831022bf71c0a15137e2c2d0ef6d28505dfa1",
"macipk.72d3d07c9341aa218905f363ea4b78d350314a6c4e3ee5e36cf1d4d3a01bf909",
"macipk.c7f55de001f8c9da30ce876e9badbf5e308dfec1a5861e6f7ea7d37d6b582a87",
"macipk.4c8878927cb40e9c29ec34fb97cf6888c1f3a332e960c286846638dbe4b6c891",
"macipk.42f15c8ff3fd73dcaf5351482611c429ddcbc586296076314dd550aed9479921",
"macipk.9f432da3048831b35e1054c5abf108f22c0e53c69976f3867ee48f759e298d81",
"macipk.fa38ed9835a2022a41aeab0d0fc102bc0c170ec433ba515502ee4713666f1104",
"macipk.eceda58f8d711991b66cd134d8d3f705e0a1adde542e9097d7fbcba1b61125a2",
"macipk.8c87a231463b96c89016797c2560d102f2b9c108dd37d21bb8806bd76579dc12",
"macipk.6eaee7e6c2ea725ee625a8e9154eb4eb4a877ff91ceb5fe98d54530684b35fa0",
"macipk.4f3ebe3fccf53598d0cdc86351495e17612f83b01bbbf92c6a7a3c0c0f88a188",
"macipk.20ee59f1aae01af9958c7d09c524e6911eca126947128ba88652ddd2bad38a81",
"macipk.ec5f0015bc542a042564d53e6ab1ae5bf5e64be0d0e0196301f86d389a1e3fad",
"macipk.275f44e440e577d658d04c328de522de67817ff360a9345928074a584558c192",
"macipk.7c1172f52c81da34d0faf60546c8985fea0113c3039cd432baf2d8331b918a08",
"macipk.6c4b588edc9c5248690f01dadba7bcfabe3d386636b0ddcc9e27886120c22296",
"macipk.037617a5c9869c99f956c7ce3edacef783982a2ccae2599a6193ecb1ba100697",
"macipk.477e6ed29fa443104aa7858862053e90e0c93f2f114f268094ce312361bf5583",
"macipk.fb757c74b86109ad32928ae9ca1018246961ca7cf5c2f6d53e0e542ba392061c",
"macipk.b0db35b6e3b0d807640b8ffce5b6f2784bf3904731bbdb8c96040521b59de99b",
"macipk.9190208f0f8ba8a7877c7297ec75b83716a342582c492eedce668ae3913e9724",
"macipk.d10e05205a725091033dfbd7dc2b5401efeab944418991dbcf6d208160faa529",
"macipk.c40c543f8903eba6c62cfb260305419e3e710ea2ffcbc9c2a4568184a4aa53a7",
"macipk.4eea111520f63d66d67522fadd73de6b87c9e526ef6ad71ef093c980d7b306a3",
"macipk.efabaf3827c9ed15eaf0d1928810dfeb7fa890ee0ea7fdd74fc5b8a4c8b54a84",
"macipk.48853133ebc77ac008cdd9c5616bf86d533110b5a261791ed1e91b79b593201b",
"macipk.3599385bac0926f3a6e7320cc1b4443b7a83e5bedef3835464c5c89480afdc8c",
"macipk.d88ba955913990b00aa64a938147686a19a652a99772bc0b9ed0d1dd646bde13",
"macipk.cc957b3e887d3cb77c9507f312355be029e6b8114ec48538b2609471bb1b788f",
"macipk.112abe1ae898d1e10c535d836d07c49522f1a364e366d2513f11d3d84d3feb1f",
"macipk.344b118dfaf976f4ae9c72ef6719756910d3b77871ee0ab648e73a6bc93ff194",
"macipk.433695e3bff48e6a940a5b048474348b4889e0cbe4993dab4cfa7a50067ec193",
"macipk.ec8ab1aedefbd2554643b035ece6b0670265f1455f0f91e6d0ae8430f1bdde15",
"macipk.d795fda4a398e1d9fe31843df49846914726e1d385a796b7ff6eeb3c76d2d32c",
"macipk.545120340de391ea2d57c736b64bd0d34b2f2c3d282894cda65454dd7278bb82",
"macipk.8a5dbe5ca5094dfb5da4b91feb6c79a8493ef78bc7842f19a6109c3d8c6aa807",
"macipk.f55fefabeb1efdf92fc3e14be8f348256f1d855dc959a16b55c54d401ab2d69e",
"macipk.94d1fd32629e21f7856f8607493245cd0ebaef74f6acf3e4f4b66ef735aca289",
"macipk.c4b604c8d0eda2e399995b3bbbf1db7108b3140b3eb194d1f9180f7452fd058f",
"macipk.6b5dcb4a430cf9b00725f6f55dce429ef6b4d84a261b084657d3b728ea1655a4",
"macipk.3cc286d0ec063df297ece95cafbac0a5f6f911f201c87c561a7d01c90c200096",
"macipk.d597fe76c473a2ed024396ae0b6eac6e4dc6a5ada3e318713a9110a555ab4598",
"macipk.bd1250ee93d24b021c1c57aeeb4803f053494a4674f0155f0ef32584392e10aa",
"macipk.4d0d800ae76c4dc314167a4f2a3876624203938592bb9cf8b0d5e2622451d69d",
"macipk.9e8e71e235e62507ff1048c00a6af361b21d1dc0c28dc4c80f247e0792c52022",
"macipk.5f2c91f74667a81f81a07a305463adb8cfd5c00d0cae288e5b993b7e939fe3af",
"macipk.0beb7629ba881e33682da87f5f436ae5dbe682e46a18ecb7696aa53ef97394ac",
"macipk.8da49256f3ab57fd302aa0765e2a1688e9ffd249d4487dac157168f054699704",
"macipk.63400eeaeba6798227235571624ba0153b1c37c7c44cff3ab8cc1e4932fc9302",
"macipk.f86ce49e01e1814ddf3bc93903efe63940285bc98ec77457cc41233cedef818d",
"macipk.8518c91a029a97155f2101ec5974795bbdd57f85cc8ff6d416b728260a8b2c19",
"macipk.f9166253bac1ac7abd9184f87d3d65caff989d6b3bba9d13e730d53849bddb02",
"macipk.5e27125faa193fe4832e4c006d896674eec7d6c7b0e8e5dead71505eedf9bf1f",
"macipk.9e98656f9df33848fd0f8aaeb45bb8cfe62c1c9b18a1ba2374062da622ecf115",
"macipk.1d952d5c5e7915af529610f32db651f12677bd621e5147bc1b1be649539324aa",
"macipk.1f43b425615caef46431602d579eea4b9432ba8c40a3c5fe76cd3d595ad5f304",
"macipk.a7305dd2eda104ca412df4ca2dbb32c53dfb817f813aee0f45853cc07d72f9a7",
"macipk.5530db7bff22fc7a81a2a3facc0abd88ad87d5ef5490a530e291829c3f5dd590",
"macipk.f4cf07d8e9c31dc7b2b37a925f567736620d62dc9082bbbfc928ad2a4d898aae",
"macipk.1c487a52f2c48997ad2d8caa22c1b0cfe89e3c1597b88357f64e9175273e8593",
"macipk.7644f48de0d37eb5ec28ce97b83c00c70fad8c3c310a607c7344afc8e4258bae",
"macipk.d825ba3542f6552a9997585e783a7a4e3c0feb8513ff859645c231f25b8ae58f",
"macipk.62a3fe80723f816738cbb49fdbb5bcdcf42c45dd3d9eaae446480b1ea4774f9f",
"macipk.c4e617039f2b9c894976c3c05cd8ef4ce90745bc36ec0ef2882a585ab17ecd84",
"macipk.8c4494f29de54102733abe78e38ae6a6b8e522fa176ef15cb401dac2b457fb8e",
"macipk.d493cc78467fc226317f02da8b35b8fefd2cb58971741dc8901fd791f2f11e0c",
"macipk.93ed6c272ea33bc2cbe1dcecd759240520cb2c7fbce5daca57a7d83924088c1b",
"macipk.d85abcbd49b4cd9d4d65ee8b389f14a3694476d2670b6fe9ff6bd2d95fd635a0",
"macipk.6c6818372794d2a2e50a96456ab06bcd54285a9cf25a174dc1a6fb67b8bed002",
"macipk.a3ddfb4376dfda38dbd39119af2b7c2429b2cf43fe23f3c41f3bd5b9176eb281",
"macipk.97c6493236ded76e2db95433908c191a7aba0bb23cfd7522b17205a6a539f493",
"macipk.5c812312ba4c72b0a38c0cf3e9fb81a46d418b76abf43b07373c6a02d0c0b11e",
"macipk.c30c891f1466619a24ff3334077e771396c9835b89451b527b231c424dd7c192",
"macipk.2254481edec0b34d2d45cba508affe6b76cc425d939084f92ed1c262f172cb16",
"macipk.4178694c17c2f34a401f7bf541f8318b4f1cce5fb6eb1c479ac2db3b8e053025",
"macipk.e31578ef96b7704a6117aa0f4131031d227ef16ea1e4ce1a2f963edebc9c6688",
"macipk.22bde61dd053f6dd70fd371a1392bc45afd807960005fea69a14170aed64621a",
"macipk.878f152844588afacb14d0b604b1b559c1cf334efdf7e87327b557528cf14714",
"macipk.bf6f4d09b92e5f11e0c427f4a0c299cb9c24463a2f590214536779345fba4723",
"macipk.a2dd0c71a3061022817ddd616ab2909faff5990f1503df03cdf63c01eef6549f",
"macipk.6e0fff8d16fcc1284b5ad5d8790cb39ec48bd326c7b36e505a95a673f45b6499",
"macipk.edb34bcb98ad86677fea00cab707cf74e50ec664c4f2f3ce283a3b076072a808",
"macipk.a0012c0fd750dbf38d5d937e95c6b526ad35bca88501f58bfc6a0a062bec281b",
"macipk.efe4c07d82ed68221ac38aa9ee603009f14e6a4ceb1d0111936dd06a44273da5",
"macipk.13d37b9041ee9ea253106de880f594cad7bb0ec77c82c70a989cccf3c1f46b29",
"macipk.641622067c9cd8828592c88d6299c01c0f1c028510ceefe74db289e7901b828d",
"macipk.4bf409a5038e09e173d096cbea6891207c406b2b6bfddd28de519dd7eedd2f21",
"macipk.bbbb7a10b8cf6fcd9961bbf97db4b6a605a42a4f566df4dc03973a77c176a208",
"macipk.c0a66b400bd9da4a586942735d3eea916779be7b024b0d7a9bcfb469157745a3",
"macipk.66e2329aa90892e9d8141db742e91249727398fc606a04ed6181e093efbc8c11",
"macipk.9f9b78ce4ddadc8a0d7eab10a17bce789e68bab121865734ebf9a5f481eee98f",
"macipk.1baca9f10bd0bb29f5a6118f7c3238be7be33e78711b7c1676ef69061b981896",
"macipk.82f045af4a9b13c1dea6b701de11be357874673bc9186965909276eb8c871884",
"macipk.d8de5d1f269fea8f6017345bb0fc2b997ca4e6bfb08287c6cb7d0b94244603af",
"macipk.6f8f3652758178b052b4e0bf66b31f3ec998d087fcec50feaf605aab228203a2",
"macipk.8225bb8cee17ac3bff18ec6be7c9b5ae95e84a9c0cca4519ea69ca304acc0c04",
"macipk.2b06ce087fd5d02f1a569e2115079ff5b877707bc86bc9afa43f06aefa218b86",
"macipk.b154bab16718cb70cc1d8495f184b8f499251662643c3db62142ca9c8549b497",
"macipk.01d55219e4d1c4acbbef30ceae001021c5abbb4e1e1eea14932b2c614f3b7503",
"macipk.9ac1db25fd83467546835a19fa3212792ac52dee1ade2529bb3f2146c761da9a",
"macipk.4030a8130d64e59bfeb0eeb75c74495f6c82973f7db2217c2d2211a207adaf9f",
"macipk.7c62c18b8030e8c5cf0fbc80767cd4c7b3df7aa99b4219b9d4b1c892f5788c03",
"macipk.de42dc5dbf010316805d017fc797b35b53b65eab9858f0af86f09c3c9412bc92",
"macipk.36e7134f6b61ce26b08c8004f6082367ac80306a00b067c4534523a48613200f",
"macipk.2f6b636fef3064cb6a52d38c88262a3b47c2d4906c489a591043d9f03a60f103",
"macipk.ddf7a28e1138de5bb74db2837f281922b7ffc52e7e1d543ae68629c7be857eab",
"macipk.fd9b126c3a025216b76c716cb1e61767ea6d8ceb7b62d596f2a4a91aaccb12a9",
"macipk.4c61f1644a539dfaa9b5963a9b9f4cb491bbfad5b8c34d1eb99d92a471d7040f",
"macipk.1aa2bd88794f2bf0b3b81a661ad67e1bba4024a04c373743339d762f8cffa7a1",
"macipk.c0c33ba360e42c0d4db166e6a8184a8091166531a9ba1299756cc628f3d2b816",
"macipk.32096bdb9a4f3381f9f66688801b625191f6c583f0a8ae35adb958159a958f8f",
"macipk.31d91421174c1fabd7fb44750647f343f71b896e68361a415ed6baf9bf167100",
"macipk.5c2b568427cc1d5e5545e893b0de38d514bf8ab3ce7a91a29b515c6f0b850085",
"macipk.27674e1087b78327767ec45f403db40bb6aadfe5429666c661db36674fbf960a",
"macipk.404f2c371e57d7b95e7b9e7e910645977157c7a9304c8796cfaadf76d51e3829",
"macipk.086742fadae7ce752468a6aced2471806d9c158a081db7b414704da33e45e21f",
"macipk.fa6d547642f4e278583276ff92077ac54cef953814bad5ae9017d758091454a7",
"macipk.8d8ba1eb6099a5152358ae9e52766839cd485664600db5d47c6c236846c6a0af",
"macipk.1b6ba1e55b337359cb97c34a55af6ab47df073a98daccfb2a4f3a526d9b9120f",
"macipk.9e2935984b70a9485569de62c59c0b7ddfb0537155ad9fbce1e89b635036db0e",
"macipk.f99397885873b2ff5246ed4c3f634f8517c0c81381ef28bfe4ce2b7a25889208",
"macipk.e9f8ccb38ec31a9f047625b4ec0b7f8de3f3ce143be35017ceef63f794de3598",
"macipk.d619a70266f46b7b5740f3f2ba0c757dea1ac4040ad007633dad716870f09c1c",
"macipk.3c0697c2b8a7ac942bc059a9ceb26c904851c996f2f474f24b2a5e50fcc0250a",
"macipk.1fa00dd0fbe01932582087cadaa379cbec39a121cc575bbd0866a9e157956916",
"macipk.56b42df14c542011c309206ecbd08ce1c7b9cc2f00890a461c6220ccdf0e3a25",
"macipk.d35e1dbff009e8a2398d2484ada1b7390bc975522d66384a59aef3edb10bc597",
"macipk.45ca3106b58ef9628abc8b8827066bf458b8a8aee87b49ef2ac899708cbe0c05",
"macipk.38308b99df7c7d97af65f7f651f1f8dc3957bae2f77f9809efb70ab2b7711c95",
"macipk.ee850d69b633f615f1416be12fb0df36f2f39dd607e99635aeecc123d5b7f91a",
"macipk.62f708b5f3fe67a434c27cbc782660268139c2f3e0f1a738cd9dee8e541ead2f",
"macipk.b701446067e2b5969b0003aa2fe17259d1211cd884019079f1e0dd8d9cacdba8",
"macipk.894da54d3e5f8d83a04a9c74bba98ae3ce1c7b987e8875e8bc03784adbe8d02d",
"macipk.a41ce20630023d8c51305c9073112d313181e9d4c82ba666518132ce0c02a38c",
"macipk.3e9af3065ae2291f3125bef357ac3f573ab46b9b6578f0b5397f37db7a1abaa6",
"macipk.fcd4feb5e0c4871d35f1d9553d664dda5862842e2ea206262481292db8d4ef92",
"macipk.7a802939239a8b04d214e96fddb1cf56881c299071dd1b24204bb98e51c85692",
"macipk.6128500e7c9605deca1c72613e16389dd83fbedc4f5e429ecee2a196cced3908",
"macipk.09e8d342d7b1fb7b6bc7375c719db1f1ca780bfbf51106f7983e84e063957126",
"macipk.9afd4879122ef16d06d60bb779b56fd42062a1b9bc9e0d99eb823f8add09d71c",
"macipk.2d76d4afca4e7d02b42a22bd7f50a90125bac6f4f144bf306ba00044ac149689",
"macipk.72430c559005e734ae31a6f71768504a34b9aa3a980447ffc04d0f006882372b",
"macipk.69b7f76793e63105c8804189c0793fb791c13ac0c58065fb9ac28ec7908264a6",
"macipk.6497338f623323c8e06dda99ccadb30895cb3184c9a8a43abbff6706586f821a",
"macipk.abe22832cfef52abc0c0f0edd30f8cbb4d8ac32a04a82e31a227108fcb5d98a6",
"macipk.5d4314a04aaadc9a91e9a3d1d7bf84a3070809d200af5a8946622fd3c4dcf198",
"macipk.315088052c7fcdd67e3d3c94b41b750429dae4e820f88d91c18c0b71695bc38a",
"macipk.f15ad27702a73536918d8725c4fe9ff2d7f3d98b95cd15816643387b2158a69c",
"macipk.fe06fb8b701dd1e300835e7fb09159b3c808a62bf355f7aa8283492599beb088",
"macipk.3ea392aeeae7a529685f2c683f82297b6b5241db77e5a9dc008e202b13c45701",
"macipk.6e7acbeb51f17a00ce1fc590d1214009f53627b80be200b92caf0997fa77ae81",
"macipk.b153f076d7e22bc6c69f7ce0489aced64e747bd2cf269f9f457dc7992343a800",
"macipk.cb705c83c8dee0e8b685ad31b78e59ef23e0ec8bd5857fd61fe6c00e489299a2",
"macipk.e72af70a51f2261e674e760bf770107222b390ef31c64ded68af766d9ca77c18",
"macipk.e730e2a6d869ecc4502dd1b663312721bdf0360ae7dca86000fdc7c8feaa3b28",
"macipk.b037eedba09a9c75e425d80823d2e7e7db4b3d54ce7113a9c566885bdf33b78a",
"macipk.2b653eecadd7d4b2d66e16991ab5cd3d2541ae352765f08bc79bd99b6b69d587",
"macipk.061e1d3efd34061e2e84b3600a93dd9122908792eba0f96cea0c211f0baf1829",
"macipk.084dcbb12431dee8046f7026ffe35c9a7f728164b72689d40cb1bb05cc2b9c28",
"macipk.15b75529d8ee458316d5747b98b343a3518f583f066f86cb695c2d894002da06",
"macipk.5258059abae2aa6018e8bd4d0bd6fbec058442ebb804c598bdcd6411a9a9532e",
"macipk.001e84b4e99c8bc953e04c0ef46e2ca76804b8ad4dc3d700e456de4bac75fcaa",
"macipk.e056fbe906dc491acde79195fb13b763b1a9aadb2447e1581ae2b257550748ab",
"macipk.6d59480839ceb4dd6486411f72203bb6422f31f93fb14d309bbcabe69e1ac98f",
"macipk.d0ab5ea5eec093aab04170353d425505a8a8e82b8555f7a66d903d7c43b7f008",
"macipk.21ffcfe1d3244b1287f35cff543f45070ca0e5a752945b2606630a8f4913e02b",
"macipk.23a0ba8d6b25bb217d937f68bb822dd9522c071d54d8ccf5a5faea1c1bdd5e9c",
"macipk.f02112a651a48fc50d2c9ba639bfd23243ad398632ee14aad394bfdfe031ac17",
"macipk.6d1d06e8f8d8309fad7849ac35eda48609a07ab1616923dcc41996a216175e81",
"macipk.f2085fc49078748436c35d6c0553763f07b3a0afaedc8e45614ec421662f5823",
"macipk.f83d79ec339598631b13f27bbf78f90fc23cdae75ed91f46f47c0d53be9a9aa3",
"macipk.d9f8bc88903ebd2cb382fbeac986cad31fcaaa81bc9ffed164902131f7ff2b24",
"macipk.a10616e02776ffeaccbb3436d4cbcdcb574d211b89a20c9bc1227bc223027b29",
"macipk.fba3999231044d28f966f6e463798712065584c16819c7e8bab18432f55d6e89",
"macipk.0ddca311c2e7529d6018c044e8ee6e3d773b81b5f2d3421028d3172edfc8af1b",
"macipk.76f1f4d199c58ad8c1caeff97aae3054a63791183552ff6b961a703ffb379621",
"macipk.a3d706f0e97b9ae4195a7abed2b4994d8660bbb64a2d247829ce91c23df5a11c",
"macipk.f744f8348cd422f6af2e88b7f9332f6b7e394ecb3f96eddfac8bbcf27357f026",
"macipk.a5e37a336f26156c72fa8f754960e73ffb6e13beaa01dd56d5607ce222190aaa",
"macipk.6b37372196de45fce199992ea5fc8b250669a8000627c90dfedb161d45a74b88",
"macipk.25336b23f379cdb09117a0880c4dd9815593fec033735777ef54975eab624917",
"macipk.a9c3ee9bdecc8f26fd0283c3676e1efb55017d67bf8f9d3c01732635d4d52caf",
"macipk.1c4c42114cbcc0fb20a344553b65dfead14e905b059b24d127ca8d7ed9e6f322",
"macipk.e2a1931221b2ac65c763237ccc7631ab79a3b9da9f0162954006a0d9cfca4d19",
"macipk.1c1d81202a25c3972c0c71dff2320a55d1c9c239e9f46af984007af101d70a20",
"macipk.24924c35cdad4a79df188efa9a9269702a5b082712c84007b58c86e384f3868d",
"macipk.b6d92bb038e2afa7dace342f71fe3703988887d25070c186e0f639926253790a",
"macipk.43a5d092d6cb95f915db8e7da8df6b05a2c2cf8c2b0bfb88d9da9fbbe6ba3f25",
"macipk.879a55711236a07c316c3ea90fb1e876f58560e10790872d880b68e2b4c2ca2c",
"macipk.e9579f6b6b672da7432a43f19d7abe5082867957dd9ad8a0927cc6483f71cd8a",
"macipk.c54f775523b0f15895952374435d758a200bec73dfc6d3f8e6bd3f1c1ecdec18",
"macipk.6121fe04bea85e280125fac68930e8c87866dffc17f2d9e0e425a06862277f87",
"macipk.f26d164e00cd80818381b0ec50ea884bce6c7b7e8c1f134d9a681ba5c49c43ae",
"macipk.59fad08087ba9a95c40cba6799a9d91d430b0bca983699acb8ef49b154310ca9",
"macipk.9aaaf316b53709374eda84565ecf8101a4c4545f6eca391a748e7fe23270f396",
"macipk.70c6ff7404e1e9485fadb6739177ae8958c08c69f76014ab785932954a9ed9ae",
"macipk.50021428c1a58c2ad25bee7c575c45826a3ed669a67f8d46d2376c910ecf1516",
"macipk.ac49e246c8f4f7c13088f339421eb26d0d4b921877c18f77f2d26d89be81500e",
"macipk.e5fcd6d82a7782015a92a6b5a378b0a8072ccbd1723cfa9018dbe7fb3ff3b29b",
"macipk.f5e9f9265837c6da96fffafb4b8da5186624e673d5b401da14bd86e9ee235306",
"macipk.720b74d53794c8b5d91ec729a74edd8e92c08e103072899746ad32818e68bfa7",
"macipk.670102dac046a6a50cd2381537685f2963499ee118c713181edfe76a9b92a79b",
"macipk.c1e520ff1529f9b6fb5057e965df0c4d9ed61833951df7bebbe0e86fdc0c172e",
"macipk.d56be5bad19f3dc1c400076518c9ab2edb3c42dce1cc4ed6b3e1c1ff3cac3901",
"macipk.bd81d764d65a05c2eadf229960fcb204fd4f1fd17957507ff23c04b7c7dbd424",
"macipk.f97dbd2c986caca20c1360018d245f84d81894aa51d4edc713770e174647ed28",
"macipk.1f88ef42651a31f81ab1565705817c96c4d229cea91cb778facd79d942b6e494",
"macipk.32e4d92970baf11e6a93252599a3ba800cc6fd81e1eb9084dcfd8754b603f32f",
"macipk.6272a7772336f01f6e3fb0162b2bfd0fdd2165bf22e6a67e1bd5568e0d063017",
"macipk.d28e92987a6f4d59c52bb41559d412769177404747614b2f7e2d0af4c69f2505",
"macipk.fcd25c39874bced87ae2e1be4e67b4b7a71ded78a4bfb64962e1b277434b4c88",
"macipk.668ad0076f6840b07db1320799b58069bfdaa57ce1ce0db7868dbab904eb3b30",
"macipk.b8e6c587462efab00776f174d87f30e3d1249830fb2cacc1f123ed87c82dff25",
"macipk.7b6a1df11d082e966c82ebf16107bf5e1bcd90e114a248206a1fa8e2bcb0bb1a",
"macipk.2484e11c9b4b6f757d8b9e1549098ffb371228766f9f0a2a8fcaf896c710901f",
"macipk.fe7ee01cfd438b7d4473d31a1e93653f9b26d7c274bc7f64a69a2580996cf095",
"macipk.f5aa254da9d5d98ae02f79bef636627f6df6027d1b5263c1d0e44bef311d9522",
"macipk.dfdfff2e3c110cc48c844a8bb7bcfde36a9ed0b4526ba45ef389fbd52a945530",
"macipk.af97b213c4893c88eeef41a9e8bdf7ab8aa7b0915f412e071c32d1dd6e47b59e",
"macipk.a7ed904964a3baf15f22db167307df825c1494054c3bd4c4904f5546d559a09a",
"macipk.640fbc025fa6c7165791e67b97e9ff92a6fb9af36f1b1c05e91cb29ad3a0d404",
"macipk.3f12833359ca20bb1307511565084b5e074e0dba4cb39a5f316c17f67eec7085",
"macipk.7cb584c318297230c6c064d9d0ac90bb67c22d3eaf6ab242192e4e7c3f8def18",
"macipk.a7389df5a3fa6b68aea60fe04bf9d6461c1db114e60d81c564114c23ceb55e12",
"macipk.dca11cc7cba2163939cf1d94c697762b0bc5a1dcf2bdb970cb84015558db3825",
"macipk.ededddc243068f78ebf4db1b1387eb39d61078dff0d9cd920429f085fe463111",
"macipk.bd5cd4b844b66b1526040a88626cab68633d7c2010db0c29a3d24d1632976003",
"macipk.d6fa1daedfaacff99a5f8e6b8af55321262782404c3c97e6eded4daa171641af",
"macipk.8a05c5cf7adfc02f5e3664da1e8773a56066751ad81e5d1c975ade4a8d582605",
"macipk.4eca62831b16793f99eb43e77ac15243c6f99d142b9d7d41b38960d37f587e09",
"macipk.5600d221d256d0159dbc357be17dffc085bd9c1d3e9b0854a9cf6946e2232c17",
"macipk.696e49c6b73b757c11551ab8af162e5fd3ce95ce4821ddd521047d1f3ea51b01",
"macipk.35e944decafceb3c3bab805727359a9937bb859d028a12876d509122a3d71301",
"macipk.e95723fc73aa9c14e102450fe7a87735853c8a9c2f4e74b7e7fb6863c68cbe26",
"macipk.bbcf2a14b27b1a8cedfa0cc01f19cca27f636bbb72de89482a77f547eb0d698a",
"macipk.9dc31ed99438fa0410609311cd00ba524ebec7ddbed99de98a2cce9afc3bbc97",
"macipk.e8d4de46e85aa61f94a65126d69e8ec9d0176cb33c17a7993565df5b1d542789",
"macipk.a1da2d77556c249f1567e36baab599a861fae02b4a3db3ea39bc1e7a412de106",
"macipk.0f352b624cf758aed30090fbc729fe31f61d2aeaaa35975b5ba7d4c68b749284",
"macipk.99df6a954a5b440ef156a18a067fcaf823d7f54156611f0a8a7783ceb88864ab",
"macipk.2f75bf1f56fb8c3b0de046924cb188d74d35f637a9d41f74c7ad736b09977d11",
"macipk.be1018e20fd75d01fd067f3846a34ff23cb25daf09bdf38d9d22dfdc795bee98",
"macipk.f0a9f783af7c75408208c71dedb899e20d9cb3fec6640b695811b4cafb4a5b0b",
"macipk.a2bfd518b0aa55bcfc5a99cd2cb61bc7bcb57bd546984ae8703435451b98bd26",
"macipk.6d197d25edf3dbcbeb79b730a39f921c91c218d723f0c08fce81a9f001916793",
"macipk.af334833851ea694fd4f351f638d69521d66383a4da4e5f7e0cf85650054339c",
"macipk.d7ec2f38cb8925572785506361396a4bb6b322aee653581331736e505e9da0a3",
"macipk.2e9a51f10f6f18ec6f53c3e5838f30359ab6bb776ebdab942775755294522a13",
"macipk.f2a33019e4d7ea7653492193ee0d66536c1475f44b69faf3140e0eaa97138011",
"macipk.b439ebef7e529dd672b9e7776280138dae548dc5f74c424b343537913ed76c90",
"macipk.c95f2c69cd8ea872ee255a32ac2931d879991440660db56244a89f13ee329994",
"macipk.28c8ccd326421ed989555ff988a4304dbe2dda33a9acdd89f81df9ce0ea97680",
"macipk.375bcbe788b8fbc59554be25e42631f71a0d5002a369a3aaf30b3ba9fd2b5386",
"macipk.4c83530e0aa4d74641f1859a85f38bda0381f52506dead6c9c56df3e779bd4a7",
"macipk.fde1eccf63595fc7e5f2f712cf1c9889119ab08eb1970f65a8eb5013301b4723",
"macipk.08ab4a92435f41f10ba128e95dd550cbfd1b9e18c24ed6b58f5a95617d1a4e24",
"macipk.200bf576484ee60a02824c1ab9588076abd27e964aadeadf3340adac18f7579a",
"macipk.d754c92be0adac9cc5c9fc2e2c81adba119ed2caf7a94071eea72d5a8b01fa17",
"macipk.a1fa7a1b07ad5592276088c9c3f31d072ae9cd1d4cea7ad12a41b657c1ba289f",
"macipk.6b8a4532e3c2bbb981bdaca9daaf82224c7e5097392b97222515eff410a40597",
"macipk.b3946069ee73965e2e001167356e193249226713124b8589b08788e1a8a2dd17",
"macipk.75f70150ee5bdd6b4ba3487335c0a550c24fa0867230b6df60d65b78a2ee54a6",
"macipk.2c129ed776deda79ada4f8f4e4d5aca027cfb9560ecd24a9f5e497eaa3e91715",
"macipk.28e7db75a73162fd5c2e91354ea934ff06fb6e152b75e4a489bc29bd1979f1a2",
"macipk.790dd39549c2407f22c6e5f5ae66b16a42b8abefb091337c0b60c725e5fc7220",
"macipk.4825d8645a50361e9797f318da2e3720ec050bb2c06103ea53af58dacbb81105",
"macipk.417c25fdf4410b196560f938660af6039decb8c8234d5bb78815dab06a7802ab",
"macipk.17f2d9806a9f8090247d2bb2de065ac6a13b6a57bf5ee4e5ac796069cce8678d",
"macipk.8f1da586be2372d3609811069e54501f7f8cda329de189a8dd12d84d253b2b0a",
"macipk.3ab8e91fea955d7e5599e36b21d70df5502975ca811f29133286822321616d0b",
"macipk.507ef622cda20f302d6fc040dbb714e94f765a6fa8c9180a40aed2bde547810c",
"macipk.085a9699f2396f06e2e56c4c6352d210966052b40d4daea70a37b5edee20dc11",
"macipk.45b7a21a925a35b47e62ed4cec19cd6c5d7435d09dfa73e10ba271da80f5fb2a",
"macipk.713b231a7ac6f5b2fc43b3aa38a6ce97b4ae8d80394bd24f41521f225cb16f07",
"macipk.aeee27f7713506fe0c87946bf6683814b84ca4bad351b1b8fbc7a7443c74eb82",
"macipk.0f00e6e3f4297587a680165f21e8f1cd9d637273881d06d184d6a97261387c25",
"macipk.3847143af94528f7ae179320df473ad1be1353c38b1d2582fd5865fae84d382d",
"macipk.3b8d8a9c04b0935f6b0d1f588e0ed571c306ce4d219fe7afe74accf683e0e7a8",
"macipk.b7083504643c3f1b77e9371f69c57bf999342c6c78bee3cb00b84048fd6e082a",
"macipk.356dc484a9c38227f862c75e6a8079644a6f712079cd5a5e93b7c232d32b8a8d",
"macipk.f009a863f7bf6cf8e5efcb111d8fd8d0cd47b7786565890b36ed40fede366589",
"macipk.5dcf3d9d01592a7a47d76a3bd47f4cc503a2e822051be2349bcfd5135ad39c2c",
"macipk.cea96bfc66cb0552f26215076507106a428859cd10ccda80b7d09b45a4529c9d",
"macipk.204cc3788a9b0b421863f20ee2b5116ae2254f00b89e7bfdb93ed4c101a0c21d",
"macipk.a6e7f7e8e6fbf263f65665eb4f9b83faec3e03f71d5cd7b870430ff4f2e5a291",
"macipk.6853a35c3faf0d1929ac50b5d65b2e26c3b62ae31444d1c0513173c6ce619f14",
"macipk.a2b9c28eaf6436de41f6a86c22b5d681b8621527051fcd70a2f5c1cc0a825308",
"macipk.d90a949bb31242e398fade10f9cf5ef2afcf0aabbd736a3d9e9a78d1766f12a9",
"macipk.ec2ff59ddab9a25bfa5b5dc7ac4f26c86feacf022ee849308cbf3e19c3f22119",
"macipk.c95a1e6cf5d4223e1d46e2d62c76ddef35caa2265ce969737944750b516f1606",
"macipk.3082ebb30a94d0dab112238b8e87e8c58c72e8c0fb1fda2f1e22f2f84aefe4a6",
"macipk.4cec2739508ff30f8abe0ebd2abf576988b69a0bec1bd37fb053d60a08d6cf09",
"macipk.ff589d18b79f892dc9ece038ae6124e8c9b882e83b7e6dd19402efa55aaa0393",
"macipk.2def76b485b88d8db4308d080509c39c2e0f5a4aeb42f5ecb3c9231b16a8530b",
"macipk.d0f3daf24fb535792bcc01f7d46b72402c2c2aff4f4c85ff6938d8e6db9613a2",
"macipk.bb03097ea86c9a7299c29b6304cd1c71864110797222070b46feb542330cec8e",
"macipk.32bb3e3cd5fcd4a2ec93bbf0e28f7db1460abe0b76a3e4103466323b3bec3a1c",
"macipk.2bc4057b3772605f8919197ed24675dd1f16643ea4c7f3524ec5a5e6bf720a19",
"macipk.3c7cf1a59292fea874d0dd8d8cdac9ec58ffd08b303869229f65c6a15c16379d",
"macipk.75c4c5b72fde7c7d3303a5c39ff757ab6513e9287c8bfa87b3d790acb2febbaa",
"macipk.82044866b5af4938a1021f59e8b0503abea3be663e41d14244f7891cd7ff0313",
"macipk.069dc21a23438bfd30218b8fdc283d5b7be47ec6b97ab3c66dbeb03fd58d4f1d",
"macipk.d5e8c6cf2c8770c99222ef9dfc7d31fa02403f16f7fd917e33e940ff779a9120",
"macipk.481537a3c82015722b6d947850f5e79e032f142e7f49de762bdcb841d0acae95",
"macipk.c33bfc17dacb5226b813bc5631db95f9f6f8f44774e78f688b7d2f13feda7e85",
"macipk.7150e1ba1ce5275bdcdb9de25b78096472a61196975b398941b500cba9ef3224",
"macipk.892f389eebc31b8a288a3cb35d23f03dc26edb62d39598a7f51b5b4418e49389",
"macipk.4b07319fd35784c641ec792818a73fbdb817db6e1e56ecaa6880c4a118e1b212",
"macipk.8a0c5ec10fef77f5170243dd59c956ac7422fd722db6a97d4b0ce4115f322d0b",
"macipk.889e0c133b3c62306259bac3455eb2562c8710de9a5b0e9f2bd3cbfa66b756a0",
"macipk.8e5075646956564dde1c8d50522f7469cd0f91ee1bd56cae5af81ffad790a793",
"macipk.35453b17684441606b54dede304c430971818b488e395fe60225e4b5a0869f81",
"macipk.e9855894343b6d5eb48718fb7fdef811ac0ee3019e410f348972ddf40ea1fe8e",
"macipk.9286e25d67a0e6ca25238f264d597c8e7bae688acd97f009f3838ab4acd7410a",
"macipk.5a1bf8d2bcdb043043447da05eef29f72c3c3920f47f95ae215e8587e2bf9c10",
"macipk.ca6431ee5c1b47f71f7046a266a39ea05c5c79076e5f266f6f699d26bbd99a24",
"macipk.53784770bca9920d3f786c633e2dfd0a87ef63e1e387117c60939e522e228da2",
"macipk.9c5d6dfb6b13d2d1fb64636b9034a0f8cbbe6d018949c4c92b21fe5974884fb0",
"macipk.7f40bdac3e41dfa49e9e3e72d072cdac0be4aba7883b82fc47a4010c3a2db906",
"macipk.95c81aa75406e85124ce239729e35f021ba6e214584a201efa13243cc26d66ac",
"macipk.b479216866553a6ff3131c29135b23e86eebe3b1ab2e042f6b0e8091c88cec04",
"macipk.44079a43f177dfa5315b1289c2ae5e0824a58840bfbdd8fac2630c94483b4480",
"macipk.f3f06c40363a117cb45af65279a6e14df2b9e5022179dab402bc87ac61399f9b",
"macipk.2226578554a88871e176e94a23fbbdbd72f298e5089d27bfb96b0dfaf61c7da8",
"macipk.5aec3f959d809eaac1c9f0097d703a5acdd476687c46e4ccec2de283df877887",
"macipk.2feede64685164c070a8fa26b79b1eb34267fe2e24edb2e5bab66efbcae090aa",
"macipk.52ee371f3f8e03e5ddd545c6519b05eb59a7936ad724ec1ea19b0c6b4e782f0e",
"macipk.705ea9c07510ada60140a7afef82b6e6f6f57ec0f5b576e091e27a928764b025",
"macipk.65e6f3e48e55437859a9842b229a431ec3a064c35c981849e8f45cc7bad65015",
"macipk.42d06bdd4c2c4051f5219247b7c305197d774ba882748199117de4fe91549027",
"macipk.ec641fe36610156fc691c309bb5dee6811bf846ed3f3f68a88d95a8f0837afa2",
"macipk.00c0628117cedcabc64db0adb8f3ffc0fd2c564b517609b12719685faa8b338e",
"macipk.833fcdc8a33dad830eda4ccb9d0b4d923375fa724f42b90a4c69e1338ce66f06",
"macipk.0b42e9fc9c56af824867cfa82e53b4c8121db2932904ca96ee410f7220085308",
"macipk.b2b746206d98914d86a1f03d4bd23154cca9a7d5e203e5d18634e4054757aa85",
"macipk.d38e3a99689ba290799a2271b1287447b0734fab8a388ac810d988c8dab0e826",
"macipk.ac6a226bae8d584360b40e7b215ba1857fa89ab875d8dec2b85b6b421efe0608",
"macipk.bb0d0224c40798a66ffba389042b4e7b132192357a3935b78355ecd8114ee621",
"macipk.c7494a2c4955b8c6cabb390dcbac6bd887b105139dfc973ddcfe510956c5772e",
"macipk.a3619342967acb29d690283807e98a478331522804a89b6f47eb71bb48b06583",
"macipk.ed64d22c3b6d55153a786783db379aad02b9ac05b2c1e1f883e9a5b1f008b0a4",
"macipk.c311ffa4e416ca11e2f22b13bd94af42fca2afc93a0df42df1c9bffd92e7f283",
"macipk.da78a8565d671079b6302104b202f6f8de83ede35421d7399a3a91018fd4b68b",
"macipk.8c4904c6376cbf34e31ad490c1a66e410b60cc93251f3a901507864bb01a9ba5",
"macipk.dcd2d76ad46d30bba9c9c9818b31c1787682ce02f181404efa95871bb63c1999",
"macipk.f4e6506f60bb3fabae2eaac4718e65804df48ee7990a14976631724a9bb29391",
"macipk.07248b4befeda94c9190c1fc19f0c009b7c25faced8a53fa86175c324ac40d1d",
"macipk.8e5bc1e37f163947d362c59f77662f47a75795609499626c9f834615d064e222",
"macipk.8e4fc943c611ba54419694ebff820ef266dcbc8aa30b11113931281adc2ca409",
"macipk.d1077d969bd129533382b41fafd352bac103911654fd42e3b378aaa77a319026",
"macipk.191e84e4c0139bd45e957fc0f2753f5ca385d61b26efb0df9b000990882ed60a",
"macipk.07b117f4ee9a0366011dcf2a8f56fed77b8e1c66d484ad6034d7fb7dd134941d",
"macipk.17c3b444971cf7ef239535f64395e092c8a19973088a9f7697b927b90dd0181e",
"macipk.0eb72fab93617cc2fd7a6aa466c8a127ffdd266494909ce272556d21bd98a784",
"macipk.e39bd3a3b49fb6e321e725bee1186ab99bea08e84e321693bb1902f1bce53202",
"macipk.c4ac198511e3eefdef2c45dbef9abcc0dd27f57a30eede2743ae7eeec6f26705",
"macipk.3c946a9ae97dcc61b78e07d78e01afaff0d2089c1f81d3094dae7967f10d9e19",
"macipk.1c4b3dfe8ae46bb56d8e955d69cd3d270309b6d4ad9d570800bde39cae4f7b22",
"macipk.0cb24f7eb661f36c07dfd3ff00e1525842b18802687bcad35922d5ad648e521b",
"macipk.7e9b265b941dd1b8d3b2cc3761962f3bb2866ed20c9c70328107471056ea7b83",
"macipk.826af3fb997ed15a7473714af0b291c8e38f0d1b4438ade552add271d5603ea6",
"macipk.0beb286c845bb69888ad29a05c23a4037c70214aabaf2165a011109fe421360e",
"macipk.9d255f940c74819c9ee2bd6fea9ece4f6729a05f3e49cb0f4a1cfdf41af77599",
"macipk.d847800a6a68355cd098ec0160f98bb76653b74a321c6c4f2b94104e955e012b",
"macipk.3ecdc57d84f955aeb9d26b54cdb912ba2a3cdc0669a9042b2a86a369fd05f601",
"macipk.5187d3f50d1c0e17198eb0b4d1f24c65fdf5afb6f04ad8fcfa1727451395baac",
"macipk.27a2825d604db685aa5facc2ba6a610ef7d3181ef39ea086ae9563d8c8c6e186",
"macipk.66d55dbbfbf4e20ca19c0f22c5564071d4e29e3d501c6c711cfa6f7a85933323",
"macipk.088698c149cba20355d683e01d62d58fbae4cbd9819fc0b9dfecddec0b48de9d",
"macipk.63b9b377f899d3f84b145089695a4f951de520d89a6d430f83ae8cc6796b3129",
"macipk.0ab731aa76f4593b550e7eaaef5cbe1dd58140b9cd4c4cb87d279f67cb1bb51a",
"macipk.39c52bec4f5fcd0eaf2b9b4019166f5f36c8e352ec5ba5977c5c67318c3d752d",
"macipk.ab96adb54a3d9b4f6d96b5249108b1bf146ab3754449913c379255a873207290",
"macipk.c82027b690746f5c9505689e262bcc4fd809df4dfa492c544652a964a4191519",
"macipk.d89233c28f751e2048147c65b65681fc079bdbc9c9517f4417478c94ca3e8209",
"macipk.28650cd1eaf653c360d88c66ac1eb5cbb52da7f4885bf38bf3a323f5862a8cae",
"macipk.1d14ee9bf6b40795f5ad4e0bde55ba1072ebd2fa90b1b4f2d0358fe16663ed16",
"macipk.7ee8c6b9271c7c80a5f7c04277e0584add5e1a843c7ffe2ce4c1e6e9ac417e0b",
"macipk.a5ec524f4dc5487eb27788e8264af905737a1d6af8502fe5a88cda5eb049ca94",
"macipk.bb7feb9a200cdcf2f6472aad39ed9c9b0ebb504ccb241bb049f7008bc426e78f",
"macipk.453658f2d1fb99023a64738e8095fb5e614550d81ae26b56015b075d94770782",
"macipk.3d035665c1192aefea4efa9918c3ce327db1782e4c1602910827ae62d7c9578f",
"macipk.ef2307483d6c55bb3b5a9ac92cb367f2d6d4b3260cda96450f75524be57b8f8e",
"macipk.419bfb181a5442cbef2c4a951f55192c255ca04c34796b8c95458083147d1f19",
"macipk.b66678a724583ba76e90ee9c54d20b670ee972cef7c3aeb72b913cab73c36086",
"macipk.33d58a98c17b92c7a987848dde98537c5637ebd0071980b9f172e786529cb493",
"macipk.0a8b7af55d85d4b450c73edb83ee9064593e896b87ea7d073473ad1b1664c60c",
"macipk.7305fae3482e774b6ff6d139d77dbf02da3d33d09dc17802541b2a2916fb6517",
"macipk.1393bead880622584fa7995d85f76e5aca49c2943ecdfc88f99b8ba9feac698f",
"macipk.469cfb45f91ce2aa669fb8d0f40a5f83b8555fd89cc26f09a2e4b8f32a1c9c22",
"macipk.1323c28c12e743bbddf580327167d114eaf3ab2503f34e284780945ccbd27816",
"macipk.7e1fdfbe45e3a5b49b7172952739ad18c475b5e9473b9bfaced3bb58ad761699",
"macipk.d9036e6409e004abad49ecdbd09a86fedd17319923718db7062c13dd034ea925",
"macipk.d88ee3af283eeb349dde5109e2888357019671758b4cb81f717bb19404c15101",
"macipk.e1186612e1664b7d143b30c147837b11b1ee3a986dd761a29fbea143a350fb84",
"macipk.2c5b1e4c3b4bf8fac30a4fc15f37b8d79a3ac7c186ac828ee1e642b52a3b4082",
"macipk.2460a73423f68ba86518a84a33e30486f191d96c5bb6209d16cc2fd53cfe0980",
"macipk.d3cedee4517799bed5109c3c2a3af3688b2f2d2306f9b484fdb7d654ffe47981",
"macipk.69f5a949df2c49379dcddba53e094a45a7233a0f112a798d704707cf85e898a5",
"macipk.d4e0576c86cc1e5199ece4aa85748a18fa7d4288c0ea93483ced8bcea4335e24",
"macipk.a4a2fafacabed8a414c5d44eee9ab25255eaf7678b39b5250ce90ee28a10309a",
"macipk.0d6b3f0c21481175e5c43771aaa45eaa341fd880a128926ffcbb4dc32a14940c",
"macipk.11b69dc0cad1684a8207b2d30722c2a81a874826b47b9e495bbc0a056be06f07",
"macipk.cf8846d820067eb56c88f62f50149b024ee66aee9901468d26df85f3834d7d0f",
"macipk.b013562b20b5c75f4c8a9b98c3eaf85e9ed4c5b32e3a753bac37521d6ec1a21e",
"macipk.5b1b3cbdd17d12e71f29d36fa23efe5fb642fbd4164d8c5c25b64e744300402d",
"macipk.ab1e6ba782422da8baec95cf118b30ee3b6281d4a7269fb221c4cc6fa5b6f891",
"macipk.44d4353fb013b8f4d80f69cebe12c47bc37059b3ea1782d549a0172e15688b1c",
"macipk.e87619585440cf5489c9fb54f7818020787137f37ad564f9e75291fc3ad39e11",
"macipk.22485aa64df51ff3aa9551c63486f4c7026ccb1b429ab2319af1b68b3a7b6511",
"macipk.d1e93a23c35a44e9fba43c51a39c0a9537d8ba7b93e0fc7c462015499233f290",
"macipk.31f974a48946ff3dfe730b267072e897883c7129981e9d8b7301b58ba78f3ca0",
"macipk.820225984525602fd97609f67ae943bed7ebd9580ea16ff8ac45820b81da6fab",
"macipk.975ac9ce9a4db5320ac72ab482d1fbe655209af030a990045cd98802d81d88a5",
"macipk.8cabb726bfd2b283a0ba794de170879ffa865b32c56141d3aaae2e4beb54d20f",
"macipk.4fd430bf80a6828303d1be28261161193b19bdde275ea7d2d6bfa0d02d9fc79e",
"macipk.ec6320f24a0bfabd10685d9d88c900b1fe118e199e7d66ed722167f5158bd423",
"macipk.24a342accf019fb131857b8150fccfb9ab3106e398efa2b3103fe5959002a680",
"macipk.474d9cee126316f6958b30f8bb53abb689715ef493717893ef1efba25eba5605",
"macipk.72d17d2b77d4674c745a562f47b9aa84eec12519de1e55dc581e1cb57a3f572e",
"macipk.dfa781661e88926b71b9dca738e08010b9c2a727c11de7e4d9cd345820b37092",
"macipk.09d1b40f7c7a2e7890b05262ef5880ec9e775220ddbfd7c349055f43ab247829",
"macipk.e942c0025f0c1103cfff4643e82b4b02faf6d217d484e645deba497ac9b2cdaa",
"macipk.f0d5395174d1c9d9762dc822eee5c09dace8c7e393347a85694aac331a3f4d00",
"macipk.eea480c9e3350cd0ee92f2a3d4e575a5493fdfda464c758d37b6c3999948712c",
"macipk.734277a71f60a4325408185728b33471512cdae07f771a75b14c038b50a4cfa5",
"macipk.2f622c4e8af6918ef0373a8b55ec2ad35b44561a99609387f055fd7a44e6f805",
"macipk.74db62ed3ddf88a25beca2aabb592d52101511b5498927fd8445fed144739806",
"macipk.5e4f4a02049c09b1f67e619af73dd53d81e8aaf58e00c3da11fd58fe7c3042a2",
"macipk.844a7b68d2ceab9d5cbd2128c594995bcf697209b7ffd8e37ae2747eccd3eaa7",
"macipk.e2df5f1c4312cd679cfa2a52f514cfd9794dbbb825c363ef13c64465b0cc1201",
"macipk.94ae8c2e51b696830ea438e2ff65aee0c3b2083fdab8ec3965cc2316cf470d11",
"macipk.69af736f28cb63fe15767f343b51f26cf87f11cf4637d61829af88d32cdbd18f",
"macipk.9e9f761ad8111268d8bfc95f7fe9fc65937d3be1abefac5fc9fa365634d9f212",
"macipk.ba601806632a0d2daee3b19fe7c9603e1ab4ea1f303b54e5c097d57b009ba68d",
"macipk.e56e399ad97b89a3b3a91238ce5fa0b694db973f324749c46fc31ab8e0757d2d",
"macipk.878457eff72ae26bfe0cd658ddc3dcfc592786c0f8b87cf0d501e7c15048568e"
]
