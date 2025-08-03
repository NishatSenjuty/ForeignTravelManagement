

$("#ls_add_ticketreq_btn").on("click", function () {
    $("#ls_add_ticketreq_modal").modal("show");
    $("#ls_add_ticketreq_modal_form").trigger("reset");
    $("#ls_add_ticketreq_modal_form").removeClass('was-validated');
});


$("#ls_add_project_meh").on("dblclick", function (e) {
    e.preventDefault();

    //DetectFunction = 0;
    //GetTr = row;
    $("#ls_add_MachineList_modal").modal("show");
    $("#ls_add_MachineList_modal_form").trigger("reset");
    $("#ls_add_MachineList_modal_form").removeClass('was-validated');

});


$("#ls_edit_project_meh").on("dblclick", function (e) {
    e.preventDefault();

    if (userRoleId == '5') {

        $("#ls_edit_MachineList_modal").modal("show");
        $("#ls_edit_MachineList_modal_form").trigger("reset");
        $("#ls_edit_MachineList_modal_form").removeClass('was-validated');
    }

});



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

$("#ls_add_ticketreq_EntryDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_add_ticketreq_DepartDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_add_ticketreq_ReturnDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});


$("#ls_add_VisaDoc_DeptDateTD").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});



//if (userRoleId != '1' && userRoleId != '5') {
//    $("#ls_add_ticketreq_btn").hide();
//}

if (userRoleId != '1' && userRoleId == '3') {
    $("#ls_add_ticketreq_btn").hide();
}


$(document).ready(function () {
    $("#ls_add_VisaDoc_attachmentTD").change(function () {
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



load_Airlines_for_dropdown();

function load_Airlines_for_dropdown() {
    $.ajax({
        type: "POST",
        url: "/TicketRequision/ShowAirlinesForDropdown",
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
                $("#ls_add_ticketreq_airlines").empty(); 
                $("#ls_edit_ticketreq_airlines").empty();
                $("#ls_add_VisaDoc_airlineTD").empty();

                $("#ls_add_ticketreq_airlines").append('<option value="">Select Airlines</option>');
                $("#ls_edit_ticketreq_airlines").append('<option value="">Select Airlines</option>');
                $("#ls_add_VisaDoc_airlineTD").append('<option value="">Select Airlines</option>');



                $.each(resp.data, function (index, value) {
                    $("#ls_add_ticketreq_airlines").append('<option value="' + value.Id + '">' + value.AirlinesName + '</option>');
                    $("#ls_edit_ticketreq_airlines").append('<option value="' + value.Id + '">' + value.AirlinesName + '</option>');
                    $("#ls_add_VisaDoc_airlineTD").append('<option value="' + value.Id + '">' + value.AirlinesName + '</option>');


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



load_Currency_Type_for_dropdown();

function load_Currency_Type_for_dropdown() {
    $.ajax({
        type: "POST",
        url: "/TicketRequision/ShowCurrencyTypeForDropdown",
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
                $("#ls_edit_ticketreq_currtype").empty();

                $("#ls_edit_ticketreq_currtype").append('<option value="">Select Currency Type</option>');

                $.each(resp.data, function (index, value) {
                    $("#ls_edit_ticketreq_currtype").append('<option value="' + value.Id + '">' + value.CurrencyName + '</option>');
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


$(document).ready(function () {
    $("#ls_add_ticketreq_travel").change(function () {
        if ($(this).val() == "4") {
            $("#ls_add_ticketreq_other_travel").prop("readonly", false);
        }
        else {
            $("#ls_add_ticketreq_other_travel").prop("readonly", true);
            $("#ls_add_ticketreq_other_travel").val('');
        }
    });
});


//Save

$("#ls_add_ticketreq_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {

        //VisaRequisitionNo: $("#ls_add_ticketreq_visaReqno").val(),
        PurposeOfTravelUser: $("#ls_add_ticketreq_travel").val(),
        PurposeOfTravelOtherUser: $("#ls_add_ticketreq_other_travel").val(),
        DestinationUser: $("#ls_add_ticketreq_destination").val(),
        DepartureDateUserStr: $("#ls_add_ticketreq_DepartDate").val(),
        ReturnDateUserStr: $("#ls_add_ticketreq_ReturnDate").val(),
        AirlinesUser: $("#ls_add_ticketreq_airlines").val(),
        FlayerNoUser: $("#ls_add_ticketreq_flayerNo").val(),
        FlightUser: $("#ls_add_ticketreq_flightno").val(),
        SeatUser: $("#ls_add_ticketreq_seat").val(),
        MealUser: $("#ls_add_ticketreq_meal").val(),
        SpecialReqUser: $("#ls_add_ticketreq_spreq").val(),
        RemarksUser: $("#ls_add_ticketreq_remarks").val()

    };

    //console.log("json", json);

    $.ajax({
        url: '/TicketRequision/AddTicketRequision',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(json),
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
            }

            else {

                //console.log("compitition", resp);

                $("#ls_add_compit_modal").modal("hide");

                iziToast.success({
                    title: 'Saved Successfully!',
                    message: resp.message,
                    position: 'bottomRight'
                });

                load_TicketRequisition_table_Employee(1);

                setTimeout(function () {
                    location.reload();
                }, 1500);

                //$("#ls_add_ticketreq_modal_form").removeClass('was-validated');

                //$("#ls_add_ticketreq_modal").hide();
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


$("#ls_filter_btn").on("click", function (e) {

    if (userRoleId != '1' && userRoleId == '3') {
        e.preventDefault();
        load_TicketRequisition_table(1);

    }

    else if (userRoleId != '1' && userRoleId != '3') {
        e.preventDefault();
        load_TicketRequisition_table_Employee(1);
    }
});

if (userRoleId != '1' && userRoleId != '3') {
    load_TicketRequisition_table_Employee(1);
}

if (userRoleId != '1' && userRoleId == '3') {
    load_TicketRequisition_table(1);
}


//Employee

function load_TicketRequisition_table_Employee(page) {


    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TicketRequisitionNoText: $("#filter_ticketreq_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        TicketReqActiveStatus: $("#filter_gatepass_status").val(),
        page: page,
        userNo: userNo

    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/TicketRequision/ShowTicketRequisionForEmployee",
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
                show_TicketRequisition_list(resp);

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




$("#gatepass_filter_form").on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        e.preventDefault();
        return false;
    }
})


//Travel Desk

function load_TicketRequisition_table(page) {


    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TicketRequisitionNoText: $("#filter_ticketreq_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        TicketReqActiveStatus: $("#filter_gatepass_status").val(),
        page: page,
        limit: 10

    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/TicketRequision/ShowTicketRequision",
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
                show_TicketRequisition_list(resp);

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




function show_TicketRequisition_list(resp) {

    //console.log("resp", resp);

    $("#ls_ticketreq_table_tbody").empty();

    if (resp.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    $.each(resp, function (index, value) {

        var slnocell = $("<td>").append(index + 1);


        var TicketRequisitionNoText = $("<td>").append(value.TicketRequisitionNoText);
        //var VisaRequisitionNo = $("<td>").append(value.VisaRequisitionNo);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var DestinationUser = $("<td>").append(value.DestinationUser);
        var DepartureDateUser = $("<td>").append(value.DepartureDateUser ? convertJsonDate(value.DepartureDateUser) : " ");
        var ReturnDateUser = $("<td>").append(value.ReturnDateUser ? convertJsonDate(value.ReturnDateUser) : " ");

        var SpecialReqUser = $("<td>").append(value.SpecialReqUser);
        var RemarksUser = $("<td>").append(value.RemarksUser);

        //var TicketApprovalStatus = $("<td>");

        //if (value.TicketApprovalStatus == 1) {
        //    $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(TicketApprovalStatus);
        //}
        //else if (value.TicketApprovalStatus == 2) {
        //    $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(TicketApprovalStatus);
        //}
        //else if (value.TicketApprovalStatus == 3) {
        //    $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(TicketApprovalStatus);
        //}

        //var ApprovedByDet;

        //if (value.ApprovedByDet && value.ApprovedByDet.length > 0 && value.ApprovedByDet[0].AppUserName != null) {
        //    ApprovedByDet = $("<td>").append(value.ApprovedByDet[0].AppUserName);
        //}
        //else if (value.RejectedByDet && value.RejectedByDet.length > 0 && value.RejectedByDet[0].RejUserName != null) {
        //    ApprovedByDet = $("<td>").append(value.RejectedByDet[0].RejUserName);
        //}
        //else {
        //    ApprovedByDet = $("<td>").append("-");
        //}


        //var CommentsSupervisor = $("<td>");

        //if (value.CommentsSupervisor != null) {
        //    $("<div>").attr("class", "badge bg-success").append(value.CommentsSupervisor).appendTo(CommentsSupervisor);
        //}
        //else {
        //    $("<div>").attr("class", "badge bg-danger").append("-").appendTo(CommentsSupervisor);
        //}

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


        $("<tr>").attr("class", "text-center").append(slnocell, TicketRequisitionNoText, /*VisaRequisitionNo,*/ EmployeeId, FullName,
            ContactNo, CompanyName, DepartmentName, DesignationName, DestinationUser, DepartureDateUser, ReturnDateUser,
            SpecialReqUser, RemarksUser, /*TicketApprovalStatus, ApprovedByDet, CommentsSupervisor,*/ iconcell).appendTo("#ls_ticketreq_table_tbody");

        (function ($) {
            editicon.on("click", function (e) {
                e.preventDefault();

                //console.log("editicon", value);
                //console.log("editiconId", value.VisaReqId);

                $("#ls_edit_ticketreq_modal").modal("show");

                //if (userRoleId != '3') {
                //    if (value.TicketApprovalStatus == 1) {
                //        //icondiv.addClass("disabled");
                //        $("#ls_edit_ticketreq_modal").find(".modal-footer").hide();
                //    }
                //}

                $("#ls_edit_ticketreq_airlines").data("Id", value.Id);
                $("#ls_edit_ticketreq_remarks").data("UserNo", value.UserNo);
                //$("#ls_add_VisaDoc_SeatNoTD").data("visaReqId", value.VisaReqId);



                $("#ls_edit_ticketreq_spreq").data("TicketApprovalStatus", value.TicketApprovalStatus);
                $("#ls_edit_ticketreq_flayerNo").data("ApprovedBy", value.ApprovedBy);
                $("#ls_edit_ticketreq_flightno").data("RejectedBy", value.RejectedBy);
                $("#ls_edit_ticketreq_seat").data("CommentsSupervisor", value.CommentsSupervisor);


                $('#applicant_name_edit').text(value.FullName);
                $('#applicant_employee_id_edit').text(value.EmployeeId);
                $('#applicant_company_edit').text(value.CompanyName);
                $('#applicant_department_edit').text(value.DepartmentName);
                $('#applicant_designation_edit').text(value.DesignationName);

                if (userRoleId != '1' && userRoleId != '5')    //Travel Desk
                {
                    $("#ls_edit_ticketreq_visaReqno").attr("disabled", true);
                    $("#ls_edit_ticketreq_reqno").attr("disabled", true);
                    $("#ls_edit_ticketreq_travel").attr("disabled", true);
                    $("#ls_edit_ticketreq_destination").attr("disabled", true);
                    $("#ls_edit_ticketreq_DepartDate").attr("disabled", true);
                    $("#ls_edit_ticketreq_ReturnDate").attr("disabled", true);
                    $("#ls_edit_ticketreq_flayerNo").attr("disabled", true);
                    $("#ls_edit_ticketreq_airlines").attr("disabled", true);
                    $("#ls_edit_ticketreq_flightno").attr("disabled", true);    
                    $("#ls_edit_ticketreq_meal").attr("disabled", true);
                    $("#ls_edit_ticketreq_spreq").attr("disabled", true);
                    $("#ls_edit_ticketreq_remarks").attr("disabled", true);
                    $("#ls_edit_ticketreq_seat").attr("disabled", true);
                    
                }


                if (userRoleId != '1' && userRoleId != '3')     //Employee
                {

                    $("#ls_edit_ticketreq_visaReqno").attr("disabled", true);
                    $("#ls_edit_ticketreq_reqno").attr("disabled", true);

                    //TD
                    $("#ls_add_VisaDoc_airlineTD").attr("disabled", true);
                    $("#ls_add_VisaDoc_DeptDateTD").attr("disabled", true);
                    $("#ls_add_VisaDoc_DeptTimeTD").attr("disabled", true);
                    $("#ls_add_VisaDoc_terminalNoTD").attr("disabled", true);
                    $("#ls_add_VisaDoc_flightNoTD").attr("disabled", true);
                    $("#ls_add_VisaDoc_ticketNoTD").attr("disabled", true);
                    $("#ls_edit_ticketreq_TicktypeTD").attr("disabled", true);
                    $("#ls_add_VisaDoc_SeatNoTD").attr("disabled", true);
                    $("#ls_add_VisaDoc_remarksTD").attr("disabled", true);
                    $("#ls_add_VisaDoc_attachmentTD").attr("disabled", true);  
                    $("#ls_add_VisaDoc_TicketpriceTD").attr("disabled", true);
                    $("#ls_edit_ticketreq_currtype").attr("disabled", true);
                }

                $("#ls_edit_ticketreq_visaReqno").val(value.VisaRequisitionNo);
                $("#ls_edit_ticketreq_reqno").val(value.TicketRequisitionNoText);   
                $("#ls_add_VisaDoc_airlineTD").val(value.AirlinesTD);
                $("#ls_add_VisaDoc_DeptDateTD").val(value.DepturtureDateTD ? convertJsonDate(value.DepturtureDateTD) : null);

                //let cth = value.DepturtureTimeTD.Hours;
                //if (cth < 10) {
                //    cth = "0" + value.DepturtureTimeTD.Hours;
                //}
                //let ctm = value.DepturtureTimeTD.Minutes;
                //if (ctm < 10) {
                //    ctm = "0" + value.DepturtureTimeTD.Minutes;
                //}

                let cth, ctm, changetime;

                if (value.DepturtureTimeTD) {
                    cth = value.DepturtureTimeTD.Hours;
                    ctm = value.DepturtureTimeTD.Minutes;
                    if (cth < 10) {
                        cth = "0" + cth;
                    }
                    if (ctm < 10) {
                        ctm = "0" + ctm;
                    }
                    changetime = cth + ":" + ctm;
                } else {
                    changetime = null;
                }


                $("#ls_add_VisaDoc_DeptTimeTD").val(changetime);
                $("#ls_add_VisaDoc_terminalNoTD").val(value.TerminalNoTD);
                $("#ls_add_VisaDoc_flightNoTD").val(value.FlightNoTD);
                $("#ls_add_VisaDoc_ticketNoTD").val(value.TicketNoTD);
                $("#ls_edit_ticketreq_TicktypeTD").val(value.TicketTypeTD);
                $("#ls_add_VisaDoc_SeatNoTD").val(value.SeatNoTD);
                $("#ls_add_VisaDoc_remarksTD").val(value.RemarksTD);
                $("#ls_edit_ticketreq_travel").val(value.PurposeOfTravelUser);

                //let PurposeOfTravelUser1 = value.PurposeOfTravelUser;

                //if (PurposeOfTravelUser1 = 1) {
                //    PurposeOfTravelUser1 = 'Business';
                //}
                //else if (PurposeOfTravelUser1 = 2) {
                //    PurposeOfTravelUser1 = 'Conference';
                //}
                //else if (PurposeOfTravelUser1 = 3) {
                //    PurposeOfTravelUser1 = 'Training';
                //}
                //else if (PurposeOfTravelUser1 = 4) {
                //    PurposeOfTravelUser1 = 'Others';
                //}
                //$("#ls_edit_ticketreq_travel").val(PurposeOfTravelUser1);

                $("#ls_edit_ticketreq_other_travel").val(value.PurposeOfTravelOtherUser);

                let PurposeOfTravel = $("#ls_edit_ticketreq_travel").val();
                if (PurposeOfTravel != "4") {
                    $("#ls_edit_ticketreq_other_travel").attr("readonly", true);
                }
                else {
                    $("#ls_edit_ticketreq_other_travel").attr("readonly", false);
                }

                $(document).ready(function () {
                    $("#ls_edit_ticketreq_travel").change(function () {
                        if ($(this).val() == "4") {
                            $("#ls_edit_ticketreq_other_travel").prop("readonly", false);
                        }
                        else {
                            $("#ls_edit_ticketreq_other_travel").prop("readonly", true);
                            $("#ls_edit_ticketreq_other_travel").val('');
                        }
                    });
                });


                $("#ls_edit_ticketreq_destination").val(value.DestinationUser);

                $("#ls_edit_ticketreq_DepartDate").val(value.DepartureDateUser ? convertJsonDate(value.DepartureDateUser) : null);
                $("#ls_edit_ticketreq_ReturnDate").val(value.ReturnDateUser ? convertJsonDate(value.ReturnDateUser) : null);


                $("#ls_add_VisaDoc_TicketpriceTD").val(value.TicketPriceTD);
                $("#ls_edit_ticketreq_currtype").val(value.CurrencyTypeTD);

                $("#ls_edit_ticketreq_flayerNo").val(value.FlayerNoUser);
                $("#ls_edit_ticketreq_airlines").val(value.AirlinesUser);
                $("#ls_edit_ticketreq_flightno").val(value.FlightUser);
                $("#ls_edit_ticketreq_meal").val(value.MealUser);
                $("#ls_edit_ticketreq_spreq").val(value.SpecialReqUser);
                $("#ls_edit_ticketreq_remarks").val(value.RemarksUser);
                $("#ls_edit_ticketreq_EntryDate").val(value.ReturnDateUser ? convertJsonDate(value.ReturnDateUser) : null);
                $("#ls_edit_ticketreq_seat").val(value.SeatUser);


                //NID and Passport files

                $(".uploaded-design_passport").empty();

                $.each(value.totissue, function (index, _value) {

                    let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value.Id });
                    let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value.location, target: "_blank", "data-id": _value.Id }).appendTo(btnGroupDiv);
                    let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                    $(".uploaded-design_passport").append(btnGroupDiv);

                });


                //Visa Document Files

                //$(".uploaded-design_visaDoc").empty();

                //$.each(value.TDfiles, function (index, _value2) {

                //    let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                //    let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                //    let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                //    $(".uploaded-design_visaDoc").append(btnGroupDiv);
                //});


                //Ticket Requisition Attachment

                $(".uploaded-design").empty();

                $.each(value.tickReqAtt, function (index, _value2) {

                    let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                    let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                    let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                    if (value.tickReqAtt.length > 0) {
                        let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Visa files");
                        btnGroupAnc.append(smallElement);
                    }

                    let btnGroupButton1 = $("<button>").attr({ "class": "btn btn-danger fileBtn", type: "button" }).appendTo(btnGroupDiv);
                    let btnGroupButtonIcon = $("<i>").attr({ "class": "bi bi-trash" }).appendTo(btnGroupButton1);

                    $(".uploaded-design").append(btnGroupDiv);



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

                $("#ls_delete_ticketreq_modal").modal("show");
                $("#ls_delete_ticketreq_id_hidden").data("Id", value.Id);
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
            url: "/TicketRequision/DeleteTicketRequisionFileTD",
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



$("#ls_edit_ticketreq_modal_form").on("submit", function (e) {
    e.preventDefault();

    //alert();

    json = {

        Id: $("#ls_edit_ticketreq_airlines").data("Id"),
        UserNo: $("#ls_edit_ticketreq_remarks").data("UserNo"),


        TicketApprovalStatus: $("#ls_edit_ticketreq_spreq").data("TicketApprovalStatus"),
        ApprovedBy: $("#ls_edit_ticketreq_flayerNo").data("ApprovedBy"),
        RejectedBy: $("#ls_edit_ticketreq_flightno").data("RejectedBy"),
        CommentsSupervisor: $("#ls_edit_ticketreq_seat").data("CommentsSupervisor"),


        //Employee
        //VisaRequisitionNo: $("#ls_edit_ticketreq_visaReqno").val(),
        PurposeOfTravelUser: $("#ls_edit_ticketreq_travel").val(),
        PurposeOfTravelOtherUser: $("#ls_edit_ticketreq_other_travel").val(),
        DestinationUser: $("#ls_edit_ticketreq_destination").val(),
        DepartureDateUserStr: $("#ls_edit_ticketreq_DepartDate").val(),
        ReturnDateUserStr: $("#ls_edit_ticketreq_ReturnDate").val(),
        AirlinesUser: $("#ls_edit_ticketreq_airlines").val(),
        FlayerNoUser: $("#ls_edit_ticketreq_flayerNo").val(),
        FlightUser: $("#ls_edit_ticketreq_flightno").val(),
        SeatUser: $("#ls_edit_ticketreq_seat").val(),
        MealUser: $("#ls_edit_ticketreq_meal").val(),
        SpecialReqUser: $("#ls_edit_ticketreq_spreq").val(),
        RemarksUser: $("#ls_edit_ticketreq_remarks").val(),


        //TD
        AirlinesTD: $("#ls_add_VisaDoc_airlineTD").val(),
        DepturtureDateTDStr: $("#ls_add_VisaDoc_DeptDateTD").val(),
        DepturtureTimeTD: $("#ls_add_VisaDoc_DeptTimeTD").val(),
        TerminalNoTD: $("#ls_add_VisaDoc_terminalNoTD").val(),
        FlightNoTD: $("#ls_add_VisaDoc_flightNoTD").val(),
        TicketNoTD: $("#ls_add_VisaDoc_ticketNoTD").val(),
        TicketTypeTD: $("#ls_edit_ticketreq_TicktypeTD").val(),
        TicketPriceTD: $("#ls_add_VisaDoc_TicketpriceTD").val(),
        CurrencyTypeTD: $("#ls_edit_ticketreq_currtype").val(),
        SeatNoTD: $("#ls_add_VisaDoc_SeatNoTD").val(),
        RemarksTD: $("#ls_add_VisaDoc_remarksTD").val(),

    }


    var formData = new FormData();

    //Employee
    //formData.append("VisaRequisitionNo", json.VisaRequisitionNo);
    formData.append("PurposeOfTravelUser", json.PurposeOfTravelUser);
    formData.append("PurposeOfTravelOtherUser", json.PurposeOfTravelOtherUser);
    formData.append("DestinationUser", json.DestinationUser);
    formData.append("DepartureDateUserStr", json.DepartureDateUserStr);
    formData.append("ReturnDateUserStr", json.ReturnDateUserStr);
    formData.append("AirlinesUser", json.AirlinesUser);
    formData.append("FlayerNoUser", json.FlayerNoUser);
    formData.append("FlightUser", json.FlightUser);
    formData.append("SeatUser", json.SeatUser);
    formData.append("MealUser", json.MealUser);
    formData.append("SpecialReqUser", json.SpecialReqUser);
    formData.append("RemarksUser", json.RemarksUser);

    //TD
    formData.append("AirlinesTD", json.AirlinesTD);
    formData.append("DepturtureDateTDStr", json.DepturtureDateTDStr);
    formData.append("DepturtureTimeTD", json.DepturtureTimeTD);
    formData.append("TerminalNoTD", json.TerminalNoTD);
    formData.append("FlightNoTD", json.FlightNoTD);
    formData.append("TicketNoTD", json.TicketNoTD);
    formData.append("TicketTypeTD", json.TicketTypeTD);
    formData.append("TicketPriceTD", json.TicketPriceTD);
    formData.append("CurrencyTypeTD", json.CurrencyTypeTD);
    formData.append("SeatNoTD", json.SeatNoTD);
    formData.append("RemarksTD", json.RemarksTD);


    formData.append("Id", json.Id);
    formData.append("UserNo", json.UserNo);
    //formData.append("VisaReqId", json.VisaReqId);


    //Travel Desk
    for (let i = 0; i < $("#ls_add_VisaDoc_attachmentTD")[0].files.length; i++) {
        formData.append("FilesTD", $("#ls_add_VisaDoc_attachmentTD")[0].files[i]);
    }

    //console.log("showjson", json);

    $.ajax({
        url: '/TicketRequision/UpdateTicketRequisition',
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

$("#ls_delete_ticketreq_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_delete_ticketreq_id_hidden").data("Id")
    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/TicketRequision/DeleteTicketRequision",
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

                iziToast.success({
                    title: 'Deleted Successfully!',
                    message: resp.message,
                    position: 'bottomRight'
                });

                load_TicketRequisition_table();
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


//Pop-Up


$("#ls_filter_btn1").on("click", function (e) {

    load_VisaRequisition_table_popUp(1);
});

function load_VisaRequisition_table_popUp(page) {

    // alert('turuturutu la la la');

    json = {

        VisaRequisitionNoText: $("#ls_filter_VisaReq_pop").val(),
        //EmployeeId: $("#ls_filter_EmpId_pop").val(),
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/VisaRequisition/ShowVisaRequisitionPopUp",
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
                show_VisaRequisition_list_Pop(resp);

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



function show_VisaRequisition_list_Pop(resp) {

    $("#ls_MachineList_table_tbody").empty();

    if (resp.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
        return;
    }

    var sl = 0;

    $.each(resp, function (index, value) {
        // console.log("testtttttt", resp.data);

        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);

        var VisaRequisitionNo = $("<td>").append(value.VisaRequisitionNoText);
        //var TicketRequisitionNo = $("<td>").append(value.TicketDet[0].TicketRequisitionNoText);
        //var HotelReservationNoText = $("<td>").append(value.HotelDet[0].HotelReservationNoText);

        var TicketRequisitionNo = $("<td>");

        if (value.TicketDet[0] != null) {
            TicketRequisitionNo.append(value.TicketDet[0].TicketRequisitionNoText);
        } else {
            TicketRequisitionNo.append("N/A");
        }

        var HotelReservationNoText = $("<td>");
        if (value.HotelDet[0] != null) {
            HotelReservationNoText.append(value.HotelDet[0].HotelReservationNoText);
        } else {
            HotelReservationNoText.append("N/A");
        }


        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var Country = $("<td>").append(value.CountryNameUser);

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        //var selecticon = $("<i>").attr({
        //    "class": "bi-hand-index btn icon btn-primary rounded-circle shadow",
        //    "style": "font-size: 12px; cursor: pointer; border: 2px solid white;",
        //    "title": "Select"
        //}).appendTo(icondiv);

        var selecticon = $("<img>").attr({
            "src": "/_Assets/Icons/view_updated2.png",
            "alt": "Preview Icon",
            "title": "Preview",
            "style": "cursor: pointer; border: 2px solid white; width: 46px; height: 46px;"
        });

        icondiv.append(selecticon);


        $("<tr>").attr("class", "text-center").append(iconcell, slnocell, VisaRequisitionNo, TicketRequisitionNo, HotelReservationNoText, EmployeeId,
            FullName, ContactNo, CompanyName, DepartmentName, DesignationName, Country).appendTo("#ls_MachineList_table_tbody");

        selecticon.on("click", function (e) {
            e.preventDefault();

            $("#ls_add_MachineList_modal").hide();

            $("#ls_add_ticketreq_visaReqno").val(value.VisaRequisitionNoText);

            let PurposeOfTravelUser1 = value.PurposeOfTravelUser;

            if (PurposeOfTravelUser1 == 1) {
                PurposeOfTravelUser1 = 'Business';
                $("#ls_add_ticketreq_travel").val(PurposeOfTravelUser1);
            }
            else if (PurposeOfTravelUser1 == 2) {
                PurposeOfTravelUser1 = 'Conference';
                $("#ls_add_ticketreq_travel").val(PurposeOfTravelUser1);
            }
            else if (PurposeOfTravelUser1 == 3) {
                PurposeOfTravelUser1 = 'Training';
                $("#ls_add_ticketreq_travel").val(PurposeOfTravelUser1);
            }
            else if (PurposeOfTravelUser1 == 4) {
                $("#ls_add_ticketreq_travel").val(value.PurposeOfTravelOtherUser);
            }

            

       });
    });
}






$("#ls_filter_btn2").on("click", function (e) {

    load_VisaRequisition_table_popUp_edit(1);
});

function load_VisaRequisition_table_popUp_edit(page) {

     //alert('turuturutu la la la');

    json = {

        VisaRequisitionNoText: $("#ls_filter_VisaReq_pop_edit").val()
    };

   // console.log(json);

    $.ajax({
        type: "POST",
        url: "/VisaRequisition/ShowVisaRequisitionPopUp",
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

               // console.log("resp", resp);
                show_VisaRequisition_list_Pop_edit(resp);

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




function show_VisaRequisition_list_Pop_edit(resp) {

    $("#ls_MachineList_table_tbody_edit").empty();

    if (resp.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
        return;
    }

    var sl = 0;

    $.each(resp, function (index, value) {
       // console.log("testtttttt", resp);

        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);

        var VisaRequisitionNo = $("<td>").append(value.VisaRequisitionNoText);

        var TicketRequisitionNo = $("<td>");

        if (value.TicketDet[0] != null) {
            TicketRequisitionNo.append(value.TicketDet[0].TicketRequisitionNoText);
        } else {
            TicketRequisitionNo.append("N/A");
        }

        var HotelReservationNoText = $("<td>");
        if (value.HotelDet[0] != null) {
            HotelReservationNoText.append(value.HotelDet[0].HotelReservationNoText);
        } else {
            HotelReservationNoText.append("N/A");
        }

        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var Country = $("<td>").append(value.CountryNameUser);

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        //var selecticon = $("<i>").attr({
        //    "class": "bi-hand-index btn icon btn-primary rounded-circle shadow",
        //    "style": "font-size: 12px; cursor: pointer; border: 2px solid white;",
        //    "title": "Select"
        //}).appendTo(icondiv);

        var selecticon = $("<img>").attr({
            "src": "/_Assets/Icons/view_updated2.png",
            "alt": "Preview Icon",
            "title": "Preview",
            "style": "cursor: pointer; border: 2px solid white; width: 46px; height: 46px;"
        });

        icondiv.append(selecticon);


        $("<tr>").attr("class", "text-center").append(iconcell, slnocell, VisaRequisitionNo, TicketRequisitionNo, HotelReservationNoText, EmployeeId,
            FullName, ContactNo, CompanyName, DepartmentName, DesignationName, Country).appendTo("#ls_MachineList_table_tbody_edit");

        selecticon.on("click", function (e) {
            e.preventDefault();

            if (value.TicketDet[0] == null) {
               // alert('No ticket requisition has been found. Cannot edit.');
                

                iziToast.warning({
                    title: 'Warning!',
                    message: "No ticket requisition has been found. Cannot edit.",
                    position: 'bottomRight'
                });

                return;
            }

            else
            { 

            $("#ls_edit_MachineList_modal").hide();

            $("#ls_edit_ticketreq_visaReqno").val(value.VisaRequisitionNoText);
            $("#ls_edit_ticketreq_reqno").val(value.TicketDet[0].TicketRequisitionNoText);

            let PurposeOfTravelUser1 = value.PurposeOfTravelUser;

           // alert(PurposeOfTravelUser1);

            if (PurposeOfTravelUser1 == 1) {
                PurposeOfTravelUser1 = 'Business';
                $("#ls_edit_ticketreq_travel").val(PurposeOfTravelUser1);
            }
            else if (PurposeOfTravelUser1 == 2) {
                PurposeOfTravelUser1 = 'Conference';
                $("#ls_edit_ticketreq_travel").val(PurposeOfTravelUser1);
            }
            else if (PurposeOfTravelUser1 == 3) {
                PurposeOfTravelUser1 = 'Training';
                $("#ls_edit_ticketreq_travel").val(PurposeOfTravelUser1);
            }
            else if (PurposeOfTravelUser1 == 4) {
                $("#ls_edit_ticketreq_travel").val(value.PurposeOfTravelOtherUser);
            }

            
            }

        });
    });
}
