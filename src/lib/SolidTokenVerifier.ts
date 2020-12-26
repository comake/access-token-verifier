import type {
  AccessTokenPayload,
  RequestMethod,
  SolidTokenVerifierFunction,
} from "../types";
import { DPoPJTICache } from "./DPoPJTICache";
import { IssuerKeySetCache } from "./IssuerKeySetCache";
import { verify as verifyToken } from "./Verify";
import { WebIDIssuersCache } from "./WebIDIssuersCache";

class SolidTokenVerifier {
  private dpopJtiCache: DPoPJTICache;

  private issuerKeySetCache: IssuerKeySetCache;

  private webIDIssuersCache: WebIDIssuersCache;

  public constructor() {
    this.dpopJtiCache = new DPoPJTICache();
    this.issuerKeySetCache = new IssuerKeySetCache();
    this.webIDIssuersCache = new WebIDIssuersCache();
  }

  public async verify(
    authorizationHeader: string,
    dpopHeader: string,
    method: RequestMethod,
    url: string
  ): Promise<AccessTokenPayload> {
    return verifyToken(
      authorizationHeader,
      dpopHeader,
      method,
      url,
      this.webIDIssuersCache.getIssuers.bind(this.webIDIssuersCache),
      this.issuerKeySetCache.getKeySet.bind(this.issuerKeySetCache),
      this.dpopJtiCache.isDuplicateJTI.bind(this.dpopJtiCache)
    );
  }
}

export function createSolidTokenVerifier(): SolidTokenVerifierFunction {
  const cache = new SolidTokenVerifier();
  return cache.verify.bind(cache);
}