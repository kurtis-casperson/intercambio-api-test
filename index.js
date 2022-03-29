import axios from "axios";
import crypto from "crypto";
import dotenv from 'dotenv';
dotenv.config()

const  {
	API_KEY,
	API_SECRET_KEY
} = process.env

const message = {
  "jsonrpc": "2.0",
  "method": "getExchangeAmount",
  "params": [
    {
      "from": "eth",
      "to": "btc",
      "amount": "1"
}, {
      "from": "btc",
      "to": "matic",
      "amount": "1"
}
  ],
  "id": 1
}
const sign = crypto
  .createHmac(
    "sha512",
    API_SECRET_KEY
  )
  .update(JSON.stringify(message))
  .digest("hex");

axios
  .post("https://api2.criptointercambio.com", message, {
    headers: {
      "api-key":API_KEY,
      // sign: sign,
      sign,
    },
  })
  .then((res) => {
	  console.log(res.data);
  })
  .catch((err) => {
   console.log(err);
  });

  

