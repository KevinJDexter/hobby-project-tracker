CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"username" varchar(200) NOT NULL,
	"password" varchar(1000) NOT NULL,
	"first_name" varchar(200),
	"last_name" varchar(200),
	"email" varchar(200),
	"phone" varchar(20)
);



CREATE TABLE "projects" (
	"id" serial PRIMARY KEY,
	"name" varchar(1000) NOT NULL,
	"erd" varchar(1000),
	"project_management_app" varchar(1000),
	"scope_document" varchar(1000),
	"collaborators" varchar(10000),
	"website" varchar(1000),
	"github" varchar(1000),
	"date_started" DATE NOT NULL DEFAULT 'now()',
	"user_id" integer REFERENCES "public"."users"("id") ON DELETE CASCADE
);



CREATE TABLE "reminders" (
	"id" serial PRIMARY KEY,
	"date" DATE NOT NULL,
	"message" varchar(1000) NOT NULL,
	"via_phone" BOOLEAN NOT NULL,
	"via_email" BOOLEAN NOT NULL,
	"project_id" integer REFERENCES "public"."users"("id") ON DELETE CASCADE
);