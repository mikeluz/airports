const addEventHandlers = (aiportsComponent, bannerClicks) => {
  // clear and toggle inputs
  // needed to use vanilla JS to work with the nexted input elements in the AutoComplete npm component
  let clearInputs = [].slice.call(document.getElementsByTagName('input'));
  clearInputs.forEach(input => {
    input.addEventListener("input", (e) => {
      if (aiportsComponent.state.showTryAgain === true) {
        e.target.value = "";
      }
    });
  });
  // dropdown toggles
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
};

module.exports = addEventHandlers;