use Todo;

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
go



drop procedure if exists Add_Task;

go
create procedure Add_Task
(@ProjectId int, @TaskName varchar(25))
as
	set nocount on
	insert into Tasks (ProjectId, TaskName)
		values (@ProjectId, @TaskName)
go