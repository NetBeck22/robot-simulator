export const FEEDBACK_TYPE = {
  LOOP: "Een loop is te groot, die wordt meer dan 10 keer uitgevoerd!<br>",
  EDGE: "Pas op je rijdt ergens tegen!<br>",
  VAR: "Je probeert een variabele te wijzigen, maar dit kan enkel met nummers!<br>",
};

/**
 * Feedback
 * ---------------
 * holds a list with FEEDBACK_TYPES, this represents all the mistakes in the programme
 *
 * Methods
 * -------------------
 * - emptyList() : when starting a run or debug the feedback needs to be emptied
 * - addFeedback(item) : adds feedback to the list (item is a FEEDBACK_TYPE)
 * - getFeedback() : return all the feedback in one string
 */
export class Feedback {
  #_currentFeedback;

  constructor() {
    this.#_currentFeedback = new Array();
  }

  emptyList() {
    while (this.#_currentFeedback.length > 0) {
      this.#_currentFeedback.pop();
    }
    document.getElementById("feedbackDiv").style.display = "none";
  }

  addFeedback(item) {
    this.#_currentFeedback.push(item);
    document.getElementById("feedback").innerHTML = this.getFeedback();
    document.getElementById("feedbackDiv").style.display = "block";
  }

  getFeedback() {
    var txt = "";
    this.#_currentFeedback.forEach((element) => {
      txt += element;
    });
    return txt;
  }
}
