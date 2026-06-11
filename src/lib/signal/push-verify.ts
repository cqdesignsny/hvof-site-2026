// Verifies that an inbound report push genuinely came from Signal.
//
// Floorplan never calls Signal; it only receives. So the one thing it must do
// is confirm a push is authentic before storing it. Signal signs the exact JSON
// body with a shared secret (HMAC-SHA256, hex); we recompute it and compare in
// constant time. This must stay byte-identical to Signal's src/lib/push/signature.ts.

import { createHmac, timingSafeEqual } from "node:crypto";

export const PUSH_SIGNATURE_HEADER = "x-signal-signature";

export function verifyPushSignature(
  body: string,
  signature: string,
  secret: string,
): boolean {
  const expected = createHmac("sha256", secret).update(body, "utf8").digest("hex");
  if (signature.length !== expected.length) return false;
  try {
    return timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature, "hex"),
    );
  } catch {
    return false;
  }
}
