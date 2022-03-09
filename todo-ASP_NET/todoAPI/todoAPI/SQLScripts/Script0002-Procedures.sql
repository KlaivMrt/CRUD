-- ====================================================================================
-- Users 
-- ====================================================================================



-------------------  Get  ----------------------


go
create procedure Get_User
(@Email varchar(40))
as
	set nocount on
	select Id, UserName, UserPassword, Email
	from Users
	where Email = @Email
go



-----------------  Add  ----------------------


go
create procedure Add_User
(
	@UserName varchar(15),
	@UserPassword varchar(200),
	@Email varchar(40)
)
as
	set nocount on
	insert into Users (UserName, UserPassword, Email)
	values (@UserName, @UserPassword, @Email);

	select Id, UserName, UserPassword, Email
	from Users
	where Email = @Email

go



-----------------  Delete  ----------------------


go
create procedure Delete_User
(
	@Email varchar(40)
)
as
	set nocount on
	delete from Users
	where Email = @Email
go

-- ====================================================================================
-- Projects
-- ====================================================================================


-----------------  Get  ----------------------
go
create procedure Get_All_Projects_By_UserId
(@UserId int)
as
	set nocount on
	select Id, UserId, ProjectName, Active, Completed, Notes, CreatedDateTime, CompletedDateTime
	from Projects
	where UserId = @UserId
go


go
create procedure Get_Project
(@ProjectId int)
as
	set nocount on
	select Id, UserId, ProjectName, Active, Completed, Notes, CreatedDateTime, CompletedDateTime
	from Projects
	where Id = @ProjectId
go



-----------------  Delete  ----------------------


go
create procedure Delete_All_Projects_By_UserId
(@UserId int)
as
	set nocount on
	delete from Projects
	where UserId = @UserId
go


go
create procedure Delete_Project
(@ProjectId int)
as
	set nocount on
	delete from Projects
	where Id = @ProjectId
go



-----------------  Add  ----------------------


go
create procedure Add_Project
(
	@UserId int,
	@ProjectName varchar(50),
	@Active int,
	@Completed int,
	@Notes varchar(150),
	@CreatedDateTime datetime,
	@CompletedDateTime datetime
)
as
	set nocount on
	insert into Projects(UserId, ProjectName, Active, Completed, Notes, CreatedDateTime, CompletedDateTime)
		values(@UserId, @ProjectName, @Active, @Completed, @Notes, @CreatedDateTime, @CompletedDateTime)
	select SCOPE_IDENTITY() as Id
go



-----------------  Put  ----------------------


go
create procedure Put_Project
(
	@Id int,
	@UserId int,
	@ProjectName varchar(50),
	@Active int,
	@Completed int,
	@Notes varchar(150),
	@CreatedDateTime datetime,
	@CompletedDateTime datetime
)
as
	set nocount on
	update Projects
	set UserId = @UserId, 
		ProjectName = @ProjectName,
		Active = @Active,
		Completed = @Completed,
		Notes = @Notes,
		CreatedDateTime = @CreatedDateTime,
		CompletedDateTime = @CompletedDateTime
	where Id = @Id;

	select Id, UserId, ProjectName, Active, Completed, Notes, CreatedDateTime, CompletedDateTime
	from Projects
	where Id = @Id
go



-- ====================================================================================
-- Tasks
-- ====================================================================================



-----------------  Get  ----------------------


go
create procedure Get_All_Tasks_By_ProjectId
(@ProjectId int)
as
	set nocount on
	select Id, ProjectId, TaskName, Completed, Notes, CreatedDateTime, CompletedDateTime
	from Tasks
	where ProjectId = @ProjectId
go


go
create procedure Get_Task
(@TaskId int)
as
	set nocount on
	select Id, ProjectId, TaskName, Completed, Notes, CreatedDateTime, CompletedDateTime
	from Tasks
	where Id = @TaskId
go



-----------------  Delete  ----------------------


go
create procedure Delete_All_Tasks_By_ProjectId
(@ProjectId int)
as
	delete from Tasks
	where ProjectId = @ProjectId
go


go
create procedure Delete_Task
(@TaskId int)
as
	set nocount on
	delete from Tasks
	where Id = @TaskId
go



-----------------  Add  ----------------------


go
create procedure Add_Task
(
	@ProjectId int,
	@TaskName varchar(20),
	@Completed int,
	@Notes varchar(100),
	@CreatedDateTime datetime,
	@CompletedDateTime datetime
)
as
	set nocount on
	insert into Tasks (ProjectId, TaskName, Completed, Notes, CreatedDateTime, CompletedDateTime)
		values (@ProjectId, @TaskName, @Completed, @Notes, @CreatedDateTime, @CompletedDateTime)
	select SCOPE_IDENTITY() as Id
go


-----------------  Put  ----------------------


go
create procedure Put_Task
(
	@Id int,
	@ProjectId int,
	@TaskName varchar(20),
	@Completed int,
	@Notes varchar(100),
	@CreatedDateTime datetime,
	@CompletedDateTime datetime
)
as
	set nocount on
	update Tasks
	set ProjectId = @ProjectId,
		TaskName = @TaskName,
		Completed = @Completed,
		Notes = @Notes,
		CreatedDateTime = @CreatedDateTime,
		CompletedDateTime = @CompletedDateTime
	where Id = @Id;

	select Id, ProjectId, TaskName, Completed, Notes, CreatedDateTime, CompletedDateTime
	from Tasks
	where Id = @Id
go
