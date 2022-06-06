const express = require("express");
const router = express.Router();
let pool = require("./databaseConnection");

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
    return res.sendStatus(500);
  }
});

router.get("/polls", async (req, res) => {
    try {
        const data = await pool.query(
            `SELECT poll_questions.question,
            poll_questions.id,
            JSON_ARRAYAGG(JSON_OBJECT(
                'answer', poll_answers.answer,
                'votes', poll_answers.votes
                )
            ) AS answers
            FROM
                poll_questions
            INNER JOIN poll_answers ON poll_questions.id = poll_answers.poll_question_id
            GROUP BY
            poll_questions.id 
                ORDER BY poll_questions.id ASC;
            `
          );
        
          res.status(200).json(data[0])
    } catch (err) {
        res.sendStatus(404)
    }
});

router.route("/polls/:id").get(async (req, res) => {
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
            FROM
                poll_questions
            INNER JOIN poll_answers ON poll_questions.id = poll_answers.poll_question_id AND poll_questions.id = ${req.params.id}
            GROUP BY
                poll_questions.question;`
      );
      if (data) {
        res.status(200).json(data[0]);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  })

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
      res.status(404).json(err.message);
    }
  });

router.patch("/polls/vote/:answerId", async (req,res) => {
    try {
        await pool.query(`UPDATE poll_answers
        SET votes = votes + 1
        WHERE id = ?;`,[req.params.answerId])
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(404);
    }
});

module.exports = router;