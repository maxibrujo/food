function calculator() {
    //Calculator
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', ratio);
    }

    function initCalc(selector, activeClass) {
        let elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initCalc('#gender div', 'calculating__choose-item_active');
    initCalc('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!height || !weight || !age) {
            result.textContent = 'XXXX';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((elem) => {
            elem.addEventListener('click', evt => {
                if (evt.target.getAttribute('data-ratio')) {
                    ratio = +evt.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = evt.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                calcTotal();

                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });

                evt.target.classList.add(activeClass);
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';
            }

            switch (input.getAttribute('id')) {
                case 'weight':
                    weight = +input.value;
                    break;
                case 'height':
                    height = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calculator;