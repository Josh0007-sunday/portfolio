// Correct import path for TOKEN_PROGRAM_ID based on the package's exports
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { Connection, PublicKey } from "@solana/web3.js";
import axios from "axios";
import { programs } from "@metaplex/js";

const {
  metadata: { Metadata },
} = programs;

const STAKE_PROGRAM_ID = new PublicKey(
  "Stake11111111111111111111111111111111111111"
);
const SOLANA_MAINNET =
  "https://mainnet.helius-rpc.com/?api-key=4c4a4f43-145d-4406-b89c-36ad977bb738";
const SOLANA_USD_API =
  "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd";

const connection = new Connection(SOLANA_MAINNET);

/**
 * Fetches the SOL balance for a given address.
 * @param {PublicKey} address The public key of the wallet address.
 * @returns {Promise<number>} The SOL balance.
 */
export async function getSolBalance(address) {
  try {
    const balance = await connection.getBalance(address);
    return balance / 1e9; // Convert lamports to SOL (1 SOL = 10^9 lamports)
  } catch (error) {
    console.error("Error fetching SOL balance:", error);
    throw error;
  }
}

/**
 * Fetches the current SOL price in USD using CoinGecko API.
 * @returns {Promise<number>} The current SOL price in USD.
 */
export async function getSolPriceInUSD() {
  try {
    const response = await axios.get(SOLANA_USD_API);
    return response.data.solana.usd;
  } catch (error) {
    console.error("Error fetching SOL price:", error);
    throw error;
  }
}

/**
 * Fetches NFT metadata owned by the wallet address.
 * @param {PublicKey} walletAddress The public key of the wallet address.
 * @returns {Promise<Array<{ mint: string, data: any }>>} Array of NFT metadata objects.
 */
export async function getNfts(walletAddress) {
  try {
    const nftMetadata = await Metadata.findDataByOwner(
      connection,
      walletAddress.toBase58()
    );
    const nftData = nftMetadata.map((metadata) => ({
      mint: metadata.mint,
      data: metadata.data,
    }));
    return nftData;
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    throw error;
  }
}

/**
 * Fetches token accounts owned by the wallet address.
 * @param {PublicKey} walletAddress The public key of the wallet address.
 * @returns {Promise<Array<{ address: string, balance: number }>>} Array of token account objects.
 */
export async function getTokenAccounts(walletAddress) {
  try {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      walletAddress,
      { programId: TOKEN_PROGRAM_ID }
    );
    return tokenAccounts.value.map(({ pubkey, account }) => ({
      address: pubkey.toBase58(),
      balance: account.lamports / 1e9, // Convert lamports to SOL
    }));
  } catch (error) {
    console.error("Error fetching token accounts:", error);
    throw error;
  }
}

/**
 * Fetches stake accounts owned by the wallet address.
 * @param {PublicKey} walletAddress The public key of the wallet address.
 * @returns {Promise<Array<{ address: string, balance: number }>>} Array of stake account objects.
 */
export async function getStakeAccounts(walletAddress) {
  try {
    const stakeAccounts = await connection.getParsedProgramAccounts(
      STAKE_PROGRAM_ID,
      {
        filters: [
          { dataSize: 200 }, // Filter by stake account data size
          { memcmp: { offset: 0, bytes: walletAddress.toBase58() } }, // Filter by owner
        ],
      }
    );
    return stakeAccounts.map((account) => ({
      address: account.pubkey.toBase58(),
      balance: account.account.lamports / 1e9, // Convert lamports to SOL
    }));
  } catch (error) {
    console.error("Error fetching stake accounts:", error);
    throw error;
  }
}
