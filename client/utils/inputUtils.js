const togglePredictions = () => {
  [].slice.call(document.getElementsByTagName('ul'))
  .forEach(ul => {
    if (ul.children.length > 0) {
      ul.style.display = "block";
    } else {
      ul.style.display = "none";
    }
  });
};

const hideAndClearInputs = () => {
  // shrink input container to expose map so you can interact with it 
  // note this initially covers the map so as to disallow interacting with the map right away (messes with scrolling)
  document.getElementById('inputContainer').style.height = "";

	const changeValue = (element, value) => {
	  const event = new Event('input', { bubbles: true });
	  element.value = value;
	  element.dispatchEvent(event);
	};
  // hide and clear inputs
  let hideInput = document.getElementsByTagName("form")[0];
  hideInput.style.cssText = "display: none";
  let clearInputs = [].slice.call(document.getElementsByTagName('input'));
  clearInputs.forEach(input => {
    changeValue(input, "");
  });
};

module.exports = {
	togglePredictions,
	hideAndClearInputs
};
