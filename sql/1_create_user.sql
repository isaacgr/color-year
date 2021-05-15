-- Install uuid-ossp module to access uuidv4 generator function
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  

CREATE TABLE IF NOT EXISTS "user" (
    pk serial PRIMARY KEY NOT NULL,
    id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4(), -- this should be the key that the front end uses

    username varchar(64),
    display_name varchar(64) NOT NULL,
    email varchar(128) UNIQUE NOT NULL,

    pwd_hash varchar(32), -- "native" password, salted & hashed for security
    pwd_salt varchar(32),

    external_type varchar(16) NOT NULL,-- external-auth type & id.
    external_id varchar(64) UNIQUE NOT NULL,
    
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    palette_set boolean NOT NULL DEFAULT false
);