CREATE TABLE IF NOT EXISTS "session" (
    id text PRIMARY KEY NOT NULL,
    sid text UNIQUE NOT NULL,
    data text NOT NULL,
    "expiresAt" timestamp NOT NULL
);