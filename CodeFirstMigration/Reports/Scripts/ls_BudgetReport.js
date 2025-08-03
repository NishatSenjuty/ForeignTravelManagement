

function convertJsonDate(date) {

    var fullDate = new Date(parseInt(date.substr(6)));
    var twoDigitMonth = (fullDate.getMonth() + 1) + ""; if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;

    var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
    return twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

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



////////////////////////////////////////////////////////////////


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


function create_input_element(placeholderText, inputName, inputClassId) {

    let input = document.createElement("input");
    input.name = inputName;
    input.className = "qtybri form-control form-control-sm " + inputClassId;

    input.placeholder = placeholderText;
    input.id = inputClassId;
    input.type = "text";
    return input;
}

$("#budgetReport_filter_form").on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        e.preventDefault();
        return false;
    }
})


$("#ls_filter_btn").on("click", function (e) {
    e.preventDefault();
    load_budgetReportuisitionReport_table(1);
});

load_budgetReportuisitionReport_table(1);


function load_budgetReportuisitionReport_table(page) {


    json = {

        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TRFNoText: $("#filter_budgetReport_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/BudgetReport/ShowbudgetReportuisitionReports",
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
                show_budgetReportuisition_list(resp);

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


function show_budgetReportuisition_list(resp) {

    console.log("resp", resp);

    $("#ls_budgetReport_table_tbody").empty();

    if (resp.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    $.each(resp, function (index, value) {

        var slnocell = $("<td>").append(index + 1);
        var TRFNoText = $("<td>").append(value.TRFNoText);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);


        var TotalCostRequired = $("<td>").append(value.TotalCostRequired);
        var TotalAdvanceRequired = $("<td>").append(value.TotalAdvanceRequired);
        var Remarks = $("<td>").append(value.Remarks);

        var TRFActiveStatus = $("<td>");

        if (value.TRFActiveStatus == 1) {
            $("<div>").attr("class", "badge bg-success").append("Active").appendTo(TRFActiveStatus);
        }
        else if (value.TRFActiveStatus == 0) {
            $("<div>").attr("class", "badge bg-danger").append("Inactive").appendTo(TRFActiveStatus);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(TRFActiveStatus);
        }


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

        $("<tr>").attr("class", "text-center").append(slnocell, TRFNoText, EmployeeId, FullName, ContactNo, CompanyName, 
            DepartmentName, DesignationName, TotalCostRequired, TotalAdvanceRequired, Remarks, TRFActiveStatus,
            TicketApprovalStatusSupervisor, ApprovedBySupDet, CommentsSupervisor,
            TicketApprovalStatusManagement, ApprovedByManDet, CommentsManagement,
            iconcell).appendTo("#ls_budgetReport_table_tbody");

        (function ($) {
            previewicon.on("click", function (e) {
                e.preventDefault();
                //console.log(value);

                $("#ls_edit_trf_modal").modal("show");

                $("#ls_edit_trf_trfno").val(value.TRFNoText);

                $("#ls_edit_trf_trfno").data("VisaReqId", value.VisaReqId);
                $("#ls_NeedleReq_edit_remarks").data("Id", value.Id);

                $("#totalCostRequired_edit").data("TRFNo", value.TRFNo);

                $("#ls_edit_trf_ticketReqno").data("HotelResId", value.HotelResId);
                $("#ls_edit_trf_hotelResno").data("TicketReqId", value.TicketReqId);
                $("#ls_edit_trf_visaReqno").val(value.VisaRequisitionNo);
                $("#ls_edit_trf_ticketReqno").val(value.TicketRequisitionNo);
                $("#ls_edit_trf_hotelResno").val(value.HotelReservationNo);
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

                $("#ls_edit_trf_modal").modal("hide");
            });
        })(jQuery);
    });
}


let currentInputEdit = null;
let currentInputTicketEdit = null;
let currentInputHotelEdit = null;

//Edit

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

    let closeBtn = $("<button>").attr({ "type": "button", "class": "btn btn-danger", style: "font-family: auto;" }).append('<i class="bi bi-x-square"></i>');
    let closeBtnCell = $("<td>").append(closeBtn);

    var row = $("<tr>").attr("class", "text-center added-item").append(VisaRequisitionNoCell, TicketRequisitionNoCell, HotelReservationNoCell, closeBtnCell);

    $('#ls_team_table_edit_tbody tr.add-item').before(row);


    (function ($) {

        load_data_select_items_for_edit_det(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata);


        VisaRequisitionNoInput.ondblclick = function (e) {
            e.preventDefault();

            currentInputEdit = VisaRequisitionNoInput;

            $("#ls_edit_MachineList_modal").modal("show");
            $("#ls_edit_MachineList_modal_form").trigger("reset");
            $("#ls_edit_MachineList_modal_form").removeClass('was-validated');

        };


        TicketRequisitionNoInput.ondblclick = function (e) {
            e.preventDefault();

            currentInputTicketEdit = TicketRequisitionNoInput;

            $("#ls_edit_ticket_popup_modal").modal("show");
            $("#ls_edit_ticket_popup_modal_form").trigger("reset");
            $("#ls_edit_ticket_popup_modal_form").removeClass('was-validated');

        };

        HotelReservationNoInput.ondblclick = function (e) {
            e.preventDefault();

            currentInputHotelEdit = HotelReservationNoInput;

            $("#ls_edit_hotel_popup_modal").modal("show");
            $("#ls_edit_hotel_popup_modal_form").trigger("reset");
            $("#ls_edit_hotel_popup_modal_form").removeClass('was-validated');

        };

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
    CostPerDayInput.step = ".1";
    //CostPerDayInput.onkeypress = function () {
    //    return event.charCode >= 48 && event.charCode <= 57;
    //}
    let CostPerDayCell = $("<td>").append(CostPerDayInput);


    let TotalCell = $("<td>").attr("class", "readonly").append();

    var row = $("<tr>").attr("class", "text-center added-item").append(ExpensesCell, DaysCell, CostPerDayCell, TotalCell);

    $('#ord_order_table_tbody tr.add-item').before(row);
    (function ($) {


        load_data_select_items_for_edit(ExpensesInput, DaysInput, CostPerDayInput, TotalCell, rowdata);

        if (ExpensesInput.value == 'Flight') {
            DaysInput.readOnly = true;
            DaysInput.style.visibility = 'hidden';
        }

        //balance

        calculateBalance();

        const FindTotalBalance = function (e) {
            calculateBalance();
            calculateTotalCostRequired();
        }
        DaysInput.addEventListener('input', FindTotalBalance);
        CostPerDayInput.addEventListener('input', FindTotalBalance);

        function calculateBalance() {

            let value1 = parseFloat(DaysInput.value) || 0;
            let value2 = parseFloat(CostPerDayInput.value) || 0;


            let TotBal = value1 * value2;

            TotalCell.text(TotBal.toFixed(2));
        }

        function calculateTotalCostRequired() {
            let totalCost = 0;
            $('#ord_order_table_tbody tr.added-item').each(function () {
                let rowTotalCell = $(this).find('td.readonly');
                let rowTotalValue = parseFloat(rowTotalCell.text()) || 0;
                totalCost += rowTotalValue;
            });

            $("#totalCostRequired_edit").val(totalCost.toFixed(2));
        }


    })(jQuery);
}


function load_data_select_items_for_edit(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, rowdata) {

    ExpensesInput.value = rowdata.Expenses;

    DaysInput.value = rowdata.Days;

    CostPerDayInput.value = rowdata.CostPerDay;

    TotalInput.value = rowdata.Total;
}