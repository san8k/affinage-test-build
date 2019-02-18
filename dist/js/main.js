(function () {
    'use strict';

    const slidesList = document.querySelector('#slides')
                               .content
                               .querySelectorAll('.slide');

    const sliderFirst = document.querySelector('.slider--first');
    const sliderSecond = document.querySelector('.slider--second');
    const buttonNext = sliderSecond.querySelector(`.slider__button--next`);
    const buttonPrev = sliderSecond.querySelector(`.slider__button--prev`);

    const appendSlide = (container, slide) => {
        let oldSlide = container.querySelector('.slide');
        if (oldSlide) {
            container.removeChild(oldSlide);
        }
        container.appendChild(slide);
        slide.classList.add(`fade-in`);
    };

    let currentSlide = 1;

    const changeSlide = (nextIndexDelta) => {
        const previousMainSlide = currentSlide;

        const secondSlide = sliderSecond.querySelector(`.slide`);
        
        currentSlide += +nextIndexDelta;
        if (currentSlide >= slidesList.length) {
            currentSlide = 0;
        }
        if (currentSlide < 0) {
            currentSlide = slidesList.length - 1;
        }

        function onSecondSlideAnimationEnd() {
        
            this.removeEventListener(`animationend`, onSecondSlideAnimationEnd);
            this.classList.remove(`fade-out`);
            appendSlide(sliderSecond, slidesList[currentSlide]);

            setTimeout(() => {
                appendSlide(sliderFirst, slidesList[previousMainSlide]);
            },300);

        }

        secondSlide.classList.remove(`fade-in`);
        secondSlide.classList.add(`fade-out`);
        secondSlide.addEventListener(`animationend`, onSecondSlideAnimationEnd);
        
    };

    const bindSliderButtons = () => {
        
        buttonNext.onclick = () => {
            changeSlide(1);
        };
        buttonPrev.onclick = () => {
            changeSlide(-1);
        };
    };

    const showInitialSlides = (slideIndex = 1) => {
        const prevSlide = slideIndex - 1 >= 0 ? slideIndex - 1 : slidesList.length - 1;
        appendSlide(sliderFirst, slidesList[prevSlide]);
        appendSlide(sliderSecond, slidesList[slideIndex]);
    };

    window.onload = () => {
        showInitialSlides();
        bindSliderButtons();
    };

}());

//# sourceMappingURL=main.js.map
