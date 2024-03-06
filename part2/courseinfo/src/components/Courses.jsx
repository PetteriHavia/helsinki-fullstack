
const Header = ({course}) => {
    return(
      <h2>{course.name}</h2>
    )
  }
  
  const Content = ({course}) => {
    return(
      <div>
        {course.parts.map((item) => (
          <Part key={item.id} name={item.name} exercise={item.exercises}/>
        ))}
      </div>
    )
  }
  
  const Part = ({name, exercise}) => {
    return(
      <p>{name} {exercise}</p>
    )
  }
  
  const Total = ({course}) => {
    const total = course.parts.map(item => item.exercises).reduce((prev, next) => prev + next)
    return(
      <h3>Total of {total} exercises</h3>
    )
  }

const Course = ({courses}) => {
    return(
        <>
        <Header course={courses}/>
        <Content course={courses}/>
        <Total course={courses}/>
        </>
    )
}

export default Course;





  
  