import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type ApiResponse = {
  message?: string;
  error?: string;
};

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}`;
const url = `${TELEGRAM_API_URL}/sendMessage`;

export async function POST(req: Request | NextRequest) {
  try {
    const rawData = await new Response(req.body).text();
    const data = JSON.parse(rawData);
    const { text } = data;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: "-1001996598325",
        text: text,
      }),
    });

    return NextResponse.json(
      { message: `${text} has been added` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: ` Error ${error}` }, { status: 500 });
  }
}
