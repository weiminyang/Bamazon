USE bamazon;
DROP TABLE IF EXISTS departments;
CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (department_id)
)

INSERT INTO departments(department_name,over_head_costs)
VALUES("clothing",1000);
INSERT INTO departments(department_name,over_head_costs)
VALUES("electonics",1000);
INSERT INTO departments(department_name,over_head_costs)
VALUES("food",1000);
INSERT INTO departments(department_name,over_head_costs)
VALUES("sports",1000);
INSERT INTO departments(department_name,over_head_costs)
VALUES("books",1000);