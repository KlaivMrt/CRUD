
drop procedure if exists Delete_Project;

go
create procedure Delete_Project
(@ProjectId int)
as
	set nocount on
	delete from Projects
	where Id = @ProjectId
go


drop procedure if exists Delete_Task;

go
create procedure Delete_Task
(@TaskId int)
as
	set nocount on
	delete from Tasks
	where Id = @TaskId
go


drop procedure if exists Get_All_Projects_By_UserId;


go
create procedure Get_All_Projects_By_UserId
(@UserId int)
as
	set nocount on
	select Id, UserId, ProjectName
	from Projects
	where UserId = @UserId
go



drop procedure if exists Get_All_Tasks_By_ProjectId;

go
create procedure Get_All_Tasks_By_ProjectId
(@ProjectId int)
as
	set nocount on
	select Id, ProjectId, TaskName
	from Tasks
	where ProjectId = @ProjectId
go



drop procedure if exists Delete_All_Projects_By_UserId;

go
create procedure Delete_All_Projects_By_UserId
(@UserId int)
as
	set nocount on
	delete from Projects
	where UserId = @UserId
go



drop procedure if exists Delete_All_Tasks_By_ProjectId;

go
create procedure Delete_All_Tasks_By_ProjectId
(@ProjectId int)
as
	delete from Tasks
	where ProjectId = @ProjectId
go



drop procedure if exists Add_Project;

go
create procedure Add_Project
(
	@UserId int,
	@ProjectName varchar(25)
)
as
	set nocount on
	insert into Projects(UserId, ProjectName)
		values(@UserId, @ProjectName)
	select SCOPE_IDENTITY() as Id
go



drop procedure if exists Add_Task;

go
create procedure Add_Task
(@ProjectId int, @TaskName varchar(25))
as
	set nocount on
	insert into Tasks (ProjectId, TaskName)
		values (@ProjectId, @TaskName)
	select SCOPE_IDENTITY() as Id
go



drop procedure if exists Put_Project;

go
create procedure Put_Project
(@ProjectId int, @UserId int, @ProjectName varchar(25))
as
	set nocount on
	update Projects
	set UserId = @UserId, ProjectName = @ProjectName
	where Id = @ProjectId;

	select Id, UserId, ProjectName
	from Projects
	where Id = @ProjectId
go



drop procedure if exists Put_Task;

go
create procedure Put_Task
(@TaskId int, @ProjectId int, @TaskName varchar(25))
as
	set nocount on
	update Tasks
	set ProjectId = @ProjectId, TaskName = @TaskName
	where Id = @TaskId;

	select Id, ProjectId, TaskName
	from Tasks
	where Id = @TaskId
go



drop procedure if exists Get_Project;

go
create procedure Get_Project
(@ProjectId int)
as
	set nocount on
	select Id, UserId, ProjectName
	from Projects
	where Id = @ProjectId
go



drop procedure if exists Get_Task;

go
create procedure Get_Task
(@TaskId int)
as
	set nocount on
	select Id, ProjectId, TaskName
	from Tasks
	where Id = @TaskId
go