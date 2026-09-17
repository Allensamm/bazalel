function startsWith(bytes: Uint8Array, signature: readonly number[]) {
  return signature.every((byte, index) => bytes[index] === byte);
}

export function matchesSupportedImageSignature(
  contentType: string,
  bytes: Uint8Array,
) {
  if (contentType === 'image/jpeg') {
    return startsWith(bytes, [0xff, 0xd8, 0xff]);
  }

  if (contentType === 'image/png') {
    return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  }

  if (contentType === 'image/webp') {
    return startsWith(bytes, [0x52, 0x49, 0x46, 0x46])
      && startsWith(bytes.slice(8), [0x57, 0x45, 0x42, 0x50]);
  }

  if (contentType === 'image/gif') {
    return startsWith(bytes, [0x47, 0x49, 0x46, 0x38, 0x37, 0x61])
      || startsWith(bytes, [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
  }

  return false;
}
