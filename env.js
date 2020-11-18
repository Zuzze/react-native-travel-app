import secrets from "./secrets";

// Use this in other files:
//
// import ENV from './env';
// ...
// const apiKey = ENV().googleApiKey;
// Note that secrets is not included in version control

const variables = {
  development: {
    googleApiKey: secrets.googleAPIKeyDevelopment
  },
  production: {
    googleApiKey: secrets.googleAPIKeyProduction
  }
};

// In react native with expo, you can check env with __DEV__
const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
