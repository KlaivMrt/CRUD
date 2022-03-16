export interface UserModel{
    Id: number;
    UserName: string;
    UserPassword: string;
    Email: string;
    Jwt: string;
}

export interface ProjectModel{
    Id: number;
    UserId: number;
    ProjectName: string;
    Active: number;
    Completed: number;
    Notes?: string;
    CreatedDateTime: Date;
    ComletedDateTime?: Date;
}

export interface TaskModel{
    Id: number;
    ProjectId: number;
    TaskName: string;
    Completed: number;
    Notes?: string;
    CreatedDateTime: Date;
    ComletedDateTime?: Date;
}