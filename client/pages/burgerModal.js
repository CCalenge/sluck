var init=false;

$('#burgerMenu, .close-modal-burger').on('click', function() {

    $('.burgerContainer').toggleClass('hide');

})

$(window).on('click', function(e) {

    if (e.target !== $('.burgerContainer') && !$('.burgerContainer').hasClass('hide') && e.target.id !== 'burgerMenu') {

        $('.burgerContainer').toggleClass('hide');

    }
})


$("#profilIcon").click(function() {
  if(init==false)
  {
      $('.profilContainer').animate({ width:"+=100px" }, 300 );
      init=true;
  }else
  {
      $('.profilContainer').animate({ width:"-=100px" }, 300 );
      init=false;
  }
  });
