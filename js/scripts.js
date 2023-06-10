document.addEventListener('DOMContentLoaded', () => {
	mobileMenu();
	scrollToSection();
	initModals()
});

// mobile menu
function mobileMenu() {
	const openBtn = document.querySelector('.open-menu');

	openBtn.addEventListener('click', function (event) {
		event.preventDefault();

		if (document.body.classList.contains('menu-opened')) {
			setTimeout(() => {
				document.body.classList.remove('menu-opened');
			}, 500)

		} else {
			document.body.classList.add('menu-opened');

		}

		setTimeout(addAnimation, 200);
	});
};




function addAnimation() {
	const menu = document.querySelector('.main-menu');


	if (menu.children[0].classList.contains('animate-item')) {
		for (let i = menu.children.length - 1; i >= 0; i--) {
			(function (i) {
				setTimeout(function () { menu.children[i].classList.remove("animate-item"); }, 100 * (menu.children.length - 1 - i));
			})(i);
		}
	} else {
		for (let i = 0; i < menu.children.length; i++) {
			(function (i) {
				setTimeout(function () { menu.children[i].classList.add("animate-item"); }, 100 * i);
			})(i);
		}
	}
}

function scrollToSection() {
	const scrolls = document.querySelectorAll("[scroll-to]");

	if (scrolls) {
		for (const scroll of scrolls) {
			scroll.addEventListener("click", clickHandler);
		}

		function clickHandler(e) {
			e.preventDefault();
			const dataScroll = this.getAttribute("scroll-to");
			const offsetTop = document.querySelector(`#${dataScroll}`).getBoundingClientRect().top;

			document.body.classList.remove('menu-opened');

			if (window.innerWidth < 992) {
				setTimeout(addAnimation, 200);
			}

			scroll({
				top: offsetTop,
				behavior: "smooth"
			});
		}
	}
}



function initModals() {
	const open_btns = document.querySelectorAll("[toggle-modal]");
	const close_btns = document.querySelectorAll(".modal-close");
	const overlay = document.querySelector(".modal-overlay");

	if (open_btns) {
		open_btns.forEach(el => {
			el.addEventListener('click', function (event) {
				event.preventDefault();
				const id = this.getAttribute("toggle-modal");
				document.querySelector(`#${id}`).classList.add('show');
				document.body.classList.add('modal-open')
			})
		});
	}

	if (close_btns) {
		close_btns.forEach(el => {
			el.addEventListener('click', function (event) {
				event.preventDefault();
				el.parentNode.parentNode.classList.remove('show');
				document.body.classList.remove('modal-open')
			})
		});
	}

	if (overlay) {
		overlay.addEventListener("click", function (e) {
			if (e.target == overlay) {
				document.querySelector(".modal.show").classList.remove("show");
				document.body.classList.remove("modal-open");
			}
		});
	}
}