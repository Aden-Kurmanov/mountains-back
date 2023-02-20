CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

drop table "Roles";
create table "Roles" (
    "id" serial primary key,
    "name" varchar(50) not null unique,
    "code" varchar(50) not null unique ,
    "createdAt" timestamp default now(),
    "updatedAt" timestamp default now(),
    "deletedAt" timestamp default null
);

create trigger "update_roles_updatedAt" before update on "Roles" for each row execute procedure update_updatedat_column();

drop table "Users";
create table "Users" (
    "id" serial primary key,
    "firstName" varchar(50),
    "lastName" varchar(50),
    "patronymic" varchar(50),
    "country" varchar(200) default null,
    "roleId" integer not null references "Roles"("id"),
    "email" varchar(50) UNIQUE not null,
    "phones" varchar(100)[] not null,
    "password" varchar(150) not null,
    "isCompany" boolean not null default false,
    "companyName" varchar(100) default null,
    "instagram" varchar(200) default null,
    "createdAt" timestamp default now(),
    "updatedAt" timestamp default now(),
    "deletedAt" timestamp default null
);

create index "firstNameIndex" on "Users" ("firstName");
create index "lastNameIndex" on "Users" ("lastName");
create index "companyNameIndex" on "Users" ("companyName");
create trigger "update_users_updatedAt" before update on "Users" for each row execute procedure update_updatedat_column();

drop table "HikeTypes";
create table "HikeTypes" (
    "id" serial primary key,
    "name" varchar(50) not null,
    "code" varchar(50) not null unique,
    "createdAt" timestamp default now(),
    "updatedAt" timestamp default now(),
    "deletedAt" timestamp default null
);

create index "hike_type_name" on "HikeTypes"("name");
create trigger "update_hike_types_updateAt" before update on "HikeTypes" for each row execute procedure update_updatedAt_column();

drop table "Levels";
create table "Levels" (
    "id" serial primary key,
    "name" varchar(50) not null,
    "color" varchar(50) not null,
    "createdAt" timestamp default now(),
    "updatedAt" timestamp default now(),
    "deletedAt" timestamp default null
);

create index "level_name" on "Levels"("name");
create trigger "update_levels_updatedAt" before update on "Levels" for each row execute procedure update_updatedat_column();

drop table "Currencies";
create table "Currencies" (
    "id" serial primary key,
    "name" varchar(50) not null,
    "code" varchar(30) not null,
    "createdAt" timestamp default now(),
    "updatedAt" timestamp default now(),
    "deletedAt" timestamp default null
);

create index "currency_name" on "Currencies"("name");
create trigger "update_currencies_updatedAt" before update on "Currencies" for each row execute procedure update_updatedAt_column();

drop table "Hiking";
create table "Hiking" (
    "id" serial primary key,
    "name" varchar(50) not null,
    "description" varchar(200) not null,
    "levelId" int not null references "Levels"("id"),
    "typeIds" integer[] not null,
    "guideId" int not null references "Users"("id"),
    "startDate" timestamp not null default now(),
    "endDate" timestamp not null,
    "price" int not null,
    "currencyId" int not null references "Currencies"("id"),
    "createdAt" timestamp default now(),
    "updatedAt" timestamp default now(),
    "deletedAt" timestamp default null
);

create index "index_hiking_name" on "Hiking"("name");
create index "index_hiking_levelId" on "Hiking"("levelId");
create index "index_hiking_price" on "Hiking"("price");
create trigger "update_hiking_updatedAt" before update on "Hiking" for each row execute procedure update_updatedat_column();