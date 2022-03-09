create table Users(
	Id int not null identity(1,1) primary key,
	UserName varchar(15) not null constraint CN_Usera_UN check(len(UserName) > 4),
	UserPassword varchar(200) not null,
	Email varchar(40) not null
);

create table Projects(
	Id int not null identity(1,1) primary key,
	UserId int not null,
	ProjectName varchar(50) constraint CN_Projects_PN check(len(ProjectName) > 4),
	Active int not null default(1),
	Completed int not null default(0),
	Notes varchar(150),
	CreatedDateTime datetime not null,
	CompletedDateTime datetime,


	foreign key (UserId)
		references Users (Id)
		on delete cascade
);

create table Tasks(
	Id int not null identity(1,1) primary key,
	ProjectId int not null,
	TaskName varchar(20) not null constraint CN_Tasks_TN check(len(TaskName) > 4),
	Completed int not null default(0),
	Notes varchar(100),
	CreatedDateTime datetime not null,
	CompletedDateTime datetime,

	foreign key (ProjectId)
		references Projects (Id)
		on delete cascade
);

create table UserEvents(
	Id int not null identity(1,1) primary key,
	UserId int not null,
	EventName varchar(30) not null constraint CN_UserEvents check(len(EventName) > 4),
	Notes varchar(150),
	EventDateTime datetime not null,
	EstimatedEndTime time not null,
	ToBeNotified int not null default(1),

	foreign key (UserId)
		references Users (Id)
		on delete cascade
);

/*
insert into Users (UserName, UserPassword, Email)
	values('Nickolas', '123456', 'nic01@gmail.com'),
		  ('Elais', '123456', 'elais02@gmail.com'),
		  ('Damian', '123456', 'dam03@gmail.com'),
		  ('Delete', '123456', 'delete me');

insert into Projects (UserId, ProjectName, CreatedDateTime)
	values (1, 'study for history', '2022-03-07 15:00:00'),
			(1, 'complete science project', '2022-03-07 15:00:00'),
			(1, 'fix the computer', '2022-03-07 15:00:00'),
			(2, 'repaire the refrigerator', '2022-03-07 15:00:00'),
			(2, 'review math materials', '2022-03-07 15:00:00'),
			(2, 'complete the asp.net project', '2022-03-07 15:00:00'),
			(3, 'study for math test', '2022-03-07 15:00:00'),
			(3, 'fix my schedule for Saturday', '2022-03-07 15:00:00'),
			(3, 'kill my neighbour', '2022-03-07 15:00:00');

insert into Tasks(ProjectId, TaskName, CreatedDateTime)
values (1, 'World War I', '2022-03-07 15:00:00'),
	(2, 'connect cables', '2022-03-07 15:00:00'),
	(3, 'buy new ssd', '2022-03-07 15:00:00'),
	(4, 'find new motor', '2022-03-07 15:00:00'),
	(5, 'quadratic formula', '2022-03-07 15:00:00'),
	(6, 'jason web token', '2022-03-07 15:00:00'),
	(7, 'derivatives', '2022-03-07 15:00:00'),
	(8, 'woork meeting', '2022-03-07 15:00:00'),
	(9, 'buy a snipper', '2022-03-07 15:00:00');
	*/