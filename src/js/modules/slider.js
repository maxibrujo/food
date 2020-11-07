function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {
    //Slider1

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        dots = [];

    let slideIndex = 1;

    const addZero = (sourse, target) => {
        if (sourse < 10) {
            target.textContent = "0" + `${sourse}`;
        } else {
            target.textContent = sourse;
        }
    };

    addZero(slides.length, total);

    // showSlide(slideIndex);

    // next.addEventListener('click', () => {
    //     if (++slideIndex > slides.length) {
    //         slideIndex = 1;
    //     }
    //     showSlide(slideIndex);
    // });

    // prev.addEventListener('click', () => {
    //     if (--slideIndex < 1) {
    //         slideIndex = slides.length;
    //     }
    //     showSlide(slideIndex);
    // });

    // function showSlide(n) {
    //     slides.forEach(slide => {
    //         slide.style.display = 'none';
    //     });
    //     slides[n - 1].style.display = "";
    //     addZero(n, current);
    // }

    //Slider2

    let offset = 0;

    addZero(slideIndex, current);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('ul');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
`;
        indicators.append(dot);
        if (i == 0) {
            dot.style.opacity = '1';
        }
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (++slideIndex > slides.length) {
            slideIndex = 1;
        }
        addZero(slideIndex, current);

        dots.forEach(dot => {
            dot.style.opacity = '0.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (--slideIndex < 1) {
            slideIndex = slides.length;
        }
        addZero(slideIndex, current);

        dots.forEach(dot => {
            dot.style.opacity = '0.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            addZero(slideIndex, current);
            dots.forEach(dot => {
                dot.style.opacity = '0.5';
            });
            dots[slideIndex - 1].style.opacity = '1';
        });
    });
}

export default slider;