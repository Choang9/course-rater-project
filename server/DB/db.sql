CREATE TABLE courses (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    instructor VARCHAR(50) NOT NULL
);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES courses(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

INSERT INTO courses (name, subject, instructor) VALUES ('Math 1100- Intro to Algebra', 'Mathematics', 'John Doe');
