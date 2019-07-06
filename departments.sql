USE bamazon;
DROP TABLE IF EXISTS departments;
CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(8,2) NOT NULL,
    PRIMARY KEY (department_id)
)
