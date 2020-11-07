'use strict';

const autoprefixer = require("autoprefixer");

import tabs from './modules/tabs';
import cards from './modules/cards';
import modal from './modules/modal';
import slider from './modules/slider';
import calculator from './modules/calculator';
import timer from './modules/timer';
import forms from './modules/forms';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
    cards();
    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    modal('[data-modal]','.modal');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    timer('.timer','2020-12-31'); 
    calculator();
    forms('form', modalTimerId);
});