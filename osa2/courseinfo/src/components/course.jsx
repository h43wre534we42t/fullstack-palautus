const Course = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <>
        {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises} </p>)}
      </>
      <b>
        total of {course.parts.map(part => part.exercises).reduce((x, y) => x + y)} exercises
      </b>
    </div>
  )
}

export default Course