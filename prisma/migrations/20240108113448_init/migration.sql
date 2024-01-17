-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `pictureUrl` VARCHAR(191) NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `Course_name_idx` ON `Course`(`name`);
