CREATE TABLE IF NOT EXISTS "calendar" (
  id serial PRIMARY KEY NOT NULL,
  user_id uuid NOT NULL,
  date date NOT NULL,
  value varchar(255) NOT NULL,
  UNIQUE (user_id, date),
  FOREIGN KEY ("user_id") REFERENCES "user"(id)
)