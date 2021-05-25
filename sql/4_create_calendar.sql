CREATE TABLE IF NOT EXISTS "calendar" (
  id serial PRIMARY KEY NOT NULL,
  user_id uuid UNIQUE NOT NULL,
  date timestamp NOT NULL,
  value varchar(255) NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "user"(id)
)