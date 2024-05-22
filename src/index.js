import('./router.js');
//prevenimos que se habilite el doble click y se amplie la pantalla en iphone
document.addEventListener('dblclick', function (event) {
  event.preventDefault();
});
