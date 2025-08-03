
function getCurrDate() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}

$("#dob").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

//load_department_select_items
//load_department_select_items();
function load_department_select_items() {
    $.ajax({
        url: '/Departments/ShowDepartmentsForDropdown',
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

                //
                var departmentSelect = document.getElementById("department");

                show_department_select_items(departmentSelect, resp.data);

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
            $("#department").attr("disabled", true);
        },
        complete: function () {
            $("#department").attr("disabled", false);
        }
    });

}


// show_companies_location_select_items
function show_department_select_items(departmentSelect, data) {

    $.each(data, function (index, value) {
        departmentSelect.options[departmentSelect.options.length] = new Option(value.DepartmentName, value.DepartmentId);
    });
    if (departmentSelect.length == 2) {
        departmentSelect.selectedIndex = 1;
        departmentSelect.dispatchEvent(new Event("change"));
    }
}



// load company for dropdown
load_companies_for_dropdown();
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

                //console.log("resp", resp)

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

load_Designation_for_dropdown();

function load_Designation_for_dropdown() {
    $.ajax({
        type: "POST",
        url: "/Designations/ShowDesignationsForDropDownInEmpInfo",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                $("#designation").empty();

                $("#designation").append('<option value="">Select Designation</option>');

                $.each(resp.data, function (index, value) {
                    $("#designation").append('<option value="' + value.Id + '">' + value.DesignationName + '</option>');
                });
            }
        },

        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status == 0) {
                msg = 'Not Connected.\nVerify Network.';
            }
            else if (jqXHR.status == 404) {
                msg = 'Requested Page not FOUND. [ERROR:404]';
            }
            else if (jqXHR.status == 500) {
                msg = 'Internal Server Error. [ERROR:500]';
            }
            else if (exception == 'parseerror') {
                msg = 'Requested JSON parse failed.';
            }
            else if (exception == 'timeout') {
                msg = 'Time Out Error.';
            }
            else if (exception == 'abort') {
                msg = 'Ajax request aborted.';
            }
            else {
                msg = 'Uncaught Error.\n + jqXHR.responseText';
            }

            iziToast.error({
                title: 'error!',
                message: msg,
                position: 'bottomRight'
            });
        },
    });
}

load_Departments_for_dropdown();

function load_Departments_for_dropdown() {
    $.ajax({
        type: "POST",
        url: "/Departments/ShowDepartmentsForDropdown",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                $("#department").empty();

                $("#department").append('<option value="">Select Department</option>');

                $.each(resp.data, function (index, value) {
                    $("#department").append('<option value="' + value.Id + '">' + value.Name + '</option>');
                });
            }
        },

        error: function (jqXHR, exception) {

            var msg = '';
            if (jqXHR.status == 0) {
                msg = 'Not Connected.\nVerify Network.';
            }
            else if (jqXHR.status == 404) {
                msg = 'Requested Page not FOUND. [ERROR:404]';
            }
            else if (jqXHR.status == 500) {
                msg = 'Internal Server Error. [ERROR:500]';
            }
            else if (exception == 'parseerror') {
                msg = 'Requested JSON parse failed.';
            }
            else if (exception == 'timeout') {
                msg = 'Time Out Error.';
            }
            else if (exception == 'abort') {
                msg = 'Ajax request aborted.';
            }
            else {
                msg = 'Uncaught Error.\n + jqXHR.responseText';
            }

            iziToast.error({
                title: 'error!',
                message: msg,
                position: 'bottomRight'
            });
        },

        beforeSend: function () {
            //$("#ls_location_loading_spinner").show()

            $("#ls_add_EmpInfo_department").attr("disabled", true);
            $("#ls_edit_EmpInfo_department").attr("disabled", true);

        },

        complete: function () {
            // $("#ls_location_loading_spinner").hide();

            $("#ls_add_EmpInfo_department").attr("disabled", false);
            $("#ls_edit_EmpInfo_department").attr("disabled", false);
        }
    });
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



//$(document).ready(function () {
//    $("#user_sign_up_form").submit(function (event) {
//        event.preventDefault();

//        if (!$("#user_sign_up_form")[0].checkValidity()) {
//            event.stopPropagation();
//            return;
//        }

//        //var response = grecaptcha.getResponse();
//        //if (response.length == 0) {
//        //    // Handle reCAPTCHA validation failure
//        //    // You might want to display an error message to the user
//        //    return;
//        //}


//        var formData = $(this).serialize();

//        $.ajax({
//            type: "POST",
//            url: "/AccountSignUp/UserSignUp",
//            data: formData,
//            //success: function (response) {
//            //    if (response.error) {
//            //        // Display an error message to the user
//            //        console.error(response.message);

//            //        iziToast.error({
//            //        title: 'Error!',
//            //        message: resp.message,
//            //        position: 'bottomRight'
//            //    });
//            success: function (resp) {
//                if (resp.error) {
//                    iziToast.error({
//                        title: 'Error!',
//                        message: resp.message,
//                        position: 'bottomRight'
//                    });

//                    grecaptcha.reset();
//                }
//                else {
//                    // Redirect to the verification page or perform other actions
//                //    window.location.href = response.url;


//                }
//            },
//            error: function () {
//                console.error("Error occurred during the AJAX request");
//            }
//        });
//    });
//});


//Muzahid vai


//function user_sign_up(token) {

//    if ($('#user_sign_up_form')[0].checkValidity() === false) {
//        e.stopPropagation();
//    }
//    else {

//        var json = {
//            Fullname: $("#fullname").val(),
//            ContactNo: $("#contactNo").val(),
//            DepartmentId: $("#department").val(),
//            Designation: $("#designation").val(),
//            Email: $("#email_address").val(),
//            Password: $("#password").val(),
//            ConfirmPassword: $("#confirm_password").val(),
//            CompanyId: $("#company").val(),
//            LocationId: $("#location").val(),
//            browser: platform.name + " " + platform.version,
//            operatingSystem: platform.os.toString(),
//            ipAddress: find_ip,
//            response: token
//        };
//        console.log(json);
//        $.ajax({
//            //url: "/AccountSignUp/UserSignUp/",
//            type: "POST",
//            data: json,
//            dataType: "json",
//            traditional: true,
//            success: function (resp) {
//                if (resp.error) {
//                    iziToast.error({
//                        title: 'Error!',
//                        message: resp.message,
//                        position: 'bottomRight'
//                    });

//                    grecaptcha.reset();
//                }
//                else {
//                    //location.href = resp.url;
//                }
//            },
//            error: function (a, b, err) {
//                iziToast.error({
//                    title: 'Error!',
//                    message: resp.message,
//                    position: 'bottomRight'
//                });
//            },
//            beforeSend: function () {
//                $("#sign_up_btn").empty();
//                $("#sign_up_btn").append('<img src="/Content/assets/vendors/svg-loaders/circles.svg" class="text text-white" style="width: 2rem;height:2rem" alt="audio">');

//            },
//            complete: function () {
//                $("#sign_up_btn").empty();
//                $("#sign_up_btn").append('Sign Up');

//            }
//        });

//    }
//}


//Nishat
$("#user_sign_up_form").submit(function (e) {
    if ($('#user_sign_up_form')[0].checkValidity() === false) {
        e.stopPropagation();
    } else {
        e.preventDefault();

        let token = '';

        var json = {
            EmployeeId: $("#empid").val(),
            FullName: $("#fullname").val(),
            FirstName: $("#firstname").val(),
            MiddleName: $("#middlename").val(),
            LastName: $("#lastname").val(),
            DOBStr: $("#dob").val(),
            Gender: $("#gender").val(),
            Nationality: $("#nationality").val(),
            PresentAddress: $("#address").val(),
            EmgContactNo: $("#emergency").val(),
            Email: $("#email_address").val(),
            ContactNo: $("#contactNo").val(),
            DepartmentId: $("#department").val(),
            DesignationId: $("#designation").val(),
            PrimaryCompanyId: $("#company").val(),
            PrimaryLocationId: $("#location").val(),
            Password: $("#password").val(),
            ConfirmPassword: $("#confirm_password").val(),
            browser: platform.name + " " + platform.version,
            operatingSystem: platform.os.toString(),
            ipAddress: find_ip,
            response: token
        };

        var formData = new FormData();

        formData.append("EmployeeId", json.EmployeeId);
        formData.append("FullName", json.FullName);
        formData.append("FirstName", json.FirstName);
        formData.append("MiddleName", json.MiddleName);
        formData.append("LastName", json.LastName);
        formData.append("DOBStr", json.DOBStr);
        formData.append("Gender", json.Gender);
        formData.append("Nationality", json.Nationality);
        formData.append("PresentAddress", json.PresentAddress);
        formData.append("ContactNo", json.ContactNo);
        formData.append("EmgContactNo", json.EmgContactNo);
        formData.append("Email", json.Email);
        formData.append("DepartmentId", json.DepartmentId);
        formData.append("DesignationId", json.DesignationId);
        formData.append("PrimaryCompanyId", json.PrimaryCompanyId);
        formData.append("PrimaryLocationId", json.PrimaryLocationId);
        formData.append("Password", json.Password);
        formData.append("ConfirmPassword", json.ConfirmPassword);
        formData.append("browser", json.browser);
        formData.append("operatingSystem", json.operatingSystem);
        formData.append("ipAddress", json.ipAddress);
        formData.append("response", json.response);

        for (let i = 0; i < $("#fileUploadpass")[0].files.length; i++) {
            formData.append("PassportFiles", $("#fileUploadpass")[0].files[i]);
        }

        for (let i = 0; i < $("#fileUploadNID")[0].files.length; i++) {
            formData.append("NIDFiles", $("#fileUploadNID")[0].files[i]);
        }

        //console.log("json", json);

        $.ajax({
            url: "/AccountSignUp/UserSignUp/",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
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

                    //iziToast.success({
                    //    title: 'Thanks for signing up!! Your Sign Up is successful.',
                    //    message: resp.message,
                    //    position: 'bottomRight',
                    //});

                    let email = json.Email;
                    let username = email.substring(0, email.indexOf('@'));

                    iziToast.success({
                        title: `Your User Name is ${username}. Thanks for signing up!!`,
                        position: 'center',
                        timeout: false,
                    });

                    //setTimeout(function () {
                    //    location.reload();
                    //}, 1500);

                    //location.href = resp.url;
                }
            },
            error: function (a, b, err) {
                iziToast.error({
                    title: 'Error!',
                    message: err,
                    position: 'bottomRight'
                });
            },
            beforeSend: function () {
                $("#sign_up_btn").empty();
                $("#sign_up_btn").append('<img src="/Content/assets/vendors/svg-loaders/circles.svg" class="text text-white" style="width: 2rem;height:2rem" alt="audio">');
            },
            complete: function () {
                $("#sign_up_btn").empty();
                $("#sign_up_btn").append('Sign Up');
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