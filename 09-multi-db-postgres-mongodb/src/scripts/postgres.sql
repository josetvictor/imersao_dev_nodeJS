DROP TABLE IF EXISTS tb_herois;
CREATE TABLE tb_herois (
    Id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    nome TEXT NOT NULL,
    poder TEXT NOT NULL
);

--create

INSERT INTO tb_herois (nome, poder)
VALUES 
    ('Flash', 'Speed'),
    ('Batman', 'Money'),
    ('Super-man', 'Branco')

--read
SELECT * FROM tb_herois

--update
UPDATE tb_herois
SET nome = 'wolverine'
WHERE Id = 1

--delete
DELETE FROM tb_herois
WHERE Id = 1