// window.onscroll = function () {
//   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//   var height =
//     document.documentElement.scrollHeight -
//     document.documentElement.clientHeight;
//   var scroll = (winScroll / height) * 100;
//   document.querySelector(".scrollbar").style.width = scroll + "%";
// };

window.onscroll = function () {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scroll = (winScroll / height) * 100;
  document.querySelector(".scrollbar").style.width = scroll + "%";
};
