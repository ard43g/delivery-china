
window.addEventListener('DOMContentLoaded', () => {

	function menuMain(){
		let burger = document.querySelector('.menu-header'),
			menu = document.querySelector('.navigation-header');
			
			
			

			burger.classList.remove('active');
		
			burger.addEventListener('click', (e)=> {
				let target = e.target;
				if (target.classList.contains('active')	) {
					burger.classList.remove('active'),
					menu.classList.remove('active'),
					document.body.style.overflow = ''
				} else {
					burger.classList.add('active'),
					menu.classList.add('active'),
					document.body.style.overflow = 'hidden'
				};

				
				

				

				


				
			});


			
		
	};

	menuMain();

	function popupCall () {
		let popupBtn = document.querySelectorAll('.button_call'),
			popup = document.querySelector('.popup'),
			popupClose = document.querySelector('.popup_close'),

			scroll = calcScroll();

			popupBtn.forEach( (item) => {
				item.addEventListener('click', (e) => {
					let target = e.target;
					if (target) {
						popup.classList.add('active');
						document.body.style.overflow = "hidden";
						document.body.style.marginRight = `${scroll}px` ;

					} else {
						popup.classList.remove('active')
						document.body.style.overflow = "";
						document.body.style.marginRight = `0px` ;
					}
					
				});
				
		
			});

			popupClose.addEventListener('click', (e) => {
				let target = e.target;
				if (target && target.classList.contains('popup_close') ) {
					popup.classList.add('active');
					document.body.style.overflow = "hidden";
					document.body.style.marginRight = `${scroll}px` ;
				} else {
					popup.classList.remove('active');
					document.body.style.overflow = "";
					document.body.style.marginRight = `0px` ;
				}
				
			})
			function closePopup () {
				popup.addEventListener('click', (e) =>{
					let target = e.target; 
					if (target.classList.contains('popup')) {
						popup.classList.remove('active');
						document.body.style.overflow = "";
						document.body.style.marginRight = `0px` ;

					}
				})
			}
			closePopup();

	};
	popupCall();

	function calcScroll () {
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll'
		div.style.visibility = 'hidden';

		document.body.appendChild(div);

		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	};







	//=================================================slider 

 	 $('.slider').slick({
		arrows:true,
		dots:false,
		adaptiveHeight:false,
		slidesToShow: 3,
		centerMode: true,
		variableWidth: true,
		responsive: [                
			{
				breakpoint: 769,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1,
				}
			},{
				breakpoint: 600,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 1
				}
			}
		]
	});  

	function showMore(){
		let btnMore = document.querySelectorAll('.button_more'),
			btnBack = document.querySelectorAll('.button_back'),
			priceMain = document.querySelectorAll('.price-body_main'),
			priceMore = document.querySelectorAll('.price-body_more'),
			moreContent = document.querySelectorAll('.price-more_content');


			btnMore.forEach((item, i) => {
				
				

				btnMore[i].addEventListener('click', (e) =>{
					e.preventDefault;
					let target = e.target;
					priceMain[i].classList.remove('price-body_main_active');
					priceMore[i].classList.add('price-body_more_active');
					moreContent[i].style.display = 'flex';
	
				});

				

			});

			btnBack.forEach((item, i) => {
				
				

				btnBack[i].addEventListener('click', (e) =>{
					e.preventDefault;
					let target = e.target;
					priceMain[i].classList.add('price-body_main_active');
					priceMore[i].classList.remove('price-body_more_active');
					setTimeout( ()=>{
						moreContent[i].style.display = 'none';
					}, 500)
					
	
				
				});

			

		});
			
	};
	showMore();

	




	const checkNumInputs = (selector) =>{
		const numInputs = document.querySelectorAll(selector);
	
		numInputs.forEach(item => {
			item.addEventListener('input', () => {
				item.value = item.value.replace(/\D/, '');
			});
		});
	};
	checkNumInputs('input[name="tel"]');
	
	
	const forms = () => {
		const form = document.querySelectorAll('form'),
			inputs = document.querySelectorAll('input');
	
	
		const message = {
			loading: 'Загрузка...',
			success: 'Спасибо скоро с Вами свяжемся',
			failure: 'Что-то пошло не так...'
		};
	
		const postData  = async (url, data) => {
			document.querySelector('.status').textContent = message.loading;
			let res = await fetch(url, {
				method: 'POST',
				body: data
	
			});
			return await res.text();
		};
	
		const clearInputs = () =>{
			inputs.forEach(item => {
				item.value = "";
			});
		};
		
		form.forEach(item => {
			item.addEventListener('submit', (e) => {
				e.preventDefault();
	
				let statusMessage = document.createElement ('div');
				statusMessage.classList.add('status');
				item.appendChild(statusMessage);
	
				const formData = new FormData(item);
				 
				postData('server.php', formData)
					.then(res => {
						statusMessage.textContent = message.success;
					})
					.catch(statusMessage.textContent = message.failure)
					.finally (() => {
						clearInputs();
						setTimeout (() => {
							statusMessage.remove();
						}, 5000);
					})
	
	
	
			});
			
		});
	
	
	
	
	};
	forms();






}); 




