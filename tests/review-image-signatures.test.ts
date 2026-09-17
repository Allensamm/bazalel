import assert from 'node:assert/strict';
import test from 'node:test';
import { matchesSupportedImageSignature } from '../lib/image-signatures.ts';

test('accepts the supported image signatures', () => {
  assert.equal(
    matchesSupportedImageSignature('image/png', Uint8Array.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ])),
    true,
  );
  assert.equal(
    matchesSupportedImageSignature('image/jpeg', Uint8Array.from([0xff, 0xd8, 0xff])),
    true,
  );
  assert.equal(
    matchesSupportedImageSignature('image/webp', Uint8Array.from([
      0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50,
    ])),
    true,
  );
  assert.equal(
    matchesSupportedImageSignature('image/gif', Uint8Array.from([
      0x47, 0x49, 0x46, 0x38, 0x39, 0x61,
    ])),
    true,
  );
});

test('rejects a PNG with an invalid signature', () => {
  assert.equal(
    matchesSupportedImageSignature('image/png', Uint8Array.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x00, 0x1a, 0x0a,
    ])),
    false,
  );
});
