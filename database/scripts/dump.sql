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


ALTER TABLE "tool_tags" ADD CONSTRAINT "tool_tags_fk0" FOREIGN KEY ("tool_id") REFERENCES "tools"("id");
