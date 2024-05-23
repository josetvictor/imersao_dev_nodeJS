# Multi DB

Nessa seção, irei configurar o uso de mais de um banco para projetos nodejs. O que no c#/.net da para fazer com injeção de depencia, irei fazer utilizando o padrão de projeto Strategy, onde o objetivo é criar um contrato do que deve implementar, então nosso serviço tera acesso ao contrato e vamos poder passar via parametro qual estrategia vamos usar. Servirar de base para a construção de uma aplicação utilizando orms. 

Nesse exemplo estarei criando duas formas de persistir em um banco de dados, uma estrategia será usando o PostgreSQL e a outra usando o Mongodb.
