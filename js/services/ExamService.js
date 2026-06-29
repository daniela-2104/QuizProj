import { Exam } from "../models/Exam.js";
import { Question } from "../models/Question.js";
//רפרנס

export class ExamService {
    constructor() {
        this.storageKey = "exams";
        //שמירת מפתח
    }

    getAllExams() {
        //Get data from localStorage by exams key
        const data = localStorage.getItem(this.storageKey);

        if (!data) {
            return [];
        }

        //continue if key exsists and parse data to array of object
        const plainExams = JSON.parse(data);


        //for each examData(Exam) return new Exam object with
        //clone the data to new object to avoid direct manipulation
        let allClones = plainExams.map(examData => {
            //map = יצירת מערך חדש לפי השדות המרה של אוביקט לאוביקט אחר 
            const exam = new Exam(examData.title);

            exam.id = examData.id;
            exam.createdAt = examData.createdAt;

            //inerr clone
            exam.questions = examData.questions.map(questionData => {
                const question = new Question(
                    questionData.text,
                    questionData.answers,
                    questionData.correctAnswerIndex
                );

                question.id = questionData.id;

                return question;
                //חוזר לMAP ואז יוצר מערך מחדש 

            });

            return exam;
            //איבר בתוך השאלה 
        });

        return allClones;
    }


    saveExam(exam) {
        const exams = this.getAllExams();

        //deleteExam(exam.id) to remove old version
        exams.push(exam);

        localStorage.setItem(this.storageKey, JSON.stringify(exams));
    }


    deleteExam(examId) {
        const exams = this.getAllExams();

        const filteredExams = exams.filter(exam => exam.id !== examId);

        localStorage.setItem(this.storageKey, JSON.stringify(filteredExams));
    }

    getExamById(examId) {
        const exams = this.getAllExams();

        return exams.find(exam => exam.id === examId);
    }

    clearAllExams() {
        localStorage.removeItem(this.storageKey);
    }
}