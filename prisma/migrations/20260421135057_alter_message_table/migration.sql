/*
  Warnings:

  - Added the required column `created_by_id` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_chat_id` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channel_id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversation_id_fkey";

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "created_by_id" INTEGER NOT NULL,
ADD COLUMN     "group_chat_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "channel_id" INTEGER NOT NULL,
ALTER COLUMN "conversation_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "GroupChat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GroupChat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_group_chat_id_fkey" FOREIGN KEY ("group_chat_id") REFERENCES "GroupChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
