var toggleNav = function () {
    var that = this;
    console.log(that); // <nav> element
    setTimeout(function () {
      console.log(that); // <nav> element
    }, 1000);
  };
toggleNav()