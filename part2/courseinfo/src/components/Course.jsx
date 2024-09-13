const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ course }) => {
  return course.map((part) => <Part key={part.id} part={part} />);
};

const Part = ({ part }) => {
  return (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ course }) => {
  const total = course.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>
      {" "}
      <b>Total of {total} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content course={course.parts} />
      <Total course={course.parts} />
    </div>
  );
};

export default Course;
