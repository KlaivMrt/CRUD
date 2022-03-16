export interface ProjectDto{
    UserId: number;
    ProjectName: string;
    Active: number;
    Completed: number;
    Notes?: string;
    CreatedDateTime: Date;
    ComletedDateTime?: Date;
}

export interface TaskDto{
    ProjectId: number;
    TaskName: string;
    Completed: number;
    Notes?: string;
    CreatedDateTime: Date;
    ComletedDateTime?: Date;
}