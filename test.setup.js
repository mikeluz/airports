require('babel-register')();

 const { JSDOM } = require('jsdom');
 const jsdom = new JSDOM(`<body>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJJ4zQXgdDc2gJfyGy746iBpoGBgSbdp8"></script>
</body>`, { runScripts: "dangerously" });
 const { window } = jsdom;
 
 function copyProps(src, target) {
   const props = Object.getOwnPropertyNames(src)
     .filter(prop => typeof target[prop] === 'undefined')
     .map(prop => Object.getOwnPropertyDescriptor(src, prop));
   Object.defineProperties(target, props);
 }
 
 global.window = window;
 global.document = window.document;
 global.navigator = {
   userAgent: 'node.js'
 };
 copyProps(window, global);