var spaceConvert =  function(cursorPoint){
    var data = $("#editor").html(); 
    data = data.replace(/\xA0/g,' ');
    data = data.replace(/&amp;nbsp;/g,"");
    const str_ = cursorPoint;
    var newString = "";
    for (var i = str_.length-2; i >= 0; i--) { 
        if(str_[i] != " "){
            newString += str_[i]; 
        }else{
            break;
        }
    }
    var str = "";
    for (var i = newString.length -1; i >= 0; i--) { 
        str += newString[i]; // or newString = newString + str[i];
    }
    console.log(str);
    var j = 0;
    for(var i= 0; i<data.length && j<cursorPoint.length;i++){
        if(data[i]==str_[j]){
            j++;
        }
    }
    i = i+1;
    
   // console.log(i);
   
    if(str.length != 0){
    
    
    
    
        var x = "67bsg87djs";
        tooltipCode = `<span  class="${x}" id="underline"  data-toggle="popover" data-trigger="hover" data-html="true"  data-placement="bottom" data-content="<p class=closePop>x</p><p id=${x} class=A2D  >Add to Dictionary</p><hr/><p id=${x} data-toggle=collapse href=#suggestionOne class=SW  >Suggestion</p><hr/><p id=${x} class=RW  >Replace All</p><hr/><p id=${x} class=IW  >Ignore</p>"  >${str}</span> `;
            $("#editor").html(data.substring(0,(i-str.length)-2)+""+tooltipCode+""+data.substring(i-1));
            $(".67bsg87djs").popover();
            $(".67bsg87djs").popover('hide');
            
            /**
                let richText = document.getElementById('contentbox');
                Cursor.setCurrentCursorPosition(i, richText);
                richText.focus();
            **/
            
            const el = document.getElementById('editor');
            const selection = window.getSelection();
            const range = document.createRange();
            selection.removeAllRanges();
            range.selectNodeContents(el);
            range.collapse(false);
            selection.addRange(range);
            el.focus();
            
    }
    
};

var updateKey = function(e) {
    if(e.keyCode == 32){
        var pos = getCaretCharacterOffsetWithin(this);
        if(pos != 0){
            spaceConvert(pos);
            console.log("ddd");
        }
    }
};

$('#editor').on("keyup", updateKey);

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

