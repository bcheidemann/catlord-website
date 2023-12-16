import fs from "fs/promises";
import path from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";

const OAUTH_ALLOWED = process.env.OAUTH_ALLOWED === "true";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, "utf-8");
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 */
async function saveCredentials(client: JSONClient | OAuth2Client) {
  const content = await fs.readFile(CREDENTIALS_PATH, "utf-8");
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 */
export async function authorize(): Promise<
  Parameters<typeof google.sheets>[0]["auth"]
> {
  const jsonClient = await loadSavedCredentialsIfExist();
  if (jsonClient) {
    return jsonClient as OAuth2Client;
  } else if (!OAUTH_ALLOWED) {
    throw new Error("No saved credentials found and OAUTH_ALLOWED is not set.");
  }
  const oauthClient = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (oauthClient.credentials) {
    await saveCredentials(oauthClient);
  }
  return oauthClient;
}

/**
 * Returns the schedule from the spreadsheet.
 */
export async function getSchedule(
  auth: Parameters<typeof google.sheets>[0]["auth"]
) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "19NpyiVA9LqIB-F9WPbefJb8crrg_jA3-JMZLnLoC4RE",
    range: "SCHEDULE",
  });
  const rows = res.data.values;

  return (rows ?? []) as string[][];
}
