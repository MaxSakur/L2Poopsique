import axios from "axios";
import cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export type DATA_ITEM = {
  itemName: string;
  dropChance: string;
};

export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new NextResponse(null, { status: 404 });
  }
  const id = req.nextUrl.searchParams.get("id");
  const name = req.nextUrl.searchParams.get("hash");

  try {
    const response = await axios.get(
      `${process.env.DATABASE_URL}/npc/${id}/${name}.html`
    );
    const $ = cheerio.load(response.data);
    const items: DATA_ITEM[] = [];

    $("b:contains('Drop')")
      .parent()
      .parent()
      .nextAll()
      .each((i, element) => {
        const cells = $(element).find("td");
        const itemName = $(cells[0]).text().trim();
        const dropChance = $(cells[2]).text().trim();
        items.push({ itemName, dropChance });
      });

    return NextResponse.json(items, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Ошибка при извлечении данных", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  console.log(req, res);
}
