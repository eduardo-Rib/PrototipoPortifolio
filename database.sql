CREATE DATABASE IF NOT EXISTS portifolio;
USE portifolio;

-- Usuário do sistema (futuro login/admin)
CREATE TABLE login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
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
    nome VARCHAR(50),
    classe VARCHAR(50)
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

INSERT INTO tecnologias (nome, classe) VALUES
('Python', 'python'),
('Flask', 'flask'),
('HTML', 'html'),
('CSS', 'css'),
('MySQL', 'mysql'),
('JavaScript', 'javascript'),
('Java', 'java'),
('Ollama', 'ollama'),
('MiniCPM-V', 'minicpmv'),
('Java Effects', 'javaeffects'),
('Gemma:2b', 'gemma2b'),
('Tesseract', 'tesseract'),
('Pandas', 'pandas'),
('Mathplot', 'mathplot'),
('TypeScript', 'typescript'),
('Node', 'node'),
('PostgreSQL', 'postgresql');


INSERT INTO main (nome, introducao, imagem) VALUES (
  'Eduardo Fonseca Ribeiro',
  'Tenho 19 anos, moro em São José dos Campos e sou estudante de Análise e Desenvolvimento de Sistemas na FATEC - Prof. Jessen Vidal. Atualmente estou no 3º semestre do curso, me interesso por tecnologia, e estou em busca de aprimoramento contínuo em áreas como desenvolvimento backend e inteligência artificial.',
  '/images/self-portifolio.jpeg'
);

INSERT INTO contatos (
  emailPessoal, emailProfissional, emailAcademico, whatsapp, linkedin, github
) VALUES (
  'eduardo10122005@gmail.com',
  'eduardo@sistemapallas.com.br',
  'eduardo.ribeiro37@fatec.sp.gov.br',
  '+55 12 99608-2242',
  'https://www.linkedin.com/in/eduardo-ribeiro-4b78002b2',
  'https://github.com/eduardo-rib'
);

INSERT INTO escolaridade (titulo, instituicao, semestreAtual, semestresTotais, periodo, link) VALUES
(
  'Ensino Médio Técnico - Informática',
  'Colégio Técnico Antônio Teixeira Fernandes (Univap Centro)',
  6, 6,
  'Jan/2021 - Dez/2023 | 3 anos',
  'https://www.univap.br/colegios/unidade-centro/cursos/tecnico/informatica'
),
(
  'Ensino Superior - Análise e Desenvolvimento de Sistemas',
  'Fatec São José dos Campos – Prof. Jessen Vidal',
  3, 6,
  'Matutino',
  'https://fatecsjc-prd.azurewebsites.net/curso_ads'
);

INSERT INTO certificados (titulo, instituicao, duracao, conclusao, link) VALUES
('Introdução a Análise de Dados com Excel', 'Univap Centro', 12, '2023-03-18', '/certificados/Analise-de-dados-Excel.pdf'),
('Excel 2016 - Básico', 'Fundação Bradesco', 15, '2024-02-01', '/certificados/Excel-basico.pdf'),
('Word 2016 - Básico', 'Fundação Bradesco', 9, '2024-02-01', '/certificados/Word-basico.pdf'),
('PowerPoint 2016 - Básico', 'Fundação Bradesco', 8, '2024-02-01', '/certificados/PowerPoint-basico.pdf'),
('POO com Python', 'Fundação Bradesco', 10, '2024-11-22', '/certificados/Analise-de-dados-Excel.pdf');

INSERT INTO eventos (nome, localEvento, ano) VALUES
('10ª Maratona de Programação Júnior', 'Univap', 2021),
('11ª Maratona de Programação Júnior', 'Univap', 2022),
('12ª Maratona de Programação Júnior', 'Univap', 2023),
('Autocom', '', 2025);

INSERT INTO experiencias (empresa, cargo, dataInicio, dataFinal) VALUES
('SENTRAN', 'Jovem Aprendiz – Técnico em TI', '2024-01-01', '2024-03-31'),
('Colégio Univap Centro', 'Estagiário de Informática', '2024-08-01', '2024-12-31'),
('Sistema Pallas', 'Estagiário de suporte', '2025-02-01', NULL);

INSERT INTO ferramentas (nome, classe) VALUES
('C++', 'cpp'),
('Python', 'python'),
('Java', 'java'),
('C#', 'csharp'),
('Flask', 'flask'),
('HTML', 'html'),
('CSS', 'css'),
('JavaScript', 'javascript'),
('TypeScript', 'typescript'),
('Node.js', 'node'),
('MySQL', 'mysql');

INSERT INTO tecnicas (nome) VALUES
('Lógica de programação'),
('Redes de computadores'),
('Sistemas operacionais'),
('Hardware de computadores');

INSERT INTO softskills (nome) VALUES
('Proatividade'),
('Trabalho em Equipe'),
('Comunicação'),
('Adaptabilidade'),
('Gestão de tempo'),
('Resolução de problemas'),
('Pensamento crítico'),
('Empatia'),
('Feedback'),
('Autodisciplina'),
('Inteligência emocional'),
('Raciocínio lógico');

INSERT INTO projetos (titulo, descricao, link) VALUES
('Desafio-Universidade-Unes', 'Site sobre a universidade fictícia Unes, com responsividade, Bootstrap e SQL.', 'https://github.com/eduardo-Rib/Desafio-Universidade-Unes'),
('APIHorus', 'Site educativo sobre Scrum, com avaliações e quizzes.', 'https://github.com/m-germano/projetoAPI-horus'),
('testeOllama', 'Protótipo de extração de dados de RG via IA.', 'https://github.com/eduardo-Rib/testeOllama'),
('IdScan', 'Projeto completo de extração de RG com interface gráfica e múltiplas IAs.', 'https://github.com/eduardo-Rib/testeOllama'),
('InsightFlow', 'Limpa e analisa dados de importação/exportação do Brasil com gráficos dinâmicos.', 'https://github.com/Titus-System/InsightFlow');

INSERT INTO tecnologias (nome) VALUES
('Python'), ('Flask'), ('HTML'), ('CSS'), ('MySQL'),
('JavaScript'), ('Java'), ('Ollama'), ('MiniCPM-V'), 
('Java Effects'), ('Gemma:2b'), ('Tesseract'),
('Pandas'), ('Mathplot'), ('TypeScript'), ('Node'), ('PostgreSQL');

INSERT INTO tecnologiasProjetos (codigoProjeto, codigoTecnologia) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 2),
(2, 5),
(2, 6),
(2, 3),
(2, 4),
(3, 7),
(3, 8),
(3, 9),
(3, 5),
(4, 7),
(4, 10),
(4, 8),
(4, 11),
(4, 12),
(4, 5),
(5, 1),
(5, 2),
(5, 13),
(5, 14),
(5, 15),
(5, 6),
(5, 16),
(5, 17);

-- ADD USUÁRIO DE ADM
INSERT INTO login (email, senha, link) VALUES
('admin', '1234');