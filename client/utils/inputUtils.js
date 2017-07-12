const addInputEventListeners = (showTryAgain) => {
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
  // note: this intentionally partially covers the map initially so as to disallow interacting with the map right away (messes with scrolling)
  if (document.getElementById('inputContainer')) {
    document.getElementById('inputContainer').style.height = "";
  };

	const changeValue = (element, value) => {
	  const event = new window.Event('input', { bubbles: true });
	  element.value = value;
	  element.dispatchEvent(event);
	};
  // hide and clear inputs
  if (document.getElementsByTagName("form").length && document.getElementsByTagName('input').length) {
    let hideInput = document.getElementsByTagName("form")[0];
    hideInput.display = "none";
    let clearInputs = [].slice.call(document.getElementsByTagName('input'));
    clearInputs.forEach(input => {
      changeValue(input, "");
    });
  }
};

// extra functionality -- click on header after calculating and it cycles through three conversions of the distance value
const toggleDistance = (evt, distance, bannerClicks) => {
  if (distance) {
    ++bannerClicks;
    if (bannerClicks === 1) {
      evt.target.innerHTML = `Distance: ${distance} meters`
    }
    if (bannerClicks === 2) {
      evt.target.innerHTML = `Distance: ${distance * 0.000621371} miles` 
    }
    if (bannerClicks === 3) {
      evt.target.innerHTML = `Distance: ${distance * 0.000539957} nautical miles` 
      bannerClicks = 0;
    }
  }
  return bannerClicks;
};

module.exports = {
  addInputEventListeners,
	togglePredictions,
	hideAndClearInputs,
  toggleDistance
};
