

// load company for dropdown
//load_companies_for_dropdown();
function load_companies_for_dropdown() {
    $.ajax({
        url: '/Companies/ShowCompanyLocationsForDropdown',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {

                console.log("resp", resp)

                //
                var companySelect = document.getElementById("company");
                var locationSelect = document.getElementById("location");

                show_companies_location_select_items(companySelect, locationSelect, resp.data);

            }

        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            iziToast.error({
                title: 'Ajax Error!',
                message: msg,
                position: 'bottomRight'
            });
        },
        beforeSend: function () {
            $("#company").attr("disabled", true);
            $("#location").attr("disabled", true);
        },
        complete: function () {
            $("#company").attr("disabled", false);
            $("#location").attr("disabled", false);
        }
    });

}


// show_companies_location_select_items
function show_companies_location_select_items(companySelect, locationSelect, data) {

    $.each(data, function (index, value) {
        companySelect.options[companySelect.options.length] = new Option(value.CompanyName, value.CompanyId);
    });
    companySelect.onchange = function () {

        let companyId = companySelect.options[companySelect.selectedIndex].value;
        if (companyId <= 0) {
            locationSelect.length = 1;

            return;
        }
        locationSelect.length = 1;

        //display correct values
        $.each(data.find(e => e.CompanyId === parseInt(companyId)).Locations, function (index, value) {

            locationSelect.options[locationSelect.options.length] = new Option(value.LocationName, value.LocationId);

        });

        if (locationSelect.length == 2) {
            locationSelect.selectedIndex = 1;
        }

    }
    if (companySelect.length == 2) {
        companySelect.selectedIndex = 1;
        companySelect.dispatchEvent(new Event("change"));
    }
}


/*
///////////////////////////////////////
        ADMIN SIGN IN SECTION START
///////////////////////////////////////
*/
//console.log(platform);

$.getJSON('https://api.ipify.org?format=json', function (data) {
    console.log(data.ip);
});

var find_ip = "";

//$("#user_sign_up_form").on("submit", function (e) {
//    e.preventDefault();
//    if ($('#user_sign_up_form')[0].checkValidity() === false) {
//        e.stopPropagation();
//    } else {
//        grecaptcha.execute();
//    }
//});


//function user_sign_up(token) {

//    if ($('#user_sign_up_form')[0].checkValidity() === false) {
//        e.stopPropagation();
//    }
//    else {


$("#user_sign_up_form").submit(function (e) {
    if ($('#user_sign_up_form')[0].checkValidity() === false) {
        e.stopPropagation();
    }

    else {
        e.preventDefault();

        let token = '';

        var json = {
            Password: $("#password").val(),
            ConfirmPassword: $("#confirm_password").val(),
            response: token
        };
        console.log(json);
        $.ajax({
            url: "/ForgotPasswords/UserPasswordChange/",
            type: "POST",
            data: json,
            dataType: "json",
            traditional: true,
            success: function (resp) {
                if (resp.error) {
                    iziToast.error({
                        title: 'Error!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    grecaptcha.reset();
                }
                else {
                    location.href = resp.url;
                }
            },
            error: function (a, b, err) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            },
            beforeSend: function () {
                $("#sign_up_btn").empty();
                $("#sign_up_btn").append('<img src="/Content/assets/vendors/svg-loaders/circles.svg" class="text text-white" style="width: 2rem;height:2rem" alt="audio">');

            },
            complete: function () {
                $("#sign_up_btn").empty();
                $("#sign_up_btn").append('Continue');

            }
        });

    }
});


$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
    find_ip = data.ip;
})
/*
///////////////////////////////////////
        ADMIN SIGN IN SECTION END
///////////////////////////////////////
*/