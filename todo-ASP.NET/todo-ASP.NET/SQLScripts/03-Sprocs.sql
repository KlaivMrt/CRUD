drop procedure if exists Get_User;

go
create procedure Get_User
(@Email varchar(25))
as
	set nocount on
	select UserName, Password, Email
	from Users
	where Email = @Email
go