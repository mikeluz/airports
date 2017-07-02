const addEventHandlers = (aiportsComponent, bannerClicks) => {

  let clearInputs = [].slice.call(document.getElementsByTagName('input'));
  clearInputs.forEach(input => {
    input.addEventListener("input", (e) => {
      if (aiportsComponent.state.showTryAgain === true) {
        e.target.value = "";
      }
    });
  });

  if (document.getElementById('button')) {
    document.getElementById('button').addEventListener('mouseenter', (evt) => {
      evt.target.style.cursor = "pointer";
      evt.target.style.backgroundColor = "yellow";
    });
    document.getElementById('button').addEventListener('mouseleave', (evt) => {
      evt.target.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    });
  }

  document.addEventListener('keypress', (evt) => {
    if (evt.which === 13 && !aiportsComponent.state.badInput && !aiportsComponent.state.distance) {
      aiportsComponent.plotRoute();
    }
  });

  document.addEventListener('input', (evt) => {
    let showLists = [].slice.call(document.getElementsByTagName('ul'));
      showLists.forEach(ul => {
        if (ul.children.length > 0) {
          ul.style.display = "block";
        } else {
          ul.style.display = "none";
        }
      });
  });

  document.getElementById('banner').addEventListener('click', (evt) => {
    if (aiportsComponent.state.distance) {
      ++bannerClicks;
      if (bannerClicks === 1) {
        evt.target.innerHTML = `Distance: ${aiportsComponent.state.distance} meters`
      }
      if (bannerClicks === 2) {
        evt.target.innerHTML = `Distance: ${aiportsComponent.state.distance * 0.000621371} miles` 
      }
      if (bannerClicks === 3) {
        evt.target.innerHTML = `Distance: ${aiportsComponent.state.distance * 0.000539957} nautical miles` 
        bannerClicks = 0;
      }
    }
  });

};

const changeValue = (element, value) => {

  const event = new Event('input', { bubbles: true });
  element.value = value;
  element.dispatchEvent(event);
  
};

module.exports = {
  addEventHandlers,
  changeValue
};