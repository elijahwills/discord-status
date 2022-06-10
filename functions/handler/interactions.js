if (context.params.type === 1) {
  const nacl = require('tweetnacl');
  const PUBLIC_KEY = `${process.env.bot_public_key}`;
  const signature = context.http.headers['x-signature-ed25519'];
  const timestamp = context.http.headers['x-signature-timestamp'];
  const body = context.http.body;
  const isVerified = await nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );
  if (!isVerified) {
    return {
      statusCode: 401,
      message: 'invalid request signature',
    };
  } else {
    return {
      statusCode: 200,
      type: 1,
    };
  }
}