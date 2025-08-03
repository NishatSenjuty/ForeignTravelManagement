

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


function load_Expenses_for_Modal(callback) {
    $.ajax({
        type: "POST",
        url: "/Expenses/ShowExpensesForModal",
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
                //console.log("resp", resp);
                callback(resp);
            }
        },
    });
}


$("#ls_add_trf_btn").on("click", function () {
    $("#ls_add_trf_modal").modal("show");
    $("#ls_add_trf_modal_form").trigger("reset");
    $("#ls_add_trf_modal_form").removeClass('was-validated');

    load_Expenses_for_Modal(function (resp) {     

        $.each(resp, async function (index, _value) {

            $("#ord_order_table_tbody tr.added-item").remove();   

            if (resp && resp.data.length > 0) {
                resp.data.forEach(function (expense) {
                    create_order_item_row_for_add(expense);
                });
            }

            else {
                console.log("No expenses found.");
            }
        });
    });
});



async function create_order_item_row_for_add(rowdata) {

    //Expenses
    let ExpensesInput = create_input_element("Expenses", "Expenses_det", "Expenses_id");
    ExpensesInput.readOnly = true;
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

    $('#ord_order_table_tbody').prepend(row);

    (function ($) {

        load_data_select_items_for_add(ExpensesInput, DaysInput, CostPerDayInput, TotalCell, rowdata);

        if (ExpensesInput.value == 'Flight') {
            DaysInput.readOnly = true;
            DaysInput.value = 1;
            DaysInput.style.visibility = 'hidden';
            TotalCell.readOnly = false;
        }

        if (ExpensesInput.value == 'Food & Allowance') {
            CostPerDayInput.value = 100;
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

           // alert("calc");

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

            $("#totalCostRequired").val(totalCost.toFixed(2));
        }

    })(jQuery);
}


function load_data_select_items_for_add(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, rowdata) {

    //console.log("1", rowdata);

    ExpensesInput.value = rowdata.ExpensesCategory;
}


//Filter

$("#gatepass_filter_form").on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

$("#ls_filter_btn").on("click", function (e) {
    e.preventDefault();
    load_BudgetApproval_table(1);
});

load_BudgetApproval_table(1);

function load_BudgetApproval_table(page) {


    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TRFNoText: $("#filter_trf_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        page: page
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/BudgetApproval/ShowBudgetApproval",
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
                show_BudgetApproval_list(resp);

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



function show_BudgetApproval_list(resp) {
    $("#ls_trf_table_tbody").empty();



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
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var TotalCostReq = $("<td>").append(value.TotalCostRequired);
        var TotalAdvReq = $("<td>").append(value.TotalAdvanceRequired);
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

        $("#ls_edit_trf_modal").find(".modal-footer").show();

        //try {
        //    if (userRoleId != '3') {
        //        if (value.TicketApprovalStatusSupervisor == 1) {
        //            $("#ls_edit_trf_modal").find(".modal-footer").hide();

        //        }
        //    }
        //}
        //catch {

        //}

        $("<tr>").attr("class", "text-center").append(slnocell, TRFNoText, EmployeeId, FullName, ContactNo,
            CompanyName, DepartmentName, DesignationName, TotalCostReq, TotalAdvReq, Remarks, TicketApprovalStatusSupervisor, ApprovedBySupDet, CommentsSupervisor,
            TicketApprovalStatusManagement, ApprovedByManDet, CommentsManagement,
            iconcell).appendTo("#ls_trf_table_tbody");

        (function ($) {
            editicon.on("click", function (e) {
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
            deleteicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_delete_trf_modal").modal("show");
                $("#ls_delete_trf_id_hidden").data("Id", value.Id);
            });
        })(jQuery);
    });
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

    var row = $("<tr>").attr("class", "text-center added-item").append(ExpensesCell, DaysCell, CostPerDayCell, TotalCell );

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

//delete

$("#ls_delete_trf_modal").on("submit", function (e) {

    json = {
        Id: $("#ls_delete_trf_id_hidden").data("Id")
    };

    $.ajax({
        type: "POST",
        url: "/BudgetApproval/DeleteBudgetApproval",
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



//Requisition Details Part

let currentInput = null;
let currentInputTicket = null;
let currentInputHotel = null;

$("#add_item_btn").on("click", function (e) {

    create_order_item_row_for_add_Det();
});


function create_order_item_row_for_add_Det() {

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

    $('#ls_team_table_tbody tr.add-item').before(row);


    (function ($) {

        VisaRequisitionNoInput.ondblclick = function (e) {
            e.preventDefault();

            currentInput = VisaRequisitionNoInput;

            $("#ls_add_MachineList_modal").modal("show");
            $("#ls_add_MachineList_modal_form").trigger("reset");
            $("#ls_add_MachineList_modal_form").removeClass('was-validated');

        };


        TicketRequisitionNoInput.ondblclick = function (e) {
            e.preventDefault();

            currentInputTicket = TicketRequisitionNoInput;

            $("#ls_add_ticket_popup_modal").modal("show");
            $("#ls_add_ticket_popup_modal_form").trigger("reset");
            $("#ls_add_ticket_popup_modal_form").removeClass('was-validated');

        };

        HotelReservationNoInput.ondblclick = function (e) {
            e.preventDefault();

            currentInputHotel = HotelReservationNoInput;

            $("#ls_add_hotel_popup_modal").modal("show");
            $("#ls_add_hotel_popup_modal_form").trigger("reset");
            $("#ls_add_hotel_popup_modal_form").removeClass('was-validated');

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





//Pop-Up-Visa


$("#ls_filter_btn1").on("click", function (e) {

    load_VisaRequisition_table_popUp(1);
});

function load_VisaRequisition_table_popUp(page) {

    json = {

        VisaRequisitionNoText: $("#ls_filter_VisaReq_pop").val()
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
         //console.log("testtttttt", resp.data);

        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        var VisaRequisitionNo = $("<td>").append(value.VisaRequisitionNoText);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var Country = $("<td>").append(value.CountryNameUser);

        var TravelReason = null;
        var VisaType = null;

        let PurposeOfTravelUser1 = value.PurposeOfTravelUser;

        if (PurposeOfTravelUser1 == 1) {
            PurposeOfTravelUser1 = 'Business';
            TravelReason = $("<td>").append(PurposeOfTravelUser1);
        }
        else if (PurposeOfTravelUser1 == 2) {
            PurposeOfTravelUser1 = 'Conference';
            TravelReason = $("<td>").append(PurposeOfTravelUser1);
        }
        else if (PurposeOfTravelUser1 == 3) {
            PurposeOfTravelUser1 = 'Training';
            TravelReason = $("<td>").append(PurposeOfTravelUser1);
        }
        else if (PurposeOfTravelUser1 == 4) {
            TravelReason = $("<td>").append(value.PurposeOfTravelOtherUser);
        }



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
        var VisaType = $("<td>").append(TypeOfVisaUser1);



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


        $("<tr>").attr("class", "text-center").append(iconcell, slnocell, VisaRequisitionNo, EmployeeId,
            FullName, ContactNo, CompanyName, DepartmentName, DesignationName, Country, VisaType, TravelReason).appendTo("#ls_MachineList_table_tbody");

        selecticon.on("click", function (e) {

            e.preventDefault();
            if (currentInput) {
                $(currentInput).val(value.VisaRequisitionNoText);
                $("#ls_add_MachineList_modal").modal("hide");
                currentInput = null;
            }
        });
    });
}


//Pop-Up - Ticket


$("#ls_filter_btn2").on("click", function (e) {

    load_TicketRequisition_table_popUp(1);
});

function load_TicketRequisition_table_popUp(page) {

    json = {

        TicketRequisitionNoText: $("#ls_filter_TicketReq_pop").val()
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/TicketRequision/ShowTicketRequisionPopUp",
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
                show_TicketRequisition_list_Pop(resp);

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


function show_TicketRequisition_list_Pop(resp) {

    $("#ls_ticket_popup_table_tbody").empty();

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
        //console.log("testtttttt", resp.data);

        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        var TicketRequisitionNo = $("<td>").append(value.TicketRequisitionNoText);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var DestinationUser = $("<td>").append(value.DestinationUser);
        var DepartureDateUser = $("<td>").append(value.DepartureDateUser ? convertJsonDate(value.DepartureDateUser) : " ");
        var ReturnDateUser = $("<td>").append(value.ReturnDateUser ? convertJsonDate(value.ReturnDateUser) : " ");


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


        $("<tr>").attr("class", "text-center").append(iconcell, slnocell, TicketRequisitionNo, EmployeeId,
            FullName, ContactNo, CompanyName, DepartmentName, DesignationName, DestinationUser, DepartureDateUser, ReturnDateUser).appendTo("#ls_ticket_popup_table_tbody");

        selecticon.on("click", function (e) {

            e.preventDefault();
            if (currentInputTicket) {
                $(currentInputTicket).val(value.TicketRequisitionNoText);
                $("#ls_add_ticket_popup_modal").modal("hide");
                currentInputTicket = null;
            }
        });
    });
}



//Pop-Up - Hotel


$("#ls_filter_btn3").on("click", function (e) {

    load_HotelReservation_table_popUp(1);
});

function load_HotelReservation_table_popUp(page) {

    json = {

        HotelReservationNoText: $("#ls_filter_hotelReq_pop").val()
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/HotelReservation/ShowHotelReservationPopUp",
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
                show_HotelReservation_list_Pop(resp);

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


function show_HotelReservation_list_Pop(resp) {

    $("#ls_hotel_popup_table_tbody").empty();

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
        //console.log("testtttttt", resp.data);

        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        var HotelReservationNo = $("<td>").append(value.HotelReservationNoText);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
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
        var EventDateUser = $("<td>").append(value.EventDateUser ? convertJsonDate(value.EventDateUser) : " ");  


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


        $("<tr>").attr("class", "text-center").append(iconcell, slnocell, HotelReservationNo, EmployeeId,
            FullName, ContactNo, CompanyName, DepartmentName, DesignationName, CountryNameUser,
            CityName, CheckInDateUser, CheckOutDateUser, EventDateUser).appendTo("#ls_hotel_popup_table_tbody");

        selecticon.on("click", function (e) {

            e.preventDefault();
            if (currentInputHotel) {
                $(currentInputHotel).val(value.HotelReservationNoText);
                $("#ls_add_hotel_popup_modal").modal("hide");
                currentInputHotel = null;
            }
        });
    });
}


//Save

$("#ls_add_trf_modal_form").on("submit", function (e) {
    e.preventDefault();


    json = {
        TotalCostRequired: $("#totalCostRequired").val(),
        TotalAdvanceRequired: $("#travelAdvanceApproved").val(),
        Remarks: $("#ls_NeedleReq_add_remarks").val(),
        CurrencyType: $("#ls_add_ticketreq_currtype").val(),
        BudgetFormTRFDetails: getOrderQuantitiesArr(),
        BudgetFormAllRequisitionDetails: getRequisitionQuantitiesArr()
    };

    //console.log("json", json);

    $.ajax({
        url: '/BudgetApproval/AddBudgetApproval',
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
                iziToast.success({
                    title: 'Saved Successfully!',
                    message: resp.message,
                    position: 'bottomRight',
                });

                setTimeout(function () {
                    location.reload();
                }, 3300);
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


function getOrderQuantitiesArr() {

    let OrderQuantitiesArr = [];

    $('#ord_order_table_tbody tr.added-item').each(function () {


        let Expenses = $(this).find(".Expenses_id").val() || 0;
        let Days = $(this).find(".Days_id").val() || 0;
        let CostPerDay = $(this).find(".CostPerDay_id").val() || 0;
        let Total = $($(this).find('td')[3]).text() || 0;

        let obj = {

            Expenses: Expenses,
            Days: Days,
            CostPerDay: CostPerDay,
            Total: Total
        }
        OrderQuantitiesArr.push(obj);
    });

    //console.log("ordersdet", OrderQuantitiesArr);

    return OrderQuantitiesArr;
}

function getRequisitionQuantitiesArr() {

    let RequisitionQuantitiesArr = [];

    $('#ls_team_table_tbody tr.added-item').each(function () {


        let VisaRequisitionNo = $(this).find(".VisaRequisitionNo_id").val();
        let TicketRequisitionNo = $(this).find(".TicketRequisitionNo_id").val();
        let HotelReservationNo = $(this).find(".HotelReservationNo_id").val();

        let obj = {

            VisaRequisitionNo: VisaRequisitionNo,
            TicketRequisitionNo: TicketRequisitionNo,
            HotelReservationNo: HotelReservationNo
        }
        RequisitionQuantitiesArr.push(obj);
    });

    //console.log("ordersdet", RequisitionQuantitiesArr);

    return RequisitionQuantitiesArr;
}





//Requisition Details Part

//Adding row for plus button
$("#add_item_btn_edit").on("click", function (e) {
    create_order_item_row_for_add_Det_for_edit();
});

function create_order_item_row_for_add_Det_for_edit() {

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

        VisaRequisitionNoInput.ondblclick = function (e) {
            e.preventDefault();

            currentInput = VisaRequisitionNoInput;

            $("#ls_add_MachineList_modal").modal("show");
            $("#ls_add_MachineList_modal_form").trigger("reset");
            $("#ls_add_MachineList_modal_form").removeClass('was-validated');

        };


        TicketRequisitionNoInput.ondblclick = function (e) {
            e.preventDefault();

            currentInputTicket = TicketRequisitionNoInput;

            $("#ls_add_ticket_popup_modal").modal("show");
            $("#ls_add_ticket_popup_modal_form").trigger("reset");
            $("#ls_add_ticket_popup_modal_form").removeClass('was-validated');

        };

        HotelReservationNoInput.ondblclick = function (e) {
            e.preventDefault();

            currentInputHotel = HotelReservationNoInput;

            $("#ls_add_hotel_popup_modal").modal("show");
            $("#ls_add_hotel_popup_modal_form").trigger("reset");
            $("#ls_add_hotel_popup_modal_form").removeClass('was-validated');

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



//Pop-Up-Visa


$("#ls_filter_btn1_edit").on("click", function (e) {

    load_VisaRequisition_table_popUp_edit(1);
});

function load_VisaRequisition_table_popUp_edit(page) {

    json = {

        VisaRequisitionNoText: $("#ls_filter_VisaReq_pop_edit").val()
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
        //console.log("testtttttt", resp.data);

        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        var VisaRequisitionNo = $("<td>").append(value.VisaRequisitionNoText);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var Country = $("<td>").append(value.CountryNameUser);

        var TravelReason = null;
        var VisaType = null;

        let PurposeOfTravelUser1 = value.PurposeOfTravelUser;

        if (PurposeOfTravelUser1 == 1) {
            PurposeOfTravelUser1 = 'Business';
            TravelReason = $("<td>").append(PurposeOfTravelUser1);
        }
        else if (PurposeOfTravelUser1 == 2) {
            PurposeOfTravelUser1 = 'Conference';
            TravelReason = $("<td>").append(PurposeOfTravelUser1);
        }
        else if (PurposeOfTravelUser1 == 3) {
            PurposeOfTravelUser1 = 'Training';
            TravelReason = $("<td>").append(PurposeOfTravelUser1);
        }
        else if (PurposeOfTravelUser1 == 4) {
            TravelReason = $("<td>").append(value.PurposeOfTravelOtherUser);
        }



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
        var VisaType = $("<td>").append(TypeOfVisaUser1);



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


        $("<tr>").attr("class", "text-center").append(iconcell, slnocell, VisaRequisitionNo, EmployeeId,
            FullName, ContactNo, CompanyName, DepartmentName, DesignationName, Country, VisaType, TravelReason).appendTo("#ls_MachineList_table_tbody_edit");

        selecticon.on("click", function (e) {

            e.preventDefault();
            if (currentInputEdit) {
                $(currentInputEdit).val(value.VisaRequisitionNoText);
                $("#ls_edit_MachineList_modal").modal("hide");
                currentInputEdit = null;
            }
        });
    });
}


//Pop-Up - Ticket


$("#ls_filter_btn2_edit").on("click", function (e) {

    load_TicketRequisition_table_popUp_edit(1);
});

function load_TicketRequisition_table_popUp_edit(page) {

    json = {

        TicketRequisitionNoText: $("#ls_filter_TicketReq_pop_edit").val()
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/TicketRequision/ShowTicketRequisionPopUp",
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
                show_TicketRequisition_list_Pop_edit(resp);

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


function show_TicketRequisition_list_Pop_edit(resp) {

    $("#ls_ticket_popup_table_tbody_edit").empty();

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
        //console.log("testtttttt", resp.data);

        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        var TicketRequisitionNo = $("<td>").append(value.TicketRequisitionNoText);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var DestinationUser = $("<td>").append(value.DestinationUser);
        var DepartureDateUser = $("<td>").append(value.DepartureDateUser ? convertJsonDate(value.DepartureDateUser) : " ");
        var ReturnDateUser = $("<td>").append(value.ReturnDateUser ? convertJsonDate(value.ReturnDateUser) : " ");


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


        $("<tr>").attr("class", "text-center").append(iconcell, slnocell, TicketRequisitionNo, EmployeeId,
            FullName, ContactNo, CompanyName, DepartmentName, DesignationName, DestinationUser, DepartureDateUser, ReturnDateUser).appendTo("#ls_ticket_popup_table_tbody_edit");

        selecticon.on("click", function (e) {

            e.preventDefault();
            if (currentInputTicketEdit) {
                $(currentInputTicketEdit).val(value.TicketRequisitionNoText);
                $("#ls_edit_ticket_popup_modal").modal("hide");
                currentInputTicketEdit = null;
            }
        });
    });
}



//Pop-Up - Hotel


$("#ls_filter_btn3_edit").on("click", function (e) {

    load_HotelReservation_table_popUp_edit(1);
});

function load_HotelReservation_table_popUp_edit(page) {

    json = {

        HotelReservationNoText: $("#ls_filter_hotelReq_pop_edit").val()
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/HotelReservation/ShowHotelReservationPopUp",
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
                show_HotelReservation_list_Pop_edit(resp);

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


function show_HotelReservation_list_Pop_edit(resp) {

    $("#ls_hotel_popup_table_tbody_edit").empty();

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
        //console.log("testtttttt", resp.data);

        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        var HotelReservationNo = $("<td>").append(value.HotelReservationNoText);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
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
        var EventDateUser = $("<td>").append(value.EventDateUser ? convertJsonDate(value.EventDateUser) : " ");


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


        $("<tr>").attr("class", "text-center").append(iconcell, slnocell, HotelReservationNo, EmployeeId,
            FullName, ContactNo, CompanyName, DepartmentName, DesignationName, CountryNameUser,
            CityName, CheckInDateUser, CheckOutDateUser, EventDateUser).appendTo("#ls_hotel_popup_table_tbody_edit");

        selecticon.on("click", function (e) {

            e.preventDefault();
            if (currentInputHotelEdit) {
                $(currentInputHotelEdit).val(value.HotelReservationNoText);
                $("#ls_edit_hotel_popup_modal").modal("hide");
                currentInputHotelEdit = null;
            }
        });
    });
}



$("#ls_edit_trf_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {

        TRFNo: $("#totalCostRequired_edit").data("TRFNo"),
        TRFNoText: $("#ls_edit_trf_trfno").val(),
        Id: $("#ls_NeedleReq_edit_remarks").data("Id"),
        TotalCostRequired: $("#totalCostRequired_edit").val(),
        TotalAdvanceRequired: $("#travelAdvanceApproved_edit").val(),
        Remarks: $("#ls_NeedleReq_edit_remarks").val(),
        CurrencyType: $("#ls_edit_ticketreq_currtype").val(),
        BudgetFormTRFDetails: getOrderQuantitiesArr(),
        BudgetFormAllRequisitionDetails: getRequisitionQuantitiesArrEdit()

    };

    //console.log("json", json);

    $.ajax({
        url: '/BudgetApproval/EditBudgetApproval',
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
                iziToast.success({
                    title: 'Saved Successfully!',
                    message: resp.message,
                    position: 'bottomRight',
                });

                setTimeout(function () {
                    location.reload(); // Reload the page after a 3.3 seconds delay
                }, 3300);
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

function getRequisitionQuantitiesArrEdit() {

    let RequisitionQuantitiesArr = [];

    $('#ls_team_table_edit_tbody tr.added-item').each(function () {


        let VisaRequisitionNo = $(this).find(".VisaRequisitionNo_id").val();
        let TicketRequisitionNo = $(this).find(".TicketRequisitionNo_id").val();
        let HotelReservationNo = $(this).find(".HotelReservationNo_id").val();

        let obj = {

            VisaRequisitionNo: VisaRequisitionNo,
            TicketRequisitionNo: TicketRequisitionNo,
            HotelReservationNo: HotelReservationNo
        }
        RequisitionQuantitiesArr.push(obj);
    });

    //console.log("ordersdet", RequisitionQuantitiesArr);

    return RequisitionQuantitiesArr;
}


function getOrderQuantitiesArr() {
    let OrderQuantitiesArr = [];

    $('#ord_order_table_tbody tr.added-item').each(function () {

        let Expenses = $(this).find(".Expenses_id").val().trim();
        let Days = $(this).find(".Days_id").val().trim();
        let CostPerDay = $(this).find(".CostPerDay_id").val().trim();
        let Total = $($(this).find('td')[3]).text().trim();

        if (Expenses !== "" && Days !== "" && CostPerDay !== "" && Total !== "") {
            let obj = {
                Expenses: Expenses,
                Days: Days,
                CostPerDay: CostPerDay,
                Total: Total
            }
            OrderQuantitiesArr.push(obj);
        }
    });

    //console.log("ordersdet", OrderQuantitiesArr);
    return OrderQuantitiesArr;
}