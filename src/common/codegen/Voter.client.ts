/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.9.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { InstantiateMsg, ExecuteMsg, Decimal, Uint128, AstroStakingRewardConfig, WeightAllocationItem, RouteListItem, RouteItem, QueryMsg, MigrateMsg, Addr, AddressConfig, AstroStakingRewardResponse, ArrayOfBribesAllocationItem, BribesAllocationItem, RewardsItem, DaoResponse, EssenceInfo, DateConfig, ArrayOfString, TupleOfEssenceInfoAndEssenceInfo, UserType, ArrayOfUserType, EpochInfo, EstimatedRewardsResponse, RewardsClaimStage, OperationStatusResponse, OptimizationDataResponse, ArrayOfRewardsItem, ArrayOfRouteListItem, TokenConfig, ArrayOfUserResponse, UserResponse, RewardsInfo, UserListResponse, UserListResponseItem, VoterInfoResponse, EssenceAllocationItem, VoteResults, PoolInfoItem, ArrayOfTupleOfAddrAndUint128 } from "./Voter.types";
export interface VoterReadOnlyInterface {
  contractAddress: string;
  addressConfig: () => Promise<AddressConfig>;
  tokenConfig: () => Promise<TokenConfig>;
  dateConfig: () => Promise<DateConfig>;
  rewards: () => Promise<ArrayOfRewardsItem>;
  bribesAllocation: () => Promise<ArrayOfBribesAllocationItem>;
  estimatedRewards: ({
    user
  }: {
    user?: string;
  }) => Promise<EstimatedRewardsResponse>;
  optimizationData: () => Promise<OptimizationDataResponse>;
  votingPower: ({
    additionalEssence,
    address
  }: {
    additionalEssence?: Uint128;
    address: string;
  }) => Promise<Uint128>;
  votingPowerList: ({
    amount,
    blockTime,
    startFrom
  }: {
    amount: number;
    blockTime?: number;
    startFrom?: string;
  }) => Promise<ArrayOfTupleOfAddrAndUint128>;
  voterXastro: () => Promise<Uint128>;
  xastroPrice: () => Promise<Decimal>;
  eclipAstroMintedByVoter: () => Promise<Uint128>;
  user: ({
    address,
    blockTime
  }: {
    address: string;
    blockTime?: number;
  }) => Promise<ArrayOfUserResponse>;
  userList: ({
    amount,
    blockTime,
    startFrom
  }: {
    amount: number;
    blockTime?: number;
    startFrom?: string;
  }) => Promise<UserListResponse>;
  daoInfo: ({
    blockTime
  }: {
    blockTime?: number;
  }) => Promise<DaoResponse>;
  voterInfo: ({
    blockTime
  }: {
    blockTime?: number;
  }) => Promise<VoterInfoResponse>;
  epochInfo: () => Promise<EpochInfo>;
  routeList: ({
    amount,
    startFrom,
    tokenInList
  }: {
    amount: number;
    startFrom?: string;
    tokenInList?: string[];
  }) => Promise<ArrayOfRouteListItem>;
  operationStatus: () => Promise<OperationStatusResponse>;
  astroStakingRewards: () => Promise<AstroStakingRewardResponse>;
  astroStakingTreasuryRewards: () => Promise<Uint128>;
  simulateEclipAmountOut: ({
    amountIn,
    symbolIn
  }: {
    amountIn: Uint128;
    symbolIn: string;
  }) => Promise<Uint128>;
  debugUserTypes: ({
    address
  }: {
    address: string;
  }) => Promise<ArrayOfUserType>;
  debugSplittedUserEssenceInfo: ({
    address
  }: {
    address: string;
  }) => Promise<TupleOfEssenceInfoAndEssenceInfo>;
  debugCalcSplittedUserEssenceInfo: ({
    address
  }: {
    address: string;
  }) => Promise<TupleOfEssenceInfoAndEssenceInfo>;
  debugUser: ({
    address,
    blockTime,
    step
  }: {
    address: string;
    blockTime?: number;
    step: number;
  }) => Promise<ArrayOfString>;
  debugAccumulatedRewards: ({
    address,
    blockTime,
    step
  }: {
    address: string;
    blockTime?: number;
    step: number;
  }) => Promise<ArrayOfString>;
}
export class VoterQueryClient implements VoterReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;
  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.addressConfig = this.addressConfig.bind(this);
    this.tokenConfig = this.tokenConfig.bind(this);
    this.dateConfig = this.dateConfig.bind(this);
    this.rewards = this.rewards.bind(this);
    this.bribesAllocation = this.bribesAllocation.bind(this);
    this.estimatedRewards = this.estimatedRewards.bind(this);
    this.optimizationData = this.optimizationData.bind(this);
    this.votingPower = this.votingPower.bind(this);
    this.votingPowerList = this.votingPowerList.bind(this);
    this.voterXastro = this.voterXastro.bind(this);
    this.xastroPrice = this.xastroPrice.bind(this);
    this.eclipAstroMintedByVoter = this.eclipAstroMintedByVoter.bind(this);
    this.user = this.user.bind(this);
    this.userList = this.userList.bind(this);
    this.daoInfo = this.daoInfo.bind(this);
    this.voterInfo = this.voterInfo.bind(this);
    this.epochInfo = this.epochInfo.bind(this);
    this.routeList = this.routeList.bind(this);
    this.operationStatus = this.operationStatus.bind(this);
    this.astroStakingRewards = this.astroStakingRewards.bind(this);
    this.astroStakingTreasuryRewards = this.astroStakingTreasuryRewards.bind(this);
    this.simulateEclipAmountOut = this.simulateEclipAmountOut.bind(this);
    this.debugUserTypes = this.debugUserTypes.bind(this);
    this.debugSplittedUserEssenceInfo = this.debugSplittedUserEssenceInfo.bind(this);
    this.debugCalcSplittedUserEssenceInfo = this.debugCalcSplittedUserEssenceInfo.bind(this);
    this.debugUser = this.debugUser.bind(this);
    this.debugAccumulatedRewards = this.debugAccumulatedRewards.bind(this);
  }
  addressConfig = async (): Promise<AddressConfig> => {
    return this.client.queryContractSmart(this.contractAddress, {
      address_config: {}
    });
  };
  tokenConfig = async (): Promise<TokenConfig> => {
    return this.client.queryContractSmart(this.contractAddress, {
      token_config: {}
    });
  };
  dateConfig = async (): Promise<DateConfig> => {
    return this.client.queryContractSmart(this.contractAddress, {
      date_config: {}
    });
  };
  rewards = async (): Promise<ArrayOfRewardsItem> => {
    return this.client.queryContractSmart(this.contractAddress, {
      rewards: {}
    });
  };
  bribesAllocation = async (): Promise<ArrayOfBribesAllocationItem> => {
    return this.client.queryContractSmart(this.contractAddress, {
      bribes_allocation: {}
    });
  };
  estimatedRewards = async ({
    user
  }: {
    user?: string;
  }): Promise<EstimatedRewardsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      estimated_rewards: {
        user
      }
    });
  };
  optimizationData = async (): Promise<OptimizationDataResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      optimization_data: {}
    });
  };
  votingPower = async ({
    additionalEssence,
    address
  }: {
    additionalEssence?: Uint128;
    address: string;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voting_power: {
        additional_essence: additionalEssence,
        address
      }
    });
  };
  votingPowerList = async ({
    amount,
    blockTime,
    startFrom
  }: {
    amount: number;
    blockTime?: number;
    startFrom?: string;
  }): Promise<ArrayOfTupleOfAddrAndUint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voting_power_list: {
        amount,
        block_time: blockTime,
        start_from: startFrom
      }
    });
  };
  voterXastro = async (): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voter_xastro: {}
    });
  };
  xastroPrice = async (): Promise<Decimal> => {
    return this.client.queryContractSmart(this.contractAddress, {
      xastro_price: {}
    });
  };
  eclipAstroMintedByVoter = async (): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      eclip_astro_minted_by_voter: {}
    });
  };
  user = async ({
    address,
    blockTime
  }: {
    address: string;
    blockTime?: number;
  }): Promise<ArrayOfUserResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user: {
        address,
        block_time: blockTime
      }
    });
  };
  userList = async ({
    amount,
    blockTime,
    startFrom
  }: {
    amount: number;
    blockTime?: number;
    startFrom?: string;
  }): Promise<UserListResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      user_list: {
        amount,
        block_time: blockTime,
        start_from: startFrom
      }
    });
  };
  daoInfo = async ({
    blockTime
  }: {
    blockTime?: number;
  }): Promise<DaoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      dao_info: {
        block_time: blockTime
      }
    });
  };
  voterInfo = async ({
    blockTime
  }: {
    blockTime?: number;
  }): Promise<VoterInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voter_info: {
        block_time: blockTime
      }
    });
  };
  epochInfo = async (): Promise<EpochInfo> => {
    return this.client.queryContractSmart(this.contractAddress, {
      epoch_info: {}
    });
  };
  routeList = async ({
    amount,
    startFrom,
    tokenInList
  }: {
    amount: number;
    startFrom?: string;
    tokenInList?: string[];
  }): Promise<ArrayOfRouteListItem> => {
    return this.client.queryContractSmart(this.contractAddress, {
      route_list: {
        amount,
        start_from: startFrom,
        token_in_list: tokenInList
      }
    });
  };
  operationStatus = async (): Promise<OperationStatusResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      operation_status: {}
    });
  };
  astroStakingRewards = async (): Promise<AstroStakingRewardResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      astro_staking_rewards: {}
    });
  };
  astroStakingTreasuryRewards = async (): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      astro_staking_treasury_rewards: {}
    });
  };
  simulateEclipAmountOut = async ({
    amountIn,
    symbolIn
  }: {
    amountIn: Uint128;
    symbolIn: string;
  }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      simulate_eclip_amount_out: {
        amount_in: amountIn,
        symbol_in: symbolIn
      }
    });
  };
  debugUserTypes = async ({
    address
  }: {
    address: string;
  }): Promise<ArrayOfUserType> => {
    return this.client.queryContractSmart(this.contractAddress, {
      debug_user_types: {
        address
      }
    });
  };
  debugSplittedUserEssenceInfo = async ({
    address
  }: {
    address: string;
  }): Promise<TupleOfEssenceInfoAndEssenceInfo> => {
    return this.client.queryContractSmart(this.contractAddress, {
      debug_splitted_user_essence_info: {
        address
      }
    });
  };
  debugCalcSplittedUserEssenceInfo = async ({
    address
  }: {
    address: string;
  }): Promise<TupleOfEssenceInfoAndEssenceInfo> => {
    return this.client.queryContractSmart(this.contractAddress, {
      debug_calc_splitted_user_essence_info: {
        address
      }
    });
  };
  debugUser = async ({
    address,
    blockTime,
    step
  }: {
    address: string;
    blockTime?: number;
    step: number;
  }): Promise<ArrayOfString> => {
    return this.client.queryContractSmart(this.contractAddress, {
      debug_user: {
        address,
        block_time: blockTime,
        step
      }
    });
  };
  debugAccumulatedRewards = async ({
    address,
    blockTime,
    step
  }: {
    address: string;
    blockTime?: number;
    step: number;
  }): Promise<ArrayOfString> => {
    return this.client.queryContractSmart(this.contractAddress, {
      debug_accumulated_rewards: {
        address,
        block_time: blockTime,
        step
      }
    });
  };
}
export interface VoterInterface extends VoterReadOnlyInterface {
  contractAddress: string;
  sender: string;
  pushByAdmin: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  pause: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unpause: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  acceptAdminRole: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateAddressConfig: ({
    admin,
    astroportAssembly,
    astroportEmissionController,
    astroportRouter,
    astroportStaking,
    astroportTributeMarket,
    astroportVotingEscrow,
    controller,
    eclipseDao,
    eclipseMinter,
    eclipseSingleSidedVault,
    eclipseSplitter,
    eclipseStaking,
    eclipseTributeMarket,
    workerList
  }: {
    admin?: string;
    astroportAssembly?: string;
    astroportEmissionController?: string;
    astroportRouter?: string;
    astroportStaking?: string;
    astroportTributeMarket?: string;
    astroportVotingEscrow?: string;
    controller?: string;
    eclipseDao?: string;
    eclipseMinter?: string;
    eclipseSingleSidedVault?: string;
    eclipseSplitter?: string;
    eclipseStaking?: string;
    eclipseTributeMarket?: string;
    workerList?: string[];
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateTokenConfig: ({
    astro,
    eclip,
    eclipAstro,
    isEclipRewardsRequired,
    xastro
  }: {
    astro?: string;
    eclip?: string;
    eclipAstro?: string;
    isEclipRewardsRequired?: boolean;
    xastro?: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateDateConfig: ({
    epochLength,
    genesisEpochStartDate,
    voteDelay
  }: {
    epochLength?: number;
    genesisEpochStartDate?: number;
    voteDelay?: number;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateEssenceAllocation: ({
    addressList
  }: {
    addressList: string[];
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  swapToEclipAstro: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateAstroStakingRewardConfig: ({
    config
  }: {
    config: AstroStakingRewardConfig;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claimAstroRewards: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claimTreasuryRewards: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  setDelegation: ({
    weight
  }: {
    weight: Decimal;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  setDelegationByAdmin: ({
    user,
    weight
  }: {
    user: string;
    weight: Decimal;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  placeVote: ({
    weightAllocation
  }: {
    weightAllocation: WeightAllocationItem[];
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  placeVoteAsDao: ({
    weightAllocation
  }: {
    weightAllocation: WeightAllocationItem[];
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  claimRewards: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateRouteList: ({
    routeList,
    simulation
  }: {
    routeList: RouteListItem[];
    simulation: boolean;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unlockXastro: ({
    amount,
    recipient
  }: {
    amount: Uint128;
    recipient?: string;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  toggleDelegation: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class VoterClient extends VoterQueryClient implements VoterInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;
  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.pushByAdmin = this.pushByAdmin.bind(this);
    this.pause = this.pause.bind(this);
    this.unpause = this.unpause.bind(this);
    this.acceptAdminRole = this.acceptAdminRole.bind(this);
    this.updateAddressConfig = this.updateAddressConfig.bind(this);
    this.updateTokenConfig = this.updateTokenConfig.bind(this);
    this.updateDateConfig = this.updateDateConfig.bind(this);
    this.updateEssenceAllocation = this.updateEssenceAllocation.bind(this);
    this.swapToEclipAstro = this.swapToEclipAstro.bind(this);
    this.updateAstroStakingRewardConfig = this.updateAstroStakingRewardConfig.bind(this);
    this.claimAstroRewards = this.claimAstroRewards.bind(this);
    this.claimTreasuryRewards = this.claimTreasuryRewards.bind(this);
    this.setDelegation = this.setDelegation.bind(this);
    this.setDelegationByAdmin = this.setDelegationByAdmin.bind(this);
    this.placeVote = this.placeVote.bind(this);
    this.placeVoteAsDao = this.placeVoteAsDao.bind(this);
    this.claimRewards = this.claimRewards.bind(this);
    this.updateRouteList = this.updateRouteList.bind(this);
    this.unlockXastro = this.unlockXastro.bind(this);
    this.toggleDelegation = this.toggleDelegation.bind(this);
  }
  pushByAdmin = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      push_by_admin: {}
    }, fee, memo, _funds);
  };
  pause = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      pause: {}
    }, fee, memo, _funds);
  };
  unpause = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unpause: {}
    }, fee, memo, _funds);
  };
  acceptAdminRole = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      accept_admin_role: {}
    }, fee, memo, _funds);
  };
  updateAddressConfig = async ({
    admin,
    astroportAssembly,
    astroportEmissionController,
    astroportRouter,
    astroportStaking,
    astroportTributeMarket,
    astroportVotingEscrow,
    controller,
    eclipseDao,
    eclipseMinter,
    eclipseSingleSidedVault,
    eclipseSplitter,
    eclipseStaking,
    eclipseTributeMarket,
    workerList
  }: {
    admin?: string;
    astroportAssembly?: string;
    astroportEmissionController?: string;
    astroportRouter?: string;
    astroportStaking?: string;
    astroportTributeMarket?: string;
    astroportVotingEscrow?: string;
    controller?: string;
    eclipseDao?: string;
    eclipseMinter?: string;
    eclipseSingleSidedVault?: string;
    eclipseSplitter?: string;
    eclipseStaking?: string;
    eclipseTributeMarket?: string;
    workerList?: string[];
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_address_config: {
        admin,
        astroport_assembly: astroportAssembly,
        astroport_emission_controller: astroportEmissionController,
        astroport_router: astroportRouter,
        astroport_staking: astroportStaking,
        astroport_tribute_market: astroportTributeMarket,
        astroport_voting_escrow: astroportVotingEscrow,
        controller,
        eclipse_dao: eclipseDao,
        eclipse_minter: eclipseMinter,
        eclipse_single_sided_vault: eclipseSingleSidedVault,
        eclipse_splitter: eclipseSplitter,
        eclipse_staking: eclipseStaking,
        eclipse_tribute_market: eclipseTributeMarket,
        worker_list: workerList
      }
    }, fee, memo, _funds);
  };
  updateTokenConfig = async ({
    astro,
    eclip,
    eclipAstro,
    isEclipRewardsRequired,
    xastro
  }: {
    astro?: string;
    eclip?: string;
    eclipAstro?: string;
    isEclipRewardsRequired?: boolean;
    xastro?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_token_config: {
        astro,
        eclip,
        eclip_astro: eclipAstro,
        is_eclip_rewards_required: isEclipRewardsRequired,
        xastro
      }
    }, fee, memo, _funds);
  };
  updateDateConfig = async ({
    epochLength,
    genesisEpochStartDate,
    voteDelay
  }: {
    epochLength?: number;
    genesisEpochStartDate?: number;
    voteDelay?: number;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_date_config: {
        epoch_length: epochLength,
        genesis_epoch_start_date: genesisEpochStartDate,
        vote_delay: voteDelay
      }
    }, fee, memo, _funds);
  };
  updateEssenceAllocation = async ({
    addressList
  }: {
    addressList: string[];
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_essence_allocation: {
        address_list: addressList
      }
    }, fee, memo, _funds);
  };
  swapToEclipAstro = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      swap_to_eclip_astro: {}
    }, fee, memo, _funds);
  };
  updateAstroStakingRewardConfig = async ({
    config
  }: {
    config: AstroStakingRewardConfig;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_astro_staking_reward_config: {
        config
      }
    }, fee, memo, _funds);
  };
  claimAstroRewards = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim_astro_rewards: {}
    }, fee, memo, _funds);
  };
  claimTreasuryRewards = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim_treasury_rewards: {}
    }, fee, memo, _funds);
  };
  setDelegation = async ({
    weight
  }: {
    weight: Decimal;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_delegation: {
        weight
      }
    }, fee, memo, _funds);
  };
  setDelegationByAdmin = async ({
    user,
    weight
  }: {
    user: string;
    weight: Decimal;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      set_delegation_by_admin: {
        user,
        weight
      }
    }, fee, memo, _funds);
  };
  placeVote = async ({
    weightAllocation
  }: {
    weightAllocation: WeightAllocationItem[];
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      place_vote: {
        weight_allocation: weightAllocation
      }
    }, fee, memo, _funds);
  };
  placeVoteAsDao = async ({
    weightAllocation
  }: {
    weightAllocation: WeightAllocationItem[];
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      place_vote_as_dao: {
        weight_allocation: weightAllocation
      }
    }, fee, memo, _funds);
  };
  claimRewards = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      claim_rewards: {}
    }, fee, memo, _funds);
  };
  updateRouteList = async ({
    routeList,
    simulation
  }: {
    routeList: RouteListItem[];
    simulation: boolean;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_route_list: {
        route_list: routeList,
        simulation
      }
    }, fee, memo, _funds);
  };
  unlockXastro = async ({
    amount,
    recipient
  }: {
    amount: Uint128;
    recipient?: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unlock_xastro: {
        amount,
        recipient
      }
    }, fee, memo, _funds);
  };
  toggleDelegation = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      toggle_delegation: {}
    }, fee, memo, _funds);
  };
}