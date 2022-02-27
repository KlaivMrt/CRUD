use Todo;

create table Users(
	Id int not null identity(1,1) primary key,
	UserName varchar(25) not null,
	Password varchar(25) not null,
	Email varchar(25) not null
);

create table Projects(
	Id int not null identity(1,1) primary key,
	UserId int not null,
	ProjectName varchar(25),

	foreign key (UserId)
		references Users (Id)
		on delete cascade
);

create table Tasks(
	Id int not null identity(1,1) primary key,
	ProjectId int not null,
	ProjectName varchar(25) not null,

	foreign key (ProjectId)
		references Projects (Id)
);


insert into Users (UserName, Password, Email)
	values('Klajver', '123456', 'ok');

insert into Projects (UserId, ProjectName)
	values (1, 'whatever'),
			(1, 'f#!ck Bill Gates');



insert into
	Tasks(ProjectId, TaskName)
values (3, 'OK'),
	(3, 'going well'),
	(3, 'doing better'),
	(2, 'no worries'),
	(2, 'well said'),
	(2, 'harder');
