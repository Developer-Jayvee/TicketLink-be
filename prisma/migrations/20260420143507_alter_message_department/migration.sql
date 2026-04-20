-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_department_id_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "department_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
