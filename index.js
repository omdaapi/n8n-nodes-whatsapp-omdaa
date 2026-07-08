// This file is optional as n8n reads from package.json
// But it's here for compatibility and explicit exports

module.exports = {
  // Credentials
  credentials: {
    OmdaaApi: require('./dist/credentials/OmdaaApi.credentials').OmdaaApi,
  },
  
  // Nodes
  nodes: {
    Omdaa: require('./dist/nodes/Omdaa/Omdaa.node').Omdaa,
    OmdaaTrigger: require('./dist/nodes/Omdaa/OmdaaTrigger.node').OmdaaTrigger,
  },
};
