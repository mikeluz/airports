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

module.exports = togglePredictions;
