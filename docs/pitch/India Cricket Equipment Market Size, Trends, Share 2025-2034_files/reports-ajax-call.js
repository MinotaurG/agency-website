


jQuery(document).ready(function() {
    // Find all <link> elements with rel="stylesheet"
    jQuery('link[rel="stylesheet"]').each(function() {
        var cssHref = jQuery(this).attr('href');

        // Check if async or defer attribute is not applied
        if (!jQuery(this).attr('async') && !jQuery(this).attr('defer')) {
            // Apply async attribute to the CSS file
            jQuery(this).attr('async', '');
            //console.log('Async attribute applied to CSS file: ' + cssHref);
        }
    });
     
    
    
     
    
    
    jQuery('.single-product .logo .standard-logo').attr('src', 'https://www.custommarketinsights.com/wp-content/uploads/2023/07/Custom-Market-Insights.png');
   
    
     jQuery("#expand a").on('click' , function() { 
         
         
        // console.log('expand');
         jQuery('#contract').show();
         jQuery('#expand').hide();
         
     });
     
     jQuery("#contract a").on('click' , function() { 
         
        // console.log('collapse');
        
         jQuery('#contract').hide();
         jQuery('#expand').show();
     });
    
	
	//console.log('I am ready');
	
	jQuery('#woocommerce_products-7 .product_list_widget li .regional .woocommerce-Price-amount bdi').text('$2,800.00')
	jQuery('#woocommerce_products-7 .product_list_widget li .country .woocommerce-Price-amount bdi').text('$2,600.00')
	
	//change price on archive page*/
	
	jQuery('.archive .product-inner .regional .woocommerce-Price-amount bdi').text('$2,800.00')
	jQuery('.archive .product-inner .country .woocommerce-Price-amount bdi').text('$2,600.00')
	
    jQuery('body.single-press-releases ul.breadcrumb li:last-child').remove();
    jQuery('body.single-infographics ul.breadcrumb li:last-child').remove();

    
    
    /*Add meta into post*/
    
	var updated = jQuery('.updated').text()
	//console.log(updated)
	var getDate =  updated.split('T')
	//console.log(getDate[0])
	var splitDate =  getDate[0].split('-')
	//console.log(splitDate)
	var monthName = '';
	
	
	if(splitDate[1]  == '01'){
	  monthName = 'January';
	}else if(splitDate[1]  == '02'){
	  monthName = 'February';
	}else if(splitDate[1]  == '03'){
	  monthName = 'March';
	}else if(splitDate[1]  == '04'){
	  monthName = 'April';
	}else if(splitDate[1]  == '05'){
	  monthName = 'May';
	}else if(splitDate[1]  == '06'){
	  monthName = 'June';
	}else if(splitDate[1]  == '07'){
	  monthName = 'July';
	}else if(splitDate[1]  == '08'){
	  monthName = 'August';
	}else if(splitDate[1]  == '09'){
	  monthName = 'September';
	}else if(splitDate[1]  == '10'){
	  monthName = 'October';
	}else if(splitDate[1]  == '11'){
	  monthName = 'November';
	}else if(splitDate[1]  == '12'){
	  monthName = 'December';
	}
jQuery('.post-meta').append('<span class="meta-date"> Posted: '+monthName +' '+ splitDate[2]+', '+splitDate[0] +' </span>')
jQuery('.post-meta').append('<span class="meta-location"> Location: Sandy, USA </span>')


    /*Adjust press release archive page*/
	
    jQuery(".post-type-archive-press-releases #main .main-content").removeClass('col-lg-9')
    jQuery(".post-type-archive-press-releases #main .main-content").addClass('col-lg-12')
    
    /*Adjust search archive page*/
	
    jQuery(".search-results #main .main-content").removeClass('col-lg-12')
    jQuery(".search-results #main .main-content").addClass('col-lg-9')

    jQuery("#menu-top-new-menu").after('<div class=burger-icon><i class="fa-solid fa-bars"></i></div>')
    jQuery('#nav-panel').addClass('nav-panel');
    jQuery(".burger-icon").on('click' , function(e){
		e.preventDefault();
       
	   console.log("Menu Clicked");
        jQuery(".fa-solid").toggleClass("fa-x");
		
			/*let navbar = document.querySelector("#menu-top-new-menu");
			console.log(navbar)
			jQuery("#menu-top-new-menu").addClass('mobile-menu');
			jQuery("#menu-top-new-menu").toggleClass('show-menu-on-mobile');*/
		
        jQuery('.nav-panel').toggleClass('show');
        jQuery('.nav-panel').removeClass('hide');
       /*  jQuery('#nav-panel').show();*/

    
    })
	jQuery(window).scroll(function() {
		var scroll = jQuery(window).scrollTop();
		if (scroll > 1050     ) {
			jQuery(".request-for-customization").removeClass("hide");
			jQuery(".request-for-customization").addClass("cta-position-content");
		}   else {
			jQuery(".request-for-customization").addClass("hide");
			jQuery(".request-for-customization").removeClass("cta-position-content");
		}
	});
	

	jQuery('.wpcf7-captchar').focus(function () {
		jQuery(this).val('');
	});
	var license_type = localStorage.getItem("imran_license_type");
	if( license_type !='' && license_type != null ) {
		localStorage.removeItem("imran_license_type");
		localStorage.removeItem("imran_currencySymbol");
		localStorage.removeItem("imran_reportprice");
		localStorage.removeItem("imran_reportid");
		localStorage.removeItem("imran_reporttitle");
		localStorage.removeItem("imran_reportlink");
		localStorage.removeItem("imran_reportexcerpt");
	}
	jQuery(".license-sec").on('click' , function(e){
		e.preventDefault();
		console.log('license-sec');
		let packagerow = jQuery(this).data('packagerow')
		console.log(packagerow+"  package is cliced")
		localStorage.removeItem("imran_license_type");
		localStorage.removeItem("imran_currencySymbol");
		localStorage.removeItem("imran_reportprice");
		jQuery('.license-sec').removeClass('license-sec-active')
		jQuery('.license_type_radio_btn').attr('checked' , false)
		jQuery(this).children().children().children().children('.license_type_radio_btn').attr('checked', true)
		jQuery(this).addClass('license-sec-active')
		var licenceType_text = jQuery(this).children().children().children().find('.custom-control-label').text();
		console.log(licenceType_text)
		//const license_type = jQuery(this).children().children().children().find('label').text();
		const reportprice = jQuery(this).children().next().next().children('.sl-report-price').text();
		const currencySymbol = jQuery(this).children().next().next().children('.pc-currencySymbol').text()
		localStorage.setItem("imran_license_type", licenceType_text);
		localStorage.setItem("imran_currencySymbol", currencySymbol);
		localStorage.setItem("imran_reportprice", reportprice);
		if( packagerow == 'team' ){
			jQuery("#packtwo").trigger('click');
			console.log("Team is click")
		}else if( packagerow == 'enterprise' ){
			jQuery("#packthree").trigger('click');
			console.log("Enterprise is click")
		}else if( packagerow == 'data' ){
			jQuery("#packfour").trigger('click');
			console.log("Data pack is click")
		}else if( packagerow == 'single' ){
			jQuery("#packone").trigger('click');
			console.log("single user is click")
		} else if( packagerow == 'powerbi' ){
			jQuery("#packfive").trigger('click');
			console.log("Power bi is click")
		}
		if (  packagerow == 'team') {
			jQuery('.what-you-get-team').removeClass('d-none');
			jQuery('.what-you-get-enterprise').addClass('d-none');
			jQuery('.what-you-get-data-pack').addClass('d-none');
			jQuery('.what-you-get-single').addClass('d-none');
			jQuery('.what-you-get-power-bi').addClass('d-none');
		} else if (packagerow == 'enterprise') {
			jQuery('.what-you-get-enterprise').removeClass('d-none');
			jQuery('.what-you-get-team').addClass('d-none');
			jQuery('.what-you-get-data-pack').addClass('d-none');
			jQuery('.what-you-get-single').addClass('d-none');
			jQuery('.what-you-get-power-bi').addClass('d-none');
		}
		else if (packagerow == 'data') {
			jQuery('.what-you-get-data-pack').removeClass('d-none');
			jQuery('.what-you-get-team').addClass('d-none');
			jQuery('.what-you-get-enterprise').addClass('d-none');
			jQuery('.what-you-get-single').addClass('d-none');
			jQuery('.what-you-get-power-bi').addClass('d-none');
		} else if (packagerow == 'powerbi') {
			jQuery('.what-you-get-power-bi').removeClass('d-none');
			jQuery('.what-you-get-data-pack').addClass('d-none');
			jQuery('.what-you-get-team').addClass('d-none');
			jQuery('.what-you-get-enterprise').addClass('d-none');
			jQuery('.what-you-get-single').addClass('d-none');
		}
		else if (packagerow == 'single') {
			jQuery('.what-you-get-single').removeClass('d-none');
			jQuery('.what-you-get-team').addClass('d-none');
			jQuery('.what-you-get-enterprise').addClass('d-none');
			jQuery('.what-you-get-data-pack').addClass('d-none');
			jQuery('.what-you-get-power-bi').addClass('d-none');
		}
		//.children().children().find('.custom-control-label').text();
	})
//	console.log("Website developed and designed by Imran Javed whatsapp +92-304-4887447");
	var geturlHash =  window.location.href;
	var removeHash  =  geturlHash.split("#")[1]
	//console.log(removeHash)

// Checkout logic
					const  singlelicense01 = localStorage.getItem("imran_singlelicense01");
					const  teamlicense01 = localStorage.getItem("imran_teamlicense01");
					const  enterpriselicense01 = localStorage.getItem("imran_enterpriselicense01");
					const  datapack01 = localStorage.getItem("imran_datapack01");
					jQuery("#singlelicense01").val(singlelicense01);
					jQuery("#teamlicense01").val(teamlicense01);
					jQuery("#enterpriselicense01").val(enterpriselicense01);
					jQuery("#datapack01").val(datapack01);
				   jQuery(".packageprice").on( 'click' , function(){
					   const packageprice  = jQuery(this).val();
					   console.log(packageprice);
					   jQuery(".cart_item .woocommerce-Price-amount bdi").empty();
					   jQuery(".order-total .woocommerce-Price-amount bdi").empty();
					   jQuery(".cart-subtotal .woocommerce-Price-amount bdi").empty();
					   jQuery(".cart_item .woocommerce-Price-amount bdi").html('<span class="woocommerce-Price-currencySymbol">$</span>'+packageprice+'.00');
					   jQuery(".order-total .woocommerce-Price-amount bdi").html('<span class="woocommerce-Price-currencySymbol">$</span>'+packageprice+'.00');
					   jQuery(".cart-subtotal .woocommerce-Price-amount bdi").html('<span class="woocommerce-Price-currencySymbol">$</span>'+packageprice+'.00');
					   jQuery.post({  
									type: 'POST',  
									url: ij_market_research_report_object.ajax_url+'?action=custom_cart_total', 
									data: 'itemprice='+packageprice,  
									success: function(res) {  
										console.log("result on reports ajax call file "+res); 
										//jQuery(document.body).trigger("wc_fragment_refresh");
					} 
				});
				   });
	jQuery(".single_add_to_cart_button , .ij-download-sample").on('click' , function(e){
		// e.preventDefault();
		console.log("single_add_to_cart_button")
		var license_type = jQuery('.license_type').val();
		var currencySymbol = jQuery('.currencySymbol').val();
		var reportprice = jQuery('.report-price').val();
		var reportid = jQuery('.report-id').val();
		var reporttitle = jQuery('.page-title').text();
		var reportexcerpt = jQuery('.reportexcerpt').text();
		var reportlink = jQuery('.report-link').val();
		var data = "licensetype=" + license_type + "&currencySymbol=" + currencySymbol + "&reportprice=" + reportprice + "&reportid=" + reportid + "&reporttitle=" + reporttitle ;
		console.log(data)
		var license_type = localStorage.getItem("license_type");
		if( license_type ='' ) {
			localStorage.setItem("imran_license_type", license_type);
			localStorage.setItem("imran_currencySymbol", currencySymbol);
			localStorage.setItem("imran_reportprice", reportprice);
			localStorage.setItem("imran_reportid", reportid);
			localStorage.setItem("imran_reporttitle", reporttitle);
			localStorage.setItem("imran_reportexcerpt", reportexcerpt);
			localStorage.setItem("imran_reportlink", reportlink);
		}
	});
	var tableRow =   jQuery('tr.tableRow');
	jQuery(tableRow).on( 'click' , function (){
		jQuery(tableRow).removeClass('activeRow');
		jQuery(this).addClass('activeRow');
	} );
	jQuery(".product-description").click(function(){
		var reporturl = jQuery(".report-slug").val()
		window.history.pushState({ path: url }, '', '');
		var url = reporturl+"#report-description";
		console.log(url)
		window.history.pushState({ path: url }, '', url);
		window.location.reload()
	});
	jQuery(".table-of-contents").click(function(){
		var reporturl = jQuery(".report-slug").val()
		window.history.pushState({ path: url }, '', '');
		var url = reporturl+"#table-of-contents";
		window.history.pushState({ path: url }, '', url);
		window.location.reload()
	});
	jQuery(".segmentation").click(function(){
		var reporturl = jQuery(".report-slug").val()
		window.history.pushState({ path: url }, '', '');
		var url = reporturl+"#segmentation";
		window.history.pushState({ path: url }, '', url);
		window.location.reload()
	});
	jQuery(".methodology").click(function(){
		var reporturl = jQuery(".report-slug").val()
		window.history.pushState({ path: url }, '', '');
		var url = reporturl+"#methodology";
		window.history.pushState({ path: url }, '', url);
		window.location.reload()
	});
	jQuery(".request-a-free-sample").click(function(){
		var reporturl = jQuery(".report-slug").val()
		window.history.pushState({ path: url }, '', '');
		var url = reporturl+"#request-a-free-sample";
		window.history.pushState({ path: url }, '', url);
		window.location.reload()
	});
	var pageurl =  window.location.href
	var pageHash =  pageurl.split("#")
	var pageHashName = pageHash[1]
	if( pageHashName != undefined )
		console.log(pageHashName)
	jQuery("ul#myTab li button").removeClass("active")
	if(pageHashName == 'request-a-free-sample'){
		jQuery("#myTabContent .tab-pane").removeClass("show active")
		jQuery("ul#myTab li button.request-a-free-sample").addClass("active")
		jQuery("#myTabContent div#request-a-free-sample").addClass("show active")
		console.log(pageHashName)
	}else if(pageHashName == 'report-description'){
		console.log(pageHashName)
		jQuery("#myTabContent .tab-pane").removeClass("show active")
		jQuery("ul#myTab li button.product-description").addClass("active")
		jQuery("#myTabContent div#product-description").addClass("show active")
	} else if(pageHashName == 'table-of-contents'){
		console.log(pageHashName)
		jQuery("#myTabContent .tab-pane").removeClass("show active")
		jQuery("ul#myTab li button.table-of-contents").addClass("active")
		jQuery("#myTabContent div#table-of-contents").addClass("show active")
	} else if(pageHashName == 'segmentation'){
		console.log(pageHashName)
		jQuery("#myTabContent .tab-pane").removeClass("show active")
		jQuery("ul#myTab li button.segmentation").addClass("active")
		jQuery("#myTabContent div#segmentation").addClass("show active")
	} else if(pageHashName == 'methodology'){
		console.log(pageHashName)
		 jQuery("#myTabContent .tab-pane").removeClass("show active")
		jQuery("ul#myTab li button.methodology").addClass("active")
		jQuery("#myTabContent div#methodology").addClass("show active")
	}
//Functionality purchase Card in RD
	jQuery('.pc_currency_type_radio_btn').on('click', function () {
		var currency_val = jQuery(this).val();
		var currencySymbol = jQuery(this).parent().parent().parent().parent().find('.currencySymbol').val();
		var currency_text = jQuery(this).parent().find('.custom-control-label').text();
		var j = 1;
		jQuery('.license_type_radio_btn').each(function () {
			var single_license_val = jQuery('.sl-val').val();
			if (single_license_val != '') {
				var price = single_license_val * currency_val;
				var price_decimal_fixing = price.toFixed(2);
				var converted_price = Math.round(price_decimal_fixing);
				jQuery('.sl-report-price').text(converted_price);
			}
			else {
				jQuery('.sl-report-price').text('-----');
			}
			var team_license_val = jQuery('.tl-val').val();
			if (team_license_val != '') {
				var price = team_license_val * currency_val;
				var price_decimal_fixing = price.toFixed(2);
				var converted_price = Math.round(price_decimal_fixing);
				jQuery('.tl-report-price').text(converted_price);
			}
			else {
				jQuery('.tl-report-price').text('-----');
			}
			var enterprise_license_val = jQuery('.el-val').val();
			if (enterprise_license_val != '') {
				var price = enterprise_license_val * currency_val;
				var price_decimal_fixing = price.toFixed(2);
				var converted_price = Math.round(price_decimal_fixing);
				jQuery('.el-report-price').text(converted_price);
			}
			else {
				jQuery('.el-report-price').text('-----');
			}
			var data_pack_license_val = jQuery('.dp-val').val();
			if (data_pack_license_val != '') {
				var price = data_pack_license_val * currency_val;
				var price_decimal_fixing = price.toFixed(2);
				var converted_price = Math.round(price_decimal_fixing);
				jQuery('.dp-report-price').text(converted_price);
			}
			else {
				jQuery('.dp-report-price').text('-----');
			}
			console.log(single_license_val, team_license_val, enterprise_license_val, data_pack_license_val);
		})
		var local_variables = currency_text.split(" ");
		jQuery('.currencySymbol').empty();
		jQuery('.currency_symbol').empty();
		jQuery('.client_currency').empty();
		localStorage.removeItem('currency_symbol');
		localStorage.removeItem('client_currency');
		localStorage.removeItem('currency_value');
		localStorage.setItem('currency_symbol', local_variables[0]);
		localStorage.setItem('client_currency', local_variables[1]);
		localStorage.setItem('currency_value', currency_val);
		jQuery('.currencySymbol').val(local_variables[0]);
		jQuery('.currencySymbol').text(local_variables[0]);
		jQuery('.pc-currencySymbol').text(local_variables[0]);
		console.log(currency_val, currency_text, licenceprice, local_variables);
		var selectedLicensePrice = jQuery(this).parent().parent().parent().parent().parent().find('.license_type_radio_btn:checked').val();
		var price = selectedLicensePrice * currency_val;
		var price_decimal_fixing = price.toFixed(2);
		var converted_price = Math.round(price_decimal_fixing);
		jQuery('.report-price').empty();
		jQuery('.report-price').text(converted_price);
		jQuery('.report-price').val(converted_price);
	});
	
	

    
	let prid = jQuery("body").attr('id') ;
//	console.log(prid)
	/*AJax CAll for Single Press Release page*/
	jQuery.post({
				type: 'POST',
				url: ij_market_research_report_object.ajax_url+'?action=get_category_name_by_post_id',
				data: `postid=${prid}`,
				success: function(res) {
					
					
					var splitRes = res.split('^');
					//console.log(splitRes);
					if(splitRes[1] == 'press-releases'){
					setTimeout(function() { 
					 
					console.log(res);
						setPRname()
					}, 5000);
					
					function setPRname(){
						jQuery('body.single-press-releases ul.breadcrumb li:first-child').after('<li><a href="https://www.custommarketinsights.com/press-releases/">Press Releases</a> <i class="delimiter"></i></li>')
					}
					}else if( splitRes[1] == 'infographics' ){
										setTimeout(function() { 
								 
								console.log(res);
									setPRname()
								}, 5000);
								
								function setPRname(){
									jQuery('body.single-infographics ul.breadcrumb li:first-child').after('<li><a href="https://www.custommarketinsights.com/infographics/">Inforgraphics</a> <i class="delimiter"></i></li>')
								}
					}
					
				}
			});
	
		/* capture download form */
	jQuery('#wpforms-17583-field_13').on('blur', function () {
	
		
		let reportid = window.location.href.split("=")[1]; 
		console.log("Imran")

		let fname 		= jQuery("#wpforms-17583-field_1").val();
		let bEmail 		= jQuery("#wpforms-17583-field_3").val();
		let phone 		= jQuery("#wpforms-17583-field_10").val();
		let cName 		= jQuery("#wpforms-17583-field_4").val();
		let titleDesign = jQuery("#wpforms-17583-field_5").val();
		let country 	= jQuery("#wpforms-17583-field_6").val(); 
		let intention 	= jQuery('input[name="wpforms[fields][7]"]:checked').val();
		let message 	= jQuery("#wpforms-17583-field_13").val();
		let reportExcept 	= jQuery(".reportmeta_ij").text();
		//let reportExcept = localStorage.getItem('imran_reportexcerpt');
 
		
		let dataString = `reportExcept=${reportExcept}&reportid=${reportid}&fname=${fname}&bEmail=${bEmail}&phone=${phone}&cName=${cName}&titleDesign=${titleDesign}&country=${country}&intention=${intention}&message=${message}` ;
		
		
		jQuery.post({
				type: 'POST',
				url: ij_market_research_report_object.ajax_url+'?action=get_and_send_download_form_to_crm',
				data: dataString,
				success: function(res) {
					console.log(res);
					 
				}
			});
	});
	
	
	/* capture customization request form */
	jQuery('#wpforms-17580-field_13').on('blur', function () {
	
		
		let reportid = window.location.href.split("=")[1]; 

		let fname 		= jQuery("#wpforms-17580-field_1").val();
		let bEmail 		= jQuery("#wpforms-17580-field_3").val();
		let phone 		= jQuery("#wpforms-17580-field_10").val();
		let cName 		= jQuery("#wpforms-17580-field_4").val();
		let titleDesign = jQuery("#wpforms-17580-field_5").val();
		let country 	= jQuery("#wpforms-17580-field_6").val(); 
		let intention 	= jQuery('input[name="wpforms[fields][7]"]:checked').val();
		let message 	= jQuery("#wpforms-17580-field_13").val();
		let reportExcept 	= jQuery(".reportmeta_ij").text();
 
		
		let dataString = `reportExcept=${reportExcept}&reportid=${reportid}&fname=${fname}&bEmail=${bEmail}&phone=${phone}&cName=${cName}&titleDesign=${titleDesign}&country=${country}&intention=${intention}&message=${message}` ;
		
		
		jQuery.post({
				type: 'POST',
				url: ij_market_research_report_object.ajax_url+'?action=get_and_send_customization_form_to_crm',
				data: dataString,
				success: function(res) {
					console.log(res);
					 
				}
			});
	});
     
    
    var strrr =  jQuery(".reportmeta_ij").text(); 
    jQuery(".report-name-0999").find("input").val(strrr); 
    jQuery(".report-customization-request-00999").find("input").val(strrr); 

});


 

function fixStoragePaths() {
  // Target the specific logo images in your markup
  const logos = document.querySelectorAll('.logo img.porto-lazyload');
  
  logos.forEach(img => {
    // Check and fix data-oi attribute
    if (img.dataset.oi && img.dataset.oi.includes('/storage/')) {
      img.dataset.oi = img.dataset.oi.replace('/storage/', '/wp-content/uploads/');
      console.log('Fixed data-oi:', img.dataset.oi);
    }
    
    // Check and fix src attribute
    if (img.src && img.src.includes('/storage/')) {
      img.src = img.src.replace('/storage/', '/wp-content/uploads/');
      console.log('Fixed src:', img.src);
    }
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', fixStoragePaths);

// Run after short delay for lazy-loaded content
setTimeout(fixStoragePaths, 1000);

// Run when new content is added to the DOM (for AJAX)
const observer = new MutationObserver(fixStoragePaths); 


// Wrap non-critical JS in requestIdleCallback
document.addEventListener('DOMContentLoaded', function() {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadNonCriticalJS);
    } else {
        setTimeout(loadNonCriticalJS, 5000);
    }
});

function loadNonCriticalJS() {
    const scripts = document.querySelectorAll('script[data-delayed]');
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.src;
        document.body.appendChild(newScript);
    });
}

