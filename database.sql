CREATE TABLE IF NOT EXISTS `voting_app`.`poll_questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question` TEXT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `voting_app`.`poll_answers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer` TEXT NOT NULL,
  `votes` INT DEFAULT 0 NOT NULL,
  `poll_question_id` INT NOT NULL,
  PRIMARY KEY (`id`));