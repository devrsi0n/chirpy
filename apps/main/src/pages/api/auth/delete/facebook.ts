import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { log } from 'next-axiom';

import { APP_URL } from '$/lib/constants';
import { APIError } from '$/server/common/api-error';
import { getAPIHandler } from '$/server/common/api-handler';
import { mutate } from '$/server/common/gql';
import { DeleteUserDocument } from '$/server/graphql/generated/user';

const handler = getAPIHandler();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const signedRequest = req.body.signed_request;
  log.debug('Validating signature', {
    signedRequest,
  });
  const [signature, payload] =
    getSignatureAndPayloadFromSignedRequest(signedRequest);
  validateSignature(signature, payload);

  const { user_id: userId } = decodePayload(payload) as DecodedPayload;
  await mutate(
    DeleteUserDocument,
    {
      id: userId,
    },
    'deleteUserByPk',
  );
  const confirmationCode = getConfirmationCode();
  const url = `${APP_URL}/auth/delete-confirmation?code=${confirmationCode}`;
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
    throw new APIError(400, 'Signed request has invalid format');
  }
  const signature = decodeSignature(encodedSignature);
  return [signature, payload];
}

function validateSignature(actualSignature: string, payload: string) {
  const expectedSignature = getExpectedSignature(payload);
  // For some reason, the actual signature always has a '=' appended
  const actualSignatureWithEqualsSign = actualSignature + '=';
  if (actualSignatureWithEqualsSign !== expectedSignature) {
    throw new APIError(401, 'Invalid signature');
  }
}

function decodeSignature(encodedSignature: string) {
  return urlDecode(encodedSignature);
}

function decodePayload(payload: string) {
  const bodyJson = base64Decode(urlDecode(payload));
  try {
    return JSON.parse(bodyJson);
  } catch {
    throw new APIError(400, 'Signed request has invalid json');
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
  return (str + '==='.slice((str.length + 3) % 4))
    .replace(/-/g, '+')
    .replace(/_/g, '/');
}

export default handler;
