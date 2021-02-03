DROP TABLE IF EXISTS datez_ideas;
DROP TABLE IF EXISTS datez_companions;
DROP TABLE IF EXISTS datez_users;

CREATE TABLE datez_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(250) UNIQUE NOT NULL,
    hash VARCHAR(500) NOT NULL
);

CREATE TABLE datez_companions (
    companion_id SERIAL PRIMARY KEY,
    receiver_id INT REFERENCES datez_users (id),
    sender_id INT REFERENCES datez_users (id)
);

CREATE TABLE datez_ideas (
    idea_id SERIAL PRIMARY KEY,
    companion_id INT REFERENCES datez_companions (companion_id),
    date_idea VARCHAR(300)
);

INSERT INTO datez_users
(username, hash)
VALUES
('Rodger Rabbit', '$2a$10$fwQ33X5CVGmQhgXJL1UuF.NeuQWj5haKMXsOxNxj4/rRiv6/jWwDW'),
('Jessica Rabbit', '$2a$10$fwQ33X5CVGmQhgXJL1UuF.NeuQWj5haKMXsOxNxj4/rRiv6/jWwDW'),
('Mario', '$2a$10$fwQ33X5CVGmQhgXJL1UuF.NeuQWj5haKMXsOxNxj4/rRiv6/jWwDW'),
('Bowser', '$2a$10$fwQ33X5CVGmQhgXJL1UuF.NeuQWj5haKMXsOxNxj4/rRiv6/jWwDW'),
('Peach', '$2a$10$fwQ33X5CVGmQhgXJL1UuF.NeuQWj5haKMXsOxNxj4/rRiv6/jWwDW'),
('Katie', '$2a$10$fwQ33X5CVGmQhgXJL1UuF.NeuQWj5haKMXsOxNxj4/rRiv6/jWwDW');

INSERT INTO datez_companions
(receiver_id, sender_id)
VALUES
(3,5),
(4,5),
(1,2),
(4,2),
(2,5);
-- 1 Rodger
-- 2 Jessica
-- 3 Mario
-- 4 Bowser
-- 5 Peach
-- 6 Holly

INSERT INTO datez_ideas
(companion_id, date_idea)
VALUES
(1, 'Mario Kart'),
(1, 'Tennis'),
(1, 'SmashBros'),
(1, 'Mario Party'),
(2, 'Mario Kart'),
(2, 'Tennis'),
(2, 'Mario Kart'),
(2, 'Kidnapping'),
(3, 'Pattycake'),
(3, 'Picnic'),
(4, 'Kidnapping'),
(4, 'Pattycake');
-- 1 Mario, Peach
-- 2 Bowser, Peach
-- 3 Rodger, Jessica
-- 4 Jessica, Bowser
-- 5 Jessica, Peach