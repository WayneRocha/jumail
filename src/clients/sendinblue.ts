import * as SibApiV3Sdk from '@sendinblue/client'

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Configure API key authorization: apiKey

apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.API_SENDINBLUE || "");

export const SBclients = {
    tEmails: apiInstance
};
