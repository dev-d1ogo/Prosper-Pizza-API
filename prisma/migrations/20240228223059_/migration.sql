/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `password` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_password_key` ON `users`(`password`);
