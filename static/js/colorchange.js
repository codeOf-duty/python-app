






$('document').ready(function(e){

		// Increase/descrease font size
	$('#increasetext').click(function() {
		curSize = parseInt($('#content').css('font-size')) + 2;
		if (curSize <= 30)
			$('#content,li,a,p,h1,h2,h3,h4,h5,h6,p,ul,.footer3 span').css('font-size', curSize);
	});

	$('#resettext').click(function() {
	location.reload();
	});

	$('#decreasetext').click(function() {
		curSize = parseInt($('#content').css('font-size')) - 2;
		if (curSize >= 12)
			$('#content,li,a,p,h1,h2,h3,h4,h5,h6,p,ul,.footer3 span').css('font-size', curSize);
	});


function getRandomColor() {

    var color = '#212122';

    return color;
}

$(document).ready(function () {
var counter1 = 0;
var counter2 = 0;

if(localStorage.getItem("themeColor") == "#fff" || localStorage.getItem("themeColor") == null){

}
else
{
var themeColor = getRandomColor();
        $("#accordian,#cd-primary-nav a,.menu-item a,.dept_docssam,.desk-menu,.black-title,.about-box,.infocus-box,.about-box-wrapper,#header1_div,.header2_div_container,.nav_toggle,.owl-next,.owl-prev,.bg1,.Cards_6,.item1,.introduction_div,.row,.container-fluid,.footer4_li li,.footer,.sliderInner,.info_div,body,.learn_kannada_container").css("background-color", themeColor);
		$("#DF,#LC,#myBtn, #ul_right li a, .btn_black, .btn_black > a,.navbar-default .navbar-nav>li>a,.navbar,.sidenav_header3,.features,.footer1_p,.footer2_p,.footer4_p,.footer2,.footer3,.footer33,.list-inline>li,.aea_p,.aea_heading,.official_heading,.official_uni_div,.contact_heading,.theead tr th,.gallery_heading,.sticky li,.knowledge_heading,.breadcrumb,.learn_kannada_heading,.next,.nav-tabs.nav-justified>li>a,.button,.policies_heading,.disclaimer_title,.tab-label,.tab-content,.theader tr th,.view,.software_heading,.download,.dropdown-menu>li>a,ul li ul.dropdown-menu,.sidenav a").css({ "background-color": "#2c2c2c", 'color': '#c7c7c7' });
		$(".tab-content,#mySidenav").css({ "background-color": "#171717", 'color': '#c7c7c7' });
		$(".dropdown-menu>li>a").hover(function(){$( this ).css({ "background-color":"#c7c7c7", 'color': '#000' });},function(){$( this ).css({ "background-color":"#2c2c2c",'color': '#c7c7c7' });});
		//$(".dropdown-menu>li>a").hover(function(){$(this).css("background-color","#000000");})
		//$(".dropdown-menu>li>a").mouseover(function(){$(".dropdown-menu>li>a").css("background-color", "#000000");});
		$(".mynavbar").css({ "border-bottom": "5px solid #c7c7c7" });
		$(".sidenav").css({ "border-left": "1px solid #c7c7c7", "border-top":"3px solid #c7c7c7" });
		$("p,.item1").css("color", "#c7c7c7");
		$(".A_white,.a_normal").css("background", "#fff");
		$("ul,ol,p, li, a, h1, h2, h3, h4, h5, h6, span, ul,.disclaimer_content,.fa").css("color", "#c7c7c7");
		$(".next,.disclaimer_content").css("border", "1px solid #c7c7c7");
		$(".disclaimer_title").css("border", "1px solid #2c2c2c");
        $("table,th,td,.footer4_p_ul li,.footer2_p_ul li,.footer1_p_ul li,.footer2_p_ul li a,.footer1_p_ul li a,a,#gallery_icon").css("color", "#c7c7c7");
		$(".official_uni_div").css({ "background-image": "url(../images1/texture4.jpg)" });
		 if (typeof (Storage) !== "undefined") {
            // Store
            localStorage.setItem("themeColor", themeColor);

        }
}

    $(".A_black").click(function () {
        var themeColor = getRandomColor();
        $("#accordian,#cd-primary-nav a,.menu-item a,.dept_docssam,.desk-menu,.black-title,.about-box,.infocus-box,.about-box-wrapper,#header1_div,.header2_div_container,.nav_toggle,.owl-next,.owl-prev,.bg1,.introduction_div,.Cards_6,.row,.container-fluid,.footer4_li li,.footer,.sliderInner,.info_div,body,.learn_kannada_container").css("background-color", themeColor);
		$("#DF,#LC,#myBtn, #ul_right li a, .btn_black, .btn_black > a,.navbar-default .navbar-nav>li>a,.navbar,.sidenav_header3,.features,.footer1_p,.footer2_p,.footer4_p,.footer2,.footer3,.footer33,.list-inline>li,.aea_p,.aea_heading,.official_heading,.official_uni_div,.contact_heading,.theead tr th,.gallery_heading,.sticky li,.knowledge_heading,.breadcrumb,.learn_kannada_heading,.next,.nav-tabs.nav-justified>li>a,.button,.policies_heading,.disclaimer_title,.tab-label,.tab-content,.theader tr th,.view,.software_heading,.download,.dropdown-menu>li>a,ul li ul.dropdown-menu,.sidenav a").css({ "background-color": "#212122", 'color': '#c7c7c7' });
		$(".tab-content,#mySidenav").css({ "background-color": "#212122", 'color': '#c7c7c7' });
		//$(".dropdown-menu>li>a").hover(function(){$( this ).css({ "background-color": "#000000", 'color': '#c7c7c7' });},function(){$( this ).css({ "background-color": "#000000", 'color': '#c7c7c7' });});
		//$(".dropdown-menu>li>a").hover(function(){$(this).css("background-color","#000000");})
		//$(".dropdown-menu>li>a").mouseover(function(){$(".dropdown-menu>li>a").css("background-color", "#000000");});
		$(".dropdown-menu>li>a").hover(function(){$( this ).css({ "background-color":"#c7c7c7", 'color': '#000' });},function(){$( this ).css({ "background-color":"#212122",'color': '#c7c7c7' });});
		$(".mynavbar").css({ "border-bottom": "5px solid #c7c7c7" });
		$(".sidenav").css({ "border-left": "1px solid #c7c7c7", "border-top":"3px solid #c7c7c7" });
        $("p,.mob-box li").css("color", "#c7c7c7");
        $("ul,ol,p, li, a, h1, h2, h3, h4, h5, h6, span, ul,.disclaimer_content,.fa").css("color", "#c7c7c7");
		$(".next,.disclaimer_content").css("border", "1px solid #c7c7c7");
		$(".disclaimer_title").css("border", "1px solid #2c2c2c");
			$(".A_white,.a_normal").css("background", "#fff");
        $("table,th,td,.footer4_p_ul li,.footer2_p_ul li,.footer1_p_ul li,.footer2_p_ul li a,.footer1_p_ul li a,a,#gallery_icon").css("color", "#c7c7c7");
		$(".official_uni_div").css({ "background-image": "url(../images1/texture4.jpg)" });        
        // Update Theme Color
        if (typeof (Storage) !== "undefined") {
            // Store
            localStorage.setItem("themeColor", themeColor);

        }

//        alert("black click" + localStorage.getItem("themeColor"));
		
		
    });
	$(".A_white").click(function () {
	if (typeof (Storage) !== "undefined") {
            // Store
            localStorage.setItem("themeColor", "#fff");
location.reload();
//alert("white clicked" + localStorage.getItem("themeColor"));
        }
	
	});
	

	

	
});



});