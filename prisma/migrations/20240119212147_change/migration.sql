-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_lecturerId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseSection` DROP FOREIGN KEY `CourseSection_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseStatus` DROP FOREIGN KEY `CourseStatus_courseId_fkey`;
