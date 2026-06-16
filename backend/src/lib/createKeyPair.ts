import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const createKeyPair = () => {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  fs.writeFileSync(
    path.resolve(import.meta.dirname, "../../secrets/id_rsa_pub.pem"),
    keyPair.publicKey,
  );
  fs.writeFileSync(
    path.resolve(import.meta.dirname, "../../secrets/id_rsa_priv.pem"),
    keyPair.privateKey,
  );
};

createKeyPair();
