CREATE TABLE IF NOT EXISTS "palette" (
  id serial PRIMARY KEY NOT NULL,

  joy varchar(255),
  sadness varchar(255),
  anger varchar(255),
  fear varchar(255),
  trust varchar(255),
  jealous varchar(255),
  surprise varchar(255),
  anticipation varchar(255),
  spiritual varchar(255),
  neutral varchar(255),

  user_id uuid UNIQUE NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "user"(id)
)