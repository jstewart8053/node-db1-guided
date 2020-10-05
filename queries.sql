select * from product;

--view a list of employees
select * from employee;

-- selecting specific column
select id, productName, supplierID
from product;

select firstName, lastName, title from employee;

-- add the electronics and books categories
insert into category (CategoryName, Description)
values ('Electronics', 'Anything that uses electricity or batteries'),
('Books', 'For those hungry for knowledge');

--like operator records
select * from category
--update category set description = 'Cool gadgets'
where id = 9
--remove data
delete from category where id = 7;

select *
from category
order by categoryName, description desc;

select *
from employee
order by city, lastName, firstName;
