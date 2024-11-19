const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {

  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  },0)

  return(
  <>
    {parts.map(value =>
      <Part key={value.id} part={value}/>
    )}
    <Total sum={total}/>
  </>
  )
}
const Course = ({ course }) => {
  
  return(
    <>
      <Header course={course.name} /> 
      <Content parts={course.parts} />
    </>
  )

}

export default Course