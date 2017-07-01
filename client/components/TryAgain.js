import React from 'react';
import axios from 'axios';

class TryAgain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  onTryAgainClick() {
    var showInput = document.getElementsByTagName("form")[0];
    showInput.style.cssText = "display: unset";

    let map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.806862, lng: -96.681679},
        zoom: 4
      });
    }

    initMap();

    this.setState({
      show: false
    });
  }

  render() {
    return (
      <div>
      {
        this.state.show && <button onTryAgainClick={this.onClick.bind(this)} id="tryAgain">sdasdg</button>
      }
      </div>
    )
  }
}

export default TryAgain;