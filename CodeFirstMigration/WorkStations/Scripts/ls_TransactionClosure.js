

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


$("#gatepass_filter_form").on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

$("#ls_filter_btn").on("click", function (e) {

        e.preventDefault();
        load_FinalSettlement_table_management(1);
});

load_FinalSettlement_table_management(1);


function load_FinalSettlement_table_management(page) {

    json = {
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TRFNo: $("#filter_disburse_no").val(),
        VisaRequisitionNo: $("#filter_visareq_no").val(),
        FSApprovalStatusManagement: $("#filter_gatepass_status").val()
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/FinalSettlementApproval/ShowFinalSettlementManagement",
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
                show_FinalSettlement_list_Management(resp);

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



function show_FinalSettlement_list_Management(resp) {
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
        var TRFNo = $("<td>").append(value.TRFNo);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var DisbursedAmount = $("<td>").append(value.DisbursedAmount);
        var Cost = $("<td>").append(value.Cost);
        var RemainingBalance = $("<td>").append(value.RemainingBalance);
        var ApprovedFSamount = $("<td>").append(value.ApprovedFSamount);
        var Remarks = $("<td>").append(value.RemarksFSapproval);

        var FSApprovalStatusAudit = $("<td>");

        if (value.FSApprovalStatusAudit == 1) {
            $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(FSApprovalStatusAudit);
        }
        else if (value.FSApprovalStatusAudit == 2) {
            $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(FSApprovalStatusAudit);
        }
        else if (value.FSApprovalStatusAudit == 3) {
            $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(FSApprovalStatusAudit);
        }

        var FSApprovalStatusManagement = $("<td>");

        if (value.FSApprovalStatusManagement == 1) {
            $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(FSApprovalStatusManagement);
        }
        else if (value.FSApprovalStatusManagement == 2) {
            $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(FSApprovalStatusManagement);
        }
        else if (value.FSApprovalStatusManagement == 3) {
            $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(FSApprovalStatusManagement);
        }


        var AccountsStatusTC = $("<td>");

        if (value.AccountsStatusTC == 1) {
            $("<div>").attr("class", "badge bg-success").append("Account Closed").appendTo(AccountsStatusTC);
        }
        else if (value.AccountsStatusTC == 2) {
            $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(AccountsStatusTC);
        }

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);

        //var previewicon = $("<i>").attr({
        //    "class": "bi-eye-fill btn icon btn-primary rounded-circle shadow",
        //    "style": "font-size: 15px; cursor: pointer; border: 2px solid white;",
        //    "title": "Preview"
        //}).appendTo(icondiv);

        var previewicon = $("<img>").attr({
            "src": "/_Assets/Icons/view_updated2.png",
            "alt": "Preview Icon",
            "title": "Preview",
            "style": "cursor: pointer; border: 2px solid white; width: 43px; height: 43px;"
        });

        icondiv.append(previewicon);

        //var approvedicon = $("<i>").attr({
        //    "class": "bi bi-check2 text-white bg-info rounded-circle shadow",
        //    "style": "font-size: 15px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Approve"
        //}).appendTo(icondiv);

        var approvedicon = $("<img>").attr({
            "src": "/_Assets/Icons/approve_updated.png",
            "alt": "Approve Icon",
            "title": "Approve",
            "style": "cursor: pointer; border: 2px solid white; width: 42px; height: 42px;"
        });

        icondiv.append(approvedicon);

        //var printicon = $("<i>").attr({
        //    "class": "bi-printer btn icon btn-primary rounded-circle shadow",
        //    "style": "font-size: 15px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Print"
        //}).appendTo(icondiv);

        var printicon = $("<img>").attr({
            "src": "/_Assets/Icons/Printer_2.png",
            "alt": "Print Icon",
            "title": "Print",
            "style": "cursor: pointer; border: 2px solid white; width: 43px; height: 43px;"
        });

        icondiv.append(printicon);


        $("<tr>").attr("class", "text-center").append(slnocell, TRFNo, EmployeeId, FullName, ContactNo,
            CompanyName, DepartmentName, DesignationName, DisbursedAmount, Cost, RemainingBalance, ApprovedFSamount, Remarks, FSApprovalStatusAudit, FSApprovalStatusManagement,
            AccountsStatusTC, iconcell).appendTo("#ls_EmpInfo_table_tbody");

        (function ($) {

            previewicon.on("click", function (e) {
                e.preventDefault();
                //console.log(value);

                $("#ls_add_FSapproval_modal").modal("show");


                $('#applicant_name').text(value.FullName);
                $('#applicant_employee_id').text(value.EmployeeId);
                $('#applicant_company').text(value.CompanyName);
                $('#applicant_department').text(value.DepartmentName);
                $('#applicant_designation').text(value.DesignationName);

                //Estimated Cost
                $("#ord_order_table_tbody tr.added-item").empty();
                $.each(value.orderTRFdetails, async function (index, _value) {
                    create_order_item_row_for_edit(_value);
                });


                //Final Settlement Travel Cost
                $("#ord_order_table_FS_tbody tr.added-item").empty();
                $.each(value.FinalAttachmentDetails, async function (index, _value2) {
                    create_order_item_row_for_FS_edit(_value2);
                });

                $("#ls_team_table_edit_tbody tr.added-item").empty();
                $.each(value.Requistionorderdetails, async function (index, _value2) {
                    create_order_item_row_for_edit_Det(_value2);
                });


                $("#travelBalance").data("Id", value.Id);

                $("#travelBalance").val(value.RemainingBalance);
                $("#travelCost").val(value.Cost);
                $("#totalCostApproved").val(value.DisbursedAmount);

                $("#ls_NeedleReq_add_AmountApp").val(value.ApprovedFSamount);
                $("#ls_NeedleReq_add_remarks").val(value.RemarksFSapproval);

            });
           
            approvedicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_approve_requisition_modal").modal("show");
                $("#ls_approve_hotelresv_id_hidden").data("Id", value.Id);

            });
            printicon.on("click", function (e) {
                e.preventDefault();
                getPrint(value);

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

    var row = $("<tr>").attr("class", "text-center added-item").append(VisaRequisitionNoCell, TicketRequisitionNoCell, HotelReservationNoCell);

    $('#ls_team_table_edit_tbody tr.add-item').before(row);


    (function ($) {

        load_data_select_items_for_edit_det(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata);

    })(jQuery);
}

function load_data_select_items_for_edit_det(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata) {

    VisaRequisitionNoInput.value = rowdata.VisaRequisitionNo;

    TicketRequisitionNoInput.value = rowdata.TicketRequisitionNo;

    HotelReservationNoInput.value = rowdata.HotelReservationNo;
}


//FS
async function create_order_item_row_for_FS_edit(rowdata) {

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
    DaysInput.readOnly = true;
    let DaysCell = $("<td>").append(DaysInput);


    let CostPerDayInput = create_input_element("CostPerDay", "CostPerDay_det", "CostPerDay_id");
    CostPerDayInput.type = "number";
    CostPerDayInput.required = true;
    CostPerDayInput.min = "1";
    CostPerDayInput.step = "1";
    CostPerDayInput.onkeypress = function () {
        return event.charCode >= 48 && event.charCode <= 57;
    }
    CostPerDayInput.readOnly = true;
    let CostPerDayCell = $("<td>").append(CostPerDayInput);

    let TotalInput = create_input_element("Total", "Total_det", "Total_id");
    TotalInput.type = "number";
    TotalInput.required = true;
    TotalInput.min = "1";
    TotalInput.step = "1";
    TotalInput.readOnly = true;
    TotalInput.onkeypress = function () {
        return event.charCode >= 48 && event.charCode <= 57;
    }
    let TotalCell = $("<td>").append(TotalInput);

    var row = $("<tr>").attr("class", "text-center added-item").append(ExpensesCell, DaysCell, CostPerDayCell, TotalCell);

    $('#ord_order_table_FS_tbody tr.add-item').before(row);
    (function ($) {

        load_data_select_items_for_FS_edit(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, rowdata);


    })(jQuery);
}


function load_data_select_items_for_FS_edit(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, rowdata) {

    ExpensesInput.value = rowdata.Expenses;

    DaysInput.value = rowdata.Days;

    CostPerDayInput.value = rowdata.CostPerDay;

    TotalInput.value = rowdata.Total;
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


async function create_order_item_row_for_edit(rowdata) {

    //alert();

    //Expenses
    let ExpensesInput = create_input_element("Expenses", "Expenses_det", "Expenses_id");
    ExpensesInput.disabled = true;
    let ExpensesCell = $("<td>").append(ExpensesInput);

    //Days
    let DaysInput = create_input_element("Days", "Days_det", "Days_id");
    DaysInput.disabled = true;
    let DaysCell = $("<td>").append(DaysInput);


    //CostPerDay
    let CostPerDayInput = create_input_element("CostPerDay", "CostPerDay_det", "CostPerDay_id");
    CostPerDayInput.disabled = true;
    let CostPerDayCell = $("<td>").append(CostPerDayInput);


    //Total
    let TotalInput = create_input_element("Total", "Total_det", "Total_id");
    TotalInput.disabled = true;
    let TotalCell = $("<td>").append(TotalInput);


    //Disburse
    let DisburseInput = create_input_element("Disburse", "Disburse_det", "Disburse_id");
    DisburseInput.type = "number";
    DisburseInput.required = true;
    DisburseInput.min = "1";
    DisburseInput.step = "1";
    DisburseInput.onkeypress = function () {
        return event.charCode >= 48 && event.charCode <= 57;
    }
    DisburseInput.disabled = true;
    let DisburseCell = $("<td>").append(DisburseInput);


    let remarksInput = create_input_element("Remarks", "ord_remarks", "remarks");
    remarksInput.disabled = true;
    let remarksCell = $("<td>").append(remarksInput);


    var row = $("<tr>").attr("class", "text-center added-item").append(ExpensesCell, DaysCell, CostPerDayCell, TotalCell, DisburseCell, remarksCell);

    $('#ord_order_table_tbody tr.add-item').before(row);
    (function ($) {


        load_data_select_items_for_add(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, DisburseInput, remarksInput, rowdata);


    })(jQuery);
}


function load_data_select_items_for_add(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, DisburseInput, remarksInput, rowdata) {

    //console.log("1", rowdata);

    ExpensesInput.value = rowdata.Expenses;

    DaysInput.value = rowdata.Days;

    CostPerDayInput.value = rowdata.CostPerDay;

    TotalInput.value = rowdata.Total;

    DisburseInput.value = rowdata.Disburse;

    remarksInput.value = rowdata.RemarksDisbursed;

}


$("#ls_approve_requisition_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_approve_hotelresv_id_hidden").data("Id")
    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/TransactionClosure/ApproveTransactionClosure",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(json),

        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'error!',
                    message: resp.message,
                    position: 'bottomRight'
                });

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


function getPrint(data) {

    //console.log("abc", data);

    let w = window.open();

    //alert();
    w.document.write('<html><head><title>Report || Transaction Closure</title>');
    w.document.write('<style>');
    w.document.write('body { font-family: Arial, sans-serif; font-size: 10px; }');
    w.document.write('table { border-collapse: collapse; width: 100%; }');
    w.document.write('th, td { padding: 4px; text-align: left; border: 1px solid #ddd; }');
    w.document.write('th { background-color: #f2f2f2; }');
    w.document.write('tr:nth-child(even) { background-color: #f2f2f2; }');
    w.document.write('.center { text-align: center; }');
    w.document.write('.bold { font-weight: bold; }');
    w.document.write('h2, h3, h4 { margin: 2px; }');
    w.document.write('</style>');
    w.document.write('</head><body>');

    // Report Header
    w.document.write('<h2 style="margin-bottom: 5px; font-size:16px; border: 1px solid black; padding: 3px;"><center>Transaction Closure Report</center></h2>');
    w.document.write('<h3 class="center">' + data.CompanyName + '</h3>');
    w.document.write('<h4 class="center">TRF No: ' + data.TRFNo + '</h4>');

    // Applicant Details
    w.document.write('<br/>');
    w.document.write('<table>');
    w.document.write('<caption class="center bold">Applicant Details</caption>');
    w.document.write('<tr><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Employee Name:</td><td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + data.FullName + '</td></tr>');
    w.document.write('<tr><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Employee ID:</td><td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + data.EmployeeId + '</td></tr>');
    w.document.write('<tr><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Company:</td><td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + data.CompanyName + '</td></tr>');
    w.document.write('<tr><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Department:</td><td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + data.DepartmentName + '</td></tr>');
    w.document.write('<tr><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Designation:</td><td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + data.DesignationName + '</td></tr>');
    w.document.write('</table>');

    w.document.write('<br/>');

    // Requisition Details
    w.document.write('<table>');
    w.document.write('<caption class="center bold">Requisition Details</caption>');
    w.document.write('<tr><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Visa Requisition No.</th><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Ticket Requisition No.</th><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Hotel Reservation No.</th></tr>');
    data.Requistionorderdetails.forEach(function (item) {
        w.document.write('<tr><td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + item.VisaRequisitionNo + '</td><td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + item.TicketRequisitionNo + '</td><td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + item.HotelReservationNo + '</td></tr>');
    });
    w.document.write('</table>');

    w.document.write('<br/>');

    // Estimated Travel Cost
    w.document.write('<table>');
    w.document.write('<caption class="center bold">Estimated Travel Cost</caption>');
    w.document.write('<tr><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Expenses</th><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Days</th><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Cost per Day/Cost</th><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Total Cost</th><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Disburse</th><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Remarks</th></tr>');

    let val = data.orderTRFdetails;

    function safeValue(val) {
        return val === null || val === undefined ? '-' : val;
    }

    var expenses = ['Flight', 'Hotel', 'Food', 'Transportation', 'Others'];
    for (var i = 0; i < expenses.length; i++) {
        w.document.write('<tr><td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + expenses[i] + '</td>');

        if (expenses[i] === 'Flight') {
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;"></td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[0].CostPerDay) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[0].Total) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[0].Disburse) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[0].RemarksDisbursed) + '</td>');
        }
        else if (expenses[i] === 'Hotel') {
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[1].Days) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[1].CostPerDay) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[1].Total) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[1].Disburse) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[1].RemarksDisbursed) + '</td>');
        }
        else if (expenses[i] === 'Food') {
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[2].Days) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[2].CostPerDay) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[2].Total) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[2].Disburse) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[2].RemarksDisbursed) + '</td>');
        }
        else if (expenses[i] === 'Transportation') {
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[3].Days) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[3].CostPerDay) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[3].Total) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[3].Disburse) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[3].RemarksDisbursed) + '</td>');
        }
        else if (expenses[i] === 'Others') {
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[4].Days) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[4].CostPerDay) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[4].Total) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[4].Disburse) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[4].RemarksDisbursed) + '</td>');
        }

        w.document.write('</tr>');
    }

    w.document.write('</table>');

    w.document.write('<br/>');

    // Travel Cost (Final Settlement)
    w.document.write('<table>');
    w.document.write('<caption class="center bold">Travel Cost (Final Settlement)</caption>');
    w.document.write('<tr><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Expenses</th><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Days</th><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Cost per Day/Cost</th><th class="center" style="border: 1px solid black; padding: 5px; text-align: center;">Total Cost</th></tr>');

    let val2 = data.FinalAttachmentDetails;

    function safeValue2(val2) {
        return val2 === null || val2 === undefined ? '-' : val2;
    }

    var expenses = ['Flight', 'Hotel', 'Food', 'Transportation', 'Others'];
    for (var i = 0; i < expenses.length; i++) {
        w.document.write('<tr><td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + expenses[i] + '</td>');

        if (expenses[i] === 'Flight') {
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;"></td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[0].CostPerDay) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[0].Total) + '</td>');
        }
        else if (expenses[i] === 'Hotel') {
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[1].Days) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[1].CostPerDay) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[1].Total) + '</td>');
        }
        else if (expenses[i] === 'Food') {
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[2].Days) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[2].CostPerDay) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[2].Total) + '</td>');
        }
        else if (expenses[i] === 'Transportation') {
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[3].Days) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[3].CostPerDay) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[3].Total) + '</td>');
        }
        else if (expenses[i] === 'Others') {
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[4].Days) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[4].CostPerDay) + '</td>');
            w.document.write('<td class="center" style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[4].Total) + '</td>');
        }

        w.document.write('</tr>');
    }

    w.document.write('</table>');

        w.document.write('<br/>');


    // Disbursement Details
    w.document.write('<table>');
    w.document.write('<tr>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Total Disbursed Amount</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.DisbursedAmount ? data.DisbursedAmount : '-') + '</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Remaining Balance</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.RemainingBalance ? data.RemainingBalance : '-') + '</td>');
    w.document.write('</tr>');
    w.document.write('<tr>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Cost</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.Cost ? data.Cost : '-') + '</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Amount Approved</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.ApprovedFSamount ? data.ApprovedFSamount : '-') + '</td>');
    w.document.write('</tr>');

    w.document.write('</table>');




    w.document.write('<br/>');

    w.document.write('<table>');
    w.document.write('<tr>');
    w.document.write('<td style="border: 1px solid black; width: 30%; padding: 5px; text-align: center;">Remarks</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.RemarksFSapproval ? data.RemarksFSapproval : " ") + '</td>');
    w.document.write('</tr>');
    w.document.write('</table>');

    w.document.write('<br/>');


    // Signature Section
    w.document.write('<table>');
    w.document.write('<tr><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Receiver</td><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Recommended By</td><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Approved By</td></tr>');
    w.document.write('<tr><td style="border: 1px solid black; height: 60px; padding: 5px; text-align: center;"> </td><td class="center" style="border: 1px solid black; height: 60px; padding: 5px; text-align: center;"> </td><td class="center" style="border: 1px solid black; height: 60px; padding: 5px; text-align: center;"> </td></tr>');
    w.document.write('</table>');

    w.document.write('</body></html>');
}




//function getPrint(data) {

//    console.log("abc", data);

//    let w = window.open();
//    w.document.write('<html><head><title>Report || Disbursement</title>');
//    w.document.write('<style>body { font-family: Arial, sans-serif; } table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; text-align: left; border: 1px solid #ddd; } th { background-color: #f2f2f2; } tr:nth-child(even) { background-color: #f2f2f2; } .center { text-align: center; } .bold { font-weight: bold; }</style>');
//    w.document.write('</head><body>');

//    // Report Header
//    w.document.write('<h2 style="margin-bottom: 10px; font-size:20px; border: 1px solid black; padding: 5px;"><center>Disbursement Report</center></h2>');
//    w.document.write('<h3 class="center">' + data.CompanyName + '</h3>');
//    w.document.write('<h4 class="center">TRF No: ' + data.TRFNo + '</h4>');

//    // Applicant Details
//    w.document.write('<table>');
//    w.document.write('<caption class="center bold">Applicant Details</caption>');
//    w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">Employee Name:</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + data.FullName + '</td></tr>');
//    w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">Employee ID:</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + data.EmployeeId + '</td></tr>');
//    w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">Company:</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + data.CompanyName + '</td></tr>');
//    w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">Department:</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + data.DepartmentName + '</td></tr>');
//    w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">Designation:</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + data.DesignationName + '</td></tr>');
//    w.document.write('</table>');

//    w.document.write('<br/>');

//    // Requisition Details
//    w.document.write('<table>');
//    w.document.write('<caption class="center bold">Requisition Details</caption>');
//    w.document.write('<tr><th style="border: 1px solid black; padding: 5px; text-align: center;">Visa Requisition No.</th><th style="border: 1px solid black; padding: 5px; text-align: center;">Ticket Requisition No.</th><th style="border: 1px solid black; padding: 5px; text-align: center;">Hotel Reservation No.</th></tr>');
//    data.Requistionorderdetails.forEach(function (item) {
//        w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">' + item.VisaRequisitionNo + '</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + item.TicketRequisitionNo + '</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + item.HotelReservationNo + '</td></tr>');
//    });
//    w.document.write('</table>');

//    w.document.write('<br/>');

//    // Estimated Travel Cost

//    w.document.write('<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">');
//    w.document.write('<caption style="caption-side: top; text-align: center; font-weight: bold; font-size: 18px;">Estimated Travel Cost</caption>');


//    w.document.write('<tr>');
//    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Expenses</th>');
//    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Days</th>');
//    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Cost per Day/Cost</th>');
//    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Total Cost</th>');
//    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Disburse</th>');
//    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Remarks</th>');
//    w.document.write('</tr>');

//    let val = data.orderTRFdetails;

//    function safeValue(val) {
//        return val === null || val === undefined ? '-' : val;
//    }


//    var expenses = ['Flight', 'Hotel', 'Food', 'Transportation', 'Others'];
//    for (var i = 0; i < expenses.length; i++) {
//        w.document.write('<tr>');
//        w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + expenses[i] + '</td>');

//        if (expenses[i] === 'Flight') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;"></td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[0].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[0].Total) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[0].Disburse) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[0].RemarksDisbursed) + '</td>');
//        }
//        else if (expenses[i] === 'Hotel') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[1].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[1].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[1].Total) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[1].Disburse) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[1].RemarksDisbursed) + '</td>');
//        }
//        else if (expenses[i] === 'Food') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[2].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[2].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[2].Total) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[2].Disburse) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[2].RemarksDisbursed) + '</td>');
//        }
//        else if (expenses[i] === 'Transportation') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[3].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[3].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[3].Total) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[3].Disburse) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[3].RemarksDisbursed) + '</td>');
//        }
//        else if (expenses[i] === 'Others') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[4].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[4].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[4].Total) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[4].Disburse) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderTRFdetails[4].RemarksDisbursed) + '</td>');
//        }

//        w.document.write('</tr>');
//    }

//    w.document.write('</table>');

//    w.document.write('<br/>');


//    //Travel Cost (Final Settlement)

//    w.document.write('<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">');
//    w.document.write('<caption style="caption-side: top; text-align: center; font-weight: bold; font-size: 18px;">Travel Cost (Final Settlement)</caption>');


//    w.document.write('<tr>');
//    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Expenses</th>');
//    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Days</th>');
//    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Cost per Day/Cost</th>');
//    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Total Cost</th>');
//    w.document.write('</tr>');

//    let val2 = data.FinalAttachmentDetails;

//    function safeValue2(val2) {
//        return val2 === null || val2 === undefined ? '-' : val2;
//    }

//    //console.log(data.FinalAttachmentDetails[0].CostPerDay);

//    var expenses = ['Flight', 'Hotel', 'Food', 'Transportation', 'Others'];
//    for (var i = 0; i < expenses.length; i++) {
//        w.document.write('<tr>');
//        w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + expenses[i] + '</td>');

//        if (expenses[i] === 'Flight') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;"></td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[0].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[0].Total) + '</td>');
//        }
//        else if (expenses[i] === 'Hotel') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[1].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[1].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[1].Total) + '</td>');
//        }
//        else if (expenses[i] === 'Food') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[2].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[2].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[2].Total) + '</td>');
//        }
//        else if (expenses[i] === 'Transportation') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[3].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[3].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[3].Total) + '</td>');
//        }
//        else if (expenses[i] === 'Others') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[4].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[4].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue2(data.FinalAttachmentDetails[4].Total) + '</td>');
//        }

//        w.document.write('</tr>');
//    }

//    w.document.write('</table>');

//    w.document.write('<br/>');


//    // Disbursement Details
//    w.document.write('<table>');
//    w.document.write('<tr>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Total Disbursed Amount</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.TotalCostRequired ? data.TotalCostRequired : '-') + '</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Required Advance</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.TotalAdvanceRequired ? data.TotalAdvanceRequired : '-') + '</td>');
//    w.document.write('</tr>');
//    w.document.write('<tr>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Total Disbursed Amount</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.TotalCostRequired ? data.TotalCostRequired : '-') + '</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Required Advance</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.TotalAdvanceRequired ? data.TotalAdvanceRequired : '-') + '</td>');
//    w.document.write('</tr>');

//    w.document.write('</table>');

//    w.document.write('<br/>');

//    w.document.write('<table>');
//    w.document.write('<tr>');
//    w.document.write('<td style="border: 1px solid black; width: 30%; padding: 5px; text-align: center;">Remarks</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.Remarks ? data.Remarks : " ") + '</td>');
//    w.document.write('</tr>');
//    w.document.write('</table>');

//    w.document.write('<br/>');


//    // Signature Section
//    w.document.write('<table>');
//    w.document.write('<tr><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Receiver</td><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Recommended By</td><td class="center bold" style="border: 1px solid black; padding: 5px; text-align: center;">Approved By</td></tr>');
//    w.document.write('<tr><td style="border: 1px solid black; height: 60px; padding: 5px; text-align: center;"> </td><td class="center" style="border: 1px solid black; height: 60px; padding: 5px; text-align: center;"> </td><td class="center" style="border: 1px solid black; height: 60px; padding: 5px; text-align: center;"> </td></tr>');
//    w.document.write('</table>');

//    w.document.write('</body></html>');
//}
