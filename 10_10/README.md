# Project 3

An API that handles the information of a fictional store's clients, products and sales orders.

The data is stored in a MySQL database.

package.json is configured to use nodemon upon using npm start.

```sql
CREATE TABLE `clientes` (
	`id_cliente` INT(11) NOT NULL AUTO_INCREMENT,
	`nome` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`email` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`telefone` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`endereco` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id_cliente`) USING BTREE
);

CREATE TABLE `produtos` (
	`id_produto` INT(11) NOT NULL AUTO_INCREMENT,
	`nome_produto` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`preco` DECIMAL(20,6) NOT NULL,
	`estoque` INT(11) NOT NULL,
	PRIMARY KEY (`id_produto`) USING BTREE
);

CREATE TABLE `pedidos` (
	`id_pedido` INT(11) NOT NULL AUTO_INCREMENT,
	`id_cliente` INT(11) NOT NULL,
	`id_produto` INT(11) NOT NULL,
	`data_pedido` DATE NOT NULL,
	`quantidade` INT(11) NOT NULL,
	`valor_total` DECIMAL(20,6) NOT NULL,
	PRIMARY KEY (`id_pedido`) USING BTREE,
	INDEX `id_cliente` (`id_cliente`) USING BTREE,
	INDEX `id_produto` (`id_produto`) USING BTREE,
	CONSTRAINT `id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `id_produto` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id_produto`) ON UPDATE NO ACTION ON DELETE NO ACTION
);
```