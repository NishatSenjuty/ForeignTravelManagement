
load_companies_for_dropdown();

load_Departments_for_dropdown();

load_Designation_for_dropdown();


function getCurrDate() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}

function convertJsonDate(date) {

    var fullDate = new Date(parseInt(date.substr(6)));
    var twoDigitMonth = (fullDate.getMonth() + 1) + ""; if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;

    var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
    return twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

}

$("#dob").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

//$("#dob").val(getCurrDate());

// load_department_select_items
//load_department_select_items();
//function load_department_select_items() {
//    $.ajax({
//        url: '/Departments/ShowDepartmentsForDropdown',
//        type: "POST",
//        contentType: "application/json; charset-utf-8",
//        async: false,
//        success: function (resp) {
//            if (resp.error) {
//                iziToast.error({
//                    title: 'Error!',
//                    message: resp.message,
//                    position: 'bottomRight'
//                });
//            }
//            else {

//                //
//                var departmentSelect = document.getElementById("department");

//                show_department_select_items(departmentSelect, resp.data);

//            }

//        },
//        error: function (jqXHR, exception) {
//            var msg = '';
//            if (jqXHR.status === 0) {
//                msg = 'Not connect.\n Verify Network.';
//            } else if (jqXHR.status == 404) {
//                msg = 'Requested page not found. [404]';
//            } else if (jqXHR.status == 500) {
//                msg = 'Internal Server Error [500].';
//            } else if (exception === 'parsererror') {
//                msg = 'Requested JSON parse failed.';
//            } else if (exception === 'timeout') {
//                msg = 'Time out error.';
//            } else if (exception === 'abort') {
//                msg = 'Ajax request aborted.';
//            } else {
//                msg = 'Uncaught Error.\n' + jqXHR.responseText;
//            }
//            iziToast.error({
//                title: 'Ajax Error!',
//                message: msg,
//                position: 'bottomRight'
//            });
//        },
//        beforeSend: function () {
//            $("#department").attr("disabled", true);
//        },
//        complete: function () {
//            $("#department").attr("disabled", false);
//        }
//    });

//}


//// show_companies_location_select_items
//function show_department_select_items(departmentSelect, data) {

//    $.each(data, function (index, value) {
//        departmentSelect.options[departmentSelect.options.length] = new Option(value.DepartmentName, value.DepartmentId);
//    });
//    if (departmentSelect.length == 2) {
//        departmentSelect.selectedIndex = 1;
//        departmentSelect.dispatchEvent(new Event("change"));
//    }
//}



// load company for dropdown
function load_companies_for_dropdown() {
    $.ajax({
        url: '/Companies/ShowCompanyLocationsForDropdown',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        async: false,
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
        SECTION START
///////////////////////////////////////
*/




setTimeout(function () {
    load_myProfile();
}, 1500);


function load_myProfile() {
    $.ajax({
        url: '/MyProfile/GetMyProfile',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        async: false,
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                //console.log("resp", resp);


                $("#fullname").data("userNo", resp.data.UserNo);
                $("#empid").val(resp.data.EmployeeId);
                $("#firstname").val(resp.data.FirstName);
                $("#middlename").val(resp.data.MiddleName);
                $("#lastname").val(resp.data.LastName);
                $("#gender").val(resp.data.Gender);
                $("#nationality").val(resp.data.Nationality);
                $("#address").val(resp.data.PresentAddress);
                $("#emergency").val(resp.data.EmgContactNo);
                $("#dob").val(convertJsonDate(resp.data.DOB));    
                $("#fullname").val(resp.data.FullName);
                $("#contactNo").val(resp.data.ContactNo);

                $("#department").val(resp.data.DepartmentId);
                $("#designation").val(resp.data.DesignationId);

                //alert(resp.data.DesignationId);
                //alert(resp.data.DepartmentId);

                $("#UN_official").val(resp.data.Email);
                $("#company").val(resp.data.EnrollCompanyLocationFloors[0].CompanyId).change();
                $("#location").val(resp.data.EnrollCompanyLocationFloors[0].LocationId);

                //NID and Passport files

                $(".uploaded-design_passport").empty();

                $.each(resp.data.totissue, function (index, _value) {

                    let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value.Id });
                    let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value.location, target: "_blank", "data-id": _value.Id }).appendTo(btnGroupDiv);
                    let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                    if (resp.data.totissue.length > 0) {
                        let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Passport and NID files.");
                        btnGroupAnc.append(smallElement);
                    }

                    let btnGroupButton = $("<button>").attr({ "class": "btn btn-danger fileBtn", type: "button" }).appendTo(btnGroupDiv);
                    let btnGroupButtonIcon = $("<i>").attr({ "class": "bi bi-trash" }).appendTo(btnGroupButton);

                    $(".uploaded-design_passport").append(btnGroupDiv);

                    (function ($) {
                        btnGroupButton.on('click', function () {
                            $("#delete_File_modal").modal("show");
                            $("#delete_File_id_hidden").data("Id", _value.Id);
                        });
                    })(jQuery);

                });
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
            $("#sign_up_btn").attr("disabled", true);

        },
        complete: function () {
            $("#sign_up_btn").attr("disabled", false);
        }
    });
}


$("#delete_File_modal_form").on("submit", function (e) {
    e.preventDefault();

        var json = {
            Id: $("#delete_File_id_hidden").data('Id'),
        };

        $.ajax({
            type: "POST",
            url: "/MyProfile/DeleteFiles",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),
            success: function (resp) {
                if (resp.error) {
                    iziToast.error({
                        title: 'Error!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                } else {
                    iziToast.success({
                        title: 'File Removed!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    var deletedFileId = $("#delete_File_id_hidden").data('Id');
                    var fileBtnGroup = $("#fileId-" + deletedFileId);

                    fileBtnGroup.remove();
                    $("#delete_File_modal").modal('hide');
                }
            },
            error: function (jqXHR, exception) {
                var msg = '';

                if (jqXHR.status == 0) {
                    msg = 'Not Connected.\nVerify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested Page not FOUND. [ERROR:404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error. [ERROR:500]';
                } else if (exception == 'parseerror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception == 'timeout') {
                    msg = 'Time Out Error.';
                } else if (exception == 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }

                iziToast.error({
                    title: 'Error!',
                    message: msg,
                    position: 'bottomRight'
                });
            }
        });
});


$("#user_sign_up_form").on("submit", function (e) {
    e.preventDefault();
    if ($('#user_sign_up_form')[0].checkValidity() === false) {
        e.stopPropagation();
    } else {
        user_sign_up();
    }
});


//function user_sign_up() {

//    if ($('#user_sign_up_form')[0].checkValidity() === false) {
//        e.stopPropagation();
//    }
//    else {

//        var json = {
//            UserNo: $("#fullname").data("userNo"),
//            Fullname: $("#fullname").val(),
//            ContactNo: $("#contactNo").val(),
//            DepartmentId: $("#department").val(),
//            Designation: $("#designation").val(),
//            Email: $("#email_address").val(),
//            EnrollCompanyLocationFloors: [{
//                CompanyId: $("#company").val(),
//                LocationId: $("#location").val()
//            }]
//        };
//        console.log(json);
//        $.ajax({
//            url: "/MyProfile/UpdateUserSignUp/",
//            type: "POST",
//            data: json,
//            dataType: "json",
//            success: function (resp) {
//                if (resp.error) {
//                    iziToast.error({
//                        title: 'Error!',
//                        message: resp.message,
//                        position: 'bottomRight'
//                    });

//                }
//                else {
//                    iziToast.success({
//                        title: 'Success!',
//                        message: resp.message,
//                        position: 'bottomRight'
//                    });
//                    $("#sign_up_btn").remove();

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
//                $("#sign_up_btn").append('Update');

//            }
//        });

//    }
//}



function user_sign_up() {

    if ($('#user_sign_up_form')[0].checkValidity() === false) {
        e.stopPropagation();
    } else {

        var json = {
            UserNo: $("#fullname").data("userNo"),
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
            Email: $("#UN_official").val(),
            ContactNo: $("#contactNo").val(),
            DepartmentId: $("#department").val(),
            DesignationId: $("#designation").val(),

            EnrollCompanyLocationFloors: [{
            CompanyId: $("#company").val(),
            LocationId: $("#location").val()
            }]
        };

        var formData = new FormData();

        formData.append("UserNo", json.UserNo);
        formData.append("EmployeeId", json.EmployeeId);
        formData.append("FullName", json.FullName);
        formData.append("FirstName", json.FirstName);
        formData.append("MiddleName", json.MiddleName);
        formData.append("LastName", json.LastName);
        formData.append("DOBStr", json.DOBStr);
        formData.append("Gender", json.Gender);
        formData.append("Nationality", json.Nationality);
        formData.append("PresentAddress", json.PresentAddress);
        formData.append("EmgContactNo", json.EmgContactNo);
        formData.append("Email", json.Email);
        formData.append("ContactNo", json.ContactNo);
        formData.append("DepartmentId", json.DepartmentId);
        formData.append("DesignationId", json.DesignationId);

        for (let i = 0; i < json.EnrollCompanyLocationFloors.length; i++) {
            formData.append("EnrollCompanyLocationFloors[" + i + "].CompanyId", json.EnrollCompanyLocationFloors[i].CompanyId);
            formData.append("EnrollCompanyLocationFloors[" + i + "].LocationId", json.EnrollCompanyLocationFloors[i].LocationId);
        }


        for (let i = 0; i < $("#fileUploadpass")[0].files.length; i++) {
            formData.append("PassportFiles", $("#fileUploadpass")[0].files[i]);
        }

        for (let i = 0; i < $("#fileUploadNID")[0].files.length; i++) {
            formData.append("NIDFiles", $("#fileUploadNID")[0].files[i]);
        }

        //if ($("#fileUploadpass")[0].files.length > 0) {
        //    for (let i = 0; i < $("#fileUploadpass")[0].files.length; i++) {
        //        formData.append("PassportFiles", $("#fileUploadpass")[0].files[i]);
        //    }
        //} else {
        //    console.warn("No passport files attached.");
        //}

        //if ($("#fileUploadNID")[0].files.length > 0) {
        //    for (let i = 0; i < $("#fileUploadNID")[0].files.length; i++) {
        //        formData.append("NIDFiles", $("#fileUploadNID")[0].files[i]);
        //    }
        //} else {
        //    console.warn("No NID files attached.");
        //}



        console.log(json);

        $.ajax({
            url: "/MyProfile/UpdateUserSignUp/",
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
                } else {
                    //location.href = resp.url;

                    iziToast.success({
                        title: 'Updatation is successful!',
                        message: resp.message,
                        position: 'bottomRight',
                    });

                    setTimeout(function () {
                        location.reload();
                    }, 2500);
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
}
/*
///////////////////////////////////////
        ADMIN SIGN IN SECTION END
///////////////////////////////////////
*/