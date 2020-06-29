create table if not exsists testdb.users (
	"id" int not null AUTO_INCREMENT,
	"user_name" varchar(45) null,
	"password" varchar(45) null,
	primary key("id")
);