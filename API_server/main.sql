/*
 Navicat Premium Data Transfer

 Source Server         : sqlite
 Source Server Type    : SQLite
 Source Server Version : 3021000
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3021000
 File Encoding         : 65001

 Date: 28/12/2019 10:42:39
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for Author
-- ----------------------------
DROP TABLE IF EXISTS "Author";
CREATE TABLE "Author" (
  "id" integer NOT NULL,
  "name" VARCHAR,
  "createdAt" integer,
  "updatedAt" integer,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of Author
-- ----------------------------
INSERT INTO "Author" VALUES (1, 'Arthur James', 1576937260253, 1576937260253);
INSERT INTO "Author" VALUES (2, 'Evelyn Dorothy', 1576997905576, 1576997905576);
INSERT INTO "Author" VALUES (3, 'Lisa Jones', 1576997997596, 1576997997596);
INSERT INTO "Author" VALUES (4, 'xiaoming', 1576937260253, 1576937260253);
INSERT INTO "Author" VALUES (5, 'wangpeng333', 1577277336534, 1577277336534);
INSERT INTO "Author" VALUES (6, 'pengwang123', 1577283561813, 1577283561813);
INSERT INTO "Author" VALUES (7, 'undefined', 1577329072838, 1577329072838);
INSERT INTO "Author" VALUES (8, '鲁迅', 1577345176170, 1577345176170);
INSERT INTO "Author" VALUES (9, 456742351436245315, 1577493613303, 1577493613303);
INSERT INTO "Author" VALUES (10, 123412341234, 1577493661573, 1577493661573);

-- ----------------------------
-- Table structure for Book
-- ----------------------------
DROP TABLE IF EXISTS "Book";
CREATE TABLE "Book" (
  "id" integer NOT NULL,
  "title" VARCHAR,
  "isbn" VARCHAR,
  "createdAt" integer,
  "updatedAt" integer,
  "authorId" integer,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of Book
-- ----------------------------
INSERT INTO "Book" VALUES (1, 'How to Draw Good', 3289589036, 1576998228743, 1576998228743, 3);
INSERT INTO "Book" VALUES (2, 'Making the Cake', 235670351, 1576998292704, 1577329873347, 2);
INSERT INTO "Book" VALUES (3, 'Laughing for No Reason', 329780611, 1576998461825, 1577330005538, 2);
INSERT INTO "Book" VALUES (6, 1234, 123513412341234, 1577345176170, 1577345176170, 6);

-- ----------------------------
-- Table structure for BorrowCard
-- ----------------------------
DROP TABLE IF EXISTS "BorrowCard";
CREATE TABLE "BorrowCard" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT,
  "barcode" TEXT
);

-- ----------------------------
-- Records of BorrowCard
-- ----------------------------
INSERT INTO "BorrowCard" VALUES (1, 'xiaohua', 2345234523);
INSERT INTO "BorrowCard" VALUES (2, 'xiaoming', 34568888);
INSERT INTO "BorrowCard" VALUES (4, 'xiaogang', 12341234);

-- ----------------------------
-- Table structure for Loan
-- ----------------------------
DROP TABLE IF EXISTS "Loan";
CREATE TABLE "Loan" (
  "id" integer NOT NULL,
  "dueDate" integer,
  "createdAt" integer,
  "updatedAt" integer,
  "UserId" integer,
  "BookId" integer,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of Loan
-- ----------------------------
INSERT INTO "Loan" VALUES (1, 1577721600000, 1577000220377, 1577366545147, 1, 2);
INSERT INTO "Loan" VALUES (2, 1577690259555, 1577009765715, 1577009765715, 2, 3);

-- ----------------------------
-- Table structure for Login
-- ----------------------------
DROP TABLE IF EXISTS "Login";
CREATE TABLE "Login" (
  "id" integer NOT NULL,
  "username" VARCHAR,
  "password" VARCHAR,
  "isSuper" TEXT,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of Login
-- ----------------------------
INSERT INTO "Login" VALUES (1, 'admin', '000000', 1);
INSERT INTO "Login" VALUES (2, 'admin2', 22222, 2);

-- ----------------------------
-- Table structure for Reservation
-- ----------------------------
DROP TABLE IF EXISTS "Reservation";
CREATE TABLE "Reservation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT,
  "title" TEXT
);

-- ----------------------------
-- Records of Reservation
-- ----------------------------
INSERT INTO "Reservation" VALUES (1, 'xiaohua', 1234);
INSERT INTO "Reservation" VALUES (2, 'xiaoming', 42562345);
INSERT INTO "Reservation" VALUES (5, 'xiaozhang', 24562348888);

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS "User";
CREATE TABLE "User" (
  "id" integer NOT NULL,
  "name" VARCHAR,
  "barcode" VARCHAR,
  "memberType" TEXT,
  "createdAt" integer,
  "updatedAt" integer,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of User
-- ----------------------------
INSERT INTO "User" VALUES (1, 'Martin Chorley', 123456, '职员1', 1577000011365, 1577362310048);
INSERT INTO "User" VALUES (2, 'jack join', 256872, '职员', 1577009393742, 1577362240432);
INSERT INTO "User" VALUES (3, 'xiaohua', 'k4lbb2mo', '学生', 1577279193360, 1577279193360);
INSERT INTO "User" VALUES (4, 'xiaozhang111', 'k4lbb2m1', '老师', 1577279237995, 1577281007132);
INSERT INTO "User" VALUES (5, 'JACK', 'k4modo6g', '学生', 1577361615784, 1577361615784);
INSERT INTO "User" VALUES (6, 'Jack', 'k4moei0c', '学生', 1577361654444, 1577361654444);
INSERT INTO "User" VALUES (7, 'KJack', 'k4mofm9a', '学生', 1577361706606, 1577361706606);

-- ----------------------------
-- Table structure for sqlite_sequence
-- ----------------------------
DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE "sqlite_sequence" (
  "name",
  "seq"
);

-- ----------------------------
-- Records of sqlite_sequence
-- ----------------------------
INSERT INTO "sqlite_sequence" VALUES ('BorrowCard', 4);
INSERT INTO "sqlite_sequence" VALUES ('Reservation', 5);

-- ----------------------------
-- Auto increment value for BorrowCard
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 4 WHERE name = 'BorrowCard';

-- ----------------------------
-- Auto increment value for Reservation
-- ----------------------------
UPDATE "sqlite_sequence" SET seq = 5 WHERE name = 'Reservation';

PRAGMA foreign_keys = true;
