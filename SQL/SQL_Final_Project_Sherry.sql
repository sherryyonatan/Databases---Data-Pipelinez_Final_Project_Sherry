--PART A
--Task 1
SELECT
    product_name,
    ROUND((unit_price * 1.17)::numeric, 2) AS price_with_vat
FROM products
ORDER BY price_with_vat DESC
LIMIT 5;

--Task 2
SELECT
    company_name,
    country,
    city
FROM customers
WHERE country IN ('Germany', 'Spain', 'Italy')
ORDER BY country ASC, company_name ASC;

--Task 3
SELECT
    product_name,
    unit_price
FROM products
WHERE (product_name LIKE 'C%' OR product_name LIKE 'G%')
    AND unit_price > 20
ORDER BY unit_price DESC;

--Task 4
SELECT
    ship_city,
    COUNT(*) AS order_count
FROM orders
GROUP BY ship_city
HAVING COUNT(*) >= 25
ORDER BY order_count DESC, ship_city ASC;

--Task 5
SELECT
    c.category_name,
    COUNT(p.product_id) AS product_count,
    ROUND(AVG(p.unit_price)::numeric, 2) AS avg_price
FROM categories c
LEFT JOIN products p
    ON c.category_id = p.category_id
GROUP BY c.category_id, c.category_name
ORDER BY avg_price DESC;

--Task 6
SELECT
    c.company_name
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL
ORDER BY c.company_name ASC;

--Task 7
SELECT
    s.company_name,
    COUNT(p.product_id) AS product_count
FROM suppliers s
JOIN products p
    ON s.supplier_id = p.supplier_id
GROUP BY s.supplier_id, s.company_name
ORDER BY product_count DESC, s.company_name ASC
LIMIT 3;

--Task 8
SELECT
    c.company_name,
    COUNT(o.order_id) AS order_count
FROM customers c
JOIN orders o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.company_name
ORDER BY order_count DESC, c.company_name ASC
LIMIT 3;


--PART B
--Task 9

--Table 1: Students
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    city VARCHAR(30)
);

--Table 2: Courses
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    max_seats INTEGER NOT NULL CHECK (max_seats > 0)
);

--Table 3: Enrollments
CREATE TABLE enrollments (
    student_id INTEGER REFERENCES students(student_id),
    course_id INTEGER REFERENCES courses(course_id),
    enrolled_on DATE DEFAULT CURRENT_DATE,
    grade INTEGER CHECK (grade BETWEEN 0 AND 100),
    PRIMARY KEY (student_id, course_id)
);

--Task 10

INSERT INTO students (student_id, full_name, email, city) VALUES
(1, 'Dana Levi', 'dana@mail.com', 'Haifa'),
(2, 'Yossi Cohen', 'yossi@mail.com', 'Tel Aviv'),
(3, 'Noa Ben-David', 'noa@mail.com', 'Haifa'),
(4, 'Omer Katz', 'omer@mail.com', 'Eilat'),
(5, 'Lior Shalom', 'lior@mail.com', 'Tel Aviv'),
(6, 'Tamar Green', 'tamar@mail.com', 'Jerusalem');

INSERT INTO courses (course_id, title, max_seats) VALUES
(1, 'SQL Basics', 20),
(2, 'Python', 15),
(3, 'Data Modeling', 10),
(4, 'JavaScript', 2);

INSERT INTO enrollments (student_id, course_id, enrolled_on, grade) VALUES
(1, 1, '2026-01-10', 88),
(1, 3, '2026-01-12', 95),
(2, 1, '2026-01-11', 72),
(2, 2, '2026-01-15', NULL),
(3, 1, '2026-01-11', 91),
(3, 2, '2026-01-20', 60),
(5, 2, '2026-01-22', 55),
(5, 3, '2026-02-01', NULL);

--Task 11
SELECT
    c.title,
    COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrollments e
    ON c.course_id = e.course_id
GROUP BY c.course_id, c.title
ORDER BY student_count DESC, c.title ASC;

--Task 12
SELECT
    s.full_name
FROM students s
LEFT JOIN enrollments e
    ON s.student_id = e.student_id
WHERE e.student_id IS NULL
ORDER BY s.full_name ASC;

--Task 13
SELECT
    c.title,
    ROUND(AVG(e.grade)::numeric, 2) AS avg_grade,
    COUNT(e.grade) AS grade_count
FROM courses c
JOIN enrollments e
    ON c.course_id = e.course_id
GROUP BY c.course_id, c.title
HAVING COUNT(e.grade) >= 2
ORDER BY avg_grade DESC;

--Task 14
SELECT
    s.full_name,
    e.grade
FROM students s
JOIN enrollments e
    ON s.student_id = e.student_id
JOIN courses c
    ON e.course_id = c.course_id
WHERE s.city = 'Haifa'
    AND c.title = 'SQL Basics'
    AND e.grade > 80
ORDER BY s.full_name ASC;

    
--Task 15
SELECT
    c.title,
    c.max_seats - COUNT(e.student_id) AS available_seats
FROM courses c
LEFT JOIN enrollments e
    ON c.course_id = e.course_id
GROUP BY c.course_id, c.title, c.max_seats
ORDER BY available_seats DESC, c.title ASC;

--Task 16
--a: הפרת UNIQUE: כתובת המייל כבר קיימת בטבלת students.
INSERT INTO students (student_id, full_name, email, city)
VALUES (7, 'Test', 'dana@mail.com', 'Haifa');
--b: הפרת FOREIGN KEY: תלמיד מספר 99 אינו קיים.
INSERT INTO enrollments (student_id, course_id, grade)
VALUES (99, 1, 80);
--c: הפרת CHECK: הציון 105 חורג מהטווח המותר 0 עד 100.
INSERT INTO enrollments (student_id, course_id, grade)
VALUES (4, 1, 105);


--PART C
--Task 17
/*
אם היינו משתמשים בINNER JOIN, תלמידים שלא נרשמו לאף קורס לא היו מופיעים.
INNER JOIN מחזיר רק רשומות שיש בינהן התאמה ב-2 הטבלאות.
*/

--Task 18
/*
COUNT(e.grade) סופר רשומות שקיים בם ציון שלא NULL.
COUNT(*) סופר את כל הרשומות גם אם הציון הוא NULL.
יש 3 נרשמים, רק ל-2 מהם יש ציון בקורס Python 
COUNT(*) היה מחזיר 3 במקום 2.
*/

--Task 19
/*
המפתח הראשי מורכב מ-student_id ו-course_id
מכוון שתלמידים יכולים להירשם למספר קורסים וכל קורס יכול לכלול מספר תלמידים,
השילוב של שתי העמודות מונע רישום כפול של אותו תלמיד לאותו קורס.
*/