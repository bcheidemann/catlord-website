import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import { authorize, getSchedule } from "./lib";

const app = new Hono();

app.use("/api/*", cors());

app.get("/api/schedule", async (context) => {
  try {
    const auth = await authorize();
    const schedule = await getSchedule(auth);
    return context.json(schedule);
  } catch (err) {
    console.error(err);
    throw new HTTPException(500, {
      message: "Error retrieving stream schedule",
    });
  }
});

export default {
  port: 3001,
  fetch: app.fetch,
};
