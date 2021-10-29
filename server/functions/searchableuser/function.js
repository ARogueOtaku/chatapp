require("dotenv").config();
const sdk = require("node-appwrite");

console.log(`Executing SearchableUser function`);

const client = new sdk.Client();
const database = new sdk.Database(client);
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT)
  .setKey(process.env.APPWRITE_API_KEY);

const EVENT_TYPES = {
  CREATE: "account.create",
  UPDATE_NAME: "account.update.name",
  UPDATE_EMAIL: "account.update.email",
  DELETE: "account.delete",
};
const { APPWRITE_FUNCTION_EVENT: EVENT, APPWRITE_FUNCTION_EVENT_DATA: PAYLOAD } = process.env;
const { $id: userid, name, email } = JSON.parse(PAYLOAD);

console.log(`EVENT: ${EVENT} detected!`);

switch (EVENT) {
  case EVENT_TYPES.CREATE:
    database
      .createDocument(process.env.APPWRITE_COLLECTION, { userid, name, email }, [`role:member`], [`user:${userid}`])
      .then((response) => {
        console.log(`User Creation Success: ${JSON.stringify(response)}`);
      })
      .catch((error) => {
        console.log(`User Creation Error: ${error}`);
      });
    break;
  case EVENT_TYPES.UPDATE_EMAIL:
    break;
  case EVENT_TYPES.UPDATE_NAME:
    break;
  case EVENT_TYPES.DELETE:
    break;
  default:
    console.log(`No Task defined for Event: ${EVENT}`);
}
