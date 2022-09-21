// var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
var punctRE = /['!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
var spaceRE = /\s+/g;

var dict = {};
var sug_dict = {};
var new_scope_pairs = [];

$(document).on('change', '.file-input', function() {
	var filesCount = $(this)[0].files.length;
	var textbox = $(this).prev();
	if (filesCount === 1) {
		var fileName = $(this).val().split('\\').pop();
		var ext = fileName.split('.').pop();
		if(ext == "docx" || ext == "txt"){
			textbox.text(fileName);
			$(".submitBtn").removeAttr('disabled');
		}else{
			textbox.text("Invalid File Type");
			$(".submitBtn").prop("disabled", true);
		}	
	}
});

$(document).ready(function() {
    $('.upload_scr').show();
    $('#text_scr').hide();
    $('.upload_opt').css('background','#0c6058');
    $('.text_opt').css('background','#17a2b8');
    
    $("#dashboard").show();
    $("#userword").hide();
    $("#builder").hide();
    $("#preprocess").hide();
    
        
    $(".dashboard").addClass(" active");
    $(".userword").removeClass(" active");
    $(".builder").removeClass(" active");
    $(".preprocess").removeClass(" active");
    
    $(".bloom-build").show();
    $(".symspell-build").show();
    
   // $(".btn-stop-bloom").attr("disabled","true");
    $(".btn-stop-symspell").attr("disabled","true");
    
    $(".symspell-build-panel").show();
    $(".bloom-build-panel").show();

});

function rtrim(str) {
  if(!str) return str;
  return str.replace(/\s+$/g, '');
}

function occurrences(string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0, pos = 0, step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function zapTrailingLinebreak(editableNode) {
    let children = Array.from(editableNode.childNodes)

    children.forEach(child => {
        if (children.indexOf(child) == children.length - 1) {
            if (child.tagName && child.tagName === "BR") {
                editableNode.removeChild(child)
            }
        } 
    })
}

function bloomcond(){
     $.ajax({
      type : 'GET',
      url : "/BloomDatasetList",
      async: false,
      success: function(data_, status, hyf) { 
           if(data_ < 1){
              $(".btn-start-bloom").attr("disabled","true");
              $(".bloom-alert").html("<div class='alert alert-danger'>0 file to build Bloom Dataset</div>");
           }else{
              $(".btn-start-bloom").removeAttr("disabled","true");
              $(".bloom-alert").html("<div class='alert alert-primary'>"+data_+" file's to build Bloom Dataset</div>");
           }
       }, error: function(data_, status, hyf) {
           console.log(data_);
	  }
    });  
}

function symcond(){
     $.ajax({
      type : 'GET',
      url : "/SymspellDatasetList",
      async: false,
      success: function(data_, status, hyf) { 
           if(data_ < 1){
              $(".btn-start-symspell").attr("disabled","true");
              $(".symspell-alert").html("<div class='alert alert-danger'>0 file to build Symspell Dataset</div>");
           }else{
              $(".btn-start-symspell").removeAttr("disabled","true");
              $(".symspell-alert").html("<div class='alert alert-primary'>"+data_+" file's to build Symspell Dataset</div>");
           }
       }, error: function(data_, status, hyf) {
           console.log(data_);
	  }
    });  
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.innerHTML;
}

function RemoveTag(htmlString){
    return $(htmlString).text();
}

function internetChecker(){
    var online = navigator.onLine; 
    if (!online) {
        $('#internetModal').modal({backdrop: 'static', keyboard: false, show: true});
    } 
}
 
function Errordict(){
    $('[data-toggle="popover"]').each(function(){
        var strdict = $(this).text();
        var classdict = $(this).attr("class");
        if(!dict.hasOwnProperty(classdict)){
            dict[strdict] = classdict;
        }
    });
    $('[data-toggle="popover"]').popover('hide')
    return;
}

	
function downloadInnerHtml(filename, elId, mimeType) {	
    var elHtml = $("#"+elId).text().trim();	
    var link = document.createElement('a');	
    mimeType = mimeType || 'text/plain';	
    link.setAttribute('download', filename);	
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));	
    link.click(); 	
}	


$(document).ready(function() {
    $('[data-toggle="popover"]').popover({
        html: true,
        content: function () {
            var content = $(this).attr("data-popover-content");
            return $(content).find(".popover-body").clone();
        }
    });
    
    $(document).on('click','[data-toggle="popover"]',function(e){
        // $("."+$(this).attr("class")).popover('show');
        $(this).popover('show');
        $("."+$(this).attr("class")).not("."+$(this).attr("class")).popover('hide');
        
    });
});

$(document).ready(function() {
	$(".submitBtn").prop("disabled", true);
	$(".submitBtn-text").prop("disabled", true);
});


$(document).ready(function () {
    // Detecting the internet connection
    internetChecker();
    
});

$(document).ready(function() {
    var temp_content = $("#editor").html();
    console.log("Copied");
    $(document).on("click", ".btn-clear", function (e) {
		 $("#editor").html(temp_content);
		 console.log("Revoke"); 
    });
});

$(document).on("click", ".btn-misc", function (e) { 
    var cnt = $(".btn-misc").html();
    if(cnt == "EDIT")  {
        $("#editor").attr("contenteditable", "true");   
        $(".btn-misc").remove();
    }
});

$(document).ready(function() {
	$(function () {
		$('[data-toggle="popover"]').popover({ trigger: "focus click" }).on('click', function() {
            $('[data-toggle="popover"]').not(this).popover('hide');
        });
        $('[data-toggle="popover"]').not(this).popover('hide');
	});
});


$(document).on("click", ".closePop", function (e) {
    //  $('[data-toggle="popover"]').css('display','none')
    $('[data-toggle="popover"]').popover('hide');
});

$(document).on("click", ".underline", function (e) {
	$('.underline').not(this).popover('hide');
    $('[data-toggle="popover"]').not(this).popover('hide');
});

$(document).ready(function() {
	$(".A2D").css("margin","0px");
	
    var cons = $(".editor").text();
    cons = cons.trim();
    $(".hide-panel").html(cons);
    
});

$(document).on("click", ".A2D", function(e){
	$("[data-toggle='popover']").not(this).popover('hide');
	//console.log(this.id);
	var value_ = $('.'+this.id).html();
	//console.log(value_);
	    
    $.ajax({
      type : 'POST',
      url : "/addUserword",
      async: false,
      contentType: 'application/json;charset=UTF-8',
      data :  JSON.stringify({'data': value_}),
      dataType: "json",
      success: function(e) { console.log("hurray added");}
    });
	$("[data-toggle='popover']").popover('hide');
	$("."+this.id).replaceWith(function() { return this.innerHTML; });
});


$(document).on("click", ".SW", function(e){
	$("[data-toggle='popover']").not(this).popover('hide');
	//console.log(this.id);
	var id_ = this.id;
	var value_ = $('.'+this.id).html();
	//console.log(value_);
	
    $.ajax({
      type : 'POST',
      url : "/searchWord",
      async: false,
      contentType: 'application/json;charset=UTF-8',
      data :  JSON.stringify({'data': value_}),
      dataType: "json",
      cache: false, 
      beforeSend: function() {
            // console.log(data_);
            // console.log("searching");
            delaySearching();
            $("."+id_).addClass(" marker");
      },
	  success: function(data_, status, hyf) {
		    // console.log(data_);
		    // console.log(status);
            setTimeout(function(){
                $(".suggestion-panel").html("<div class='suggestion-result bg-green'><p id='"+id_+"' class='SA' >"+data_.split(":")+"</p></div>");
                $(".suggestion-panel").append("<div class='suggestion-result'><p>No More</p></div>");
            }, 2000);
            
            setTimeout(function(){
                $("."+id_).fadeOut("slow", function() {
                    $(this).removeClass("marker");
                }); 
                $("."+id_).fadeIn("slow", function() {
                    $("."+id_).show();
                 });
            }, 5000);
            
	        $("[data-toggle='popover']").popover('hide');
	  },
	  error: function(data_, status, hyf) {
		    // console.log(data_);
		    // console.log(status);
	  }
    
    });
	$("[data-toggle='popover']").popover('hide');
});

function delaySearching() {
    $(".suggestion-panel").html("<div class='suggestion-result'><p>Searching...</p></div>");
}

$(document).on("click", ".SA", function(e){
	var value_ = $('#'+this.id).html();
	var value2_ = $('.'+this.id).html();
    var id_ = this.id;
    $("."+id_).html(value_);
	$("[data-toggle='popover']").popover('hide');
	$("."+this.id).replaceWith(function() { return this.innerHTML; });
	
});

$(document).on("click", ".btn-edit", function(e){
    var content = $("#editor").html();
   // $("#editor").wordExport();	
   var fileName =  'kannada_Editor.txt';	
   downloadInnerHtml(fileName, 'editor','text/html');
});

$(document).on("click", ".F2W-btn", function(e){
    let str = $("#editor").html();
    let pattern = $(".findVal").val();
    if(pattern.length > 0){
        var res = occurrences(str,pattern.trim());
        $("#findCount").html(pattern.trim()+"  :  "+res);
    }else{
        $("#findCount").html("word  :   0");
    }
    
    // console.log(pattern);
    // console.log(res);
});

$(document).on("click", ".F2R-btn", function(e){
    let str = $("#editor").html();
    var findval = $(".findRepVal").val();
    var repval = $(".replaceVal").val();
    
    // console.log(findval);
    // console.log(repval);
    
    findval = findval.trim();
    repval = repval.trim();
    
    var res = occurrences(str,findval.trim());
    
    if(findval.length > 0 && repval.length > 0 && findval != repval && res >= 1){
        let resHTML = str.replace(findval, repval);
        var cnt = occurrences(resHTML,findval.trim());
        
        // HTML String to DOM Elements
        if (cnt == res-1){
            console.log("Successfully Replaced");
            // $("#editor").html(createElementFromHTML(resHTML));
            
            resHTML = RemoveTag(resHTML);
            $("#editor").html(resHTML);
            $('#underline').popover();
        }else{
            console.log("Not Replaced");
        }
        
        $("#replaceCount").html("Replaced Successfully");
    }else if(findval.length <= 0 || repval.length <= 0) {
        $("#replaceCount").html("Empty Space");
    }else if(findval == repval) {
        $("#replaceCount").html("Same Words Can't Replace");
    }else if(res <= 0) {
        $("#replaceCount").html("Unable to find Word");
    }else{
        $("#replaceCount").html("Something Wents Wrong");
    }
    
});

$('body').on('click', function (e) {
    if ($(e.target).data('toggle') !== 'popover' && $(e.target).parents('[data-toggle="popover"]').length === 0
        && $(e.target).parents('.popover.in').length === 0) {
        (($('[data-toggle="popover"]').popover('hide').data('bs.popover') || {}).inState || {}).click = false;
    }
});

$(document).on("click", ".RW", function(e){
    var id_ = this.id;
    var val_ = $("."+id_).html();
    $("."+id_).addClass(" marker");
    
    let name  = prompt("Enter Suitable Word to replace : "+val_);
    if( name != null && name.length > 0 ){
        $("."+id_).html(name);
        $("."+id_).attr("id"," ");
            setTimeout(function(){
                $("."+id_).fadeOut("slow", function() {
                    $(this).removeClass("marker");
                }); 
                $("."+id_).fadeIn("slow", function() {
                    $("."+id_).show();
                 });
            }, 2500);
         console.log("Replaced"); 
    }else{
        console.log("Something wents wrong");
        setTimeout(function(){
                $("."+id_).fadeOut("slow", function() {
                    $(this).removeClass("marker");
                }); 
                $("."+id_).fadeIn("slow", function() {
                    $("."+id_).show();
                 });
            }, 2500);
    }      
    //alert("Successfully Replaced");
	$("[data-toggle='popover']").popover('hide');
});


$(document).on("click", ".IW", function(e){
    var id_ = this.id;
    var val_ = $("."+id_).html();
    $("."+id_).attr("id"," ");    
	$("[data-toggle='popover']").popover('hide');  
	$("."+this.id).replaceWith(function() { return this.innerHTML; });

});

$(document).on("click", ".upload_opt", function(e){
   // console.log("upload");
   $('.upload_scr').show();
   $('#text_scr').hide();
   $('.upload_opt').css('background','#0c6058');
   $('.text_opt').css('background','#17a2b8');
});

$(document).on("click", ".text_opt", function(e){
   $('.upload_scr').hide();
   $('#text_scr').hide();
   $(".submitBtn-text").removeAttr('disabled');    
   $(".submitBtn-text").click();
   // $('.upload_opt').css('background','#17a2b8');
   // $('.text_opt').css('background','#0c6058');
});

$(function(){
    $('div[contenteditable]').keydown(function(e) {
       //# console.log(e.keyCode);
       if (e.keyCode === 13) {
            document.execCommand('insertHTML', true, '<br/>');
            return false;
        }
        
    });
});


$(document).on("mousedown mouseup keydown keyup", ".text-editor-src", function(e){
    var cons = $(".text-editor-src").text();
    cons = cons.trim();
    if(cons.length >= 1){
        $(".submitBtn-text").removeAttr('disabled');
        $("#formtextarea").html(cons);
    }else{
        $(".submitBtn-text").prop("disabled", true);
        $("#formtextarea").html(" ");
    }
});

$(document).on("mousedown mouseup keydown keyup", ".editor", function(e){
    var cons = $(".editor").text();
    $(".hide-panel").html(cons);
});

function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

const merge = intervals => {
  if (intervals.length < 2) return intervals;
  
  intervals.sort((a, b) => a[0] - b[0]);
  
  const result = [];
  let previous = intervals[0];
  
  for (let i = 1; i < intervals.length; i += 1) {
    if (previous[1] >= intervals[i][0]) {
      previous = [previous[0], Math.max(previous[1], intervals[i][1])];
    } else {
      result.push(previous);
      previous = intervals[i];
    }
  }
  
  result.push(previous);
  
  return result;
};

function SetCaretPosition(el, pos){

    // Loop through all child nodes
    for(var node of el.childNodes){
        if(node.nodeType == 3){ // we have a text node
            if(node.length >= pos){
                // finally add our range
                var range = document.createRange(),
                    sel = window.getSelection();
                range.setStart(node,pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                return -1; // we are done
            }else{
                pos -= node.length;
            }
        }else{
            pos = SetCaretPosition(node,pos);
            if(pos == -1){
                return -1; // no need to finish the for loop
            }
        }
    }
    return pos; // needed because of recursion stuff
}


function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text().trim()).select();
    document.execCommand("copy");
    $temp.remove();
}


function dashboardShower(){
    $.ajax({
      type : 'GET',
      url : "/reportGen",
      async: false,
	  success: function(data_, status, hyf) {
	        var array = data_;
	       $(".progress-panel").empty();
	       $(".progress-panel").html(`<div class="row" style="margin-left: 0px;" > 
  <!--  <div class="col-xl-4 col-md-6 progress-cards">
        <div class="card">
            <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                        <h4 class="text-c-purple"> `+array["BloomFilter"][0]+`</h4>
                        <h6 class="text-muted m-b-0">Total Words</h6>
                    </div>
                    <div class="col-4 text-right">
                        <i class="fa fa-bar-chart f-28"></i>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-c-purple">
            </div>
        </div>
    </div> -->
    <div class="col-xl-4 col-md-6 progress-cards">
        <div class="card">
            <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                        <h4 class="text-c-green">`+array["Symspell"][0]+`</h4>
                        <h6 class="text-muted m-b-0">Total Unique words</h6>
                    </div>
                    <div class="col-4 text-right">
                        <i class="fa fa-file-word-o f-28"></i>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-c-green">
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-md-6 progress-cards">
        <div class="card">
            <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                        <h4 class="text-c-red">`+(array["UserWord"][0]-1)+`</h4>
                        <h6 class="text-muted m-b-0">User Words</h6>
                    </div>
                    <div class="col-4 text-right">
                        <i class="fa fa-user-circle f-28"></i>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-c-red">
            </div>
        </div>
    </div>
    
    <div class="col-xl-4 col-md-6 progress-cards">
        <div class="card">
            <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-8">
                        <h4 class="text-c-blue">`+array["Dataset"][0]+`</h4>
                        <h6 class="text-muted m-b-0">Datasets</h6>
                    </div>
                    <div class="col-4 text-right">
                        <i class="fa fa-file-text-o f-28"></i>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-c-blue">
            </div>
        </div>
    </div>
</div> 
<div class="row" style="margin-left: 0px;margin-top: 25px;">
    <div class="col-xl-8 col-md-12 progress-cards">
        <div class="card">
            <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-12">
                        <h4 class="text-c-purple"> Latest Builds</h4>
                        <hr/>
                        <h4 class="text-muted m-b-0">Bloom Filter : <span class="lastdate">`+array["BloomFilter"][2]+`</span></h4>
                        <h4 class="text-muted m-b-0">Symspell : <span class="lastdate">`+array["Symspell"][2]+`</span></h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4 col-md-12 progress-cards">
        <div class="card" style="height: 132px;">
            <div class="card-block">
                <div class="row align-items-center">
                    <div class="col-12">
                        <h4 class="text-c-green "> Runnning Builds <span class="curr-builds"></span></h4>
                        <hr/>
                        <div class="current-build"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`);
// console.log(array["UserWord"][0]-1);
            $(".current-build").empty();
            $(".symspell-build-panel").empty();
            $(".bloom-build-panel").empty();
            for (var i = 0; i < array["building"].length; i++) {
                $(".current-build").append('<h5 class="text-muted m-b-0">'+array["building"][i]+'</h5>');
                // console.log(array["building"]);
                
                $(".bloom-build-panel").show();
                if(array["building"][i] == "Bloom"){  // Running
                    $(".bloom-build").hide();
                    $(".bloom-build-panel").html(' <p class="running"> Running.....</p>');
                   // $(".btn-stop-bloom").removeAttr("disabled", "true");
                }
                bloomcond();
                
                $(".symspell-build-panel").show();
                if(array["building"][i] == "Symspell"){  // Running
                    $(".symspell-build").hide();
                    $(".symspell-build-panel").html(' <p class="running"> Running.....</p>');
                    $(".btn-stop-symspell").removeAttr("disabled","true");
                    $(".btn-start-symspell").attr("disabled", "true");
                }
                symcond();
            }
            
            $(".curr-builds").append("( "+array["building"].length+" )");
            $(".bloom-timestamp").html('<p class="bloom-timestamp-p">'+array["BloomFilter"][2]+'</p>');
            $(".symspell-timestamp").html('<p class="symspell-timestamp-p">'+array["Symspell"][2]+'</p>');
            
            if(array["building"].length == 0){
                    $(".bloom-build").show();
                    //$(".btn-stop-bloom").attr("disabled", "true");
                    bloomcond();
                    $(".symspell-build").show();
                    symcond();
                    //$(".btn-stop-symspell").attr("disabled","true");
            }
            preprocessorShower();
            
	  },
	  error: function(data_, status, hyf) {
		    // console.log(data_);
	  }
    }); 
}

function userwordShower(){
    $(".btn-reset-proceed").removeAttr("disabled","true");  
    $.ajax({
      type : 'GET',
      url : "/localwords",
      async: false,
	  success: function(data_, status, hyf) {
	        var array = data_.split("--");
	        $(".userword-panel").empty();
	        for (var x in array) {
                // console.log(array[x].trim());
                if (array[x].trim()) {
                    $(".userword-panel").append("<tr style='border: 3px solid #fff;'><td style='color: #000;background-color: #80808085;height: 35px;padding: 10px 7px;padding-top: 18px;border-radius: 15px;' ><div class='col-md-3 user-box' data-toggle='modal' data-target='#myModal' style='cursor: pointer;' >"+array[x]+"</div></td></tr>");   
                }
            }
            $(".userword-panel").append("<tr style='border: 3px solid #fff;border-radius: 12px;' ><td style='color: #000;background-color: #15141485;height: 35px;padding: 10px 7px;padding-top: 18px;border-radius: 15px;'  ><div class='col-md-3 user-box' > No More </div></td></tr>"); 
	  },
	  error: function(data_, status, hyf) {
		    // console.log(data_);
	  }
    });
}

function wordcheck(){
    $.ajax({
      type : 'GET',
      url : "/wordProCheck",
      async: false,
      beforeSend: function() {
        $(".bloomdata-build-panel").html('<p class="running">Loading.....</p>');
        $(".btn-start-bloomdata").attr("disabled","true");
      },success: function(data_, status, hyf) { 
         // console.log(data_); 
          if(data_ == "None"){  // No process running
            $(".bloomdata-build-panel").html(' ');
             $(".btn-start-bloomdata").removeAttr("disabled","true"); 
          }else{
            $(".bloomdata-build-panel").html('<p class="running">Currently running.....</p>');
            $(".btn-start-bloomdata").attr("disabled","true");
          }
       }, error: function(data_, status, hyf) {
          console.log("error");
	  }
    });  
}

function freqcheck(){   
    $.ajax({
      type : 'GET',
      url : "/freqProCheck",async: false,
      beforeSend: function() {
        $(".symspelldata-build-panel").html('<p class="running">Loading.....</p>');
        $(".btn-start-symspelldata").attr("disabled","true");
      },success: function(data_, status, hyf) { 
          // console.log(data_);
          if(data_ == "None"){   // No process running
            $(".symspelldata-build-panel").html(' ');
             $(".btn-start-symspelldata").removeAttr("disabled","true"); 
          }else{
            $(".symspelldata-build-panel").html('<p class="running">Currently running.....</p>');
            $(".btn-start-symspelldata").attr("disabled","true");
          }
       }, error: function(data_, status, hyf) {
          console.log("error");
	  }
    });  
}



function preprocessorShower(){

    wordcheck();
    freqcheck(); 
    
    // Bloom Dataset
    $.ajax({
      type : 'GET',
      url : "/WordDatasetList",async: false,
      success: function(data_, status, hyf) { 
           if(data_ < 1){
              $(".btn-start-bloomdata").attr("disabled","true");
              $(".bloomdata-alert").html("<div class='alert alert-danger'>0 file to Extract</div>");
           }else{
              $(".btn-start-bloomdata").removeAttr("disabled","true");
              $(".bloomdata-alert").html("<div class='alert alert-primary'>"+data_+" file's to Extract</div>");
           }
       }, error: function(data_, status, hyf) {
           console.log(data_);
	  }
    });  
    
    // Symspell Dataset
    $.ajax({
      type : 'GET',
      url : "/FreqDatasetList",
      async: false,
      success: function(data_, status, hyf) { 
           if(data_ < 1){
              $(".symspelldata-alert").html("<div class='alert alert-danger'>0 file to Generate Frequency</div>");
              $(".btn-start-symspelldata").attr("disabled","true");
           }else{
              $(".btn-start-symspelldata").removeAttr("disabled","true");
              $(".symspelldata-alert").html("<div class='alert alert-primary'>"+data_+" file's to Generate Frequency</div>");
           }
       }, error: function(data_, status, hyf) {
           console.log(data_);
	  }
    }); 
}


$(document).on("click", ".btn-copy", function (e) {
    copyToClipboard($("#editor"));
});

$(document).on("click", ".dashboard", function (e) {
    $("#dashboard").show();
    $("#userword").hide();
    $("#builder").hide();
    $("#preprocess").hide();
    
    $(".dashboard").addClass(" active");
    $(".userword").removeClass(" active");
    $(".builder").removeClass(" active");
    $(".preprocess").removeClass(" active");
    dashboardShower();
});

$(document).on("click", ".userword", function (e) {
    $("#dashboard").hide();
    $("#userword").show();
    $("#builder").hide();
    $("#preprocess").hide();
    
    $(".dashboard").removeClass(" active");
    $(".userword").addClass(" active");
    $(".builder").removeClass(" active");
    $(".preprocess").removeClass(" active");
    userwordShower();
});

$(document).on("click", ".builder", function (e) {
    $("#dashboard").hide();
    $("#userword").hide();
    $("#builder").show();
    $("#preprocess").hide();
    
        
    $(".dashboard").removeClass(" active");
    $(".userword").removeClass(" active");
    $(".builder").addClass(" active");
    $(".preprocess").removeClass(" active");
    dashboardShower();
});

$(document).on("click", ".preprocess", function (e) {
    $("#dashboard").hide();
    $("#userword").hide();
    $("#builder").hide();
    $("#preprocess").show();
    
        
    $(".dashboard").removeClass(" active");
    $(".userword").removeClass(" active");
    $(".builder").removeClass(" active");
    $(".preprocess").addClass(" active");
    preprocessorShower();
});

$(document).on("click", ".user-box", function (e) {
   var val =$(this).html();
   // console.log(val);
   $(".alt").empty();
   $(".btn-proceed").attr("disabled","true");
   $(".btn-proceed").removeAttr("disabled","true");
   $(".adding-word").html(val);
});



$(document).on("submit", "#hideForm", function (e) {
    console.log("form submited");
    var cons = $(".editor").text();
    cons = cons.replace(' ','  ');
    $(".hide-panel").html(cons);
});

$(document).on("click", ".btn-proceed", function (e) {
   var val = $(".adding-word").html();
   // console.log(val);
   $(".btn-proceed").attr("disabled","true");
   $(".btn-remove-wrd").attr("disabled","true");
   $.ajax({
      type : 'POST',
      url : "/removelocalwords",
      async: false,
      contentType: 'application/json;charset=UTF-8',
      data :  JSON.stringify({'data': val,'flag': 'add'}),
      dataType: "json",
      cache: false,
      success: function(data_, status, hyf) { 
        //console.log("hurray added");
            if(data_.responseText == "True"){
                console.log("Added to Dataset");
            }else{
                console.log("Something Wents wrong");
            }
       }, error: function(data_, status, hyf) {
		    //console.log(data_.responseText);
		    if(data_.responseText == "True"){
                $(".alt").html('<div class="alert alert-info">Added Successfully</div>');
                userwordShower();
                setTimeout(function(){
                    $("#myModal .close").click();
                    $(".btn-proceed").removeAttr("disabled","true");
                    $(".btn-remove-wrd").removeAttr("disabled","true");
                }, 3000);
            }else{
                $(".alt").html('<div class="alert alert-danger">Something Wents wrong</div>');
                $(".btn-proceed").removeAttr("disabled","true");
                $(".btn-remove-wrd").removeAttr("disabled","true");
            }
	  }
    });
    userwordShower(); 
});


$(document).on("click", ".btn-remove-wrd", function (e) {
   var val = $(".adding-word").html();
   // console.log(val);
   $(".btn-proceed").attr("disabled","true");
   $(".btn-remove-wrd").attr("disabled","true");
   $.ajax({
      type : 'POST',
      url : "/removelocalwords",
      async: false,
      contentType: 'application/json;charset=UTF-8',
      data :  JSON.stringify({'data': val,'flag': 'remove'}),
      dataType: "json",
      cache: false,
      success: function(data_, status, hyf) { 
            if(data_.responseText == "True"){
                console.log("Removed Successfully");
            }else{
                console.log("Something Wents wrong");
            }
       }, error: function(data_, status, hyf) {
		    if(data_.responseText == "True"){
                $(".alt").html('<div class="alert alert-info">Removed Successfully</div>');
                userwordShower();
                setTimeout(function(){
                    $("#myModal .close").click();
                    $(".btn-proceed").removeAttr("disabled","true");
                    $(".btn-remove-wrd").removeAttr("disabled","true");
                }, 3000);
            }else{
                $(".alt").html('<div class="alert alert-danger">Something Wents wrong</div>');
                $(".btn-proceed").removeAttr("disabled","true");
                $(".btn-remove-wrd").removeAttr("disabled","true");
            }
	  }
    });
    userwordShower();
     
});


$(document).on("click", ".btn-reset-proceed", function (e) {
   $.ajax({
      type : 'GET',
      url : "/resetwords",async: false,
      success: function(data_, status, hyf) { 
           //console.log("hurray Reset");
           // console.log("Dataset Reset");
           $(".alt-reset").html('<div class="alert alert-info">Reset Successfully</div>');
           userwordShower();
           setTimeout(function(){
                    $("#resetModal .close").click();
            }, 3000);
            $(".btn-reset-proceed").attr("disabled","true");
            
       }, error: function(data_, status, hyf) {
           // console.log("Something Wents wrong");
           $(".alt-reset").html('<div class="alert alert-danger">Something Wents wrong</div>');
           setTimeout(function(){
                    $("#resetModal .close").click();
            }, 3000);
	  }
    });  
    userwordShower();
});


$(document).on("click", ".btn-start-bloom", function (e) {
    $.ajax({
      type : 'GET',
      url : "/bloomGetter",async: false,
      success: function(data_, status, hyf) { 
            if(data_ == "Done"){    // Not Running
                 $.ajax({
                      type : 'GET',
                      url : "/bloomSetter",async: false,
                      beforeSend: function() {
                            $(".bloom-build").hide();
                            $(".bloom-build-panel").html(' <p class="running">Loading.....</p>');
                            $(".btn-start-bloom").attr("disabled","true");
                      },
                      success: function(data_, status, hyf) { 
                           if(data_ == "Done"){
                               $(".bloom-build").hide();
                               $(".bloom-build-panel").html(' <p class="running">Currently Running.....</p>');
                               dashboardShower();
                           }
                       }, error: function(data_, status, hyf) {
                            console.log(data_);
	                 }
                 }); 
            }
       }, error: function(data_, status, hyf) {
          console.log("error");
	  }
    });  
});


$(document).on("click", ".btn-start-bloomdata", function (e) {
    $.ajax({
      type : 'GET',
      url : "/wordProCheck",async: false,
      beforeSend: function() {
        $(".bloomdata-build-panel").html('<p class="running">Loading.....</p>');
        $(".btn-start-bloomdata").attr("disabled","true");
      },success: function(data_, status, hyf) { 
         // console.log(data_); 
          if(data_ == "None"){  // No Process running
             $.ajax({
                  type : 'GET',
                  url : "/wordseqGenerator",async: false,
                  beforeSend: function() {
                    $(".bloomdata-build-panel").html('<p class="running">Currently Running.....</p>');
                    $(".btn-start-bloomdata").attr("disabled","true");
                  },success: function(data_, status, hyf) { 
                    $(".bloomdata-build-panel").html('<p class="text-c-green">Successfully Done</p>');
                    $(".btn-start-bloomdata").removeAttr("disabled","true");
                    preprocessorShower();
                   }, error: function(data_, status, hyf) {
                     // console.log("error");
                    $(".bloomdata-build-panel").html('<p class="stopped">Something wents wrong</p>');
                    $(".btn-start-bloomdata").removeAttr("disabled","true");
                    preprocessorShower();
	              }
                });  
          }else{
            $(".bloomdata-build-panel").html('<p class="running">Currently Running.....</p>');
            $(".btn-start-bloomdata").attr("disabled","true");
          }
       }, error: function(data_, status, hyf) {
          console.log("error");
	  }
    });  
    
    preprocessorShower();
    
});


$(document).on("click", ".btn-start-symspelldata", function (e) {
    $.ajax({
      type : 'GET',
      url : "/freqProCheck",async: false,
      beforeSend: function() {
        $(".symspelldata-build-panel").html('<p class="running">Loading.....</p>');
        $(".btn-start-symspelldata").attr("disabled","true");
      },success: function(data_, status, hyf) { 
         // console.log(data_); 
          if(data_ == "None"){  // No Process running
             $.ajax({
                  type : 'GET',
                  url : "/freqGenerator",async: false,
                  beforeSend: function() {
                    $(".symspelldata-build-panel").html('<p class="running">Currently Running.....</p>');
                    $(".btn-start-symspelldata").attr("disabled","true");
                  },success: function(data_, status, hyf) { 
                    $(".symspelldata-build-panel").html('<p class="text-c-green">Successfully Done</p>');
                    $(".btn-start-symspelldata").removeAttr("disabled","true");
                    preprocessorShower();
                   }, error: function(data_, status, hyf) {
                     // console.log("error");
                    $(".symspelldata-build-panel").html('<p class="stopped">Something wents wrong</p>');
                    $(".btn-start-symspelldata").removeAttr("disabled","true");
                    preprocessorShower();
	              }
                });  
          }else{
            $(".symspelldata-build-panel").html('<p class="running">Currently Running.....</p>');
            $(".btn-start-symspelldata").attr("disabled","true");
          }
       }, error: function(data_, status, hyf) {
          console.log("error");
	  }
    });  
    
});


$(document).on("click", ".btn-start-symspell", function (e) {
    $.ajax({
      type : 'GET',
      url : "/symspellGetter",async: false,
      success: function(data_, status, hyf) { 
            if(data_ == "None"){    // Not Running
                 $.ajax({
                      type : 'GET',
                      url : "/symspellSetter",async: false,
                      beforeSend: function() {
                            $(".symspell-build").hide();
                            $(".symspell-build-panel").html(' <p class="running">Loading...</p>');
                            $(".btn-stop-symspell").attr("disabled", "true");
                            $(".btn-start-symspell").attr("disabled","true");
                      },
                      success: function(data_, status, hyf) { 
                            $(".symspell-build").hide();
                            dashboardShower();
                            $(".symspell-build-panel").html(' <p class="running">Currently Running.....</p>');
                            $(".btn-start-symspell").attr("disabled","true");
                            $(".btn-stop-symspell").removeAttr("disabled");
                       }, error: function(data_, status, hyf) {
                           console.log(data_);
                           $(".btn-start-symspell").removeAttr("disabled");
                           $(".btn-stop-symspell").attr("disabled","true");
	                 }
                 }); 
            }
           dashboardShower();
       }, error: function(data_, status, hyf) {
          console.log("error");
	  }
    });  
});

$(document).on("click", ".btn-stop-symspell", function (e) {
    $.ajax({
      type : 'GET',
      url : "/symspellGetter",async: false,
      success: function(data_, status, hyf) { 
        // console.log(data_);
            if(data_ == "Done"){    // Started
                $.ajax({
                      type : 'GET',
                      url : "/symspellStop",async: false,
                      beforeSend: function() {
                            $(".symspell-build").hide();
                            $(".symspell-build-panel").html(' <p class="running">Trying to stop....</p>');
                            $(".btn-stop-symspell").attr("disabled", "true");
                            $(".btn-start-symspell").attr("disabled","true");
                      },
                      success: function(data_, status, hyf) { 
                            $(".symspell-build").show();
                            $(".symspell-build-panel").html('<p class="running">Stopped</p>');
                            $(".btn-stop-symspell").attr("disabled", "true");
                            $(".btn-start-symspell").attr("disabled","true");
                            function SymspellWaiting() {
                                $.ajax({
                                      type : 'GET',
                                      url : "/symspellstatus",async: false,
                                      beforeSend: function() {
                                            $(".symspell-build-panel").html('<p class="stopped">Deleting file......</p>');
                                      },
                                      success: function(data_, status, hyf) { 
                                            if(data_ == "Done"){
                                                $(".symspell-build").show();
                                                $(".btn-start-symspell").attr("disabled","true");
                                                $(".btn-stop-symspell").attr("disabled", "true");
                                                $(".symspell-build-panel").empty();
                                                // dashboardShower()
                                                clearInterval(timer);
                                                return false;
                                            }
                                      }, error: function(data_, status, hyf) {
                                           console.log(data_);
                                      }
                                 });
                            }
                            var timer = setInterval(SymspellWaiting, 5000);                        
                       }, error: function(data_, status, hyf) {
                            console.log("error");
                            $(".symspell-build").hide();
                            $(".btn-stop-symspell").removeAttr("disabled", "true");
	                 }
                 }); 
            }
       }, error: function(data_, status, hyf) {
          console.log("error");
	  }
    });  $.trim(str)
});

var spaceConvert =  function(cursorPoint){
    var curLoc = cursorPoint.length;
    cursorPoint = cursorPoint.trim();
    
    var data = $("#editor").html(); 
    data = data.trimLeft();
    data = data.replace(/\xA0/g,' ');
    data = data.replace(/\u00A0/g, ' ');
    data = data.replace(/&nbsp;/g," ");
    data = data.replace(/<br>/g,"");
    
    var str_ = cursorPoint;
    str_ = str_.trimLeft();
    str_ = str_.replace(/\xA0/g,' ');
    str_ = str_.replace(/\u00A0/g, ' ');
    str_ = str_.replace(/&nbsp;/g," ");
    str_ = str_.replace(/<br>/g,"");
    str_ = str_.trim();
    
    
    var flag = true;
    
    var str = "";
    var myarr = cursorPoint.split(" ")
    str = myarr[myarr.length-1]
    
    // remove Extra space within string
    str = str.trim();
    var Revstr = ""
    for(let i=str.length-1;i>=0;i--){
        if( str.charCodeAt(i) != 160){
            Revstr += str[i];   
           // console.log(str[i]+"->"+ typeof str.charCodeAt(i));    
        }else{
            break;
        }
    }
    str = Revstr.split("").reverse().join("");
    console.log(str);
    
    var x = 0;
    var j = 0;
    for(var i= 0;  j<str_.length && i<data.length ;i++){
        if(data[i]==str_[j]){
            j++;
        }
    }
    
    var restr = str.replace(punctRE, '');
    restr = restr.trimLeft();
    restr = restr.replace(/\xA0/g,' ');
    restr = restr.replace(/\u00A0/g, ' ');
    restr = restr.replace(/&nbsp;/g," ");
    
    if(j!=str_.length){
        console.log("not Matching Length");   
        flag = false;
    }
    
    str = str.trim();
        
    console.log(dict);
    
    if(str.length > 0 && restr.length > 0 && flag){
    
        if(!dict.hasOwnProperty(str)){
            $.ajax({
              type : 'POST',
              url : "/bloomsID",async: false,
              contentType: 'application/json;charset=UTF-8',
              data :  JSON.stringify({'data': str.trim()}),
              dataType: "json",
              cache: false,
              success: function(data_, status, hyf) { 
                    if(data_["status"] != "True"){      // console.log("Incorrect word ");
                        dict[str] = data_["id"];
                        
                        $.ajax({
                              type : 'POST',
                              url : "/symspell",
                              async: false,
                              contentType: 'application/json;charset=UTF-8',
                              data :  JSON.stringify({'data': restr.trim()}),
                              dataType: "json",
                              cache: false,
                              success: function(data__, status, hyf) {
                                console.log(data_);
                                var x = data_["id"];
                                if(x == undefined){
                                    console.log("undefined here");
                                }
                                var sug = data__;
                                //console.log(sug);
                                
                                var restr = sug.replace(punctRE, '').replace(spaceRE, ' ');
                                restr = restr.replace(/\xA0/g,'');
                                restr = restr.replace(/\u00A0/g, '');
                                restr = restr.replace(/&nbsp;/g,' ');
                                sug_dict[x] = restr;
                                tooltipCode = `<span  class="${x}" id="underline"  data-toggle="popover" data-trigger="focus" data-html="true"  data-placement="bottom" data-content="<p class=closePop>x</p><p id=${x} class=SA >${restr}</p><hr/><p id=${x} class=A2D  >Add to Dictionary</p><hr/><!--<p id=${x} data-toggle=collapse href=#suggestionOne class=SW  >Suggestion</p><hr/>--><p id=${x} class=RW  >Replace All</p><hr/><p id=${x} class=IW  >Ignore</p>"  >${str}</span>&nbsp;`;

// logical error start
                                if(i-str.length <= 0){
                                    $("#editor").html(tooltipCode+""+data.substring(i));
                                    $("."+x).popover();
                                }else{
                                    var leftCon = data.substring(0,(i-str.length)-1).trimLeft();
                                    $("#editor").html(leftCon+"&nbsp;"+tooltipCode+""+data.substring(i));
                                    $("."+x).popover();
                               }  
// logical error end               
                              }, 
                              error: function(data_, status, hyf) {
                                    console.log(status);
                              }
                        }); 
               
                    }else{ // correct word
                        
                                if(i-str.length <= 0){
                                    $("#editor").html(str+"&nbsp;"+data.substring(i));
                                    $("."+x).popover();
                                }else{
                                    var leftCon = data.substring(0,(i-str.length)-1).trimLeft();
                                    $("#editor").html(leftCon+"&nbsp;"+str+"&nbsp;"+data.substring(i));
                                    $("."+x).popover();
                               }  
                    }
               }, error: function(data_, status, hyf) {
		            console.log(status);
	          }
            });        
        }else{
            var x = dict[str];
            if(sug_dict.hasOwnProperty(x)){
                var sug = sug_dict[x];
                tooltipCode = `<span  class="${x}" id="underline" data-toggle="popover" data-trigger="focus" data-html="true"  data-placement="bottom" data-content="<p class=closePop>x</p><p id=${x} class=SA >${sug}</p><hr/><p id=${x} class=A2D  >Add to Dictionary</p><hr/><!--<p id=${x} data-toggle=collapse href=#suggestionOne class=SW  >Suggestion</p><hr/>--><p id=${x} class=RW  >Replace All</p><hr/><p id=${x} class=IW  >Ignore</p>"  >${str}</span>&nbsp;`;
// logical error start               
                if(i-str.length <= 0){
                    $("#editor").html(tooltipCode+""+data.substring(i));
                    $("."+x).popover();
                }else{
                    var leftCon = data.substring(0,(i-str.length)-1).trimLeft();
                    $("#editor").html(leftCon+"&nbsp;"+tooltipCode+""+data.substring(i));
                    $("."+x).popover();
                }  
// logical error end         
            }else{
                
               $.ajax({
                      type : 'POST',
                      url : "/symspell",async: false,
                      contentType: 'application/json;charset=UTF-8',
                      data :  JSON.stringify({'data': restr.trim()}),
                      dataType: "json",
                      cache: false,
                      success: function(data_, status, hyf) {
                            var sug = data_;
                            var restr = sug.replace(punctRE, '').replace(spaceRE, ' ');
                            restr = restr.replace(/\xA0/g,'');
                            restr = restr.replace(/\u00A0/g, '');
                            restr = restr.replace(/&nbsp;/g,' ');
                            sug_dict[x] = restr;
                            tooltipCode = `<span  class="${x}" id="underline" data-toggle="popover" data-trigger="focus" data-html="true"  data-placement="bottom" data-content="<p class=closePop>x</p><p id=${x} class=SA >${restr}</p><hr/><p id=${x} class=A2D  >Add to Dictionary</p><hr/><!--<p id=${x} data-toggle=collapse href=#suggestionOne class=SW  >Suggestion</p><hr/>--><p id=${x} class=RW  >Replace All</p><hr/><p id=${x} class=IW  >Ignore</p>"  >${str}</span>&nbsp;`;
// logical error  start                                    
                            if(i-str.length <= 0){
                                $("#editor").html(tooltipCode+""+data.substring(i));
                                $("."+x).popover();
                            }else{
                                var leftCon = data.substring(0,(i-str.length)-1).trimLeft();
                                $("#editor").html(leftCon+"&nbsp;"+tooltipCode+""+data.substring(i));
                                $("."+x).popover();
                            }
// logical error end
                      }, 
                      error: function(data_, status, hyf) {
                            console.log(status);
                      }
                });
            } 
        }
        
        $('[data-toggle="popover"]').each(function(){
             $("."+$(this).attr("class")).popover({
                html: true,
                content: function () {
                    var content = $(this).attr("data-popover-content");
                    return $(content).find(".popover-body").clone();
                }
            });
        });  
    } 
    Errordict();
   // $("#editor").setContentEditableSelection($("#editor").html().length);
};

var delPOP = function(e) {
    var eventNameClass = $(e.target).attr('class');
    const classArr = ["SA","A2D","RW","IW","closePop"];
    if ( $.inArray(eventNameClass, classArr) > -1 ) {
       //console.log("tooltip inside clicked");
    }else{
        $('.popover').each(function(){
            if($(this).css('display','block')){
                $(this).css('display','none');
           }
        });
    }
    return;
};

var updateKey = function(e) {
   // delPOP();
    if(e.keyCode == 32){
        var pos = getCaretCharacterOffsetWithin(this);
        spaceConvert(pos);
        zapTrailingLinebreak(document.getElementById("editor"));
        SetCaretPosition(document.getElementById("editor"),pos.length);
        
    }
    
};

$(document).ready(function() {
    $('#editor').on("keyup", updateKey);
    $('#editor').on("mousedown", delPOP);
});

/**
var everyTime = function(e) {
   $("#recheck").click(function(){
       
    }); 
}

$(document).ready(function() {
    setInterval(everyTime, 10000);
});

**/


function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            
           
            caretOffset = preCaretRange.toString() ;
        }
    }
    return caretOffset;
}



/**

Find Words
$(document).on("click", ".FW", function(e){
    console.log();
    var id_ = this.id;
    var val_ = $("."+id_).html();
    $("."+id_).addClass(" marker");
	$("[data-toggle='popover']").popover('hide');
            setTimeout(function(){
                $("."+id_).fadeOut("slow", function() {
                    $(this).removeClass("marker");
                }); 
                $("."+id_).fadeIn("slow", function() {
                    $("."+id_).show();
                 });
            }, 2500);
    var count = 0;
    
    var findElements = $("."+id_);
    for(var i=0; i<findElements.length; i++){
        var ele = findElements.eq(i);
        if(val_ == ele.html()){
            count = count+1;
        }
    }
    
    $("#findCount").html(val_+" : "+count);
	$("[data-toggle='popover']").popover('hide');
});


$(document).ready(function () {
	$("#uform").submit(function (event) {
	  var formData = {
		file: $("#file-upload").val(),
	  };
  
	  $.ajax({
		type: "POST",
		url: "/upload",
		data: formData,
		dataType: "json",
		encode: true,
	  }).done(function (data) {
		console.log(data);
	  });
  
	  event.preventDefault();
	});
  });
*/

/** 

var file = this.files[0];

var reader = new FileReader();
reader.onload = function(progressEvent){
	console.log(this.result);
	var lines = this.result.split('\n');
	for(var line = 0; line < lines.length; line++){
		console.log(lines[line]);
	}
};
reader.readAsText(file);

/**
$(document).on("click", ".btn-stop-bloom", function (e) {
    $.ajax({
      type : 'GET',
      url : "/bloomGetter",
      success: function(data_, status, hyf) { 
            if(data_ == "Done"){    // Started
                $.ajax({
                      type : 'GET',
                      url : "/bloomStop",
                      beforeSend: function() {
                            $(".bloom-build").hide();
                            $(".bloom-build-panel").html(' <p class="running">Cancelling Process....</p>');
                            $(".btn-stop-symspell").attr("disabled", "true");
                            $(".btn-start-symspell").attr("disabled","true");
                      },
                      success: function(data_, status, hyf) { 
                           if(data_ == "Done"){
                                dashboardShower();
                           }
                       }, error: function(data_, status, hyf) {
                                console.log("error");
	                 }
                 }); 
            }else{
                dashboardShower();
            }
       }, error: function(data_, status, hyf) {
          console.log("error");
	  }
    });  
});

**/
  	