const React = require('react')

class Showveg extends React.Component {
  render () {
    const { name, color ,readyToEat, img} = this.props.vegtable

    return (
      <div>
        <h1> Show Page </h1>
        <div>
        The {name} is {color}.
        And {
          readyToEat ? 
            "It is ready to eat!"
          :
            "It is not ready to eat... Cant touch this"
        }
        </div>
       
        <img src={img} alt="" />
      </div>
    );
  }
}


module.exports = Showveg;






