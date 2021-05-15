CREATE TABLE IF NOT EXISTS "palette" (
  id serial PRIMARY KEY NOT NULL,

  joy varchar(255) NOT NULL,
  sadness varchar(255) NOT NULL,
  anger varchar(255) NOT NULL,
  fear varchar(255) NOT NULL,
  trust varchar(255) NOT NULL,
  jealous varchar(255) NOT NULL,
  surprise varchar(255) NOT NULL,
  anticipation varchar(255) NOT NULL,
  spiritual varchar(255) NOT NULL,
  neutral varchar(255) NOT NULL,

  user_id uuid NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "user"(id)
)