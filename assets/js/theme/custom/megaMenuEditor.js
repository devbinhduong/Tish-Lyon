import megaMenuFunction from './megaMenuFunction';
    window.megaMenuFunction = megaMenuFunction;

export default function (context) {
	var settings = context.themeSettings;

	if (settings.customMegamenuType == 'Editor') {
	    var megaMenuFunction = new window.megaMenuFunction();
	    const urlStoreHash = $('.custom-global-block').data('store-hash-image');

		var mega_menu_styleCustom_item1 = parseInt(settings.mega_menu_styleCustom_item1),
			mega_menu_styleCustom_item2 = parseInt(settings.mega_menu_styleCustom_item2),
			mega_menu_styleCustom_item3 = parseInt(settings.mega_menu_styleCustom_item3),
			mega_menu_styleCustom_item4 = parseInt(settings.mega_menu_styleCustom_item4),
			mega_menu_styleCustom_item5 = parseInt(settings.mega_menu_styleCustom_item5),
			mega_menu_styleCustom_item6 = parseInt(settings.mega_menu_styleCustom_item6),
			mega_menu_styleCustom_item7 = parseInt(settings.mega_menu_styleCustom_item7);

	    function SetItemMegaMenu(){
	        $('.navPages-list-megamenu > li:not(.navPages-item-toggle)').mouseover(event => {
	            var numberItem = $(event.currentTarget).index() + 1;

	            if (!$(event.currentTarget).hasClass('has-megamenu')) {
	                LoadMegaMenu(numberItem);
	            }
	        });

	        $(document).on('click','#custom-menu-mobile .navPages-list:not(.navPages-list--user) > li > .navPages-action' , event => {
	            var numberItem = $(event.currentTarget).parent().index() + 1;

	            if (!$(event.currentTarget).parent().hasClass('has-megamenu')) {
	                LoadMegaMenu(numberItem);
	            }
	        });
	    }
	        
	    function LoadMegaMenu(numberItem){
			let mega_menu_styleCustom_img_1 = '',
				mega_menu_styleCustom_img_2 = '',
				mega_menu_styleCustom_img_3 = '',
				mega_menu_styleCustom_img_4 = '',
				mega_menu_styleCustom_img_5 = '',
				mega_menu_styleCustom_img_6 = '',
				mega_menu_styleCustom_img_7 = '',
				mega_menu_styleCustom_img_8 = '',
				mega_menu_styleCustom_img_9 = '',
				mega_menu_styleCustom_img_10 = '',
				mega_menu_styleCustom_img_11 = '',
				mega_menu_styleCustom_img_12 = '',
				mega_menu_styleCustom_img_13 = '',
				mega_menu_styleCustom_img_14 = '',
				mega_menu_styleCustom_img_15 = '',
				mega_menu_styleCustom_img_16 = '',
				mega_menu_styleCustom_img_17 = '',
				mega_menu_styleCustom_img_18 = '',
				mega_menu_styleCustom_img_19 = '',
				mega_menu_styleCustom_img_20 = '',
				mega_menu_styleCustom_img_21 = '',
				mega_menu_styleCustom_img_22 = '';

			if (settings.mega_menu_styleCustom_img1 != '') {
				mega_menu_styleCustom_img_1 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link1}" aria-label="${settings.mega_menu_styleCustom_img1}" style="--aspect-ratio: ${settings.mega_menu_styleCustom_item1_imgAspectRatio}; width: 100%; max-width: 66.666%;">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img1}" alt="${settings.mega_menu_styleCustom_img1}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img1_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img1_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img1_desc != '' ? `${settings.mega_menu_styleCustom_img1_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}

			if (settings.mega_menu_styleCustom_img2 != '') {
				mega_menu_styleCustom_img_2 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link2}" aria-label="${settings.mega_menu_styleCustom_img2}" style="--aspect-ratio: ${settings.mega_menu_styleCustom_item1_imgAspectRatio1}; width: 100%; max-width: 33.333%;">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img2}" alt="${settings.mega_menu_styleCustom_img2}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img2_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img2_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img2_desc != '' ? `${settings.mega_menu_styleCustom_img2_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}

			if (settings.mega_menu_styleCustom_img3 != '') {
				mega_menu_styleCustom_img_3 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link3}" aria-label="${settings.mega_menu_styleCustom_img3}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img3}" alt="${settings.mega_menu_styleCustom_img3}">
						
						<div class="image-overlay"></div>
						
						${settings.mega_menu_styleCustom_img3_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img3_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img3_desc != '' ? `${settings.mega_menu_styleCustom_img3_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}

			if (settings.mega_menu_styleCustom_img4 != '') {
				mega_menu_styleCustom_img_4 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link4}" aria-label="${settings.mega_menu_styleCustom_img4}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img4}" alt="${settings.mega_menu_styleCustom_img4}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img4_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img4_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img4_desc != '' ? `${settings.mega_menu_styleCustom_img4_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}

			if (settings.mega_menu_styleCustom_img5 != '') {
				mega_menu_styleCustom_img_5 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link5}" aria-label="${settings.mega_menu_styleCustom_img5}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img5}" alt="${settings.mega_menu_styleCustom_img5}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img5_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img5_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img5_desc != '' ? `${settings.mega_menu_styleCustom_img5_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}

			if (settings.mega_menu_styleCustom_img6 != '') {
				mega_menu_styleCustom_img_6 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link6}" aria-label="${settings.mega_menu_styleCustom_img6}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img6}" alt="${settings.mega_menu_styleCustom_img6}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img6_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img6_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img6_desc != '' ? `${settings.mega_menu_styleCustom_img6_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}

			if (settings.mega_menu_styleCustom_img7 != '') {
				mega_menu_styleCustom_img_7 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link7}" aria-label="${settings.mega_menu_styleCustom_img7}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img7}" alt="${settings.mega_menu_styleCustom_img7}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img7_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img7_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img7_desc != '' ? `${settings.mega_menu_styleCustom_img7_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}

			if (settings.mega_menu_styleCustom_img8 != '') {
				mega_menu_styleCustom_img_8 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link8}" aria-label="${settings.mega_menu_styleCustom_img8}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img8}" alt="${settings.mega_menu_styleCustom_img8}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img8_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img8_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img8_desc != '' ? `${settings.mega_menu_styleCustom_img8_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}

			if (settings.mega_menu_styleCustom_img9 != '') {
				mega_menu_styleCustom_img_9 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link8}" aria-label="${settings.mega_menu_styleCustom_img9}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img9}" alt="${settings.mega_menu_styleCustom_img9}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img9_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img9_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img9_desc != '' ? `${settings.mega_menu_styleCustom_img9_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}

			if (settings.mega_menu_styleCustom_img10 != '') {
				mega_menu_styleCustom_img_10 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link10}" aria-label="${settings.mega_menu_styleCustom_img10}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img10}" alt="${settings.mega_menu_styleCustom_img10}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img10_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img10_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img10_desc != '' ? `${settings.mega_menu_styleCustom_img10_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if (settings.mega_menu_styleCustom_img11 != '') {
				mega_menu_styleCustom_img_11 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link11}" aria-label="${settings.mega_menu_styleCustom_img11}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img11}" alt="${settings.mega_menu_styleCustom_img11}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img11_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img11_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img11_desc != '' ? `${settings.mega_menu_styleCustom_img11_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if (settings.mega_menu_styleCustom_img12 != '') {
				mega_menu_styleCustom_img_12 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link12}" aria-label="${settings.mega_menu_styleCustom_img12}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img12}" alt="${settings.mega_menu_styleCustom_img12}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img12_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img12_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img12_desc != '' ? `${settings.mega_menu_styleCustom_img12_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if(settings.mega_menu_styleCustom_img13 != '') {
				mega_menu_styleCustom_img_13 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link13}" aria-label="${settings.mega_menu_styleCustom_img13}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img13}" alt="${settings.mega_menu_styleCustom_img13}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img13_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img13_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img13_desc != '' ? `${settings.mega_menu_styleCustom_img13_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if(settings.mega_menu_styleCustom_img14 != '') {
				mega_menu_styleCustom_img_14 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link14}" aria-label="${settings.mega_menu_styleCustom_img14}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img14}" alt="${settings.mega_menu_styleCustom_img14}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img14_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img14_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img14_desc != '' ? `${settings.mega_menu_styleCustom_img14_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if(settings.mega_menu_styleCustom_img15 != '') {
				mega_menu_styleCustom_img_15 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link15}" aria-label="${settings.mega_menu_styleCustom_img15}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img15}" alt="${settings.mega_menu_styleCustom_img15}">
						
						<div class="image-overlay"></div>
						
						${settings.mega_menu_styleCustom_img15_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img15_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img15_desc != '' ? `${settings.mega_menu_styleCustom_img15_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if(settings.mega_menu_styleCustom_img16 != '') {
				mega_menu_styleCustom_img_16 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link16}" aria-label="${settings.mega_menu_styleCustom_img16}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img16}" alt="${settings.mega_menu_styleCustom_img16}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img16_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img16_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img16_desc != '' ? `${settings.mega_menu_styleCustom_img16_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if(settings.mega_menu_styleCustom_img17 != '') {
				mega_menu_styleCustom_img_17 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link17}" aria-label="${settings.mega_menu_styleCustom_img17}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img17}" alt="${settings.mega_menu_styleCustom_img17}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img17_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img17_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img17_desc != '' ? `${settings.mega_menu_styleCustom_img17_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if(settings.mega_menu_styleCustom_img18 != '') {
				mega_menu_styleCustom_img_18 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link18}" aria-label="${settings.mega_menu_styleCustom_img18}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img18}" alt="${settings.mega_menu_styleCustom_img18}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img18_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img18_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img18_desc != '' ? `${settings.mega_menu_styleCustom_img18_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if(settings.mega_menu_styleCustom_img19 != '') {
				mega_menu_styleCustom_img_19 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link19}" aria-label="${settings.mega_menu_styleCustom_img19}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img19}" alt="${settings.mega_menu_styleCustom_img19}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img19_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img19_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img19_desc != '' ? `${settings.mega_menu_styleCustom_img19_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if(settings.mega_menu_styleCustom_img20 != '') {
				mega_menu_styleCustom_img_20 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link20}" aria-label="${settings.mega_menu_styleCustom_img20}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img20}" alt="${settings.mega_menu_styleCustom_img20}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img20_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img20_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img20_desc != '' ? `${settings.mega_menu_styleCustom_img20_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}
			if(settings.mega_menu_styleCustom_img21 != '') {
				mega_menu_styleCustom_img_21 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link21}" aria-label="${settings.mega_menu_styleCustom_img21}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img21}" alt="${settings.mega_menu_styleCustom_img21}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img21_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img21_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img21_desc != '' ? `${settings.mega_menu_styleCustom_img21_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}

			if(settings.mega_menu_styleCustom_img22 != '') {
				mega_menu_styleCustom_img_22 = `
					<a class="image image-loader" href="${settings.mega_menu_styleCustom_link22}" aria-label="${settings.mega_menu_styleCustom_img22}">
						<img src="${urlStoreHash}${settings.mega_menu_styleCustom_img22}" alt="${settings.mega_menu_styleCustom_img22}">
						
						<div class="image-overlay"></div>

						${settings.mega_menu_styleCustom_img22_title != '' ? `
							<div class="content">
								<h5 class="title">${settings.mega_menu_styleCustom_img22_title}</h5>
								<p class="text">${settings.mega_menu_styleCustom_img22_desc != '' ? `${settings.mega_menu_styleCustom_img22_desc}` : ''}</p>
							</div>
						` : ''}
					</a>
				`
			}


	        if (mega_menu_styleCustom_item1 == numberItem) {
	            megaMenuFunction.menuItem(mega_menu_styleCustom_item1).setMegaMenu({
	                style: 'style custom 2',
	                imageAreaWidth: settings.mega_menu_styleCustom_item1_imgWidth,
	                cateAreaWidth: settings.mega_menu_styleCustom_item1_cateWidth,
	                cateColumns: settings.mega_menu_styleCustom_item1_col,
					imagesRight: 
						`
						${mega_menu_styleCustom_img_1}
						${mega_menu_styleCustom_img_2}
						`
	            });
	        } else if (mega_menu_styleCustom_item2 == numberItem) {
	            megaMenuFunction.menuItem(mega_menu_styleCustom_item2).setMegaMenu({
	                style: 'style custom',
	                imageAreaWidth: settings.mega_menu_styleCustom_item2_imgWidth,
	                cateAreaWidth: settings.mega_menu_styleCustom_item2_cateWidth,
	                cateColumns: settings.mega_menu_styleCustom_item2_col,
					imagesRight: 
						`
						${mega_menu_styleCustom_img_3}
						${mega_menu_styleCustom_img_4}
						${mega_menu_styleCustom_img_5}
						`,
					imageAspectRatio: settings.mega_menu_styleCustom_item2_imgAspectRatio,
					imageColumns: 3
	            });
	        } else if (mega_menu_styleCustom_item3 == numberItem) {
	            megaMenuFunction.menuItem(mega_menu_styleCustom_item3).setMegaMenu({
	                style: 'style custom',
	                imageAreaWidth: settings.mega_menu_styleCustom_item3_imgWidth,
	                cateAreaWidth: settings.mega_menu_styleCustom_item3_cateWidth,
	                cateColumns: settings.mega_menu_styleCustom_item3_col,
					imagesRight: 
						`
						${mega_menu_styleCustom_img_6}
						${mega_menu_styleCustom_img_7}
						${mega_menu_styleCustom_img_8}
						`,
					imageAspectRatio: settings.mega_menu_styleCustom_item3_imgAspectRatio,
					imageColumns: 3
	            });
	        } else if (mega_menu_styleCustom_item4 == numberItem) {
	            megaMenuFunction.menuItem(mega_menu_styleCustom_item4).setMegaMenu({
	                style: 'style custom',
	                imageAreaWidth: settings.mega_menu_styleCustom_item4_imgWidth,
	                cateAreaWidth: settings.mega_menu_styleCustom_item4_cateWidth,
	                cateColumns: settings.mega_menu_styleCustom_item4_col,
					imagesRight: 
						`
						${mega_menu_styleCustom_img_9}
						${mega_menu_styleCustom_img_10}
						${mega_menu_styleCustom_img_11}
						`,
					imageAspectRatio: settings.mega_menu_styleCustom_item4_imgAspectRatio,
					imageColumns: 3
	            });
			} else if (mega_menu_styleCustom_item5 == numberItem) {
					megaMenuFunction.menuItem(mega_menu_styleCustom_item5).setMegaMenu({
	                style: 'style custom',
	                imageAreaWidth: settings.mega_menu_styleCustom_item5_imgWidth,
	                cateAreaWidth: settings.mega_menu_styleCustom_item5_cateWidth,
	                cateColumns: settings.mega_menu_styleCustom_item5_col,
					imagesRight: 
						`
						${mega_menu_styleCustom_img_12}
						${mega_menu_styleCustom_img_13}
						${mega_menu_styleCustom_img_14}
						${mega_menu_styleCustom_img_15}
						${mega_menu_styleCustom_img_16}
						`,
					imageAspectRatio: settings.mega_menu_styleCustom_item5_imgAspectRatio,
					imageColumns: 5
	            });
			} else if (mega_menu_styleCustom_item6 == numberItem) {
					megaMenuFunction.menuItem(mega_menu_styleCustom_item6).setMegaMenu({
	                style: 'style custom',
	                imageAreaWidth: settings.mega_menu_styleCustom_item6_imgWidth,
	                cateAreaWidth: settings.mega_menu_styleCustom_item6_cateWidth,
	                cateColumns: settings.mega_menu_styleCustom_item6_col,
					imagesRight: 
						`
						${mega_menu_styleCustom_img_17}
						${mega_menu_styleCustom_img_18}
						`,
					imageAspectRatio: settings.mega_menu_styleCustom_item6_imgAspectRatio,
					imageColumns: 2
	            });
			} else if (mega_menu_styleCustom_item7 == numberItem) {
					megaMenuFunction.menuItem(mega_menu_styleCustom_item7).setMegaMenu({
	                style: 'style custom',
	                imageAreaWidth: settings.mega_menu_styleCustom_item7_imgWidth,
	                cateAreaWidth: settings.mega_menu_styleCustom_item7_cateWidth,
	                cateColumns: settings.mega_menu_styleCustom_item7_col,
					imagesRight: 
						`
						${mega_menu_styleCustom_img_19}
						${mega_menu_styleCustom_img_20}
						${mega_menu_styleCustom_img_21}
						${mega_menu_styleCustom_img_22}
						`,
					imageAspectRatio: settings.mega_menu_styleCustom_item7_imgAspectRatio,
					imageColumns: 4
	            });
			} else {
	            return;
	        }
	    }

	    var setItemMegaMenu = SetItemMegaMenu();

	    window.onload = setItemMegaMenu;
	}
}
