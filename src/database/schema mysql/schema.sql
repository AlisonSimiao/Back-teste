drop database
  if exists database_stock
create database
  database_stock;

drop table
  if exists Categorias;

create table
  Categorias(
    id int AUTO_INCREMENT,
    codigo varchar(20),
    titulo varchar(50),
    status boolean,
    PRIMARY KEY (id)
  );

drop table
  if exists Produtos;

create table
  Produtos(
    id int AUTO_INCREMENT,
    idCategoria int,
    codigo varchar(20),
    nome varchar(50),
    descricao text,
    valor decimal,
    status boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (idCategoria) REFERENCES Categorias(id)
  );

drop table
  if exists Estoque;

create table
  Estoque(
    id int AUTO_INCREMENT,
    idProduto int,
    quantidade int,
    reserva int,
    status boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (idProduto) REFERENCES Produtos(id)
  );