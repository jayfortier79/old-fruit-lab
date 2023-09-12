const React = require("react")


class vegIndex extends React.Component {
  render() {
    const { vegtables } = this.props
    return(
      <div>
        <h1> Vegtables Index Page! </h1>
        <nav>
          <a href="/vegtables/new">Create a New Vegtable</a>
        </nav>
        <ul>
          {
            vegtables.map((vegtable, i) => {
              return (
                <li key={i}>
                  The{' '}
                    <a href={`/vegtables/${vegtable._id}`}>
                      {vegtable.name}
                    </a>
                    {' '}
                    is {vegtable.color} <br></br>
                    {
                      vegtable.readyToEat ? 
                        `It is ready to eat`
                      : 
                        `It is not ready to eat`
                    }
                                      <br />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

module.exports = vegIndex