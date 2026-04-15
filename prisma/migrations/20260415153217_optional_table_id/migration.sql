-- DropForeignKey
ALTER TABLE `guest_sessions` DROP FOREIGN KEY `guest_sessions_table_id_fkey`;

-- DropIndex
DROP INDEX `guest_sessions_table_id_fkey` ON `guest_sessions`;

-- AlterTable
ALTER TABLE `guest_sessions` MODIFY `table_id` BIGINT NULL;

-- AddForeignKey
ALTER TABLE `guest_sessions` ADD CONSTRAINT `guest_sessions_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `tables`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
