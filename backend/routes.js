const express = require("express");
const router = express.Router();
let pool = require("./databaseConnection");

//Accepts question and answers data and inserts values in poll_questions and poll_answers tables, respectively.
//Returns 200 when data is successfully inserted
//404 status code is given when there is a problem inserting new question
//500 Internal server error is returned if other errors happen
router.post("/new-poll", async (req, res) => {
  try {
    const { question, answers } = req.body;
    const insertCommand = `INSERT INTO poll_questions (question) VALUES(?);`;
    const result = await pool.execute(insertCommand, [question]);

    if (result[0].insertId) {
      await answers.forEach((element) => {
        pool.execute(
          `INSERT INTO poll_answers (answer, poll_question_id) VALUES (?, ?);`,
          [element, result[0].insertId]
        );
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err.message)
    return res.status(500);
  }
});

// Returns all existing poll questions and ids.
// Returns 500 status code and json error message if the error occurred.
router.get("/polls", async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT * FROM poll_questions ORDER BY poll_questions.id ASC;`
    );
    res.status(200).json(data[0]);
  } catch (err) {
    console.log(err.message)
    res.sendStatus(500);
  }
});

//Returns a poll details: id, question, answerIDs, answers and corresponding number of votes.
//Returns 404 if poll was not found.
//Returns 500 status code if an error occurred.
router
  .route("/polls/:id")
  .get(async (req, res) => {
    try {
      const data = await pool.query(
        `
          SELECT 
          poll_questions.question,
          poll_questions.id,
          JSON_ARRAYAGG(JSON_OBJECT(
              'answerId', poll_answers.id,
              'answer', poll_answers.answer,
              'votes', poll_answers.votes
              )
          ) AS answers
          FROM poll_questions
          INNER JOIN poll_answers 
          ON poll_questions.id = poll_answers.poll_question_id
          AND poll_questions.id = ${req.params.id}
          GROUP BY poll_questions.question;`
      );
      if (data && data[0].length > 0) {
        res.status(200).json(data[0]);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err.message)
      res.status(500);
    }
  })

//Deletes a poll question and answers based on provided question id.
//Returns 404 status code and json error message if a poll was not found
  .delete(async (req, res) => {
    try {
      await pool.query(
        `
        DELETE poll_questions,poll_answers
        FROM poll_questions 
        LEFT JOIN poll_answers ON poll_questions.id=poll_answers.poll_question_id
        WHERE poll_questions.id = ?`,
        [req.params.id]
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err.message)
      res.sendStatus(404);
    }
  });

//Increments vote number of an answer.
//AnswerId should be provided in the url to update answer votes.
//Returns 404 status code and json error message
//if there was a problem when querying and updating the answer.
router.patch("/polls/vote/:answerId", async (req, res) => {
  try {
    await pool.query(
      `UPDATE poll_answers SET votes = votes + 1 WHERE id = ?;`,
      [req.params.answerId]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message)
    res.sendStatus(404);
  }
});

module.exports = router;