create table "user" (
    id            int not null,
    username      varchar(64),
    display_name  varchar(64),
    email         varchar(128),

    pwd_hash      varchar(32),   -- "native" password, salted & hashed for security
    pwd_salt      varchar(32),

    external_type varchar(16),   -- external-auth type & id.
    external_id   varchar(64),

    primary key (id)
);
