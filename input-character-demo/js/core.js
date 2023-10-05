/* 
***************************************
   Input Character Assessment Demo
   by Theo du Plooy
   081 415 6287 | tdpcorp@gmail.com
*************************************** 
 */

/// Globals ///
var maxCharLength = 1000;
var inputMaxCharLength = 39;
var currentInputCount = 0;
var overallCharLength = 0;
var alertFlag = true;
var charReachedFlag = true;
var stringCollector = "";


function inputBoxMaker(locationTarget,labelCount,classId) {
    var inputBoxMakerElement = '<div class="row"><label>Line '+labelCount+'</label><div class="input-close-holder"><input type="text" placeholder="Please enter a value here" maxlength="40" value="" class="'+classId+'" /><div class="close"><span>x</span></div></div></div>';
    $(locationTarget).closest('.row').after($(inputBoxMakerElement));
    if (locationTarget === "newline maker") {
        $(".input-holders").append(inputBoxMakerElement);
    }
}

function inputNuker() {
    $('.row .close').off("click").on("click", function () {
        var pickaNukerTerm = ["eliminate", "nuke", "destroy", "vaporize", "erase"];
        var randomizeNukeTerms = Math.floor(Math.random() * pickaNukerTerm.length);
        var pickaNukeTerm = pickaNukerTerm[randomizeNukeTerms];
        if (alertFlag === true) {
            alertFlag = false;
            var inputBoxCount = $(".row input").length;
            if (inputBoxCount < 2) {
                alert("I'm afraid I can't allow you to do that. I'm not allowed to delete the last input box. But feel free to add more and delete those if you wish :)");
                alertFlag = true;
            } else {
                if (confirm("Wait! Are you *absolutely* sure you want to *"+pickaNukeTerm+"* this input box? Like are you sure, sure?")) {
                    $(this).closest(".row").remove();
                    alertFlag = true;
                    $(".row").each(function(rowCount) {
                        $(this).find("label").html("Line: "+(rowCount));
                    });
                } else {
                    alertFlag = true;
                }
            }
        }
    });
}

function myFriendlyInputCharCheck(targetInputBox) {
    $(targetInputBox).on("input",function(){
        /// Gets the current char length for both current input and pverall char length, 
        /// passes value to the String Collector and later outputs to TextArea
        var getThisCharLength = $(this).val().length;
        overallCharLength = 0;
        stringCollector = "";
        $("input").each(function() {    
            overallCharLength += $(this).val().length;
            stringCollector += $(this).val();
          });
        if (overallCharLength < 1001) {
            var countInputElements = $('input').length;
            var idCalcAssign = parseInt(countInputElements+1);
            var idAssign = "id-"+idCalcAssign;

            /// Output Feedback + TextArea generation ///
            $(".output").html('<b>Current box length:</b> '+getThisCharLength+' | <b>Overall Char Count:</b> '+overallCharLength);
            $('.textarea-output').html(stringCollector);

            /// Detects char length reached, creates new input row, appends output textarea with current input's values, binds input row nuker, binds this CharCheck function on new input by classID ///
            if (getThisCharLength > inputMaxCharLength) {
                inputBoxMaker(this,idCalcAssign,idAssign);
                inputNuker();
                myFriendlyInputCharCheck("."+idAssign+"");
                $("."+idAssign+"").focus();
            }
        }
        /// Char length limit reached handler, adds fps hit effect, disables text inputs + displays alert ///
        else {
            $("body").addClass('alert');
            setTimeout(function(){
                if (charReachedFlag === true) {
                    charReachedFlag = false;
                    alert('Well done! Char length of '+maxCharLength+' reached! Please remove a textbox to add chars again ;)');
                    charReachedFlag = true;
                }
            },500);
            setTimeout(function(){
                $("body").removeClass('alert');
            },1500);
            $("input[type='text']").attr('disabled');
        }
    });
}

function init() {
    $(".newline").on("click",function() {
        var countInputElements = $('input').length;
        var idCalcAssign = parseInt(countInputElements+1);
        var idAssign = "id-"+idCalcAssign;
        inputBoxMaker("newline maker",idCalcAssign,idAssign);
        inputNuker();
        myFriendlyInputCharCheck("."+idAssign+"");
        $("."+idAssign+"").focus();
    });
    inputBoxMaker(".init","1","1");
    myFriendlyInputCharCheck("input[type='text']");
    inputNuker();
}

$(document).ready(function() {
    /// Do the initial setup /// 
    init();
});