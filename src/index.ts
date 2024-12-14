require("dotenv").config();
import express from "express";
import { mintTokens, burnTokens, sendNativeTokens } from "./mintTokens";
const app = express();

let HELIUS_RESPONSE = {
  nativeTransfers: [
    {
      amt: 1000,
      fromUserAccount: "123XYZ",
      toUserAccount: "XYZ123",
    },
  ],
};
const VAULT = "XYZ123"; //my wallet adddress
app.post("/helius", async (req, res) => {
  const incomingTx: any = HELIUS_RESPONSE?.nativeTransfers?.filter(
    (x: any) => x.toUserAccount == VAULT
  );

  if (!incomingTx) {
    //can contain multiple txs in same array
    res.json({ message: "processed" });
  }
  //   const fromAdress = req.body.fromAdress;
  const fromAdress = incomingTx.fromUserAccount;
  //   const toAddress = req.body.toAddress;
  const toAddress = VAULT;

  //   const amount = req.body.amount;
  const amount = incomingTx.amount;
  const type = "received_native_sol";

  if (type == "received_native_sol") {
    await mintTokens(fromAdress, amount);
  } else {
    // await burnTokens({fromAdress,toAddress,amount})
    // await sendNativeTokens({fromAdress,toAddress,amount})
  }
  res.send("Transcation successful");
});

app.listen(3000, () => {
  console.log("server is up and running");
});
