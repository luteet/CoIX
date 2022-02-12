
function copyToClipboard(el) {

  // resolve the element
  el = (typeof el === 'string') ? document.querySelector(el) : el;

  // handle iOS as a special case
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

    // save current contentEditable/readOnly status
    var editable = el.contentEditable;
    var readOnly = el.readOnly;

    // convert to editable with readonly to stop iOS keyboard opening
    el.contentEditable = true;
    el.readOnly = true;

    // create a selectable range
    var range = document.createRange();
    range.selectNodeContents(el);

    // select the range
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);

    // restore contentEditable/readOnly to original state
    el.contentEditable = editable;
    el.readOnly = readOnly;
  }
  else {
    navigator.clipboard.writeText(el.value)
      .then(() => {

      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
    el.select();
  }

  // execute copy command
  document.execCommand('copy');
}

function customeAccentSelectRemove() {
  document.querySelectorAll('._accent-select-list').forEach(element => {
    element.classList.remove('_active');
  });

  document.querySelectorAll('._accent-select-open-btn').forEach(element => {
    element.classList.remove('_active');
  });
}

function customeSelectRemove() {
  document.querySelectorAll('._custome-select-list').forEach(element => {
    element.classList.remove('_active');
  });

  document.querySelectorAll('._custome-select-selected').forEach(element => {
    element.classList.remove('_active');
  });
}

function customeSelectInit() {
  let customeSelect = document.querySelectorAll('._custome-select');

  if(customeSelect[0]) {
    customeSelect.forEach(element => {
      let selectedOption = element.querySelector('._custome-select-original');

      if(selectedOption) {
        selectedOption = selectedOption.querySelector('option[selected]');
        if(selectedOption) {
          let customeSelectOption     = element.querySelector(`[data-option="${selectedOption.value}"]`),
              customeSelectSelected   = element.querySelector('._custome-select-selected');

          if(customeSelectOption) {
            customeSelectOption.classList.add('_selected');
            if(customeSelectSelected) customeSelectSelected.textContent = customeSelectOption.textContent
          } 
          

        }
      }

    })
  }
}

customeSelectInit();


const body = document.querySelector('body'),
  html = document.querySelector('html'),
  menu = document.querySelectorAll('._burger, .header__nav, body'),
  burger = document.querySelector('._burger'),
  header = document.querySelector('.header');



let thisTarget;
body.addEventListener('click', function (event) {

  thisTarget = event.target;


  let btnToScroll = thisTarget.closest('._btn-to-scroll');
  if (btnToScroll) {
    event.preventDefault();
    let section;

    try {
      section = document.querySelector(btnToScroll.getAttribute('href'))
    } catch {
      section = false;
    }

    menu.forEach(elem => {
      elem.classList.remove('_active')
    })

    window.scroll({
      left: 0,
      top: (section) ? section.offsetTop : 0,
      behavior: 'smooth'
    })

  }



  let accentSelectOpenBtn = thisTarget.closest('._accent-select-open-btn');
  if (accentSelectOpenBtn) {
    event.preventDefault();

    customeAccentSelectRemove();

    let accentSelect = accentSelectOpenBtn.closest('._accent-select'),
      accentSelectList = (accentSelect) ? accentSelect.querySelector('._accent-select-list') : false;

    if (accentSelectList) {

      if (accentSelectList.classList.contains('_active')) {
        accentSelectList.classList.remove('_active');
        accentSelectOpenBtn.classList.remove('_active');
      } else {
        accentSelectList.classList.add('_active');
        accentSelectOpenBtn.classList.add('_active');
      }

    }

  } else if (thisTarget.closest('._accent-select-option')) {

    let accentSelectOption = thisTarget.closest('._accent-select-option'),
      accentSelect = accentSelectOption.closest('._accent-select'),
      accentSelectElem = (accentSelect) ? accentSelect.querySelector('._accent-select-elem') : false;

    customeAccentSelectRemove();

    if (accentSelectElem) accentSelectElem.value = accentSelectOption.dataset.option;

  } else if (!thisTarget.closest('._accent-select')) {

    customeAccentSelectRemove();

  }



  let customeSelectSelected = thisTarget.closest('._custome-select-selected');
  if (customeSelectSelected) {
    event.preventDefault();

    if(!customeSelectSelected.classList.contains('_active')) {
      customeSelectRemove();
    }
    
    let customeSelect = customeSelectSelected.closest('._custome-select'),
        customeSelectList = (customeSelect) ? customeSelect.querySelector('._custome-select-list') : false;

    if (customeSelectList) {

      if (!customeSelectList.classList.contains('_active')) {

        customeSelectList.classList.add('_active');
        customeSelectSelected.classList.add('_active');

      } else {
        
        customeSelectList.classList.remove('_active');
        customeSelectSelected.classList.remove('_active');

      }

    }

  } else if (thisTarget.closest('._custome-select-option')) {

    let customeSelectOption = thisTarget.closest('._custome-select-option'),
        customeSelect = customeSelectOption.closest('._custome-select'),
        customeSelectSelected = (customeSelect) ? customeSelect.querySelector('._custome-select-selected') : false,
        customeSelectOriginal = (customeSelect) ? customeSelect.querySelector('._custome-select-original') : false;

    if(customeSelect) {
      customeSelect.querySelectorAll('._custome-select-option').forEach(element => {
        element.classList.remove('_selected');
      })

      customeSelectOption.classList.add('_selected');
    }

    customeSelectRemove();

    if (customeSelectOriginal) customeSelectOriginal.value = customeSelectOption.dataset.option;
    if (customeSelectSelected) customeSelectSelected.textContent = customeSelectOption.textContent;

  } else if (!thisTarget.closest('._custome-select')) {

    customeSelectRemove();

  }
  


  let closePopup = thisTarget.closest('._close-header-popup');
  if (closePopup) {

    let activeHeaderPopup = document.querySelectorAll('._header-popup._active');

    if (activeHeaderPopup[0]) {

      activeHeaderPopup.forEach(element => {
        element.classList.remove('_active');
      })

    }
  }



  let openHeaderPopup = thisTarget.closest('._open-header-popup');
  if (openHeaderPopup) {
    event.preventDefault();

    let headerPopup;

    try {
      headerPopup = document.querySelector(openHeaderPopup.getAttribute('href'));
    } catch {
      headerPopup = false;
    }

    if (headerPopup) {
      if (!headerPopup.classList.contains('_active')) {
        headerPopup.classList.add('_active');
      } else {
        headerPopup.classList.remove('_active');
      }

    }

  }



  let connectWalletBtn = thisTarget.closest('._connect-wallet-btn');
  if (connectWalletBtn) {

    let connectWalletBody = connectWalletBtn.closest('._connect-wallet-body'),
        connectWalletSelect = (connectWalletBody) ? connectWalletBody.querySelector('._connect-wallet-select') : false;

    if (connectWalletSelect) {
      connectWalletSelect.value = connectWalletBtn.dataset.option;
    }

  }



  let copyBtn = thisTarget.closest('._copy-input-btn');
  if (copyBtn) {
    event.preventDefault();

    let input = copyBtn.parentNode.querySelector('._copy-input');

    if (input) {

      copyToClipboard(input)

    }

  }



  let messageClose = thisTarget.closest('._min-message-close');
  if(messageClose) {

    let message = messageClose.closest('._min-message');
    
    if(message) {
      message.classList.add('_removing');
      setTimeout(() => {
        message.remove();
      },1000);
    }

  }

})


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=
/*
let slider = new Swiper('.__slider', {

    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: false,

    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        centeredSlides: true,

      },
      600: {
        slidesPerView: 2,
        centeredSlides: false,
      },
    }
});
*/
// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


function timer() {

  const timerElems = document.querySelectorAll('._timer');
  
  let deadline;
  
  timerElems.forEach(timerElem => {

      deadline = new Date(

          timerElem.getAttribute('data-timer-year'),
          timerElem.getAttribute('data-timer-month') - 1,
          timerElem.getAttribute('data-timer-day'),
          timerElem.getAttribute('data-timer-hour'),
          timerElem.getAttribute('data-timer-minute'));

          setInterval(() => {
  
            const diff = deadline - new Date(),
            
                days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0,
                hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
                seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0,
                minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    
          timerElem.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

          },1000);

  });

}

timer();



/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
