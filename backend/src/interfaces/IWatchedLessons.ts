import WatchedLessonSequelize from "../database/models/WatchedLessons";
import { Request, Response } from "express";
import { ServiceResponse } from "../types/Service.response";

export interface IWatchedLessons {
  id: number;
  lessonId: number;
  moduleId: number;
  userId: number;
  watched: boolean;
}

export interface IWatchedLessonsModel {
  findWatchedLessonsByUserIdAndModuleId(userId: number, moduleId:number, watched: boolean): Promise<WatchedLessonSequelize[]>;
  updateWatchedLesson(userId: number, lessonId: number, watched:boolean): Promise<number>;
}

export interface IWatchedLessonsService {
  requestWatchedLessonsByUserIdAndModuleId(userId: number, moduleId:number, watched:boolean): Promise<ServiceResponse<WatchedLessonSequelize[]>>;
  updateWatchedLesson(userId: number, lessonId: number, watched:boolean): Promise<any>;
}

export interface IWatchedLessonsController {
  requestWatchedLessonsByUserIdAndModuleId(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
  requestUpdateWatchedLesson(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}