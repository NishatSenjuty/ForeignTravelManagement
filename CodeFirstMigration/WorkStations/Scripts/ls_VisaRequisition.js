


function convertJsonDate(date) {

    var fullDate = new Date(parseInt(date.substr(6)));
    var twoDigitMonth = (fullDate.getMonth() + 1) + ""; if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;

    var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
    return twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

}

function getCurrDate() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}

$("#ls_add_visareq_other_prevvisited_issuedate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_add_visareq_other_prevvisited_expdate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_add_visareq_EntryDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_add_visareq_TravelDate_dep").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_add_visareq_TravelDate_ret").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_visareq_other_prevvisited_issuedate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_visareq_other_prevvisited_expdate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_visareq_EntryDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_visareq_TravelDate_dep").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_visareq_TravelDate_ret").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_add_VisaDoc_IssueDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});


$("#ls_add_VisaDoc_ExpDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert()

});



$("#ls_add_visareq_btn").on("click", function () {
    $("#ls_add_visareq_modal").modal("show");
    $("#ls_add_visareq_modal_form").trigger("reset");
    $("#ls_add_visareq_modal_form").removeClass('was-validated');

    $("#ls_add_visareq_other_visatype").attr("readonly", true);
    $("#ls_add_visareq_other_prevvisited_visatype").attr("readonly", true);
    $("#ls_add_visareq_other_prevvisited_issuedate").attr("disabled", true);
    $("#ls_add_visareq_other_prevvisited_expdate").attr("disabled", true);
    $("#ls_add_visareq_other_travel").attr("readonly", true);
});


$(document).ready(function () {
    $("#ls_add_visareq_visatype").change(function () {
        if ($(this).val() == "4")
        {
            $("#ls_add_visareq_other_visatype").prop("readonly", false);
        }
        else
        {
            $("#ls_add_visareq_other_visatype").prop("readonly", true);
            $("#ls_add_visareq_other_visatype").val('');
        }
    });
});


$(document).ready(function () {
    $("#ls_add_visareq_prevvisited").change(function () {
        if ($(this).val() == "1")
        {
            $("#ls_add_visareq_other_prevvisited_visatype").attr("readonly", false);
            $("#ls_add_visareq_other_prevvisited_issuedate").attr("disabled", false);
            $("#ls_add_visareq_other_prevvisited_expdate").attr("disabled", false);
        }
        else
        {
            $("#ls_add_visareq_other_prevvisited_visatype").attr("readonly", true);
            $("#ls_add_visareq_other_prevvisited_issuedate").attr("disabled", true);
            $("#ls_add_visareq_other_prevvisited_expdate").attr("disabled", true);
            $("#ls_add_visareq_other_prevvisited_visatype").val('');
            $("#ls_add_visareq_other_prevvisited_issuedate").val('');
            $("#ls_add_visareq_other_prevvisited_expdate").val('');
        }
    });
});


$(document).ready(function ()
{
    $("#ls_add_visareq_travel").change(function ()
    {
        if ($(this).val() == "4")
        {
            $("#ls_add_visareq_other_travel").prop("readonly", false);
        }
        else
        {
            $("#ls_add_visareq_other_travel").prop("readonly", true);
            $("#ls_add_visareq_other_travel").val('');
        }
    });
});


$(document).ready(function () {
    $("#ls_add_visareq_invitation_letter").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design").html(fileNames);
    }
});

$(document).ready(function () {
    $("#ls_add_VisaDoc_attachment").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design_TD").html(fileNames);
    }
});


//DropDown for Departments

load_Company_for_dropdown();

function load_Company_for_dropdown() {
    $.ajax({
        type: "POST",
        url: "/Companies/ShowCompaniesForDropDownLocation",
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
                $("#ls_filter_rp_EmpInfo_Company").empty();

                $("#ls_filter_rp_EmpInfo_Company").append('<option value="">Select Company</option>');

                $.each(resp.data, function (index, value) {
                    $("#ls_filter_rp_EmpInfo_Company").append('<option value="' + value.Id + '">' + value.CompanyName + '</option>');
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
                $("#ls_filter_rp_EmpInfo_designation").empty();

                $("#ls_filter_rp_EmpInfo_designation").append('<option value="">Select Designation</option>');

                $.each(resp.data, function (index, value) {
                    $("#ls_filter_rp_EmpInfo_designation").append('<option value="' + value.Id + '">' + value.DesignationName + '</option>');
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

            $("#ls_add_EmpInfo_designation").attr("disabled", true);
            $("#ls_edit_EmpInfo_designation").attr("disabled", true);

        },

        complete: function () {
            // $("#ls_location_loading_spinner").hide();

            $("#ls_add_EmpInfo_designation").attr("disabled", false);
            $("#ls_edit_EmpInfo_designation").attr("disabled", false);
        }
    });
}



//DropDown for Departments

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
                $("#ls_filter_rp_EmpInfo_department").empty();

                $("#ls_filter_rp_EmpInfo_department").append('<option value="">Select Department</option>');

                $.each(resp.data, function (index, value) {
                    $("#ls_filter_rp_EmpInfo_department").append('<option value="' + value.Id + '">' + value.Name + '</option>');
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


PopulateApplicantDetails();

function PopulateApplicantDetails() {

    $.ajax({
        type: "POST",
        url: '/VisaRequisition/GetUserDetails',
        data: { userNo: userNo },


        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                //console.log("test", resp);

                var userDetails = resp.UserDetails;
                var userInfo = resp.UserInfo;

                $('#applicant_name').text(userDetails.FullName);
                $('#applicant_employee_id').text(userDetails.EmployeeId);
                $('#applicant_company').text(userInfo.CompanyName);
                $('#applicant_department').text(userInfo.Name);
                $('#applicant_designation').text(userInfo.DesignationName);
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


//Saving in database

$("#ls_add_visareq_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {

        TypeOfVisaUser: $("#ls_add_visareq_visatype").val(),
        TypeOfVisaOtherUser: $("#ls_add_visareq_other_visatype").val(),
        PreviouslyDestinedUser: $("#ls_add_visareq_prevvisited").val(),
        VisaTypePreviousUser: $("#ls_add_visareq_other_prevvisited_visatype").val(),
        IssueDatePrevUserStr: $("#ls_add_visareq_other_prevvisited_issuedate").val(),
        ExpiryDatePrevUserStr: $("#ls_add_visareq_other_prevvisited_expdate").val(),
        CountryNameUser: $("#ls_add_visareq_country").val(),
        PurposeOfTravelUser: $("#ls_add_visareq_travel").val(),
        PurposeOfTravelOtherUser: $("#ls_add_visareq_other_travel").val(),
        EntryDateUserStr: $("#ls_add_visareq_EntryDate").val(),
        DepartureUserStr: $("#ls_add_visareq_TravelDate_dep").val(),
        ReturnUserStr: $("#ls_add_visareq_TravelDate_ret").val(),
        AccomodationDetUser: $("#ls_add_visareq_accodet").val(),
        SpecialReqUser: $("#ls_add_visareq_spreq").val(),
        RemarksUser: $("#ls_add_visareq_remarks").val(),
        VisaReqActiveStatus: $("#ls_add_visareq_status").val()
    }


    var formData = new FormData();

    formData.append("TypeOfVisaUser", json.TypeOfVisaUser);
    formData.append("TypeOfVisaOtherUser", json.TypeOfVisaOtherUser);
    formData.append("PreviouslyDestinedUser", json.PreviouslyDestinedUser);
    formData.append("VisaTypePreviousUser", json.VisaTypePreviousUser);
    formData.append("IssueDatePrevUserStr", json.IssueDatePrevUserStr);
    formData.append("ExpiryDatePrevUserStr", json.ExpiryDatePrevUserStr);
    formData.append("CountryNameUser", json.CountryNameUser);
    formData.append("PurposeOfTravelUser", json.PurposeOfTravelUser);
    formData.append("PurposeOfTravelOtherUser", json.PurposeOfTravelOtherUser);
    formData.append("EntryDateUserStr", json.EntryDateUserStr);
    formData.append("DepartureUserStr", json.DepartureUserStr);
    formData.append("ReturnUserStr", json.ReturnUserStr);
    formData.append("AccomodationDetUser", json.AccomodationDetUser);
    formData.append("SpecialReqUser", json.SpecialReqUser);
    formData.append("RemarksUser", json.RemarksUser);
    formData.append("VisaReqActiveStatus", json.VisaReqActiveStatus);

    for (let i = 0; i < $("#ls_add_visareq_invitation_letter")[0].files.length; i++) {
        formData.append("Files", $("#ls_add_visareq_invitation_letter")[0].files[i]);
    }

    $.ajax({
        url: '/VisaRequisition/AddVisaRequisition',
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $("#spinner").show();
        },

        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            } else {
                iziToast.success({
                    title: 'Saved Successfully!',
                    message: resp.message,
                    position: 'bottomRight',
                });

                setTimeout(function () {
                    location.reload();
                }, 2500);
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

        complete: function () {
            $("#spinner").hide();
        }
    });
});





$("#visareq_filter_form").on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

//$("#ls_filter_btn").on("click", function (e) {

//    if (userRoleId != '1' && userRoleId != '5') {
//        e.preventDefault();
//        load_VisaRequisition_table(1);

//    }

//    else if (userRoleId != '1' && userRoleId != '3')
//    {
//        e.preventDefault();
//        load_VisaRequisition_table_Employee(1);
//    }
//});

//if (userRoleId != '1' && userRoleId != '3')   //Employee
//{
//    load_VisaRequisition_table_Employee(1);
//}

//if (userRoleId != '1' && userRoleId != '5') {    //Travel Desk
//    load_VisaRequisition_table(1);
//}


$("#ls_filter_btn").on("click", function (e) {

    if (userRoleId != '1' && userRoleId == '3') {
        e.preventDefault();
        load_VisaRequisition_table(1);

    }

    else if (userRoleId != '1' && userRoleId != '3') {
        e.preventDefault();
        load_VisaRequisition_table_Employee(1);
    }
});



if (userRoleId != '1' && userRoleId != '3')   //Employee
{
    load_VisaRequisition_table_Employee(1);
}

if (userRoleId != '1' && userRoleId == '3') {    //Travel Desk
    load_VisaRequisition_table(1);
}


// Employee

function load_VisaRequisition_table_Employee(page) {

    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        VisaRequisitionNoText: $("#filter_visareq_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        VisaReqActiveStatus: $("#filter_status").val(),
        page: page,
        userNo: userNo
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/VisaRequisition/ShowVisaRequisitionForEmployee",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(json),

        beforeSend: function () {
            $("#spinner").show()
        },

        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {

                //console.log("resp", resp);
                show_VisaRequisition_list(resp);

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

        complete: function () {
            $("#spinner").hide();
        }
    });
}


// Travel Desk

function load_VisaRequisition_table(page) {


    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        VisaRequisitionNoText: $("#filter_visareq_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        VisaReqActiveStatus: $("#filter_status").val(),
        page: page,
        limit: 10 

    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/VisaRequisition/ShowVisaRequisition",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(json),

        beforeSend: function () {
            $("#spinner").show()
        },

        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {

                //console.log("resp", resp);
                show_VisaRequisition_list(resp);

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

        complete: function () {
            $("#spinner").hide();
        }
    });
}


function show_VisaRequisition_list(resp) {

    //console.log("resp", resp);

    $("#ls_visareq_table_tbody").empty();

    if (resp.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    $.each(resp, function (index, value) {

        var slnocell = $("<td>").append(index + 1);
        var VisaRequisitionNoText = $("<td>").append(value.VisaRequisitionNoText);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);

        let TypeOfVisaUser1 = value.TypeOfVisaUser;

        if (TypeOfVisaUser1 == 1) {
            TypeOfVisaUser1 = "Business";
        }
        else if (TypeOfVisaUser1 == 2) {
            TypeOfVisaUser1 = "Tourist";
        }
        else if (TypeOfVisaUser1 == 3) {
            TypeOfVisaUser1 = "Transit";
        }
        else if (TypeOfVisaUser1 == 4) {
            TypeOfVisaUser1 = value.TypeOfVisaOtherUser;
        }
        var TypeOfVisaUser = $("<td>").append(TypeOfVisaUser1);

        var IssueDatePrevUser = $("<td>").append(value.IssueDatePrevUser ? convertJsonDate(value.IssueDatePrevUser) : " ");
        var ExpiryDatePrevUser = $("<td>").append(value.ExpiryDatePrevUser ? convertJsonDate(value.ExpiryDatePrevUser) : " ");

        let CountryNameUser2 = value.CountryNameUser;

        if (CountryNameUser2 == -1 ) {
            CountryNameUser2 = "";
        }
        else {
            CountryNameUser2 = value.CountryNameUser;
        }

        var CountryNameUser = $("<td>").append(CountryNameUser2);



        var PurposeOfTravelUser = $("<td>").append(value.PurposeOfTravelUser);

        let PurposeOfTravelUser1 = value.PurposeOfTravelUser;

        if (PurposeOfTravelUser1 == 1) {
            PurposeOfTravelUser1 = "Business";
        }
        else if (PurposeOfTravelUser1 == 2) {
            PurposeOfTravelUser1 = "Conference";
        }
        else if (PurposeOfTravelUser1 == 3) {
            PurposeOfTravelUser1 = "Training";
        }
        else if (PurposeOfTravelUser1 == 4) {
            PurposeOfTravelUser1 = value.PurposeOfTravelOtherUser;
        }
        var PurposeOfTravelUser = $("<td>").append(PurposeOfTravelUser1);

        var EntryDateUser = $("<td>").append(value.EntryDateUser ? convertJsonDate(value.EntryDateUser) : " ");
        var DepartureUser = $("<td>").append(value.DepartureUser ? convertJsonDate(value.DepartureUser) : " ");
        var ReturnUser = $("<td>").append(value.ReturnUser ? convertJsonDate(value.ReturnUser) : " ");



        var AccomodationDetUser = $("<td>").append(value.AccomodationDetUser);
        var SpecialReqUser = $("<td>").append(value.SpecialReqUser);
        var RemarksUser = $("<td>").append(value.RemarksUser);

        var VisaReqActiveStatus = $("<td>");

        if (value.VisaReqActiveStatus == 1) {
            $("<div>").attr("class", "badge bg-success").append("Active").appendTo(VisaReqActiveStatus);
        }
        else if (value.VisaReqActiveStatus == 0) {
            $("<div>").attr("class", "badge bg-danger").append("Inactive").appendTo(VisaReqActiveStatus);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(VisaReqActiveStatus);
        }


        var VisaApprovalStatus = $("<td>");

        if (value.VisaApprovalStatus == 1) {
            $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(VisaApprovalStatus);
        }
        else if (value.VisaApprovalStatus == 2) {
            $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(VisaApprovalStatus);
        }
        else if (value.VisaApprovalStatus == 3) {
            $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(VisaApprovalStatus);
        }



        var ApprovedByDet;

        if (value.ApprovedByDet && value.ApprovedByDet.length > 0 && value.ApprovedByDet[0].AppUserName != null) {
            ApprovedByDet = $("<td>").append(value.ApprovedByDet[0].AppUserName);
        }
        else if (value.RejectedByDet && value.RejectedByDet.length > 0 && value.RejectedByDet[0].RejUserName != null) {
            ApprovedByDet = $("<td>").append(value.RejectedByDet[0].RejUserName);
        }
        else {
            ApprovedByDet = $("<td>").append("-");
        }


        var CommentsSupervisor = $("<td>");

        if (value.CommentsSupervisor != null) {
            $("<div>").attr("class", "badge bg-danger").append(value.CommentsSupervisor).appendTo(CommentsSupervisor);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(CommentsSupervisor);
        }


        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        //var editicon = $("<i>").attr({
        //    "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Edit"
        //}).appendTo(icondiv);
        //var deleteicon = $("<i>").attr({
        //    "class": "e-btn bi-trash-fill text-white bg-danger rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Delete"
        //}).appendTo(icondiv);

        var editicon = $("<img>").attr({
            "src": "/_Assets/Icons/Edit_2.png",
            "alt": "Edit Icon",
            "title": "Edit",
            "style": "cursor: pointer; border: 2px solid white; width: 38px; height: 38px;"
        });

        icondiv.append(editicon);

        var deleteicon = $("<img>").attr({
            "src": "/_Assets/Icons/Delete2.png",
            "alt": "Delete Icon",
            "title": "Delete",
            "style": "cursor: pointer; border: 2px solid white; width: 40px; height: 40px;"
        });

        icondiv.append(deleteicon);

        $("<tr>").attr("class", "text-center").append(slnocell, VisaRequisitionNoText, CompanyName, DepartmentName, DesignationName,
            EmployeeId, FullName, TypeOfVisaUser, IssueDatePrevUser, ExpiryDatePrevUser, CountryNameUser, PurposeOfTravelUser,
            EntryDateUser, DepartureUser, ReturnUser, AccomodationDetUser, SpecialReqUser, RemarksUser, VisaReqActiveStatus, VisaApprovalStatus, ApprovedByDet, CommentsSupervisor,
            iconcell).appendTo("#ls_visareq_table_tbody");

        (function ($) {
            editicon.on("click", function (e) {
                e.preventDefault();

                //console.log("editicon", value.UserNo);
                //console.log("editiconId", value.Id);

                $("#ls_edit_visareq_modal").modal("show");

                if (userRoleId != '3') {
                    if (value.VisaApprovalStatus == 1) {
                        //icondiv.addClass("disabled");
                        $("#ls_edit_visareq_modal").find(".modal-footer").hide();
                    }
                }

                $("#ls_edit_visareq_visatype").data("Id", value.Id);
                $("#ls_edit_visareq_remarks").data("UserNo", value.UserNo);

                $("#ls_edit_visareq_TravelDate_dep").data("VisaApprovalStatus", value.VisaApprovalStatus);
                $("#ls_edit_visareq_TravelDate_ret").data("ApprovedBy", value.ApprovedBy);
                $("#ls_edit_visareq_TravelDate_ret").data("RejectedBy", value.RejectedBy);
                $("#ls_edit_visareq_other_prevvisited_visatype").data("CommentsSupervisor", value.CommentsSupervisor);


                $('#applicant_name_edit').text(value.FullName);
                $('#applicant_employee_id_edit').text(value.EmployeeId);
                $('#applicant_company_edit').text(value.CompanyName);
                $('#applicant_department_edit').text(value.DepartmentName);
                $('#applicant_designation_edit').text(value.DesignationName);

                if (userRoleId != '1' && userRoleId != '5') { 

                    $("#ls_edit_visareq_reqno").attr("disabled", true); 
                    $("#ls_edit_visareq_visatype").attr("disabled", true); 
                    $("#ls_edit_visareq_other_visatype").attr("disabled", true); 
                    $("#ls_edit_visareq_prevvisited").attr("disabled", true); 
                    $("#ls_edit_visareq_other_prevvisited_visatype").attr("disabled", true); 
                    $("#ls_edit_visareq_other_prevvisited_issuedate").attr("disabled", true); 
                    $("#ls_edit_visareq_other_prevvisited_expdate").attr("disabled", true); 
                    $("#ls_edit_visareq_country").attr("disabled", true); 
                    $("#ls_edit_visareq_travel").attr("disabled", true); 
                    $("#ls_edit_visareq_other_travel").attr("disabled", true); 
                    $("#ls_edit_visareq_EntryDate").attr("disabled", true); 
                    $("#ls_edit_visareq_TravelDate_dep").attr("disabled", true);
                    $("#ls_edit_visareq_TravelDate_ret").attr("disabled", true);
                    $("#ls_edit_visareq_accodet").attr("disabled", true);
                    $("#ls_edit_visareq_spreq").attr("disabled", true); 
                    $("#ls_edit_visareq_remarks").attr("disabled", true);
                    $("#ls_edit_visareq_invitation_letter").attr("disabled", true);
                    $("#ls_edit_visareq_status").attr("disabled", true); 
                }


                if (userRoleId != '1' && userRoleId != '3') {   //Employee


                    $("#ls_add_VisaDoc_visa_no").attr("disabled", true);
                    $("#ls_edit_VisaDoc_country").attr("disabled", true);
                    $("#ls_add_VisaDoc_IssueDate").attr("disabled", true);
                    $("#ls_add_VisaDoc_ExpDate").attr("disabled", true);
                    $("#ls_add_VisaDoc_remarks").attr("disabled", true); 
                    $("#ls_add_VisaDoc_attachment").attr("disabled", true); 

                }

                $("#ls_edit_visareq_reqno").val(value.VisaRequisitionNoText);
                $("#ls_edit_visareq_visatype").val(value.TypeOfVisaUser);
                $("#ls_edit_visareq_other_visatype").val(value.TypeOfVisaOtherUser);
                $("#ls_edit_visareq_prevvisited").val(value.PreviouslyDestinedUser);
                $("#ls_edit_visareq_other_prevvisited_visatype").val(value.VisaTypePreviousUser);
                $("#ls_edit_visareq_other_prevvisited_issuedate").val(value.IssueDatePrevUser ? convertJsonDate(value.IssueDatePrevUser) : null);
                $("#ls_edit_visareq_other_prevvisited_expdate").val(value.ExpiryDatePrevUser ? convertJsonDate(value.ExpiryDatePrevUser) : null);
                $("#ls_edit_visareq_country").val(value.CountryNameUser);
                $("#ls_edit_visareq_travel").val(value.PurposeOfTravelUser);


                $("#ls_edit_visareq_other_travel").val(value.PurposeOfTravelOtherUser);
                //$("#ls_edit_visareq_other_travel").val(value.PurposeOfTravelOtherUser);

                $("#ls_edit_visareq_EntryDate").val(value.EntryDateUser ? convertJsonDate(value.EntryDateUser) : null);
                $("#ls_edit_visareq_EntryDate").val(value.EntryDateUser ? convertJsonDate(value.EntryDateUser) : null);
                $("#ls_edit_visareq_TravelDate_dep").val(value.DepartureUser ? convertJsonDate(value.DepartureUser) : null);
                $("#ls_edit_visareq_TravelDate_ret").val(value.ReturnUser ? convertJsonDate(value.ReturnUser) : null);
                $("#ls_edit_visareq_accodet").val(value.AccomodationDetUser);
                $("#ls_edit_visareq_spreq").val(value.SpecialReqUser);
                $("#ls_edit_visareq_remarks").val(value.RemarksUser);
                $("#ls_edit_visareq_status").val(value.VisaReqActiveStatus);


                $("#ls_add_VisaDoc_visa_no").val(value.VisaNoTD);
                $("#ls_edit_VisaDoc_country").val(value.CountryNameTD);
                $("#ls_add_VisaDoc_remarks").val(value.RemarksTD);
                $("#ls_add_VisaDoc_IssueDate").val(value.VisaExpiryDateTD ? convertJsonDate(value.VisaExpiryDateTD) : null);
                $("#ls_add_VisaDoc_ExpDate").val(value.VisaIssueDateTD ? convertJsonDate(value.VisaIssueDateTD) : null);


                let TypeOfVisa = $("#ls_edit_visareq_visatype").val();
                let PrevDestined = $("#ls_edit_visareq_prevvisited").val();
                let PurposeOfTravel = $("#ls_edit_visareq_travel").val();


                if (userRoleId != '1' && userRoleId != '3')
                {
                    if (TypeOfVisa != "4") {
                        $("#ls_edit_visareq_other_visatype").attr("readonly", true);
                    }
                    else {
                        $("#ls_edit_visareq_other_visatype").attr("readonly", false);
                    }


                    if (PrevDestined == "2") {

                        $("#ls_edit_visareq_other_prevvisited_visatype").attr("readonly", true);
                        $("#ls_edit_visareq_other_prevvisited_issuedate").attr("readonly", true);
                        $("#ls_edit_visareq_other_prevvisited_expdate").attr("readonly", true);

                    }
                    else {

                        $("#ls_edit_visareq_other_prevvisited_visatype").attr("readonly", false);
                        $("#ls_edit_visareq_other_prevvisited_issuedate").attr("readonly", false);
                        $("#ls_edit_visareq_other_prevvisited_expdate").attr("readonly", false);
                    }

                    if (PurposeOfTravel != "4") {
                        $("#ls_edit_visareq_other_travel").attr("readonly", true);
                    }
                    else {
                        $("#ls_edit_visareq_other_travel").attr("readonly", false);
                    }

                    $(document).ready(function () {
                        $("#ls_edit_visareq_visatype").change(function () {
                            if ($(this).val() == "4") {
                                $("#ls_edit_visareq_other_visatype").prop("readonly", false);
                            }
                            else {
                                $("#ls_edit_visareq_other_visatype").prop("readonly", true);
                                $("#ls_edit_visareq_other_visatype").val('');
                            }
                        });
                    });


                    $(document).ready(function () {
                        $("#ls_edit_visareq_prevvisited").change(function () {
                            if ($(this).val() == "1") {
                                $("#ls_edit_visareq_other_prevvisited_visatype").attr("readonly", false);
                                $("#ls_edit_visareq_other_prevvisited_issuedate").attr("readonly", false);
                                $("#ls_edit_visareq_other_prevvisited_expdate").attr("readonly", false);
                            }
                            else {
                                $("#ls_edit_visareq_other_prevvisited_visatype").attr("readonly", true);
                                $("#ls_edit_visareq_other_prevvisited_issuedate").attr("readonly", true);
                                $("#ls_edit_visareq_other_prevvisited_expdate").attr("readonly", true);
                                $("#ls_edit_visareq_other_prevvisited_visatype").val('');
                                $("#ls_edit_visareq_other_prevvisited_issuedate").val('');
                                $("#ls_edit_visareq_other_prevvisited_expdate").val('');
                            }
                        });
                    });


                    $(document).ready(function () {
                        $("#ls_edit_visareq_travel").change(function () {
                            if ($(this).val() == "4") {
                                $("#ls_edit_visareq_other_travel").prop("readonly", false);
                            }
                            else {
                                $("#ls_edit_visareq_other_travel").prop("readonly", true);
                                $("#ls_edit_visareq_other_travel").val('');
                            }
                        });
                    });

                }


                try {
                    if (value.TicketReqInfo[0].TicketApprovalStatus == 1) {
                        $("#ls_edit_visareq_modal").find(".modal-footer").hide();
                    }
                    //else {
                    //    $("#ls_edit_visareq_modal").find(".modal-footer").show();
                    //}
                }
                catch {

                }


                //NID and Passport files

                $(".uploaded-design_passport").empty();

                $.each(value.totissue, function (index, _value) {

                    let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value.Id });
                    let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value.location, target: "_blank", "data-id": _value.Id }).appendTo(btnGroupDiv);
                    let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                    $(".uploaded-design_passport").append(btnGroupDiv);

                });


                //Invitation letter


                $(".uploaded-design_invitation").empty();

                $.each(value.visaReqAtt, function (index, _value1) {

                    let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value1.Id });
                    let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value1.location, target: "_blank", "data-id": _value1.Id }).appendTo(btnGroupDiv);
                    let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                    if (value.visaReqAtt.length > 0) {
                        let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Invitation letter file");
                        btnGroupAnc.append(smallElement);
                    }



                        let btnGroupButton = $("<button>").attr({ "class": "btn btn-danger fileBtn", type: "button" }).appendTo(btnGroupDiv);
                        let btnGroupButtonIcon = $("<i>").attr({ "class": "bi bi-trash" }).appendTo(btnGroupButton);

                    $(".uploaded-design_invitation").append(btnGroupDiv);



                    (function ($) {
                        btnGroupButton.on('click', function () {
                            $("#delete_File_modal").modal("show");
                            $("#delete_File_id_hidden").data("Id", _value1.Id);
                        });
                    })(jQuery);
                });


                //Visa Document Files

                $(".uploaded-design_visadoc").empty();

                $.each(value.TDfiles, function (index, _value2) {

                    let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                    let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                    let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                    if (value.TDfiles.length > 0) {
                        let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Visa files");
                        btnGroupAnc.append(smallElement);
                    }

                    let btnGroupButton1 = $("<button>").attr({ "class": "btn btn-danger fileBtn", type: "button" }).appendTo(btnGroupDiv);
                    let btnGroupButtonIcon = $("<i>").attr({ "class": "bi bi-trash" }).appendTo(btnGroupButton1);

                    $(".uploaded-design_visadoc").append(btnGroupDiv);



                    (function ($) {
                        btnGroupButton1.on('click', function () {
                            $("#delete_File_modal_TD").modal("show");
                            $("#delete_File_id_hidden_TD").data("Id", _value2.Id);
                        });
                    })(jQuery);
                });

            });

            deleteicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_delete_visareq_modal").modal("show");
                $("#ls_delete_visareq_id_hidden").data("Id", value.Id);
            });
        })(jQuery);
    });
}


//Delete File in Edit Mode
//TD for Visa Documents

$("#delete_File_modal_form_TD").on("submit", function (e) {
    e.preventDefault();

    if (userRoleId == '3') {
        var json = {
            Id: $("#delete_File_id_hidden_TD").data('Id'),
        };

        $.ajax({
            type: "POST",
            url: "/VisaRequisition/DeleteVisaRequisitionFileTD",
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

                    var deletedFileId = $("#delete_File_id_hidden_TD").data('Id');
                    var fileBtnGroup = $("#fileId-" + deletedFileId);

                    fileBtnGroup.remove();
                    $("#delete_File_modal_TD").modal('hide');
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
    }

    else {
        iziToast.error({
            title: 'Unauthorized!',
            message: 'You are not authorized to delete the file.',
            position: 'bottomRight'
        });
    }
});



//Delete File in Edit Mode
//User for Invitation Letter

$("#delete_File_modal_form").on("submit", function (e) {
    e.preventDefault();

    if (userRoleId == '5')
    {
        var json = {
            Id: $("#delete_File_id_hidden").data('Id'),
        };

        $.ajax({
            type: "POST",
            url: "/VisaRequisition/DeleteVisaRequisitionFile",
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
    }

    else {
        iziToast.error({
            title: 'Unauthorized!',
            message: 'You are not authorized to delete the file.',
            position: 'bottomRight'
        });
    }
});




$("#ls_edit_visareq_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {

        Id: $("#ls_edit_visareq_visatype").data("Id"),
        UserNo: $("#ls_edit_visareq_remarks").data("UserNo"),
        TypeOfVisaUser: $("#ls_edit_visareq_visatype").val(),
        TypeOfVisaOtherUser: $("#ls_edit_visareq_other_visatype").val(),
        PreviouslyDestinedUser: $("#ls_edit_visareq_prevvisited").val(),
        VisaTypePreviousUser: $("#ls_edit_visareq_other_prevvisited_visatype").val(),
        IssueDatePrevUserStr: $("#ls_edit_visareq_other_prevvisited_issuedate").val(),
        ExpiryDatePrevUserStr: $("#ls_edit_visareq_other_prevvisited_expdate").val(),
        CountryNameUser: $("#ls_edit_visareq_country").val(),
        PurposeOfTravelUser: $("#ls_edit_visareq_travel").val(),
        PurposeOfTravelOtherUser: $("#ls_edit_visareq_other_travel").val(),
        EntryDateUserStr: $("#ls_edit_visareq_EntryDate").val(),
        DepartureUserStr: $("#ls_edit_visareq_TravelDate_dep").val(),
        ReturnUserStr: $("#ls_edit_visareq_TravelDate_ret").val(),
        AccomodationDetUser: $("#ls_edit_visareq_accodet").val(),
        SpecialReqUser: $("#ls_edit_visareq_spreq").val(),
        RemarksUser: $("#ls_edit_visareq_remarks").val(),
        VisaReqActiveStatus: $("#ls_edit_visareq_status").val(),
        VisaNoTD: $("#ls_add_VisaDoc_visa_no").val(),
        CountryNameTD: $("#ls_edit_VisaDoc_country").val(),
        VisaIssueDateTDStr: $("#ls_add_VisaDoc_IssueDate").val(),
        VisaExpiryDateTDStr: $("#ls_add_VisaDoc_ExpDate").val(),
        RemarksTD: $("#ls_add_VisaDoc_remarks").val(),


        VisaApprovalStatus: $("#ls_edit_visareq_TravelDate_dep").data("VisaApprovalStatus"),
        ApprovedBy: $("#ls_edit_visareq_TravelDate_ret").data("ApprovedBy"),
        RejectedBy: $("#ls_edit_visareq_TravelDate_ret").data("RejectedBy"),
        CommentsSupervisor: $("#ls_edit_visareq_other_prevvisited_visatype").data("CommentsSupervisor")

        // $("#ls_edit_visareq_other_prevvisited_visatype").data("CommentsSupervisor", value.CommentsSupervisor);

        
    }


    var formData = new FormData();

    formData.append("TypeOfVisaUser", json.TypeOfVisaUser);
    formData.append("TypeOfVisaOtherUser", json.TypeOfVisaOtherUser);
    formData.append("PreviouslyDestinedUser", json.PreviouslyDestinedUser);
    formData.append("VisaTypePreviousUser", json.VisaTypePreviousUser);
    formData.append("IssueDatePrevUserStr", json.IssueDatePrevUserStr);
    formData.append("ExpiryDatePrevUserStr", json.ExpiryDatePrevUserStr);
    formData.append("CountryNameUser", json.CountryNameUser);
    formData.append("PurposeOfTravelUser", json.PurposeOfTravelUser);
    formData.append("PurposeOfTravelOtherUser", json.PurposeOfTravelOtherUser);
    formData.append("EntryDateUserStr", json.EntryDateUserStr);
    formData.append("DepartureUserStr", json.DepartureUserStr);
    formData.append("ReturnUserStr", json.ReturnUserStr);
    formData.append("AccomodationDetUser", json.AccomodationDetUser);
    formData.append("SpecialReqUser", json.SpecialReqUser);
    formData.append("RemarksUser", json.RemarksUser);
    formData.append("VisaReqActiveStatus", json.VisaReqActiveStatus);
    formData.append("VisaNoTD", json.VisaNoTD);
    formData.append("CountryNameTD", json.CountryNameTD);
    formData.append("VisaIssueDateTDStr", json.VisaIssueDateTDStr);
    formData.append("VisaExpiryDateTDStr", json.VisaExpiryDateTDStr);
    formData.append("RemarksTD", json.RemarksTD);
    formData.append("Id", json.Id);
    formData.append("UserNo", json.UserNo);

    formData.append("VisaApprovalStatus", json.VisaApprovalStatus);
    formData.append("ApprovedBy", json.ApprovedBy);
    formData.append("RejectedBy", json.RejectedBy);



    //User
    for (let i = 0; i < $("#ls_edit_visareq_invitation_letter")[0].files.length; i++) {
        formData.append("FilesUser", $("#ls_edit_visareq_invitation_letter")[0].files[i]);
    }

    //Travel Desk
    for (let i = 0; i < $("#ls_add_VisaDoc_attachment")[0].files.length; i++) {
        formData.append("FilesTD", $("#ls_add_VisaDoc_attachment")[0].files[i]);
    }

    //console.log("showjson", json);

    $.ajax({
        url: '/VisaRequisition/UpdateVisaRequisition',
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        beforeSend: function () {
            $("#spinner").show();
        },

        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            } else {
                iziToast.success({
                    title: 'Saved Successfully!',
                    message: resp.message,
                    position: 'bottomRight',
                });

                setTimeout(function () {
                    location.reload();
                }, 2500);
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

        complete: function () {
            $("#spinner").hide();
        }
    });
});



//delete

$("#ls_delete_visareq_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_delete_visareq_id_hidden").data("Id")
    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/VisaRequisition/DeleteVisaRequisition",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(json),


        beforeSend: function () {
            $("#ls_NeedleReqEntry_loading_spinner").show();
        },
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'error!',
                    message: resp.message,
                    position: 'bottomRight'
                });

            } else {

                 $("#ls_add_needle_modal").modal("hide");
                iziToast.success({
                    title: 'Deleted Successfully!',
                    message: resp.message,
                    position: 'bottomRight'
                });
                setTimeout(function () {
                    location.reload();
                }, 2000);
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
                msg = 'Uncaught Error.\n + jqXHR.responseText';
            }

            iziToast.error({
                title: 'error!',
                message: msg,
                position: 'bottomRight'
            });
        },
        complete: function () {
            $("#ls_NeedleReqEntry_loading_spinner").hide();
        }
    });
});







