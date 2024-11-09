import bcrypt from "bcryptjs";
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;  // Replace with your actual API key

import { createKnexConnection } from "../../config";

// types
import type { UserType } from "../types";
import Logger from "./logger";

export const checkUser = async (email: string): Promise<boolean> => {
    const knex = await createKnexConnection();

    const row = await knex!("users").select().where({ email });
    if (row.length > 0) {
        return true;
    }
    return false;
};

export const comparePassword = async (
    user: UserType,
    password: string
): Promise<boolean> => {
    const comparePwd = await bcrypt.compare(password, user.password);

    if (!comparePwd) {
        return false;
    }

    return true;
};

/**
 * Fetches blacklist information for a user from the Adjutor Karma API.
 * @param identity - The unique identifier (e.g., phone, BVN, etc.) of the user.
 * @returns The blacklist data or an error message.
 */

export async function checkUserBlacklistStatus(identity: string): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/${identity}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          console.warn(`Identity ${identity} not found in Karma ecosystem.`);
          return { status: 404, message: `Identity ${identity} not in the blacklist.` };
        } else {
          console.error("Error fetching blacklist status:", error);
          throw new Error(`Failed to fetch status for identity ${identity}`);
        }
      } else {
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred.");
      }
    }
  }