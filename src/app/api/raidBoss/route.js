import { NextResponse } from "next/server";
import RaidBoss from "../../../models/raidBoss";
import connectMongoDB from "../../libs/mongodb";
import { raidBossList } from "@/app/data/raidBossList";

export async function POST(req) {
  try {
    const { name, respawnTimeStart, respawnTimeEnd } = await req.json();
    console.log("respawnTimeEnd", respawnTimeEnd);
    const type = await raidBossList.find((rb) => rb.name === name).type;
    await connectMongoDB();
    await RaidBoss.create({
      name,
      group: type,
      respawnTimeStart: new Date(respawnTimeStart).toISOString(),
      respawnTimeEnd: new Date(respawnTimeEnd).toISOString(),
    });
    return NextResponse.json(
      { message: `${name} has been added` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: ` Error ${error}` }, { status: 500 });
  }
}

export async function GET() {
  await connectMongoDB();
  const raidBosses = await RaidBoss.find();
  return NextResponse.json({ raidBosses });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await RaidBoss.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Raid Boss info deleted", success: true },
    { status: 200 }
  );
}
