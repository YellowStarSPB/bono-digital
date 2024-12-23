import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';

const swiper = new Swiper('.slider', {
	modules: [Navigation, Pagination],
	loop: true,
	pagination: {
		el: '.slider__pagination',
		clickable: true
	},
	navigation: {
		nextEl: '.slider__btn--next',
		prevEl: '.slider__btn--prev'
	},
	breakpoints: {
		767.99: {
			slidesPerView: 2,
			spaceBetween: 16
		}
	}
});
