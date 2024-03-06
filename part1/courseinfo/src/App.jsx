function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  //------//
  const Header = (props) => {
    return(
      <p>{props.course.name}</p>
    )
  }

  
  const Content = (props) => {
    return(
      <div>
        {props.course.parts.map((item) => (
          <Part key={item.name} name={item.name} exercise={item.exercises}/>
        ))}
      </div>
    )
  }

  const Part = (props) => {
    return(
      <p>{props.name} {props.exercise}</p>
    )
  }

  const Total = (props) => {
    return(
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    )
  }


  return (
     <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App
