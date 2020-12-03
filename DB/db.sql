CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES courses(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

INSERT INTO reviews (course_id, name, review, rating) VALUES (1, 'Tom', 'Great course!', 5);

"select * from courses left join (select course_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by course_id) reviews on courses.id = reviews.course_id;"
