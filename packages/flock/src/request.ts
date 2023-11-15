import { getSessionId, getUUIDv4, setSessionId } from './session';

/**
 * Try to mask PPI and potential sensible attributes
 *
 * @param  payload Event payload
 * @return  Sanitized payload
 */
const maskSuspiciousAttributes = (payload: Record<string, string>): string => {
  const attributesToMask = [
    'username',
    'user',
    'user_id',
    'userid',
    'password',
    'pass',
    'pin',
    'passcode',
    'token',
    'api_token',
    'email',
    'address',
    'phone',
    'sex',
    'gender',
    'order',
    'order_id',
    'orderid',
    'payment',
    'credit_card',
  ];

  // Deep copy
  let sanitizedPayload = JSON.stringify(payload);
  attributesToMask.forEach((attr) => {
    sanitizedPayload = sanitizedPayload.replaceAll(
      new RegExp(`("${attr}"):(".+?"|\\d+)`, 'mgi'),
      '$1:"********"',
    );
  });

  return sanitizedPayload;
};

/**
 * Send event to endpoint
 *
 * @param name Event name
 * @param sanitizedPayload Event payload
 * @return request response
 */
export function sendEvent(name: string, payload: Record<string, string>) {
  setSessionId();
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/flock`;

  let sanitizedPayload = maskSuspiciousAttributes(payload);
  sanitizedPayload = Object.assign({}, JSON.parse(sanitizedPayload));
  sanitizedPayload = JSON.stringify(sanitizedPayload);

  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      action: name,
      version: '1',
      // Sometimes we can't get a session id, fallback to uuid
      session_id: getSessionId() || getUUIDv4(),
      payload: sanitizedPayload,
    }),
  );
}
