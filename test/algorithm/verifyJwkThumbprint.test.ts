import { verifyJwkThumbprint } from "../../src/algorithm/verifyJwkThumbprint";
import { JwkThumbprintVerificationError } from "../../src/error";

// Test data extracted from https://datatracker.ietf.org/doc/html/draft-ietf-oauth-dpop-03#section-6.1
describe("The verifyJwkThumbprint function", () => {
  it("Doesn't throw when the JWK thumbprint matches", async () => {
    await expect(
      verifyJwkThumbprint(
        {
          kty: "EC",
          x: "l8tFrhx-34tV3hRICRDY9zCkDlpBhF42UQUfWVAWBFs",
          y: "9VE4jf_Ok_o64zbTTlcuNJajHmt6v9TDVrU0CdvGRDA",
          crv: "P-256",
        },
        "0ZcOCORZNYy-DWpqq30jZyJGHTN0d2HglBV3uiguA4I"
      )
    ).resolves.not.toThrow();
  });

  it("Throws when the JWK thumbprint doesn't match", async () => {
    await expect(
      verifyJwkThumbprint(
        {
          kty: "EC",
          x: "l8tFrhx-34tV3hRICRDY9zCkDlpBhF42UQUfWVAWBFs",
          y: "9VE4jf_Ok_o64zbTTlcuNJajHmt6v9TDVrU0CdvGRDA",
          crv: "P-256",
        },
        "0ZcOCORZNYy-DWpqq30jZyJGHTN0d2HglBV3uiguA4Ie"
      )
    ).rejects.toThrow(JwkThumbprintVerificationError);
  });
});