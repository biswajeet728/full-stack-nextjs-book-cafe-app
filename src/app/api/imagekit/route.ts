import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  env: {
    imageKit: { urlEndpoint, privateKey, publicKey },
  },
} = config;

const imageKit = new ImageKit({
  privateKey: privateKey!,
  publicKey: publicKey!,
  urlEndpoint: urlEndpoint!,
});

export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters());
}
