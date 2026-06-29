
export class Exam {
    constructor(title) {
        this.id = crypto.randomUUID();
        //מייצג מפתח מהשעון
        this.title = title;
        this.questions = [];
        this.createdAt = new Date().toISOString();
        //DATE מובנה ב-JS
    }

    //Get question class object (model / Question.js)
    addQuestion(question) {
        //מקבל את האוביקט שייצרנו
        this.questions.push(question);
    }

    getQuestionCount() {
        return this.questions.length;
    }
}