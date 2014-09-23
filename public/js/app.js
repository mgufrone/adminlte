// initialize iCheckbox after ajax calls
$(document).ready(function()
{
    $(document).off('submit','#login-form').on('submit', '#login-form', function()
    {
        var remember = false;
        if($("#remember").is(':checked'))
        {
            remember = true;
        }

        var sArray = $(this).serializeArray()
        $.ajax({
            "type": "POST",
            "url": window.location.href.toString(),
            "data": sArray,
            "dataType": "json"
        }).done(function(result)
        {
            $('#login-form').find('.loading-area').hide().next().show();
            if(result.logged === false)
            {
                if(typeof result.errorMessage !== 'undefined')
                {
                    showStatusMessage(result.errorMessage, 'danger');
                }
                else if(typeof result.errorMessages !== 'undefined')
                {
                    showRegisterFormAjaxErrors(result.errorMessages);
                }
            }
            else
            {
                window.location = "";
            }
        });

        return false;
    });
});
$(document).ajaxComplete(function() {
    $("input[type='checkbox'], input[type='radio']").not('.ignore').not('.bootswitch').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal'
    });
});

$('input').on('ifChanged', function(event){
    $(this).trigger('change');
    $('input').iCheck('update');
});


$('#login-form').on('submit', function(){

  $(this).find('.loading-area').show().next().hide();
});

var showStatusMessage = function(message, type)
{
    $('.status-message').remove();
    $('.label-danger').remove();

    var html = '<div class="row status-message">\n\
                        <div class="col-lg-12">\n\
                            <div class="alert alert-'+type+'">\n\
                                '+message+'\n\
                            </div>\n\
                        </div>\n\
                </div>';

    if($('#login-form').size()>0)
    {
      $(html).prependTo('#login-form .body').hide().slideDown(300, function(){
        var content = $(this);
        setTimeout(function(){
          content.slideUp(300);
        }, 2000);
      }).find('.alert').addClass('no-margin');
    }
    else
      $(html).prependTo('.right-side .content').hide().fadeIn(900);
};
