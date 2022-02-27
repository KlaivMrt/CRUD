
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
	TaskName varchar(25) not null,

	foreign key (ProjectId)
		references Projects (Id)
		on delete cascade
);


insert into Users (UserName, Password, Email)
	values('Nickolas', '123456', 'nic04@gmail.com');

insert into Projects (UserId, ProjectName)
	values (1, 'study for history'),
			(1, 'complete science project');



insert into Tasks(ProjectId, TaskName)
values (1, 'WWI'),
	(1, 'WWII'),
	(1, 'cold war'),
	(2, 'connect cables'),
	(2, 'buy battery'),
	(2, 'fix the table');
