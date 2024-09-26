import 'dotenv/config'; // This loads the .env file
import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

const DATABASE_URL = "postgresql://whriv_owner:R4PumBqQOwt7@ep-broad-hall-a5hm2ebb.us-east-2.aws.neon.tech/auth_db?sslmode=require";

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
}

const drizzleConfig: Config = {
  schema: "./src/drizzle/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: { url: DATABASE_URL },
};

export default defineConfig(drizzleConfig);
