CREATE TABLE "tools" (
	"id" serial NOT NULL,
	"title" varchar(255) NOT NULL,
	"link" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	CONSTRAINT "tools_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "tool_tags" (
	"id" serial NOT NULL,
	"tool_id" int NOT NULL,
	"tag" varchar(255) NOT NULL,
	CONSTRAINT "tool_tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"date" TIMESTAMP NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "logs" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"action" varchar(255) NOT NULL,
	"date" TIMESTAMP NOT NULL,
	"tool_id" int NOT NULL,
	CONSTRAINT "logs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "tool_tags" ADD CONSTRAINT "tool_tags_fk0" FOREIGN KEY ("tool_id") REFERENCES "tools"("id") ON DELETE CASCADE;

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "logs" ADD CONSTRAINT "logs_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
