"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Courses_model_1 = __importDefault(require("../database/models/Courses.model"));
const Lessons_model_1 = __importDefault(require("../database/models/Lessons.model"));
class CoursesModel {
    constructor() {
        this.model = Courses_model_1.default;
    }
    createCourse(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.model.create({ title });
            return course;
        });
    }
    getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield this.model.findAll();
            return courses;
        });
    }
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.model.findByPk(id);
            return course;
        });
    }
    getCourseByTitle(courseTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.model.findOne({ where: { title: courseTitle } });
            return course;
        });
    }
    getCourseByLessonId(lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.model.findOne({
                include: [{
                        association: 'modules',
                        include: [{
                                model: Lessons_model_1.default,
                                where: { id: lessonId },
                            }],
                    }],
            });
            return course;
        });
    }
    getCourseByModuleId(moduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.model.findOne({
                include: {
                    association: 'modules',
                    where: { id: moduleId },
                },
            });
            return course;
        });
    }
    updateCourseById(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.model.update({ title }, { where: { id } });
            return course;
        });
    }
    deleteCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.model.destroy({ where: { id } });
            return course;
        });
    }
}
exports.default = CoursesModel;
