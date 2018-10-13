import React from 'react';
import '../App.css';
// import { connect } from 'react-redux';

export const Menu = (props) => {
  return (
    <div className="main-menu">
      <h3 className="menu-heading">My List</h3>
      <ul className="locations-list">
        { props.locations.map(city=><li key={ city.position.lat }>{ city.name }</li>) }
      </ul>
    </div>
  )
}
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectCity: ()=>{
//       console.log(event.target)
//     }
//   }
// }

// export default connect(null,mapDispatchToProps)(Menu)
