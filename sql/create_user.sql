create table "user" (
    id            serial primary key not null,
    username      varchar(64),
    display_name  varchar(64) not null,
    email         varchar(128) unique not null,

    pwd_hash      varchar(32),   -- "native" password, salted & hashed for security
    pwd_salt      varchar(32),

    external_type varchar(16) not null,   -- external-auth type & id.
    external_id   varchar(64) unique not null
);
