-- CreateTable
CREATE TABLE `Product` (
    `prod_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL DEFAULT 999,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fk_cat_id` INTEGER NULL,

    UNIQUE INDEX `Product_name_key`(`name`),
    PRIMARY KEY (`prod_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `cat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_fk_cat_id_fkey` FOREIGN KEY (`fk_cat_id`) REFERENCES `Category`(`cat_id`) ON DELETE SET NULL ON UPDATE CASCADE;
