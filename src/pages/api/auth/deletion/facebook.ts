import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import { getAdminApollo } from '$/server/common/admin-apollo';
import { apiHandler } from '$/server/common/api-handler';
import { ApiError } from '$/server/common/error';
import { DeleteFacebookUserDocument } from '$/server/graphql/generated/user';

apiHandler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const signedRequest = req.body.signed_request;
  console.log('Validating signature', {
    signedRequest,
  });
  const [signature, payload] = getSignatureAndPayloadFromSignedRequest(signedRequest);
  validateSignature(signature, payload);

  const { user_id: userId } = decodePayload(payload) as DecodedPayload;
  const client = getAdminApollo();
  await client.mutate({
    mutation: DeleteFacebookUserDocument,
    variables: {
      id: +userId,
    },
  });
  const confirmationCode = getConfirmationCode();
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/auth/deletion-confirmation?code=${confirmationCode}`;
  // Facebook requires the JSON to be non-quoted and formatted like this, so we need to create the JSON by hand:
  res.setHeader('Content-Type', 'application/json');
  res.send(`{ url: '${url}', confirmation_code: '${confirmationCode}' }`);
});

type DecodedPayload = {
  oauth_token: string;
  algorithm: 'HMAC-SHA256';
  expires: number;
  issued_at: number;
  user_id: string;
};

function getSignatureAndPayloadFromSignedRequest(signedRequest: string) {
  const [encodedSignature, payload] = signedRequest.split('.', 2);
  if (!encodedSignature || !payload) {
    throw new ApiError(400, 'Signed request has invalid format');
  }
  const signature = decodeSignature(encodedSignature);
  return [signature, payload];
}

function validateSignature(actualSignature: string, payload: string) {
  const expectedSignature = getExpectedSignature(payload);
  // For some reason, the actual signature always has a '=' appended
  const actualSignatureWithEqualsSign = actualSignature + '=';
  if (actualSignatureWithEqualsSign !== expectedSignature) {
    throw new ApiError(401, 'Invalid signature');
  }
}

function decodeSignature(encodedSignature: string) {
  return urlDecode(encodedSignature);
}

function decodePayload(payload: string) {
  const bodyJson = base64Decode(urlDecode(payload));
  try {
    return JSON.parse(bodyJson);
  } catch (error) {
    // If the JSON is invalid, this is the client's fault
    error.code = 400;
    throw error;
  }
}

function getConfirmationCode() {
  return crypto.randomBytes(10).toString('hex');
}

function urlDecode(str: string) {
  return str.replace(/-/g, '+').replace(/_/g, '/');
}

function getExpectedSignature(payload: string) {
  const hmac = crypto.createHmac('sha256', process.env.FACEBOOK_APP_SECRET);
  hmac.update(payload);
  return hmac.digest('base64');
}

function base64Decode(str: string, encoding: BufferEncoding = 'utf8') {
  return Buffer.from(unescape(str), 'base64').toString(encoding);
}

function unescape(str: string) {
  return (str + '==='.slice((str.length + 3) % 4)).replace(/-/g, '+').replace(/_/g, '/');
}

export default apiHandler;
