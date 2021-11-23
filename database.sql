drop database desktopticketapp;

create database desktopticketapp;
use desktopticketapp;

create table Companies(
companyId int auto_increment,
name varchar (80) unique,
service varchar(20),
primary key (companyId)) engine=InnoDB;

create table Uploaders(
uploaderId int auto_increment,
name varchar (20),
firstLastName varchar(20),
secondLastName varchar (20),
username varchar (20) unique,
salt char(5),
pwdHash char(100),
companyId int,
primary key (uploaderId),
foreign key (companyId) references Companies(companyId)) engine=InnoDB;

create table Coupons(
couponId int auto_increment,
restrictions varchar (200),
title varchar(50),
info varchar (200),
discountPercentage int,
expiration date,
companyId int,
primary key (couponId),
foreign key (companyId) references Companies(companyId)) engine=InnoDB;

delimiter $$
create procedure generateHash(id int, pass text)
begin
	declare saltVal char(5);
    set saltVal = substr(md5(rand()), 1, 5);
    update uploaders set salt = saltVal where uploaderId = id;
	update uploaders set pwdhash = password(concat(pass, saltVal)) where uploaderId = id;
end
$$

drop function loginConfirmation;
delimiter $$
create function loginConfirmation(id int, pass text) returns boolean
begin
    declare conf boolean default false;
    declare saltVal char(5);
    declare hashVal char(100); 
    declare calculatedHash char(100);
    
    select salt, pwdHash into saltVal, hashVal from uploaders where uploaderId = id;
    set calculatedHash = password(concat(pass, saltVal));
    if (calculatedHash = hashVal) then
		set conf = true;
	else
		set conf = false;
    end if;
    
    return conf;
end
$$

call generateHash(1, "mypass1");
select loginConfirmation(1, "mypass1");