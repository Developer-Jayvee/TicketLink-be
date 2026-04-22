/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Message_user_id_key" ON "Message"("user_id");
