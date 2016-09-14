$('#burgerMenu, .close-modal-burger').on('click', function() {

    $('.burgerContainer').toggleClass('hide');

})

$(window).on('click', function(e) {

    if (e.target !== $('.burgerContainer') && !$('.burgerContainer').hasClass('hide') && e.target.id !== 'burgerMenu') {

        $('.burgerContainer').toggleClass('hide');

    }
})
