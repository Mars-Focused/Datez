INSERT INTO datez_users
(username, hash)
VALUES
($1, $2)
returning *;