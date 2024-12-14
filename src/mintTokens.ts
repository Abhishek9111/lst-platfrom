import { mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
const connection = new Connection("https://api.mainnet-beta.solana.com");
const payer = Keypair.fromSecretKey(
  Uint8Array.from([...process.env.PRIVATE_KEY])
);

function base58toKeyPair(base58Privatekey: string): Keypair {
  try {
    const privatekeyBuffer = bs58.decode(base58Privatekey);
    return Keypair.fromSecretKey(privatekeyBuffer);
  } catch (e) {}
}

const keypair = base58toKeyPair(process.env.PRIVATE_KEY!);

export const mintTokens = async (fromAddress: string, amount: number) => {
  //   console.log("minting tokens");
  await mintTo(
    connection,
    keypair,
    process.env.TOKEN_MINT_ADDRESS!,
    new PublicKey(fromAddress),
    keypair,
    amount
  );
};

export const burnTokens = async (
  fromAddress: string,
  toAddress: string,
  amount: number
) => {
  console.log("burning tokens");
};

export const sendNativeTokens = async (
  fromAddress: string,
  toAddress: string,
  amount: number
) => {
  console.log("Sending native  tokens");
};
