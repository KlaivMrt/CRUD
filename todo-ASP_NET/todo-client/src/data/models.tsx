export interface UserModel{
    id: number;
    userName: string;
    userPassword: string;
    email: string;
    jwt: string;
}

export interface ProjectModel{
    id: number;
    userId: number;
    projectName: string;
    active: number;
    completed: number;
    notes?: string;
    createdDateTime: Date;
    comletedDateTime?: Date;
}

export interface TaskModel{
    id: number;
    projectId: number;
    taskName: string;
    completed: number;
    notes?: string;
    createdDateTime: Date;
    comletedDateTime?: Date;
}