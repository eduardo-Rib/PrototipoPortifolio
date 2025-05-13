CREATE DATABASE IF NOT EXISTS portifolio;
USE portifolio;

-- Usuário do sistema (futuro login/admin)
CREATE TABLE login (
    email VARCHAR(100) PRIMARY KEY,
    senha VARCHAR(100) NOT NULL
);

-- Dados principais (introdução)
CREATE TABLE main (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    introducao VARCHAR(1000),
    imagem VARCHAR(500)
);

-- Contatos
CREATE TABLE contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    emailPessoal VARCHAR(100),
    emailProfissional VARCHAR(100),
    emailAcademico VARCHAR(100),
    whatsapp VARCHAR(50),
    linkedin VARCHAR(100),
    github VARCHAR(100)
);

-- Projetos
CREATE TABLE projetos (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    descricao VARCHAR(1000),
    link VARCHAR(200)
);

-- Tecnologias
CREATE TABLE tecnologias (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50)
);

-- Relação N:N entre projetos e tecnologias
CREATE TABLE tecnologiasProjetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigoProjeto INT,
    codigoTecnologia INT,
    FOREIGN KEY (codigoProjeto) REFERENCES projetos(codigo) ON DELETE CASCADE,
    FOREIGN KEY (codigoTecnologia) REFERENCES tecnologias(codigo) ON DELETE CASCADE
);

-- Escolaridade
CREATE TABLE escolaridade (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    instituicao VARCHAR(100),
    semestreAtual INT,
    semestresTotais INT,
    periodo VARCHAR(50),
    link VARCHAR(200)
);

-- Certificados
CREATE TABLE certificados (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    instituicao VARCHAR(100),
    duracao INT,
    conclusao DATETIME,
    link VARCHAR(200)
);

-- Eventos
CREATE TABLE eventos (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    localEvento VARCHAR(100),
    ano INT
);

-- Experiência profissional
CREATE TABLE experiencias (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    empresa VARCHAR(100),
    cargo VARCHAR(100),
    dataInicio DATETIME,
    dataFinal DATETIME
);

-- Ferramentas
CREATE TABLE ferramentas (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    classe VARCHAR(50)
);

-- Técnicas
CREATE TABLE tecnicas (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50)
);

-- Soft Skills
CREATE TABLE softskills (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50)
);