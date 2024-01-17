import mongoose, { Schema } from "mongoose";

const raidBossSchema = new Schema(
  {
    name: { type: String, required: true },
    group: { type: Number },
    respawnTimeStart: { type: Date, required: true },
    respawnTimeEnd: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

raidBossSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

const RaidBoss =
  mongoose.models.RaidBoss || mongoose.model("RaidBoss", raidBossSchema);

export default RaidBoss;
