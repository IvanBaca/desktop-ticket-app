drop database desktopticketapp;

create database desktopticketapp;
use desktopticketapp;

create table Companies(
companyid int auto_increment,
name varchar (80) unique,
service varchar(20),
primary key (companyid)) engine=InnoDB;

create table Uploaders(
uploaderid int auto_increment,
name varchar (20),
firstLastName varchar(20),
SecondLAstName varchar (20),
username varchar (20) unique,
pwdHash int,
companyid int,
primary key (uploaderid),
foreign key (companyid) references Companies(companyid)) engine=InnoDB;

create table Coupons(
couponid int auto_increment,
restrictions varchar (200),
title varchar(50),
info varchar (200),
discountPercentage int,
expiration date,
companyid int,
primary key (couponid),
foreign key (companyid) references Companies(companyid)) engine=InnoDB;