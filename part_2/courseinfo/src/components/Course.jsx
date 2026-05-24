const Course = ({ course }) => {
    // console.log(course[1].parts)

    return (
        <>
            <h1>Web development curriculum</h1>
            <h2>{course[0].name}</h2>
            {course[0].parts.map(part => 
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            )}
            <b>
                total of {course[0].parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises
            </b>
            <h2>{course[1].name}</h2>
            {course[1].parts.map(part => 
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            )}
            <b>
                total of {course[1].parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises
            </b>
        </>
    )
}

export default Course