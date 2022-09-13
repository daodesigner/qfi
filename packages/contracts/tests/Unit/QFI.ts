import { ethers } from "hardhat";
import chai from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import { Signer, constants, ContractTransaction } from "ethers";
import { deployMockContract, MockContract } from "@ethereum-waffle/mock-contract";
import {
  PoseidonT3__factory,
  PoseidonT4__factory,
  PoseidonT5__factory,
  PoseidonT6__factory,
  QFI,
  QFI__factory,
  GrantRoundFactory__factory,
  BaseERC20Token__factory,
  PollFactory__factory,
  SignUpGatekeeper__factory,
  ConstantInitialVoiceCreditProxy__factory,
  VkRegistry__factory,
  MessageAqFactory__factory,
  PollProcessorAndTallyer__factory,
  GrantRound__factory,
  BaseERC20Token,
} from "../../typechain";
import { Keypair } from "qaci-domainobjs";

chai.use(solidity);
const { expect } = chai;

// Unit tests for Quadratic Funding Infrastructure (QFI) smart contract.
describe("QFI", () => {
  // Signers.
  let deployer: Signer;
  let deployerAddress: string;
  let contributor: Signer;
  let contributorAddress: string;
  let coordinator: Signer;
  let coordinatorAddress: string;
  let fundingSource: Signer;
  let fundingSourceAddress: string;
  const coordinatorMaciPublicKey = new Keypair().pubKey.asContractParam();

  // QFI instance.
  let qfi: QFI;
  let qfiDeployedtoken: QFI;

  let baseERC20Token: BaseERC20Token;

  // Mock contracts.
  let mockBaseERC20Token: MockContract;
  let mockGrantRoundFactory: MockContract;
  let mockPollFactory: MockContract;
  let mockFreeForAllGateKeeper: MockContract;
  let mockConstantInitialVoiceCreditProxy: MockContract;
  let mockVkRegistry: MockContract;
  let mockMessageAqFactoryPolls: MockContract;
  let mockMessageAqFactoryGrantRounds: MockContract;
  let mockPPT: MockContract;
  let mockGrantRound: MockContract;

  // Pre-computed data.
  const decimals = 5;
  const voiceCreditFactor = (BigInt(10 ** 4) * BigInt(10 ** decimals)) / BigInt(10 ** 9);
  const defaultMaxContributionAmount = BigInt(10 ** 9) * voiceCreditFactor; // MAX_VOICE_CREDITS * voiceCreditFactor.

  // Input parameters for QFI methods.
  // Contribution.
  const maciKey = new Keypair();
  const contributorMaciPubKey = maciKey.pubKey.asContractParam();
  const expectedInitialVoiceCredits = 100;
  const contributionAmount = 100;
  const expectedVoiceCredits = BigInt(contributionAmount) / voiceCreditFactor;
  const expectedStateIndex = 1;
  const expectedTotalAmountofVoiceCredits = expectedInitialVoiceCredits + contributionAmount;
  let signUpGatekeeperData: string;
  let initialVoiceCreditProxyData: string;
  // Deploy Grant Round.
  const duration = 30;
  const maxValues = {
    maxMessages: 25,
    maxVoteOptions: 25,
  };
  const treeDepths = {
    intStateTreeDepth: 2,
    messageTreeDepth: 2,
    messageTreeSubDepth: 2,
    voteOptionTreeDepth: 2,
  };
  const defaultMessageTreeArity = 5;
  const defaultStateTreeArity = 5;
  const batchSizes = {
    messageBatchSize: defaultMessageTreeArity ** treeDepths.messageTreeSubDepth,
    tallyBatchSize: defaultStateTreeArity ** treeDepths.intStateTreeDepth,
  };
  // Finalize.
  const tallyResults = {
    alphaDenominator:BigInt(1),
    finalSbCommitment: BigInt(999999999999),
    finalTallyCommitment: BigInt(999999999999),
  };

  beforeEach(async () => {
    // Get signers.
    [deployer, contributor, coordinator, fundingSource] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    contributorAddress = await contributor.getAddress();
    coordinatorAddress = await coordinator.getAddress();
    fundingSourceAddress = await fundingSource.getAddress();

    // Mocked contracts.
    mockBaseERC20Token = await deployMockContract(deployer, BaseERC20Token__factory.abi);
    mockGrantRoundFactory = await deployMockContract(deployer, GrantRoundFactory__factory.abi);
    mockPollFactory = await deployMockContract(deployer, PollFactory__factory.abi);
    mockFreeForAllGateKeeper = await deployMockContract(deployer, SignUpGatekeeper__factory.abi);
    mockConstantInitialVoiceCreditProxy = await deployMockContract(
      deployer,
      ConstantInitialVoiceCreditProxy__factory.abi
    );

    // Poseidon libraries.
    const poseidonT3 = await deployContract(deployer, PoseidonT3__factory, []);
    const poseidonT4 = await deployContract(deployer, PoseidonT4__factory, []);
    const poseidonT5 = await deployContract(deployer, PoseidonT5__factory, []);
    const poseidonT6 = await deployContract(deployer, PoseidonT6__factory, []);

    // nb. workaround due it's not possible to use Waffle library for linking libraries.
    // ISSUE -> https://github.com/EthWorks/Waffle/issues/429.
    const QFIFactory = new QFI__factory(
      {
        ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT5"]: poseidonT5.address,
        ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT3"]: poseidonT3.address,
        ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT6"]: poseidonT6.address,
        ["qaci-contracts/contracts/crypto/Hasher.sol:PoseidonT4"]: poseidonT4.address,
      },
      deployer
    );

    // nb. workaround due to Waffle not allowing to mock the same function with two different 
    // return values https://github.com/TrueFiEng/Waffle/issues/714
    const baseERC20TokenFactory = new BaseERC20Token__factory(deployer);
    baseERC20Token = await baseERC20TokenFactory.deploy(
      50000000 * 10 ** 5
    );

    // Mock decimals value (used when deploying QFI).
    // nb. for testing purposes, w/ 5 decimals we have a voiceCreditFactor of 1.
    await mockBaseERC20Token.mock.decimals.withArgs().returns(decimals);

    // Deploy QFI.
    qfi = await QFIFactory.deploy(
      mockBaseERC20Token.address,
      mockGrantRoundFactory.address,
      mockPollFactory.address,
      mockFreeForAllGateKeeper.address,
      mockConstantInitialVoiceCreditProxy.address
    );

    // Deploy a second QFI.
    qfiDeployedtoken = await QFIFactory.deploy(
      baseERC20Token.address,
      mockGrantRoundFactory.address,
      mockPollFactory.address,
      mockFreeForAllGateKeeper.address,
      mockConstantInitialVoiceCreditProxy.address
    )

    // Prepare input parameters.
    signUpGatekeeperData = ethers.utils.defaultAbiCoder.encode(["address", "uint256"], [contributorAddress, 100]);
    initialVoiceCreditProxyData = ethers.utils.defaultAbiCoder.encode(
      ["address", "uint256"],
      [contributorAddress, 100]
    );
  });

  it("verify - initializes properly", async () => {
    // Wait for the deploy tx.
    const qfiDeployTransaction: ContractTransaction = qfi.deployTransaction;
    const txReceipt = await qfiDeployTransaction.wait();

    expect(txReceipt.status).to.not.equal(0);
    expect(txReceipt.contractAddress).to.equal(qfi.address);

    // Verify new event correct emit.
    // nb. This is a workaround because there's no possibility to deploy QFI smart contract instance,
    // store it locally and then use chai matcher (.to.emit()) when using QFIFactory.deploy().
    expect(txReceipt.logs.length).to.be.equal(3);
    expect(txReceipt.events.length).to.be.equal(3);
    for (const event of txReceipt.events) {
      if (event.event === "QfiDeployed") {
        expect(event.args._grantRoundFactory).to.be.equal(mockGrantRoundFactory.address);
        expect(event.args._nativeToken).to.be.equal(mockBaseERC20Token.address);
        expect(event.args._voiceCreditFactor).to.be.equal(voiceCreditFactor);
      }
    }
  });

  it("verify - configured properly", async () => {
    // Check state (inherited from MACI.sol too).
    expect(await qfi.currentStage()).to.be.equal(0);
    expect(await qfi.voiceCreditFactor()).to.be.equal((BigInt(10 ** 4) * BigInt(10 ** decimals)) / BigInt(10 ** 9));
    expect(await qfi.messageAqFactoryGrants()).to.be.equal(constants.AddressZero);
    expect(await qfi.currentGrantRound()).to.be.equal(constants.AddressZero);
    expect(await qfi.pollProcessorAndTallyer()).to.be.equal(constants.AddressZero);
    expect(await qfi.nextGrantRoundId()).to.be.equal(0);
    expect(await qfi.grantRoundToContributorsCount(Number(await qfi.nextGrantRoundId()))).to.be.equal(0);
    expect(await qfi.numSignUps()).to.be.equal(0);
    expect(await qfi.vkRegistry()).to.be.equal(constants.AddressZero);
    expect(await qfi.messageAqFactory()).to.be.equal(constants.AddressZero);
    expect(await qfi.stateAq()).to.be.not.equal(constants.AddressZero);
    expect(await qfi.signUpTimestamp()).to.be.not.equal(0);

    // Input constructor parameters contracts.
    expect(await qfi.grantRoundFactory()).to.be.equal(mockGrantRoundFactory.address);
    expect(await qfi.nativeToken()).to.be.equal(mockBaseERC20Token.address);
    expect(await qfi.pollFactory()).to.be.equal(mockPollFactory.address);
    expect(await qfi.signUpGatekeeper()).to.be.equal(mockFreeForAllGateKeeper.address);
    expect(await qfi.initialVoiceCreditProxy()).to.be.equal(mockConstantInitialVoiceCreditProxy.address);
  });

  describe("initialize()", () => {
    before(async () => {
      // Mocked contracts.
      mockVkRegistry = await deployMockContract(deployer, VkRegistry__factory.abi);

      mockMessageAqFactoryPolls = await deployMockContract(deployer, MessageAqFactory__factory.abi);

      mockMessageAqFactoryGrantRounds = await deployMockContract(deployer, MessageAqFactory__factory.abi);
    });

    it("allows owner to initialize QFI", async () => {
      // Mocks.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"

      // Should initialize QFI correctly.
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);
    });

    it("revert - allows only owner to initialize QFI", async () => {
      await expect(
        qfi
          .connect(contributor)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("Ownable: caller is not the owner");
    });

    it("revert - PollFactory owner incorrectly set", async () => {
      // Mock.
      await mockPollFactory.mock.owner.withArgs().returns(constants.AddressZero);

      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("MACI: PollFactory owner incorrectly set");
    });

    it("revert - MessageAqFactoryPolls owner incorrectly set", async () => {
      // Mock.
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(constants.AddressZero);

      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("MACI: MessageAqFactory owner incorrectly set");
    });

    it("revert - VkRegistry owner incorrectly set", async () => {
      // Mock.
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockVkRegistry.mock.owner.withArgs().returns(constants.AddressZero);

      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("MACI: VkRegistry owner incorrectly set");
    });

    it("revert - GrantFactory owner incorrectly set", async () => {
      // Mock.
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      await mockGrantRoundFactory.mock.owner.withArgs().returns(constants.AddressZero);

      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("MACI: GrantFactory owner incorrectly set");
    });

    it("revert - should not initialize twice", async () => {
      // Mocks.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);

      // Should initialize QFI correctly.
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

      // Should revert.
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.revertedWith("QFI: Cannot initialize while not in the NOT_INITIALIZED stage");
    });
  });

  describe("setPollProcessorAndTallyer()", () => {
    before(async () => {
      // Mocked contracts.
      mockPPT = await deployMockContract(deployer, PollProcessorAndTallyer__factory.abi);
    });

    it("allows owner to set the PollProcessorAndTallyer", async () => {
      // Should set the PPT correctly.
      await expect(qfi.connect(deployer).setPollProcessorAndTallyer(mockPPT.address))
        .to.emit(qfi, "PollProcessorAndTallyerChanged")
        .withArgs(mockPPT.address);
    });

    it("allows owner to change the PollProcessorAndTallyer", async () => {
      const firstMockedPPT = mockPPT.address;

      // Should set the PPT correctly.
      await expect(qfi.connect(deployer).setPollProcessorAndTallyer(mockPPT.address))
        .to.emit(qfi, "PollProcessorAndTallyerChanged")
        .withArgs(mockPPT.address);

      // New PPT mock.
      mockPPT = await deployMockContract(deployer, PollProcessorAndTallyer__factory.abi);
      expect(firstMockedPPT).to.be.not.equal(mockPPT.address);

      // Should change the PPT correctly.
      await expect(qfi.connect(deployer).setPollProcessorAndTallyer(mockPPT.address))
        .to.emit(qfi, "PollProcessorAndTallyerChanged")
        .withArgs(mockPPT.address);
    });

    it("revert - allows only owner to set the PollProcessorAndTallyer", async () => {
      await expect(qfi.connect(contributor).setPollProcessorAndTallyer(mockPPT.address)).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  // Testing contribute() using mocks 
  describe("contribute() with mocks", () => {
    beforeEach(async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);
    });

    // Added check with a mocked new balance that doesn't match the transfer amount 
    it ("revert - contributing using a fee on transfer token", async () => {
      // Mocks.
      await mockBaseERC20Token.mock.balanceOf.withArgs(contributorAddress).returns(contributionAmount);
      await mockBaseERC20Token.mock.allowance.withArgs(contributorAddress, qfi.address).returns(contributionAmount);
      
      const dummyBalance = 100;
      await mockBaseERC20Token.mock.balanceOf.withArgs(qfi.address).returns(dummyBalance);

      await mockBaseERC20Token.mock.transferFrom
        .withArgs(contributorAddress, qfi.address, contributionAmount)
        .returns(true);
      
      // Returning a balance which is not equal balanceBefore + amount to mock a fee on transfer token 
      await mockBaseERC20Token.mock.balanceOf
        .withArgs(qfi.address)
        .returns(dummyBalance + contributionAmount - 10);

      await mockFreeForAllGateKeeper.mock.register.withArgs(contributorAddress, signUpGatekeeperData).returns();

      await mockConstantInitialVoiceCreditProxy.mock.getVoiceCredits
        .withArgs(contributorAddress, initialVoiceCreditProxyData)
        .returns(expectedTotalAmountofVoiceCredits);

      await expect(qfi.connect(contributor).contribute(contributorMaciPubKey, contributionAmount))
        .to.be.revertedWith("QFI: the transfer was not successful");
    });

     // TODO: Simulate 10**5 signups. How we could test it if the QFI is not mockable here?.
    // it("revert - maximum number of signups reached", async () => {
    // });

    it("revert - not accepting signups or top ups", async () => {
      // Mocks.
      const expectedMockGrantRoundAddress = ethers.Wallet.createRandom().address;

      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          mockBaseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfi.address,
          await qfi.owner()
        )
        .returns(expectedMockGrantRoundAddress);

      const expectedThirdStage = 2;
      // Should deploy a new Grant Round.
      await expect(
        qfi
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfi, "GrantRoundDeployed")
        .withArgs(
          expectedMockGrantRoundAddress,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfi.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfi.currentStage())).to.equal(2);
      expect(await qfi.currentGrantRound()).to.equal(expectedMockGrantRoundAddress);

      // Should revert when not in correct stage.
      await expect(qfi.connect(contributor).contribute(contributorMaciPubKey, 0)).to.revertedWith(
        "QFI: Not accepting signups or top ups"
      );
    });

    it("revert - contribution amount must be greater than zero", async () => {
      await expect(qfi.connect(contributor).contribute(contributorMaciPubKey, 0)).to.revertedWith(
        "QFI: Contribution amount must be greater than zero"
      );
    });

    it("revert - contribution amount is too large", async () => {
      await expect(
        qfi.connect(contributor).contribute(contributorMaciPubKey, defaultMaxContributionAmount + BigInt(1))
      ).to.revertedWith("QFI: Contribution amount is too large");
    });
  });

  describe("contribute() with deployed token", () => {
    beforeEach(async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfiDeployedtoken.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfiDeployedtoken.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfiDeployedtoken
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfiDeployedtoken, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfiDeployedtoken, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);
    });

    it("allows anyone to contribute", async () => {
      // Transfer tokens to the contributorAddress
      expect(
        await baseERC20Token.connect(deployer).
        transfer(contributorAddress, contributionAmount)
      );

      // Aprove the contract 
      expect (
        await baseERC20Token.connect(contributor)
        .approve(qfiDeployedtoken.address, contributionAmount)
      );

      await mockFreeForAllGateKeeper.mock.register
        .withArgs(contributorAddress, signUpGatekeeperData)
        .returns();

      await mockConstantInitialVoiceCreditProxy.mock.getVoiceCredits
        .withArgs(contributorAddress, initialVoiceCreditProxyData)
        .returns(expectedTotalAmountofVoiceCredits);

      // Should send a contribution correctly.
      await expect(
        qfiDeployedtoken.connect(contributor)
        .contribute(contributorMaciPubKey, contributionAmount)
        ).to.emit(qfiDeployedtoken, "SignUp")
        .to.emit(qfiDeployedtoken, "ContributionSent")
        .withArgs(contributorAddress, contributionAmount);
    });
   
    it("revert - cannot contribute twice", async () => {
      // Transfer tokens to the contributorAddress
      expect(
        await baseERC20Token.connect(deployer).
        transfer(contributorAddress, contributionAmount)
      );

      // Aprove the contract 
      expect (
        await baseERC20Token.connect(contributor)
        .approve(qfiDeployedtoken.address, contributionAmount)
      );

      await mockFreeForAllGateKeeper.mock.register
        .withArgs(contributorAddress, signUpGatekeeperData)
        .returns();

      await mockConstantInitialVoiceCreditProxy.mock.getVoiceCredits
        .withArgs(contributorAddress, initialVoiceCreditProxyData)
        .returns(expectedTotalAmountofVoiceCredits);

      // Should send a contribution correctly.
      await expect(qfiDeployedtoken.connect(contributor).contribute(contributorMaciPubKey, contributionAmount))
        .to.emit(qfiDeployedtoken, "SignUp")
        .to.emit(qfiDeployedtoken, "ContributionSent")
        .withArgs(contributorAddress, contributionAmount);

      // Should revert the second contribution correctly.
      await expect(qfiDeployedtoken.connect(contributor).contribute(contributorMaciPubKey, contributionAmount)).to.revertedWith(
        "QFI: top ups not supported, donate to matching pool instead"
      );
    });

    it("revert - pubKey values should be less than the snark scalar field", async () => {
      // Transfer tokens to the contributorAddress
      expect(
        await baseERC20Token.connect(deployer).
        transfer(contributorAddress, contributionAmount)
      );

      // Aprove the contract 
      expect (
        await baseERC20Token.connect(contributor)
        .approve(qfiDeployedtoken.address, contributionAmount)
      );

      await mockFreeForAllGateKeeper.mock.register
        .withArgs(contributorAddress, signUpGatekeeperData)
        .returns();

      const badContributorMaciPubKey = {
        x: "21888242871839275222246405745257275088548364400416034343698204186575808495617",
        y: "0", // < SNARK_SCALAR_FIELD
      };

      await expect(qfiDeployedtoken.connect(contributor).contribute(badContributorMaciPubKey, contributionAmount)).to.revertedWith(
        "MACI: _pubKey values should be less than the snark scalar field"
      );
    });
  });

  describe("getVoiceCredits()", async () => {
    // Input parameters.
    const contributionAmount = 100;
    let data: string;

    beforeEach(async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfiDeployedtoken.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfiDeployedtoken.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfiDeployedtoken
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfiDeployedtoken, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfiDeployedtoken, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

        const contributorBalance = 0;
      expect(await baseERC20Token.balanceOf(contributorAddress)).to.be.equal(contributorBalance);

      // Transfer tokens to the contributorAddress
      expect(
        await baseERC20Token.connect(deployer).
        transfer(contributorAddress, contributionAmount)
      );

      expect(await baseERC20Token.balanceOf(contributorAddress)).to.be.equal(contributionAmount);

      // Aprove the contract 
      expect (
        await baseERC20Token.connect(contributor)
        .approve(qfiDeployedtoken.address, contributionAmount)
      );

      await mockFreeForAllGateKeeper.mock.register
        .withArgs(contributorAddress, signUpGatekeeperData)
        .returns();

      await mockConstantInitialVoiceCreditProxy.mock.getVoiceCredits
        .withArgs(contributorAddress, initialVoiceCreditProxyData)
        .returns(expectedTotalAmountofVoiceCredits);

      // Should send a contribution correctly.
      await expect(
        qfiDeployedtoken.connect(contributor)
        .contribute(contributorMaciPubKey, contributionAmount)
        ).to.emit(qfiDeployedtoken, "SignUp")
        .to.emit(qfiDeployedtoken, "ContributionSent")
        .withArgs(contributorAddress, contributionAmount);
    });

    it("allow to get the amount of voice credits for a given address", async () => {
      data = ethers.utils.defaultAbiCoder.encode(["address"], [contributorAddress]);

      const voiceCreditsAmount = await qfiDeployedtoken.connect(deployer).getVoiceCredits(contributorAddress, data);

      expect(Number(voiceCreditsAmount)).to.be.equal(contributionAmount);
    });

    it("revert - user does not have any voice credits", async () => {
      data = ethers.utils.defaultAbiCoder.encode(["address"], [deployerAddress]);

      await expect(qfiDeployedtoken.connect(deployer).getVoiceCredits(deployerAddress, data)).to.revertedWith(
        "FundingRound: User does not have any voice credits"
      );
    });
  });

  describe("withdrawContribution()", async () => {
    const contributionAmount = 100;

    beforeEach(async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfiDeployedtoken.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfiDeployedtoken.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfiDeployedtoken
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      ).to.emit(qfiDeployedtoken, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfiDeployedtoken, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

      const contributorBalance = 0;
      expect(await baseERC20Token.balanceOf(contributorAddress)).to.be.equal(contributorBalance);

      // Transfer tokens to the contributorAddress
      expect(
        await baseERC20Token.connect(deployer).
        transfer(contributorAddress, contributionAmount)
      );

      expect(await baseERC20Token.balanceOf(contributorAddress)).to.be.equal(contributionAmount);

      // Aprove the contract 
      expect (
        await baseERC20Token.connect(contributor)
        .approve(qfiDeployedtoken.address, contributionAmount)
      );

      await mockFreeForAllGateKeeper.mock.register
        .withArgs(contributorAddress, signUpGatekeeperData)
        .returns();

      await mockConstantInitialVoiceCreditProxy.mock.getVoiceCredits
        .withArgs(contributorAddress, initialVoiceCreditProxyData)
        .returns(expectedTotalAmountofVoiceCredits);

      // Should send a contribution correctly.
      await expect(
        qfiDeployedtoken.connect(contributor)
        .contribute(contributorMaciPubKey, contributionAmount)
        ).to.emit(qfiDeployedtoken, "SignUp")
        .to.emit(qfiDeployedtoken, "ContributionSent")
    });

    it("should withdraw the contribution", async () => {
      // Mocks.
      await mockBaseERC20Token.mock.balanceOf.withArgs(qfiDeployedtoken.address).returns(contributionAmount);
      
      await mockBaseERC20Token.mock.transfer.withArgs(contributorAddress, contributionAmount).returns(true);
      await expect(qfiDeployedtoken.connect(contributor).withdrawContribution())
        .to.emit(qfiDeployedtoken, "ContributionWithdrew")
        .withArgs(contributorAddress);
    });

    it("revert - nothing to withdraw", async () => {
      await expect(qfiDeployedtoken.connect(deployer)
        .withdrawContribution()).to.revertedWith("FundingRound: Nothing to withdraw");
    });

    it("should have decreased the number of contributions", async () => {
      await mockBaseERC20Token.mock.balanceOf.withArgs(qfiDeployedtoken.address).returns(contributionAmount);

      const numberOfContributors = await 
        qfiDeployedtoken.grantRoundToContributorsCount(
          await qfiDeployedtoken.nextGrantRoundId()
        );
      
      await mockBaseERC20Token.mock.transfer.withArgs(contributorAddress, contributionAmount).returns(true);
      await expect(qfiDeployedtoken.connect(contributor).withdrawContribution())
        .to.emit(qfiDeployedtoken, "ContributionWithdrew")
        .withArgs(contributorAddress);

      expect(await qfiDeployedtoken.grantRoundToContributorsCount(
        await qfiDeployedtoken.nextGrantRoundId()))
        .to.be.equal(Number(numberOfContributors) - 1);
      
    })
  });

  describe("deployGrantRound()", async () => {
    beforeEach(async () => {
      // Mocked contracts.
      mockGrantRound = await deployMockContract(deployer, GrantRound__factory.abi);
    });

    it("allow owner to deploy a grant round", async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          mockBaseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfi.address,
          await qfi.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfi
          .connect(deployer)
          .deployGrantRound(
            duration, 
            maxValues, 
            treeDepths, 
            coordinatorMaciPublicKey, 
            coordinatorAddress)
      )
        .to.emit(qfi, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfi.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfi.currentStage())).to.equal(2);
      expect(await qfi.currentGrantRound()).to.equal(mockGrantRound.address);
    });

    it("revert - allows only owner to deploy a Grant Round", async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

      // Should revert.
      await expect(
        qfi
          .connect(contributor)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      ).to.revertedWith("Ownable: caller is not the owner");
    });

    it("revert - cannot deploy while not waiting for signups and topups stage", async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          mockBaseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfi.address,
          await qfi.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfi
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfi, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfi.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfi.currentStage())).to.equal(2);
      expect(await qfi.currentGrantRound()).to.equal(mockGrantRound.address);

      // Should revert (wrong stage).
      await expect(
        qfi
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      ).to.revertedWith("MACI: Cannot deploy a new grant round while not in the WAITING_FOR_SIGNUPS_AND_TOPUPS stage");
    });

    it("revert - cannot deploy while not waiting for signups and topups stage", async () => {
      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          mockBaseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfi.address,
          await qfi.owner()
        )
        .returns(mockGrantRound.address);

      // Should revert if not initialized.
      await expect(
        qfi
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      ).to.revertedWith("MACI: not initialised");
    });
  });

  describe("getGrantRound()", async () => {
    // Input parameters.
    const expectedGrantRoundId = 0;

    beforeEach(async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          mockBaseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfi.address,
          await qfi.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfi
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfi, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfi.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfi.currentStage())).to.equal(2);
      expect(await qfi.currentGrantRound()).to.equal(mockGrantRound.address);
    });

    it("allow anyone to get the provided Grant Round", async () => {
      const grantRound = await qfi.connect(contributor).getGrantRound(expectedGrantRoundId);

      expect(grantRound).to.be.equal(mockGrantRound.address);
    });

    it("revert - provided Grant Round does not exist", async () => {
      await expect(qfi.connect(contributor).getGrantRound(1)).to.be.revertedWith(
        "MACI: grantRound with _grantRoundId does not exist"
      );
    });
  });

  describe("getVotingDeadline()", async () => {
    // Input parameters.
    const expectedGrantRoundId = 0;
    let expectedDeployGrantRoundTimestamp: number;

    beforeEach(async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

      // Mocks.
      expectedDeployGrantRoundTimestamp = (await ethers.provider.getBlock("latest")).timestamp + 1;

      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          mockBaseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfi.address,
          await qfi.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfi
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfi, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfi.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfi.currentStage())).to.equal(2);
      expect(await qfi.currentGrantRound()).to.equal(mockGrantRound.address);
    });

    it("allow anyone to get the voting deadline for the provided Grant Round", async () => {
      // Mocks.
      await mockGrantRound.mock.getDeployTimeAndDuration
        .withArgs()
        .returns(expectedDeployGrantRoundTimestamp, duration);

      const deadline = await qfi.connect(contributor).getVotingDeadline(expectedGrantRoundId);

      expect(deadline).to.be.equal(expectedDeployGrantRoundTimestamp + duration);
    });

    it("revert - provided Grant Round does not exist", async () => {
      // Mocks.
      await mockGrantRound.mock.getDeployTimeAndDuration
        .withArgs()
        .returns(expectedDeployGrantRoundTimestamp, duration);

      await expect(qfi.connect(contributor).getVotingDeadline(1)).to.be.revertedWith(
        "MACI: grantRound with _grantRoundId does not exist"
      );
    });
  });

  describe("closeVotingAndWaitForDeadline()", async () => {
    it("allow owner to close the voting period", async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          mockBaseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfi.address,
          await qfi.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfi
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfi, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfi.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfi.currentStage())).to.equal(2);
      expect(await qfi.currentGrantRound()).to.equal(mockGrantRound.address);

      // Should close the voting period.
      await expect(qfi.connect(deployer).closeVotingAndWaitForDeadline())
        .to.emit(qfi, "VotingPeriodClosed")
        .withArgs(3);
    });

    it("revert - allow only owner to close the voting period", async () => {
      await expect(qfi.connect(contributor).closeVotingAndWaitForDeadline()).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("revert - cannot close the voting period while not on voting period open", async () => {
      await expect(qfi.connect(deployer).closeVotingAndWaitForDeadline()).to.revertedWith(
        "QFI: Cannot finalize a grant round while not in the VOTING_PERIOD_OPEN stage"
      );
    });
  });

  describe("finalizeCurrentRound() with deployed token", async () => {
    beforeEach(async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfiDeployedtoken.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfiDeployedtoken.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfiDeployedtoken
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfiDeployedtoken, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfiDeployedtoken, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);
    })

    it("allow owner to finalize current grant round", async () => {
      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          baseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfiDeployedtoken.address,
          await qfiDeployedtoken.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfiDeployedtoken
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfiDeployedtoken, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      await mockGrantRound.mock.batchSizes.withArgs().returns(0, 0);
      await mockGrantRound.mock.numSignUpsAndMessages.withArgs().returns(1, 1);

      expect(Number(await qfiDeployedtoken.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfiDeployedtoken.currentStage())).to.equal(2);
      expect(await qfiDeployedtoken.currentGrantRound()).to.equal(mockGrantRound.address);

      // Close voting period and prepare for finalization.
      await expect(qfiDeployedtoken.connect(deployer).closeVotingAndWaitForDeadline())
        .to.emit(qfiDeployedtoken, "VotingPeriodClosed")
        .withArgs(3);

      // Set PPT contract.
      await expect(qfiDeployedtoken.connect(deployer).setPollProcessorAndTallyer(mockPPT.address))
        .to.emit(qfiDeployedtoken, "PollProcessorAndTallyerChanged")
        .withArgs(mockPPT.address);

      // Mocks.
      await mockPPT.mock.tallyBatchNum.withArgs().returns(1);
      await mockPPT.mock.sbCommitment.withArgs().returns(tallyResults.finalSbCommitment); 
      await mockPPT.mock.tallyCommitment.withArgs().returns(tallyResults.finalTallyCommitment);
      await mockPPT.mock.processingComplete.withArgs().returns(true);
      await mockGrantRound.mock.nativeToken.withArgs().returns(baseERC20Token.address);
      await mockGrantRound.mock.finalize.withArgs(tallyResults.alphaDenominator).returns();

      // Send contribution amout to grant round 
      expect(await baseERC20Token.connect(deployer).transfer(qfiDeployedtoken.address, contributionAmount));

      await expect(
        qfiDeployedtoken.connect(deployer).
        finalizeCurrentRound(
          tallyResults.alphaDenominator)
        )
        .to.emit(qfiDeployedtoken, "GrantRoundFinalized")
        .withArgs(mockGrantRound.address, 4);
    });
    it("allow owner to finalize current grant round with other funding sources", async () => {
      // Add a funding source.
      await expect(qfiDeployedtoken.connect(deployer).addFundingSource(fundingSourceAddress))
        .to.emit(qfiDeployedtoken, "FundingSourceAdded")
        .withArgs(fundingSourceAddress);

      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          baseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfiDeployedtoken.address,
          await qfiDeployedtoken.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfiDeployedtoken
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfiDeployedtoken, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfiDeployedtoken.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfiDeployedtoken.currentStage())).to.equal(2);
      expect(await qfiDeployedtoken.currentGrantRound()).to.equal(mockGrantRound.address);

      // Close voting period and prepare for finalization.
      await expect(qfiDeployedtoken.connect(deployer).closeVotingAndWaitForDeadline())
        .to.emit(qfiDeployedtoken, "VotingPeriodClosed")
        .withArgs(3);

      // Set PPT contract.
      await expect(qfiDeployedtoken.connect(deployer).setPollProcessorAndTallyer(mockPPT.address))
        .to.emit(qfiDeployedtoken, "PollProcessorAndTallyerChanged")
        .withArgs(mockPPT.address);

      // Mocks.
      await mockPPT.mock.processingComplete.withArgs().returns(true);
      await mockPPT.mock.sbCommitment.withArgs().returns(tallyResults.finalSbCommitment); 
      await mockPPT.mock.tallyCommitment.withArgs().returns(tallyResults.finalTallyCommitment);
      await mockGrantRound.mock.nativeToken.withArgs().returns(baseERC20Token.address);

      expect(await baseERC20Token.connect(deployer).transfer(qfiDeployedtoken.address, contributionAmount));
      expect(await baseERC20Token.connect(fundingSource).approve(mockGrantRound.address, contributionAmount));

      await mockGrantRound.mock.finalize.withArgs(tallyResults.alphaDenominator).returns();
      
      await expect(qfiDeployedtoken.connect(deployer).finalizeCurrentRound(
        tallyResults.alphaDenominator))
        .to.emit(qfiDeployedtoken, "GrantRoundFinalized")
        .withArgs(mockGrantRound.address, 4);
    });
    it("revert - cannot finalize grant round twice", async () => {
      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          baseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfiDeployedtoken.address,
          await qfiDeployedtoken.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfiDeployedtoken
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfiDeployedtoken, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfiDeployedtoken.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfiDeployedtoken.currentStage())).to.equal(2);
      expect(await qfiDeployedtoken.currentGrantRound()).to.equal(mockGrantRound.address);

      // Close voting period and prepare for finalization.
      await expect(qfiDeployedtoken.connect(deployer).closeVotingAndWaitForDeadline())
        .to.emit(qfiDeployedtoken, "VotingPeriodClosed")
        .withArgs(3);

      // Set PPT contract.
      await expect(qfiDeployedtoken.connect(deployer).setPollProcessorAndTallyer(mockPPT.address))
        .to.emit(qfiDeployedtoken, "PollProcessorAndTallyerChanged")
        .withArgs(mockPPT.address);

      // Mocks.
      await mockPPT.mock.processingComplete.withArgs().returns(true);
      await mockPPT.mock.sbCommitment.withArgs().returns(tallyResults.finalSbCommitment); 
      await mockPPT.mock.tallyCommitment.withArgs().returns(tallyResults.finalTallyCommitment);
      await mockGrantRound.mock.nativeToken.withArgs().returns(baseERC20Token.address);
      await mockGrantRound.mock.finalize.withArgs(tallyResults.alphaDenominator).returns();

      // Transfer tokens to QFI for finialization 
      expect(await baseERC20Token.connect(deployer).transfer(qfiDeployedtoken.address, contributionAmount));

      await expect(qfiDeployedtoken.connect(deployer).finalizeCurrentRound(
        tallyResults.alphaDenominator))
        .to.emit(qfiDeployedtoken, "GrantRoundFinalized")
        .withArgs(mockGrantRound.address, 4);

      // Should revert.
      await expect(
        qfiDeployedtoken.connect(deployer).finalizeCurrentRound(
          tallyResults.alphaDenominator)
      ).to.revertedWith("QFI: Cannot finalize a grant round while not in the WAITING_FOR_FINALIZATION stage");
    });
  })

  // Tests on finalizeCurrentRoud with the token mocked 
  describe("finalizeCurrentRound() with mocked token", async () => {
    beforeEach(async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);
    });

    it("revert - allow only owner to finalize current grant round", async () => {
      await expect(
        qfi.connect(contributor).finalizeCurrentRound(
          tallyResults.alphaDenominator)
      ).to.revertedWith("Ownable: caller is not the owner");
    });

    it("revert - cannot finalize the grant round while not on waiting for finalization", async () => {
      await expect(
        qfi.connect(deployer).finalizeCurrentRound(
          tallyResults.alphaDenominator)
      ).to.revertedWith("QFI: Cannot finalize a grant round while not in the WAITING_FOR_FINALIZATION stage");
    });

    it("revert - cannot finalize when messages have not been proccessed", async () => {
      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          mockBaseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfi.address,
          await qfi.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfi
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfi, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfi.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfi.currentStage())).to.equal(2);
      expect(await qfi.currentGrantRound()).to.equal(mockGrantRound.address);

      // Close voting period and prepare for finalization.
      await expect(qfi.connect(deployer).closeVotingAndWaitForDeadline())
        .to.emit(qfi, "VotingPeriodClosed")
        .withArgs(3);

      // Set PPT contract.
      await expect(qfi.connect(deployer).setPollProcessorAndTallyer(mockPPT.address))
        .to.emit(qfi, "PollProcessorAndTallyerChanged")
        .withArgs(mockPPT.address);

      // Mocks.
      await mockPPT.mock.processingComplete.withArgs().returns(false);

      await expect(
        qfi.connect(deployer).finalizeCurrentRound(
          tallyResults.alphaDenominator)
      ).to.revertedWith("QFI: messages have not been proccessed");
    });

    
  });

  describe("acceptContributionsAndTopUpsBeforeNewRound() with deployed token", async () => {
    beforeEach(async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfiDeployedtoken.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfiDeployedtoken.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfiDeployedtoken
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfiDeployedtoken, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfiDeployedtoken, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          baseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfiDeployedtoken.address,
          await qfiDeployedtoken.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfiDeployedtoken
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfiDeployedtoken, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfiDeployedtoken.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfiDeployedtoken.currentStage())).to.equal(2);
      expect(await qfiDeployedtoken.currentGrantRound()).to.equal(mockGrantRound.address);
    });

    it("allow owner to start accepting contributions/signups for the next grant round", async () => {
      // Close voting period and prepare for finalization.
      await expect(qfiDeployedtoken.connect(deployer).closeVotingAndWaitForDeadline())
        .to.emit(qfiDeployedtoken, "VotingPeriodClosed")
        .withArgs(3);

      // Set PPT contract.
      await expect(qfiDeployedtoken.connect(deployer).setPollProcessorAndTallyer(mockPPT.address))
        .to.emit(qfiDeployedtoken, "PollProcessorAndTallyerChanged")
        .withArgs(mockPPT.address);

      // Mocks.
      await mockPPT.mock.tallyBatchNum.withArgs().returns(1);
      await mockPPT.mock.sbCommitment.withArgs().returns(tallyResults.finalSbCommitment); 
      await mockPPT.mock.tallyCommitment.withArgs().returns(tallyResults.finalTallyCommitment);
      await mockPPT.mock.processingComplete.withArgs().returns(true);
      await mockGrantRound.mock.nativeToken.withArgs().returns(baseERC20Token.address);
      await mockGrantRound.mock.finalize.withArgs(tallyResults.alphaDenominator).returns();

      await expect(
        qfiDeployedtoken.connect(deployer).
        finalizeCurrentRound(
          tallyResults.alphaDenominator)
        )
        .to.emit(qfiDeployedtoken, "GrantRoundFinalized")
        .withArgs(mockGrantRound.address, 4);
    });
  })

  describe("acceptContributionsAndTopUpsBeforeNewRound() with mocked token", async () => {
    beforeEach(async () => {
      // Initialize.
      await mockGrantRoundFactory.mock.owner.withArgs().returns(qfi.address);
      await mockGrantRoundFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryGrantRounds.address).returns();
      await mockGrantRoundFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryGrantRounds.address);
      await mockMessageAqFactoryGrantRounds.mock.owner.withArgs().returns(mockGrantRoundFactory.address);
      await mockMessageAqFactoryPolls.mock.owner.withArgs().returns(mockPollFactory.address);
      await mockPollFactory.mock.owner.withArgs().returns(qfi.address);
      await mockPollFactory.mock.setMessageAqFactory.withArgs(mockMessageAqFactoryPolls.address).returns();
      await mockPollFactory.mock.messageAqFactory.withArgs().returns(mockMessageAqFactoryPolls.address);
      await mockVkRegistry.mock.owner.withArgs().returns(deployerAddress);
      const expectedStage = 1; //"WAITING_FOR_SIGNUPS_AND_TOPUPS"
      await expect(
        qfi
          .connect(deployer)
          .initialize(
            mockVkRegistry.address,
            mockMessageAqFactoryPolls.address,
            mockMessageAqFactoryGrantRounds.address
          )
      )
        .to.emit(qfi, "Init")
        .withArgs(mockVkRegistry.address, mockMessageAqFactoryPolls.address)
        .to.emit(qfi, "QfiInitialized")
        .withArgs(mockMessageAqFactoryGrantRounds.address, expectedStage);

      // Mocks.
      await mockGrantRoundFactory.mock.deployGrantRound
        .withArgs(
          voiceCreditFactor,
          coordinatorAddress,
          mockBaseERC20Token.address,
          duration,
          maxValues,
          treeDepths,
          batchSizes,
          coordinatorMaciPublicKey,
          mockVkRegistry.address,
          qfi.address,
          await qfi.owner()
        )
        .returns(mockGrantRound.address);

      // Should deploy a new Grant Round.
      const expectedThirdStage = 2;
      await expect(
        qfi
          .connect(deployer)
          .deployGrantRound(duration, maxValues, treeDepths, coordinatorMaciPublicKey, coordinatorAddress)
      )
        .to.emit(qfi, "GrantRoundDeployed")
        .withArgs(
          mockGrantRound.address,
          duration,
          Object.values(maxValues),
          Object.values(treeDepths),
          Object.values(batchSizes),
          Object.values(coordinatorMaciPublicKey),
          expectedThirdStage
        );

      expect(Number(await qfi.nextGrantRoundId())).to.equal(1);
      expect(Number(await qfi.currentStage())).to.equal(2);
      expect(await qfi.currentGrantRound()).to.equal(mockGrantRound.address);
    });

    it("revert - allow only owner to close the voting period", async () => {
      await expect(qfi.connect(contributor).acceptContributionsAndTopUpsBeforeNewRound()).to.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("revert - cannot start accepting new contributions/signups while the current grant round is not finalized yet", async () => {
      await expect(qfi.connect(deployer).acceptContributionsAndTopUpsBeforeNewRound()).to.revertedWith(
        "QFI: Cannot deploy a new grant round while not in the FINALIZED stage"
      );
    });
  });
});
