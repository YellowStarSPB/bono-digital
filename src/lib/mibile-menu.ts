const menuBtn = document.querySelector('.header__mobile-menu');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn && mobileMenu) {
	menuBtn.addEventListener('click', () => {
		mobileMenu.classList.toggle('active');
		menuBtn.classList.toggle('active');
    document.body.classList.toggle('no-scroll')
	});
}
