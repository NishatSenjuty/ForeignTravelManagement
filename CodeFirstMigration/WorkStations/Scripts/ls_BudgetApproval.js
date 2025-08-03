


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
            $("#ls_add_EmpInfo_designation").attr("disabled", true);
            $("#ls_edit_EmpInfo_designation").attr("disabled", true);

        },

        complete: function () {
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
                $("#ls_add_ticketreq_currtype").empty();

                $("#ls_edit_ticketreq_currtype").append('<option value="">Select Currency Type</option>');
                $("#ls_add_ticketreq_currtype").append('<option value="">Select Currency Type</option>');


                $.each(resp.data, function (index, value) {
                    $("#ls_edit_ticketreq_currtype").append('<option value="' + value.Id + '">' + value.CurrencyName + '</option>');
                    $("#ls_add_ticketreq_currtype").append('<option value="' + value.Id + '">' + value.CurrencyName + '</option>');
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



$("#gatepass_filter_form").on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

$("#ls_filter_btn").on("click", function (e) {

    if (userRoleId == '2') {    //Supervisor
        e.preventDefault();
        load_TRFApproval_table(1);

    }

    else if (userRoleId == '4') {  //Management
        e.preventDefault();
        load_TRFApproval_Management_table(1);
    }

    else if (userRoleId == '3') {  //Travel Desk
        e.preventDefault();
        load_TRFApproval_TravelDesk_table(1);
    }

    else if (userRoleId == '1') {  //Travel Desk
        e.preventDefault();
        load_TRFApproval_TravelDesk_table(1);
    }
});



if (userRoleId == '2') {         //Supervisor
    load_TRFApproval_table(1);

}

else if (userRoleId == '4') { //Management
    load_TRFApproval_Management_table(1);
}

else if (userRoleId == '3' || userRoleId == '1') {  //Travel Desk, admin
    load_TRFApproval_TravelDesk_table(1);
}


function create_input_element(placeholderText, inputName, inputClassId) {

    let input = document.createElement("input");
    input.name = inputName;
    input.className = "qtybri form-control form-control-sm " + inputClassId;

    input.placeholder = placeholderText;
    input.id = inputClassId;
    input.type = "text";
    return input;
}



//For Supervisor

//load_TRFApproval_table(1);

function load_TRFApproval_table(page) {


    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TRFNoText: $("#filter_trf_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        TicketApprovalStatusSupervisor: $("#filter_gatepass_status").val(),
        TicketApprovalStatusManagement: $("#filter_gatepass_status_management").val(),
        page: page,
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/TRFApproval/ShowTRFApprovalSup",
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
                show_TRFApproval_list(resp);

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


//For Management

function load_TRFApproval_Management_table(page) {


    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TRFNoText: $("#filter_trf_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        TicketApprovalStatusSupervisor: $("#filter_gatepass_status").val(),
        TicketApprovalStatusManagement: $("#filter_gatepass_status_management").val(),
        page: page,
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/TRFApproval/ShowTRFApprovalMan",
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
                show_TRFApproval_list(resp);

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


//For Travel Desk

function load_TRFApproval_TravelDesk_table(page) {


    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TRFNoText: $("#filter_trf_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        TicketApprovalStatusSupervisor: $("#filter_gatepass_status").val(),
        TicketApprovalStatusManagement: $("#filter_gatepass_status_management").val(),
        page: page,
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/TRFApproval/ShowTRFApprovalTravelDesk",
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
                show_TRFApproval_list(resp);

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


function show_TRFApproval_list(resp) {

    $("#ls_EmpInfo_table_tbody").empty();

    if (resp.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    $.each(resp, function (index, value) {

        var slnocell = $("<td>").append(index + 1);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);

        var costReq = $("<td>").append(value.TotalCostRequired);
        var advReq = $("<td>").append(value.TotalAdvanceRequired);
        var Remarks = $("<td>").append(value.Remarks);

        var TicketApprovalStatusSupervisor = $("<td>");

        if (value.TicketApprovalStatusSupervisor == 1) {
            $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(TicketApprovalStatusSupervisor);
        }
        else if (value.TicketApprovalStatusSupervisor == 2) {
            $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(TicketApprovalStatusSupervisor);
        }
        else if (value.TicketApprovalStatusSupervisor == 3) {
            $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(TicketApprovalStatusSupervisor);
        }


        var ApprovedBySupDet;

        if (value.ApprovedBySupDet && value.ApprovedBySupDet.length > 0 && value.ApprovedBySupDet[0].AppUserName != null) {
            ApprovedBySupDet = $("<td>").append(value.ApprovedBySupDet[0].AppUserName);
        }
        else if (value.RejectedBySupDet && value.RejectedBySupDet.length > 0 && value.RejectedBySupDet[0].RejUserName != null) {
            ApprovedBySupDet = $("<td>").append(value.RejectedByDet[0].RejUserName);
        }
        else {
            ApprovedBySupDet = $("<td>").append("-");
        }

        var CommentsSupervisor = $("<td>");

        if (value.CommentsSupervisor != null) {
            $("<div>").attr("class", "badge bg-danger").append(value.CommentsSupervisor).appendTo(CommentsSupervisor);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(CommentsSupervisor);
        }


        var TicketApprovalStatusManagement = $("<td>");

        if (value.TicketApprovalStatusManagement == 1) {
            $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(TicketApprovalStatusManagement);
        }
        else if (value.TicketApprovalStatusManagement == 2) {
            $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(TicketApprovalStatusManagement);
        }
        else if (value.TicketApprovalStatusManagement == 3) {
            $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(TicketApprovalStatusManagement);
        }


        var ApprovedByManDet;

        if (value.ApprovedByManDet && value.ApprovedByManDet.length > 0 && value.ApprovedByManDet[0].AppUserName != null) {
            ApprovedByManDet = $("<td>").append(value.ApprovedByManDet[0].AppUserName);
        }
        else if (value.ApprovedByManDet && value.ApprovedByManDet.length > 0 && value.ApprovedByManDet[0].RejUserName != null) {
            ApprovedByManDet = $("<td>").append(value.RejectedByDet[0].RejUserName);
        }
        else {
            ApprovedByManDet = $("<td>").append("-");
        }

        var CommentsManagement = $("<td>");

        if (value.CommentsManagement != null) {
            $("<div>").attr("class", "badge bg-danger").append(value.CommentsManagement).appendTo(CommentsManagement);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(CommentsManagement);
        }


        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);

        var previewicon = $("<img>").attr({
            "src": "/_Assets/Icons/view_updated2.png",
            "alt": "Preview Icon",
            "title": "Preview",
            "style": "cursor: pointer; border: 2px solid white; width: 46px; height: 46px;"
        });

        icondiv.append(previewicon);

        var approvedicon = $("<img>").attr({
            "src": "/_Assets/Icons/approve_updated.png",
            "alt": "Approve Icon",
            "title": "Approve",
            "style": "cursor: pointer; border: 2px solid white; width: 43px; height: 43px;"
        });

        icondiv.append(approvedicon);

        var rejectedicon = $("<img>").attr({
            "src": "/_Assets/Icons/reject.png",
            "alt": "Reject Icon",
            "title": "Reject",
            "style": "cursor: pointer; border: 2px solid white; width: 43px; height: 43px;"
        });

        icondiv.append(rejectedicon);

        $("<tr>").attr("class", "text-center").append(slnocell, EmployeeId, FullName, ContactNo,
            CompanyName, DepartmentName, DesignationName, costReq, advReq,
            Remarks, TicketApprovalStatusSupervisor, ApprovedBySupDet, CommentsSupervisor, TicketApprovalStatusManagement, ApprovedByManDet, CommentsManagement,
            iconcell).appendTo("#ls_EmpInfo_table_tbody");

        (function ($) {

            previewicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_edit_trf_modal").modal("show");

                $("#ls_edit_trf_trfno").val(value.TRFNoText);
                $("#totalCostRequired_edit").val(value.TotalCostRequired);
                $("#travelAdvanceApproved_edit").val(value.TotalAdvanceRequired);
                $("#ls_edit_ticketreq_currtype").val(value.CurrencyType);
                $("#ls_NeedleReq_edit_remarks").val(value.Remarks);


                $("#ord_order_table_tbody tr.added-item").empty();
                $.each(value.orderdetails, async function (index, _value) {
                    create_order_item_row_for_edit(_value);
                });

                $("#ls_team_table_edit_tbody tr.added-item").empty();
                $.each(value.Requistionorderdetails, async function (index, _value2) {
                    create_order_item_row_for_edit_Det(_value2);
                });

            });

            approvedicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_approve_requisition_modal").modal("show");
                $("#ls_approve_hotelresv_id_hidden").data("Id", value.Id);

            });
            rejectedicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_reject_requisition_modal").modal("show");
                $("#ls_reject_hotelresv_id_hidden").data("Id", value.Id);
            });
        })(jQuery);
    });
}


function create_order_item_row_for_edit_Det(rowdata) {

    //VisaRequisitionNo
    let VisaRequisitionNoInput = create_input_element("VisaRequisitionNo", "VisaRequisitionNo_det", "VisaRequisitionNo_id");
    VisaRequisitionNoInput.readOnly = true;
    let VisaRequisitionNoCell = $("<td>").append(VisaRequisitionNoInput);

    //TicketRequisitionNo
    let TicketRequisitionNoInput = create_input_element("TicketRequisitionNo", "TicketRequisitionNo_det", "TicketRequisitionNo_id");
    TicketRequisitionNoInput.readOnly = true;
    let TicketRequisitionNoCell = $("<td>").append(TicketRequisitionNoInput);

    //HotelReservationNo
    let HotelReservationNoInput = create_input_element("HotelReservationNo", "HotelReservationNo_det", "HotelReservationNo_id");
    HotelReservationNoInput.readOnly = true;
    let HotelReservationNoCell = $("<td>").append(HotelReservationNoInput);

    //let closeBtn = $("<button>").attr({ "type": "button", "class": "btn btn-danger", style: "font-family: auto;" }).append('<i class="bi bi-x-square"></i>');
    //let closeBtnCell = $("<td>").append(closeBtn);

    var row = $("<tr>").attr("class", "text-center added-item").append(VisaRequisitionNoCell, TicketRequisitionNoCell, HotelReservationNoCell);

    $('#ls_team_table_edit_tbody tr.add-item').before(row);


    (function ($) {

        load_data_select_items_for_edit_det(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata);

        closeBtn.on("click", function (e) {
            e.preventDefault();
            if ($('#ord_order_table_tbody tr.added-item').length <= 1) {
                iziToast.warning({
                    title: 'Warning!',
                    message: "You cannot delete this row.Please keep at least one row.",
                    position: 'bottomRight'
                });
                return;
            }
            row.remove();
        });
    })(jQuery);
}

function load_data_select_items_for_edit_det(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata) {

    VisaRequisitionNoInput.value = rowdata.VisaRequisitionNo;

    TicketRequisitionNoInput.value = rowdata.TicketRequisitionNo;

    HotelReservationNoInput.value = rowdata.HotelReservationNo;
}


async function create_order_item_row_for_edit(rowdata) {

   // console.log("rowdata", rowdata);

    //Expenses
    let ExpensesInput = create_input_element("Expenses", "Expenses_det", "Expenses_id");
    ExpensesInput.disabled = true;
    let ExpensesCell = $("<td>").append(ExpensesInput);


    let DaysInput = create_input_element("Days", "Days_det", "Days_id");
    DaysInput.type = "number";
    DaysInput.required = true;
    DaysInput.min = "1";
    DaysInput.step = "1";
    DaysInput.onkeypress = function () {
        return event.charCode >= 48 && event.charCode <= 57;
    }
    let DaysCell = $("<td>").append(DaysInput);


    let CostPerDayInput = create_input_element("CostPerDay", "CostPerDay_det", "CostPerDay_id");
    CostPerDayInput.type = "number";
    CostPerDayInput.required = true;
    CostPerDayInput.min = "1";
    CostPerDayInput.step = "1";
    CostPerDayInput.onkeypress = function () {
        return event.charCode >= 48 && event.charCode <= 57;
    }
    let CostPerDayCell = $("<td>").append(CostPerDayInput);


    let TotalInput = create_input_element("Total", "Total_det", "Total_id");
    CostPerDayInput.type = "number";
    CostPerDayInput.required = true;
    CostPerDayInput.min = "1";
    CostPerDayInput.step = "1";
    CostPerDayInput.onkeypress = function () {
        return event.charCode >= 48 && event.charCode <= 57;
    }
    let TotalCell = $("<td>").append(TotalInput);


    var row = $("<tr>").attr("class", "text-center added-item").append(ExpensesCell, DaysCell, CostPerDayCell, TotalCell);

    $('#ord_order_table_tbody tr.add-item').before(row);
    (function ($) {

        load_data_select_items_for_edit(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, rowdata);


    })(jQuery);
}

function load_data_select_items_for_edit(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, rowdata) {

    ExpensesInput.value = rowdata.Expenses;

    DaysInput.value = rowdata.Days;

    CostPerDayInput.value = rowdata.CostPerDay;

    TotalInput.value = rowdata.Total;
}



$("#ls_approve_requisition_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_approve_hotelresv_id_hidden").data("Id")
    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/TRFApproval/ApproveTRFApproval",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(json),

        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
                setTimeout(function () {
                    location.reload();
                }, 2000);

            } else {

                iziToast.success({
                    title: 'Approved Successfully!',
                    message: resp.message,
                    position: 'bottomRight'
                });
                setTimeout(function () {
                    location.reload();
                }, 1500);
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
    });
});



$("#ls_reject_requisition_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_reject_hotelresv_id_hidden").data("Id"),
        CommentsSupervisor: $("#reject_comments").val(),
        CommentsManagement: $("#reject_comments").val()

    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/TRFApproval/RejectTRFApproval",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(json),

        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
                setTimeout(function () {
                    location.reload();
                }, 2000);

            } else {

                iziToast.success({
                    title: 'Approved Successfully!',
                    message: resp.message,
                    position: 'bottomRight'
                });
                setTimeout(function () {
                    location.reload();
                }, 1000);
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
    });
});