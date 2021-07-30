import { HttpUriVerificationError } from "../error";

/**
 * Verifies the DPoP proof HTTP URI
 *
 * > "htu": The HTTP URI used for the request, without query and fragment parts (REQUIRED).
 * > -- https://datatracker.ietf.org/doc/html/draft-ietf-oauth-dpop-03#section-4.2
 *
 * @param uri The HTTP request URI
 * @param htu The DPoP proof htu parameter
 */
export function verifyHttpUri(uri: string, htu: string): void {
  const actual = uri.split("?")[0].split("#")[0];
  if (actual !== htu) {
    throw new HttpUriVerificationError(actual, htu);
  }
}
