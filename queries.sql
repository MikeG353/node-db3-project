-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT CategoryName, ProductName FROM Category
JOIN Product on Product.CategoryId = Category.Id
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT Id, CompanyName From [Order]
JOIN Shipper on Shipper.Id = [Order].ShipVia
WHERE OrderDate < '2012-08-09'
-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT ProductName, Quantity FROM OrderDetail
JOIN Product on Product.Id = OrderDetail.ProductId
WHERE OrderDetail.OrderId = '10251'
ORDER BY ProductName
-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT [Order].Id as 'Order Id', CompanyName, LastName as 'Employee Last Name' FROM Customer
JOIN [Order] on Customer.Id = [Order].CustomerId
JOIN Employee on [Order].EmployeeId = Employee.Id