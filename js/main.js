
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

  if (customeSelect[0]) {
    customeSelect.forEach(element => {
      let selectedOption = element.querySelector('._custome-select-original');

      if (selectedOption) {
        selectedOption = selectedOption.querySelector('option[selected]');
        if (selectedOption) {
          let customeSelectOption = element.querySelector(`[data-option="${selectedOption.value}"]`),
            customeSelectSelected = element.querySelector('._custome-select-selected');

          if (customeSelectOption) {
            customeSelectOption.classList.add('_selected');
            if (customeSelectSelected) customeSelectSelected.textContent = customeSelectOption.textContent
          }


        }
      }

    })
  }
}

customeSelectInit();


let slideUp = (target, duration=500) => {
  
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.classList.remove('_active');
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    dropDownCheck=true;
  }, duration);
}

let slideDown = (target, duration=500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    dropDownCheck=true;
    target.classList.add('_active');
  }, duration);
}


const body = document.querySelector('body'),
  html = document.querySelector('html'),
  menu = document.querySelectorAll('._burger, .header__nav, body'),
  burger = document.querySelector('._burger'),
  header = document.querySelector('.header');



let thisTarget, dropDownCheck = true;
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

    if (!customeSelectSelected.classList.contains('_active')) {
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

    if (customeSelect) {
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
  if (messageClose) {

    let message = messageClose.closest('._min-message');

    if (message) {
      message.classList.add('_removing');
      setTimeout(() => {
        message.remove();
      }, 1000);
    }

  }



  let dropDownToggle = thisTarget.closest('._drop-down-toggle');
  if (dropDownToggle) {

    let dropDownBody      = dropDownToggle.closest('._drop-down-body'),
        dropDownContent   = (dropDownBody) ? dropDownBody.querySelector('._drop-down-content') : false;

    if (dropDownContent) {
      if(dropDownContent.classList.contains('_active') && dropDownCheck) {
        dropDownCheck = false;
        //dropDownContent.classList.remove('_active');
        slideUp(dropDownContent);
      } else if(!dropDownContent.classList.contains('_active') && dropDownCheck) {
        dropDownCheck = false;
        //dropDownContent.classList.add('_active');
        slideDown(dropDownContent);
      }
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

    }, 1000);

  });

}

timer();


function buyTimer() {

  const timerElems = document.querySelectorAll('._timer-buy');

  let deadline;

  timerElems.forEach(timerElem => {

    deadline = new Date(

      timerElem.getAttribute('data-timer-year'),
      timerElem.getAttribute('data-timer-month') - 1,
      timerElem.getAttribute('data-timer-day'),
      timerElem.getAttribute('data-timer-hour'),
      timerElem.getAttribute('data-timer-minute'));

    let timerDay = timerElem.querySelector('._timer-buy-day'),
      timerHour = timerElem.querySelector('._timer-buy-hour'),
      timerMin = timerElem.querySelector('._timer-buy-min'),
      timerSec = timerElem.querySelector('._timer-buy-sec');


    setInterval(() => {

      const diff = deadline - new Date(),

        days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0,
        hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
        seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0,
        minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;

      if (timerDay) {
        let value = timerDay.querySelector('._timer-buy-value');
        if (value) value.textContent = (days > 9) ? days : '0' + days;
      }

      if (timerHour) {
        let value = timerHour.querySelector('._timer-buy-value');
        if (value) value.textContent = (hours > 9) ? hours : '0' + hours;
      }

      if (timerMin) {
        let value = timerMin.querySelector('._timer-buy-value');
        if (value) value.textContent = (minutes > 9) ? minutes : '0' + minutes;
      }

      if (timerSec) {
        let value = timerSec.querySelector('._timer-buy-value');
        if (value) value.textContent = (seconds > 9) ? seconds : '0' + seconds;
      }

    }, 1000);

  });

}

buyTimer();






function customeRange() {
  const range = document.querySelectorAll('._input-range');

  if (range[0]) {
    range.forEach(thisRange => {

      let rangeBody = thisRange.closest('._input-range-body'),
          rangeElem = rangeBody.querySelector('._input-range-elem');

      let start     = Number(thisRange.dataset.start),
          step      = Number(thisRange.getAttribute('step')),
          min       = Number(thisRange.getAttribute('min')),
          max       = Number(thisRange.getAttribute('max')),
          currency  = thisRange.dataset.currency;


      try {

        const rangeSlider = noUiSlider.create(rangeElem, {
          tooltips: true,

          start: [start],
          connect: 'lower',

          step: step,
          range: {
            'min': min,
            'max': max,
          },

          format: {
            to: function (value) {
              let valueString = Math.round(value).toString(),
                rangeMin = document.querySelector('.range-value-min');

                thisRange.setAttribute('value', valueString);

                if(rangeMin) rangeMin.textContent = `${valueString} ${currency}`;
                return valueString;

              /* if (valueString.length == 4) {
                valueResult = valueString.slice(0, 1) + " " + valueString.slice(1);
              } else if (valueString.length == 5) {
                valueResult = valueString.slice(0, 2) + " " + valueString.slice(2);
              } else if (valueString.length == 6) {
                valueResult = valueString.slice(0, 3) + " " + valueString.slice(3);
              }
              return (valueResult) ? valueResult : valueString; */

            },
            from: function (value) {
              rangeElem.insertAdjacentHTML('beforeend',

                `<span class="range-value range-value-min">${Number(thisRange.value)} ${currency}</span>
                 <span class="range-value range-value-max">${Number(thisRange.getAttribute('max'))} ${currency}</span>`)

              return Math.round(value);
            }
          }

        });

        thisRange.classList.add('_custome-slider-active');

      } catch { }


    })
  }

}

customeRange();
/* 
const range = document.querySelector('.filter__price--range'),
  filterRangeBody = document.querySelector('.filter__price--range-body'),
  filterPriceMin = document.querySelector('.filter__price--value._min-value'),
  filterPriceMax = document.querySelector('.filter__price--value._max-value'),
  filterRangeValue = document.querySelector('.filter__price--range-value');
try {

  const filterRangeSlider = noUiSlider.create(filterRangeBody, {
    tooltips: true,

    start: [Number(filterRange.getAttribute('data-start'))],
    connect: 'lower',

    step: Number(filterRange.getAttribute('step')),
    range: {
      'min': Number(filterRange.getAttribute('min')),
      'max': Number(filterRange.getAttribute('max')),
    },

    format: {
      to: function (value) {
        let valueString = Math.round(value).toString(),
          valueResult = '';

        filterRange.setAttribute('value', valueString);

        if (valueString.length == 4) {
          valueResult = valueString.slice(0, 1) + " " + valueString.slice(1);
        } else if (valueString.length == 5) {
          valueResult = valueString.slice(0, 2) + " " + valueString.slice(2);
        } else if (valueString.length == 6) {
          valueResult = valueString.slice(0, 3) + " " + valueString.slice(3);
        }
        return (valueResult) ? valueResult : valueString;

      },
      from: function (value) {
        filterRangeBody.insertAdjacentHTML('beforeend',

          `<span class="range-value range-value-min">${Number(filterRange.getAttribute('min'))}</span>
          <span class="range-value range-value-max">${Number(filterRange.getAttribute('max'))}</span>`)

        return Math.round(value);
      }
    }

  });

  filterRange.classList.add('_custome-slider-active');

} catch { }

// } */


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
