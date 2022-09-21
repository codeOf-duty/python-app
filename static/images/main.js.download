$(document).ready(function(e){
$("g").click(function(){
  $(".findme").addClass("col-md-4 map-fix");
});

$('.clickable').on('click', function(){
    $('g').removeClass('activem');
    $(this).addClass('activem');
	var id=$(this).attr("id").toString();
	sessionStorage.setItem("selectedId", id);
	var district = $(this).attr("data-id");
	var p_id_arr = district.split("-");
   $.ajax({
	   url: base_url+"get_project/"+p_id_arr[1]+"/1/"+lang_name,
	   dataType: "JSON",
	   success: function(data){
		   $(".bangalore_urban_title").html(data.title);
		   $(".bangalore_urban_ul_div").html(data.content);
		   $(".more_projects").children("a").attr("href", base_url+p_id_arr[1]+"/"+data.title+"/"+lang_name);
	   }
   });
});
$("#BANGALORE_URBAN").click();
});