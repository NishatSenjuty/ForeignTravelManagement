

$("#ls_add_hotelresv_btn").on("click", function () {
    $("#ls_add_hotelresv_modal").modal("show");
    $("#ls_add_hotelresv_modal_form").trigger("reset");
    $("#ls_add_hotelresv_modal_form").removeClass('was-validated');
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


$(document).ready(function () {
    $("#ls_add_HotelDoc_attachment_TD").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-hotelTD").html(fileNames);
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

$("#ls_add_hotelresv_EntryDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_add_hotelresv_CheckInDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_add_hotelresv_CheckOutDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_hotelresv_CheckInDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_hotelresv_meetdt").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_hotelresv_CheckOutDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});


$("#ls_edit_hotelresv_CheckInDate_td").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_hotelresv_CheckOutDate_td").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});


$("#ls_add_hotelresv_meetdt").datepicker({
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



PopulateApplicantDetails();

function PopulateApplicantDetails() {

    //alert();


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




//Save

$("#ls_add_hotelresv_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {

        //VisaRequisitionNo: $("#ls_add_hotelresv_visaReqno").val(),
        //TicketRequisitionNo: $("#ls_add_hotelresv_ticketReqno").val(),
        CountryNameUser: $("#ls_add_hotelresv_country").val(),
        CityUser: $("#ls_add_hotelresv_destinationCity").val(),
        CheckInDateUserStr: $("#ls_add_hotelresv_CheckInDate").val(),
        CheckOutDateUserStr: $("#ls_add_hotelresv_CheckOutDate").val(),
        RoomTypeUser: $("#ls_add_hotelresv_room").val(),
        PreferedHotelUser: $("#ls_add_hotelresv_hotel").val(),
        PreferedLocationUser: $("#ls_add_hotelresv_loc").val(),
        BudgetUser: $("#ls_add_hotelresv_budget").val(),
        EventAddressUser: $("#ls_add_hotelresv_meetadd").val(),
        EventDateUserStr: $("#ls_add_hotelresv_meetdt").val(),
        EventTimeUser: $("#ls_add_hotelresv_meetTimeTD").val(),
        SpecialReqUser: $("#ls_add_hotelresv_spereq").val(),
        LoyaltyProgNo: $("#ls_add_hotelresv_loyalprogno").val(),

    };

    //console.log("json", json);

    $.ajax({
        url: '/HotelReservation/AddHotelReservation',
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

                load_HotelReservation_table(1);



                $("#ls_add_hotelresv_modal_form").removeClass('was-validated');

                setTimeout(function () {
                    location.reload();
                }, 1500);
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




$("#gatepass_filter_form").on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        e.preventDefault();
        return false;
    }
});


//$("#ls_filter_btn").on("click", function (e) {

//    if (userRoleId != '1' && userRoleId != '5') {
//        e.preventDefault();
//        load_HotelReservation_table(1);

//    }

//    else if (userRoleId != '1' && userRoleId != '3') {
//        e.preventDefault();
//        load_HotelReservation_table_Employee(1);
//    }
//});

//if (userRoleId != '1' && userRoleId != '3') {
//    load_HotelReservation_table_Employee(1);
//}

//if (userRoleId != '1' && userRoleId != '5') {
//    load_HotelReservation_table(1);
//}


$("#ls_filter_btn").on("click", function (e) {

    if (userRoleId != '1' && userRoleId == '3') {
        e.preventDefault();
        load_HotelReservation_table(1);

    }

    else if (userRoleId != '1' && userRoleId != '3') {
        e.preventDefault();
        load_HotelReservation_table_Employee(1);
    }
});

if (userRoleId != '1' && userRoleId != '3') {
    load_HotelReservation_table_Employee(1);
}

if (userRoleId != '1' && userRoleId == '3') {
    load_HotelReservation_table(1);
}



function load_HotelReservation_table_Employee(page) {

    //alert();


    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        HotelReservationNoText: $("#filter_hotelresv_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        HotelResActiveStatus: $("#filter_gatepass_status").val(),
        page: page,
        userNo: userNo

    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/HotelReservation/ShowHotelReservationForEmployee",
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
                show_HotelReservation_list(resp);

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


function load_HotelReservation_table(page) {

   // alert('turuturutu la la la');

    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        HotelReservationNoText: $("#filter_hotelresv_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        HotelResActiveStatus: $("#filter_gatepass_status").val(),
        page: page
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/HotelReservation/ShowHotelReservation",
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
                show_HotelReservation_list(resp);

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


function show_HotelReservation_list(resp) {

    $("#ls_hotelresv_table_tbody").empty();

    if (resp.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    $.each(resp, function (index, value) {

        var slnocell = $("<td>").append(index + 1);
        //var VisaRequisitionNo = $("<td>").append(value.VisaRequisitionNo);
        //var TicketRequisitionNo = $("<td>").append(value.TicketRequisitionNo);
        var HotelReservationNoText = $("<td>").append(value.HotelReservationNoText);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);

        let CountryNameUser2 = value.CountryNameUser;

        if (CountryNameUser2 == -1) {
            CountryNameUser2 = "";
        }
        else {
            CountryNameUser2 = value.CountryNameUser;
        }

        var CountryNameUser = $("<td>").append(CountryNameUser2);

        var CityName = $("<td>").append(value.CityUser);
        var CheckInDateUser = $("<td>").append(value.CheckInDateUser ? convertJsonDate(value.CheckInDateUser) : " ");
        var CheckOutDateUser = $("<td>").append(value.CheckOutDateUser ? convertJsonDate(value.CheckOutDateUser) : " ");
        var SpecialReqUser = $("<td>").append(value.SpecialReqUser);
        var EventDateUser = $("<td>").append(value.EventDateUser ? convertJsonDate(value.EventDateUser) : " ");  


        //var HotelApprovalStatus = $("<td>");

        //if (value.HotelApprovalStatus == 1) {
        //    $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(HotelApprovalStatus);
        //}
        //else if (value.HotelApprovalStatus == 2) {
        //    $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(HotelApprovalStatus);
        //}
        //else if (value.HotelApprovalStatus == 3) {
        //    $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(HotelApprovalStatus);
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


        $("<tr>").attr("class", "text-center").append(slnocell, HotelReservationNoText, EmployeeId, FullName, ContactNo,
            CompanyName, DepartmentName, DesignationName, CountryNameUser, CityName, CheckInDateUser, CheckOutDateUser, SpecialReqUser, EventDateUser, 
            iconcell).appendTo("#ls_hotelresv_table_tbody");

        (function ($) {
            editicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_edit_hotelresv_modal").modal("show");

                //if (userRoleId != '3') {
                //    if (value.HotelApprovalStatus == 1) {
                //        //icondiv.addClass("disabled");
                //        $("#ls_edit_hotelresv_modal").find(".modal-footer").hide();

                //    }
                //}

                $("#ls_edit_hotelresv_budget").data("Id", value.Id);
                $("#ls_edit_hotelresv_loc").data("UserNo", value.UserNo);
                //$("#ls_edit_hotelresv_country").data("VisaReqId", value.VisaReqId);
                //$("#ls_edit_hotelresv_loyalprogno").data("TicketReqId", value.TicketReqId);


                $("#ls_edit_hotelresv_spereq").data("HotelApprovalStatus", value.HotelApprovalStatus);
                $("#ls_edit_hotelresv_loyalprogno").data("ApprovedBy", value.ApprovedBy);
                $("#ls_edit_hotelresv_room").data("RejectedBy", value.RejectedBy);
                $("#ls_edit_hotelresv_hotel").data("CommentsSupervisor", value.CommentsSupervisor);


                $('#applicant_name_edit').text(value.FullName);
                $('#applicant_employee_id_edit').text(value.EmployeeId);
                $('#applicant_company_edit').text(value.CompanyName);
                $('#applicant_department_edit').text(value.DepartmentName);
                $('#applicant_designation_edit').text(value.DesignationName);

                if (userRoleId != '1' && userRoleId != '5') {   //Travel Desk

                    $("#ls_edit_hotelresv_resno").attr("disabled", true);
                    $("#ls_edit_hotelresv_visaReqno").attr("disabled", true);
                    $("#ls_edit_hotelresv_ticketReqno").attr("disabled", true);

                    $("#ls_edit_hotelresv_EntryDate").attr("disabled", true);
                    $("#ls_edit_hotelresv_destination").attr("disabled", true);
                    $("#ls_edit_hotelresv_CheckInDate").attr("disabled", true);
                    $("#ls_edit_hotelresv_CheckOutDate").attr("disabled", true);
                    $("#ls_edit_hotelresv_room").attr("disabled", true);
                    $("#ls_edit_hotelresv_hotel").attr("disabled", true);
                    $("#ls_edit_hotelresv_loc").attr("disabled", true);
                    $("#ls_edit_hotelresv_budget").attr("disabled", true);
                    $("#ls_edit_hotelresv_meetadd").attr("disabled", true);
                    $("#ls_edit_hotelresv_meetdt").attr("disabled", true);
                    $("#ls_edit_hotelresv_meetTimeTD").attr("disabled", true);
                    $("#ls_edit_hotelresv_spereq").attr("disabled", true);
                    $("#ls_edit_hotelresv_loyalprogno").attr("disabled", true); 
                    $("#ls_edit_hotelresv_country").attr("disabled", true);
                }


                if (userRoleId != '1' && userRoleId != '3') {     //Employee

                    $("#ls_edit_hotelresv_resno").attr("disabled", true);
                    $("#ls_edit_hotelresv_visaReqno").attr("disabled", true);
                    $("#ls_edit_hotelresv_ticketReqno").attr("disabled", true);
                    $("#ls_add_HotelDoc_attachment_TD").attr("disabled", true);

                    $("#ls_edit_visareq_country_hotelTD").attr("disabled", true);
                    $("#ls_edit_hotelresv_destinationCity_td").attr("disabled", true);
                    $("#ls_edit_hotelresv_CheckInDate_td").attr("disabled", true);
                    $("#ls_edit_hotelresv_CheckOutDate_td").attr("disabled", true);
                    $("#ls_edit_hotelresv_room_td").attr("disabled", true);
                    $("#ls_add_VisaDoc_hotelname_td").attr("disabled", true);  
                    $("#ls_add_VisaDoc_hoteladd_td").attr("disabled", true);
                }

                $("#ls_edit_hotelresv_resno").val(value.HotelReservationNoText); 
                $("#ls_edit_hotelresv_visaReqno").val(value.VisaRequisitionNo); 
                $("#ls_edit_hotelresv_ticketReqno").val(value.TicketRequisitionNo); 


                //TD
                $("#ls_edit_visareq_country_hotelTD").val(value.CountryNameTD);
                $("#ls_edit_hotelresv_destinationCity_td").val(value.CityTD);
                $("#ls_edit_hotelresv_room_td").val(value.RoomTypeTD);
                $("#ls_add_VisaDoc_hotelname_td").val(value.HotelNameTD);
                $("#ls_edit_hotelresv_CheckInDate_td").val(value.CheckInDateTD ? convertJsonDate(value.CheckInDateTD) : null);
                $("#ls_edit_hotelresv_CheckOutDate_td").val(value.CheckOutDateTD ? convertJsonDate(value.CheckOutDateTD) : null);
                $("#ls_add_VisaDoc_hoteladd_td").val(value.HotelAddressTD);



                //Employee
                $("#ls_edit_hotelresv_country").val(value.CountryNameUser);
                $("#ls_edit_hotelresv_destination").val(value.CityUser);
                $("#ls_edit_hotelresv_room").val(value.RoomTypeUser);
                $("#ls_edit_hotelresv_CheckInDate").val(value.CheckInDateUser ? convertJsonDate(value.CheckInDateUser) : null);
                $("#ls_edit_hotelresv_CheckOutDate").val(value.CheckOutDateUser ? convertJsonDate(value.CheckOutDateUser) : null);
                $("#ls_edit_hotelresv_hotel").val(value.PreferedHotelUser);
                $("#ls_edit_hotelresv_loc").val(value.PreferedLocationUser);
                $("#ls_edit_hotelresv_budget").val(value.BudgetUser);
                $("#ls_edit_hotelresv_meetadd").val(value.EventAddressUser);
                $("#ls_edit_hotelresv_meetdt").val(value.EventDateUser ? convertJsonDate(value.EventDateUser) : null);

                let cth = value.EventTimeUser.Hours;
                if (cth < 10) {
                    cth = "0" + value.EventTimeUser.Hours;
                }
                let ctm = value.EventTimeUser.Minutes;
                if (ctm < 10) {
                    ctm = "0" + value.EventTimeUser.Minutes;
                }
                let changetime = Boolean(value.EventTimeUser) == true ? cth + ":" + ctm : null;

                $("#ls_edit_hotelresv_meetTimeTD").val(changetime);


                $("#ls_edit_hotelresv_spereq").val(value.SpecialReqUser);
                $("#ls_edit_hotelresv_loyalprogno").val(value.LoyaltyProgNo);



                //Hotel Reservation Attachment

                $(".uploaded-design-hotelTD").empty();

                $.each(value.HotelReqAtt, function (index, _value2) {

                    let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                    let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                    let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                    if (value.HotelReqAtt.length > 0) {
                        let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Visa files");
                        btnGroupAnc.append(smallElement);
                    }

                    let btnGroupButton1 = $("<button>").attr({ "class": "btn btn-danger fileBtn", type: "button" }).appendTo(btnGroupDiv);
                    let btnGroupButtonIcon = $("<i>").attr({ "class": "bi bi-trash" }).appendTo(btnGroupButton1);

                    $(".uploaded-design-hotelTD").append(btnGroupDiv);



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

                $("#ls_delete_hotelresv_modal").modal("show");
                $("#ls_delete_hotelresv_id_hidden").data("Id", value.Id);
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
            url: "/HotelReservation/DeleteHotelReservationFileTD",
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


//$("#ls_edit_hotelresv_modal_form").on("submit", function (e) {

//    e.preventDefault();

//    json = {

//        Id: $("#ls_edit_hotelresv_budget").data("Id"),
//        UserNo: $("#ls_edit_hotelresv_loc").data("UserNo"),
//        //VisaReqId: $("#ls_edit_hotelresv_country").data("VisaReqId"),
//        //TicketReqId: $("#ls_edit_hotelresv_loyalprogno").data("TicketReqId"),

//        HotelApprovalStatus: $("#ls_edit_hotelresv_spereq").data("HotelApprovalStatus"),
//        ApprovedBy: $("#ls_edit_hotelresv_loyalprogno").data("ApprovedBy"),
//        RejectedBy: $("#ls_edit_hotelresv_room").data("RejectedBy"),
//        CommentsSupervisor: $("#ls_edit_hotelresv_hotel").data("CommentsSupervisor"),



//        //VisaRequisitionNo: $("#ls_edit_hotelresv_visaReqno").val(),
//        //TicketRequisitionNo: $("#ls_edit_hotelresv_ticketReqno").val(),
//        HotelReservationNoText: $("#ls_edit_hotelresv_resno").val(),

//        CountryNameUser: $("#ls_edit_hotelresv_country").val(),
//        CityUser: $("#ls_edit_hotelresv_destination").val(),
//        CheckInDateUserStr: $("#ls_edit_hotelresv_CheckInDate").val(),
//        CheckOutDateUserStr: $("#ls_edit_hotelresv_CheckOutDate").val(),
//        RoomTypeUser: $("#ls_edit_hotelresv_room").val(),
//        PreferedHotelUser: $("#ls_edit_hotelresv_hotel").val(),
//        PreferedLocationUser: $("#ls_edit_hotelresv_loc").val(),
//        BudgetUser: $("#ls_edit_hotelresv_budget").val(),
//        EventAddressUser: $("#ls_edit_hotelresv_meetadd").val(),
//        EventDateUserStr: $("#ls_edit_hotelresv_meetdt").val(),
//        EventTimeUser: $("#ls_edit_hotelresv_meetTimeTD").val(),
//        SpecialReqUser: $("#ls_edit_hotelresv_spereq").val(),
//        LoyaltyProgNo: $("#ls_edit_hotelresv_loyalprogno").val(),


//        //TD
//        CountryNameTD: $("#ls_edit_visareq_country_hotelTD").val(),
//        CityTD: $("#ls_edit_hotelresv_destinationCity_td").val(),
//        CheckInDateTDStr: $("#ls_edit_hotelresv_CheckInDate_td").val(),
//        CheckOutDateTDStr: $("#ls_edit_hotelresv_CheckOutDate_td").val(),
//        RoomTypeTD: $("#ls_edit_hotelresv_room_td").val(),
//        HotelNameTD: $("#ls_add_VisaDoc_hotelname_td").val(),
//        HotelAddressTD: $("#ls_add_VisaDoc_hoteladd_td").val(),



//    };

//    //console.log("json", json);

//    $.ajax({
//        url: '/HotelReservation/UpdateHotelReservation',
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        data: JSON.stringify(json),
//        beforeSend: function () {
//            $("#ls_NeedleReqEntry_loading_spinner").show();
//        },
//        success: function (resp) {
//            if (resp.error) {
//                iziToast.error({
//                    title: 'error!',
//                    message: resp.message,
//                    position: 'bottomRight'
//                });
//            }

//            else {

//                iziToast.success({
//                    title: 'Saved Successfully!',
//                    message: resp.message,
//                    position: 'bottomRight'
//                });

//                load_HotelReservation_table();

//                setTimeout(function () {
//                    location.reload();
//                }, 1000);
//            }
//        },

//        error: function (jqXHR, exception) {
//            var msg = '';

//            if (jqXHR.status == 0) {
//                msg = 'Not Connected.\nVerify Network.';
//            }

//            else if (jqXHR.status == 404) {
//                msg = 'Requested Page not FOUND. [ERROR:404]';
//            }

//            else if (jqXHR.status == 500) {
//                msg = 'Internal Server Error. [ERROR:500]';
//            }

//            else if (exception == 'parseerror') {
//                msg = 'Requested JSON parse failed.';
//            }

//            else if (exception == 'timeout') {
//                msg = 'Time Out Error.';
//            }

//            else if (exception == 'abort') {
//                msg = 'Ajax request aborted.';
//            }

//            else {
//                msg = 'Uncaught Error.\n + jqXHR.responseText';
//            }

//            iziToast.error({
//                title: 'error!',
//                message: msg,
//                position: 'bottomRight'
//            });

//        },

//        complete: function () {
//            $("#ls_NeedleReqEntry_loading_spinner").hide();
//        }

//    });
//});




$("#ls_edit_hotelresv_modal_form").on("submit", function (e) {
    e.preventDefault();

    //alert();

    json = {

        Id: $("#ls_edit_hotelresv_budget").data("Id"),
        UserNo: $("#ls_edit_hotelresv_loc").data("UserNo"),

        HotelApprovalStatus: $("#ls_edit_hotelresv_spereq").data("HotelApprovalStatus"),
        ApprovedBy: $("#ls_edit_hotelresv_loyalprogno").data("ApprovedBy"),
        RejectedBy: $("#ls_edit_hotelresv_room").data("RejectedBy"),
        CommentsSupervisor: $("#ls_edit_hotelresv_hotel").data("CommentsSupervisor"),
        HotelReservationNoText: $("#ls_edit_hotelresv_resno").val(),

        //Employee
        CountryNameUser: $("#ls_edit_hotelresv_country").val(),
        CityUser: $("#ls_edit_hotelresv_destination").val(),
        CheckInDateUserStr: $("#ls_edit_hotelresv_CheckInDate").val(),
        CheckOutDateUserStr: $("#ls_edit_hotelresv_CheckOutDate").val(),
        RoomTypeUser: $("#ls_edit_hotelresv_room").val(),
        PreferedHotelUser: $("#ls_edit_hotelresv_hotel").val(),
        PreferedLocationUser: $("#ls_edit_hotelresv_loc").val(),
        BudgetUser: $("#ls_edit_hotelresv_budget").val(),
        EventAddressUser: $("#ls_edit_hotelresv_meetadd").val(),
        EventDateUserStr: $("#ls_edit_hotelresv_meetdt").val(),
        EventTimeUser: $("#ls_edit_hotelresv_meetTimeTD").val(),
        SpecialReqUser: $("#ls_edit_hotelresv_spereq").val(),
        LoyaltyProgNo: $("#ls_edit_hotelresv_loyalprogno").val(),

        //TD
        CountryNameTD: $("#ls_edit_visareq_country_hotelTD").val(),
        CityTD: $("#ls_edit_hotelresv_destinationCity_td").val(),
        CheckInDateTDStr: $("#ls_edit_hotelresv_CheckInDate_td").val(),
        CheckOutDateTDStr: $("#ls_edit_hotelresv_CheckOutDate_td").val(),
        RoomTypeTD: $("#ls_edit_hotelresv_room_td").val(),
        HotelNameTD: $("#ls_add_VisaDoc_hotelname_td").val(),
        HotelAddressTD: $("#ls_add_VisaDoc_hoteladd_td").val(),
    }


    var formData = new FormData();

    //Employee
    formData.append("CountryNameUser", json.CountryNameUser);
    formData.append("CityUser", json.CityUser);
    formData.append("CheckInDateUserStr", json.CheckInDateUserStr);
    formData.append("CheckOutDateUserStr", json.CheckOutDateUserStr);
    formData.append("RoomTypeUser", json.RoomTypeUser);
    formData.append("PreferedHotelUser", json.PreferedHotelUser);
    formData.append("PreferedLocationUser", json.PreferedLocationUser);
    formData.append("BudgetUser", json.BudgetUser);
    formData.append("EventAddressUser", json.EventAddressUser);
    formData.append("EventDateUserStr", json.EventDateUserStr);
    formData.append("EventTimeUser", json.EventTimeUser);
    formData.append("SpecialReqUser", json.SpecialReqUser);
    formData.append("LoyaltyProgNo", json.LoyaltyProgNo);

    //TD
    formData.append("CountryNameTD", json.CountryNameTD);
    formData.append("CityTD", json.CityTD);
    formData.append("CheckInDateTDStr", json.CheckInDateTDStr);
    formData.append("CheckOutDateTDStr", json.CheckOutDateTDStr);
    formData.append("RoomTypeTD", json.RoomTypeTD);
    formData.append("HotelNameTD", json.HotelNameTD);
    formData.append("HotelAddressTD", json.HotelAddressTD);


    formData.append("Id", json.Id);
    formData.append("UserNo", json.UserNo);
    formData.append("HotelApprovalStatus", json.HotelApprovalStatus);
    formData.append("ApprovedBy", json.ApprovedBy);
    formData.append("RejectedBy", json.RejectedBy);
    formData.append("CommentsSupervisor", json.CommentsSupervisor);
    formData.append("HotelReservationNoText", json.HotelReservationNoText);



    //Travel Desk
    for (let i = 0; i < $("#ls_add_HotelDoc_attachment_TD")[0].files.length; i++) {
        formData.append("FilesTD", $("#ls_add_HotelDoc_attachment_TD")[0].files[i]);
    }

    //console.log("showjson", json);

    $.ajax({
        url: '/HotelReservation/UpdateHotelReservation',
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

$("#ls_delete_hotelresv_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_delete_hotelresv_id_hidden").data("Id")
    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/HotelReservation/DeleteHotelReservation",
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

                load_HotelReservation_table();
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
       // EmployeeId: $("#ls_filter_EmpId_pop").val(),
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
        //    "title": "Select Requisition"
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

            if (value.TicketDet[0] == null) {

                iziToast.warning({
                    title: 'Warning!',
                    message: "No ticket requisition has been found. Cannot edit.",
                    position: 'bottomRight'
                });

                return;
            }

            else {

                $("#ls_add_MachineList_modal").hide();

                $("#ls_add_hotelresv_visaReqno").val(value.VisaRequisitionNoText);

                $("#ls_add_hotelresv_ticketReqno").val(value.TicketDet[0].TicketRequisitionNoText);

                $("#ls_add_hotelresv_country").val(value.CountryNameUser);

                $("#ls_add_hotelresv_destinationCity").val(value.TicketDet[0].DestinationUser);
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
       // EmployeeId: $("#ls_filter_EmpId_pop_edit").val(),
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

            if (value.HotelDet[0] == null) {

                iziToast.warning({
                    title: 'Warning!',
                    message: "No Hotel reservation requisition has been found. Cannot edit.",
                    position: 'bottomRight'
                });

                return;
            }

            else {

                $("#ls_edit_MachineList_modal").hide();

                $("#ls_edit_hotelresv_resno").val(value.HotelDet[0].HotelReservationNoText);
                $("#ls_edit_hotelresv_visaReqno").val(value.VisaRequisitionNoText);
                $("#ls_edit_hotelresv_ticketReqno").val(value.TicketDet[0].TicketRequisitionNoText);

                $("#ls_edit_hotelresv_country").val(value.CountryNameUser);

                $("#ls_edit_hotelresv_destination").val(value.TicketDet[0].DestinationUser);
            }
        });
    });
}






