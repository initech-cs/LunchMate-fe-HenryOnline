var result = "";

export default async function verify(address, address2, city, state, zipCode) {
  const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
  const SmartyStreetsCore = SmartyStreetsSDK.core;
  const Lookup = SmartyStreetsSDK.usStreet.Lookup;

  // for Server-to-server requests, use this code:
  // let authId = process.env.SMARTY_AUTH_ID;
  // let authToken = process.env.SMARTY_AUTH_TOKEN;
  // const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

  // for client-side requests (browser/mobile), use this code:
  let key = process.env.REACT_APP_SMARTY;
  const credentials = new SmartyStreetsCore.SharedCredentials(key);
  let client = SmartyStreetsCore.buildClient.usStreet(credentials);

  // Documentation for input fields can be found at:
  // https://smartystreets.com/docs/us-street-api#input-fields

  let lookup = new Lookup();
  lookup.street = address;
  lookup.street2 = address2;
  lookup.city = city;
  lookup.state = state;
  lookup.zipCode = zipCode;
  lookup.maxCandidates = 1;

  let batch = new SmartyStreetsCore.Batch();
  batch.add(lookup);

  try {
    let data = await client.send(batch);
    result = data.lookups[0].result;
  } catch (error) {
    result = error;
  }
  return result;
}
