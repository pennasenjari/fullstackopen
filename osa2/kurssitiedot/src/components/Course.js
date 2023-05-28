const Header = ({name}) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, i) => {     
        return (<Part key={part.id} part={part} />) 
      })}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce( (accumulator, part) => 
    accumulator + part.exercises, 0
  )

  return (
    <p><b>Total of {total} excercises</b></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course