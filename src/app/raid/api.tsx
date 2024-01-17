import { RaidResponse } from "./types";
import axios from "axios";
import cheerio from "cheerio";
import { RaidRequestData } from "../components/AddNewRaid";
import moment from "moment";
import { parseURL } from "@/utils";

export const getRaids = async (): Promise<RaidResponse | undefined> => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/raidBoss", {
      cache: "no-store",
    });

    
    if (!res.ok) {
      throw new Error("Failed to fetch raid boss list");
    }

    return await res.json();
  } catch (error) {
    console.error("Error loading raid boss list: ", error);
  }
};

export const setNewRespawn = async (el: RaidRequestData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/raidBoss`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...el,
        respawnTimeStart: moment(el.respawnTimeStart).toISOString(),
        respawnTimeEnd: moment(el.respawnTimeStart)
          .add("minutes", 30)
          .toISOString(),
      }),
    });

    if (res.status === 200 || res.status === 201) {
      return await res.json();
    } else {
      console.error("setNewRespawn request error:", res.status);
    }
  } catch (error) {
    console.error("setNewRespawn error:", error);
  }
};

export const getInfoData = async (hash?: string) => {
  if (hash) {
    const { rb_id, rb_hash } = parseURL(hash);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/raidData` + `?id=${rb_id}&hash=${rb_hash}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }
      return await res.json();
    } catch (error) {
      console.error("Error loading topics: ", error);
    }
  }
};

export const deleteInfoData = async (id?: string) => {
  if (id) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/raidBoss` + `?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }
      return await res.json();
    } catch (error) {
      console.error("Error loading topics: ", error);
    }
  }
};

export const sendMessageToTelegram = async (text: string): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/telegram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });

    if (res.status !== 200) {
      console.error("telegram request error:", res.status);
    }
  } catch (error) {
    console.error("telegram error:", error);
  }
};
