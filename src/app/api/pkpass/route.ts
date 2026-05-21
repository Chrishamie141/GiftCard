import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "PassKit setup required. Add Apple certificates and identifiers before enabling .pkpass generation.",
    required: ["APPLE_PASS_TYPE_IDENTIFIER", "APPLE_TEAM_IDENTIFIER", "APPLE_WWDR_CERT_PATH", "APPLE_SIGNER_CERT_PATH", "APPLE_SIGNER_KEY_PATH"]
  }, { status: 501 });
}
