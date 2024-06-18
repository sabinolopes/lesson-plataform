import { IPdfLessonService } from "../interfaces/ILessonPdfs";
import PdfLessonModel from "../models/PdfLessonModel";
import LessonsModel from "../models/LessonsModel";

class PdfLessonService implements IPdfLessonService {
  private model = new PdfLessonModel();
  private _lessonsModel = new LessonsModel();

  async insertPdf(lessonId: number, path: string, title: string) {
    try {
      const lessonExists = await this._lessonsModel.getLessonById(lessonId);
      if (!lessonExists) return { status: 'NOT_FOUND', data: { message: 'Lições não encontradas' } };
      const pdf = await this.model.insertPdf(lessonId, path, title);
      return { status: 'SUCCESSFUL', data: pdf };
    } catch (error) {
      console.log(error);
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao criar PDF' } };
    }
  }

  async getPdfsByLessonId(lessonId: number) {
    try {
      const pdf = await this.model.getPdfsByLessonId(lessonId);
      if (!pdf) return { status: 'NOT_FOUND', data: { message: 'PDF não encontrado' } };
      return { status: 'SUCCESSFUL', data: pdf };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao buscar PDF' } };
    }
  }

  async deletePdfByPath(id: number) {
    try {
      const pdf = await this.model.deletePdfByPath(id);
      if (!pdf) return { status: 'NOT_FOUND', data: { message: 'PDF não encontrado' } };
      return { status: 'SUCCESSFUL', data: { message: `PDFs deletados: ${pdf}` } };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao deletar PDF' } };
    }
  }

  async updatePdfByPath(id: number, path: string, title: string) {
    try {
      if (!path) return { status: 'BAD_REQUEST', data: { message: 'Caminho do PDF não informado' } };
      const pdf = await this.model.updatePdfByPath(id, path, title);
      if (!pdf) return { status: 'NOT_FOUND', data: { message: 'PDF não encontrado' } };
      return { status: 'SUCCESSFUL', data: path };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Falha ao atualizar PDF' } };
    }
  }
}

export default PdfLessonService;