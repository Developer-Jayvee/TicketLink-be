/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'INPROGRESS', 'DONE');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_favID_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_B_fkey";

-- DropIndex
DROP INDEX "User_email_idx";

-- DropIndex
DROP INDEX "User_name_age_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "_CategoryToPost";

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "priority" "Priority" NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "assignee_user_id" INTEGER,
    "created_by_user_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "source_channel_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "channel_id" INTEGER NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_name_key" ON "Conversation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_username_email_idx" ON "User"("username", "email");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignee_user_id_fkey" FOREIGN KEY ("assignee_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_source_channel_id_fkey" FOREIGN KEY ("source_channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
