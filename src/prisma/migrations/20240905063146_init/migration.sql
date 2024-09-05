-- CreateTable
CREATE TABLE "em_projects" (
    "project_id" SERIAL NOT NULL,
    "project_user_id" INTEGER NOT NULL,
    "project_name" VARCHAR(255),
    "project_description" VARCHAR(200),
    "project_tech" VARCHAR(100),
    "project_status" VARCHAR(100),
    "project_startDate" DATE,
    "project_deadlineDate" DATE,
    "project_lead" VARCHAR(200),
    "project_manager" VARCHAR(200),
    "project_client" VARCHAR(200),
    "management_tool" VARCHAR(100),
    "management_url" VARCHAR(200),
    "repo_tool" VARCHAR(100),
    "repo_url" VARCHAR(200),

    CONSTRAINT "em_projects_pkey" PRIMARY KEY ("project_id")
);

-- AddForeignKey
ALTER TABLE "em_projects" ADD CONSTRAINT "em_projects_project_user_id_fkey" FOREIGN KEY ("project_user_id") REFERENCES "em_users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
