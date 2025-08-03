

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

function create_input_element(placeholderText, inputName, inputClassId) {

    let input = document.createElement("input");
    input.name = inputName;
    input.className = "qtybri form-control form-control-sm " + inputClassId;

    input.placeholder = placeholderText;
    input.id = inputClassId;
    input.type = "text";
    return input;
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
    load_Disbursment_table(1);
});


load_Disbursment_table();

function load_Disbursment_table(page) {


    json = {
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TRFNoText: $("#filter_disburse_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val()
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/Disbursement/ShowDisbursement",
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
                show_Disbursment_list(resp);

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



function show_Disbursment_list(resp) {

    $("#ls_disburse_table_tbody").empty();

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

        var TotalCostRequired = $("<td>").append(value.TotalCostRequired);
        var TotalAdvanceRequired = $("<td>").append(value.TotalAdvanceRequired);
        var Remarks = $("<td>").append(value.Remarks);

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



        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);

        //var editicon = $("<i>").attr({
        //    "class": "e-btn bi-credit-card-fill text-white bg-warning rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Edit"
        //}).appendTo(icondiv);
        //var printicon = $("<i>").attr({
        //    "class": "e-btn bi-printer btn icon btn-primary rounded-circle shadow",
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Print"
        //}).appendTo(icondiv);


        var editicon = $("<img>").attr({
            "src": "/_Assets/Icons/Edit_2.png",
            "alt": "Edit Icon",
            "title": "Edit",
            "style": "cursor: pointer; border: 2px solid white; width: 38px; height: 38px;"
        });

        icondiv.append(editicon);

        var printicon = $("<img>").attr({
            "src": "/_Assets/Icons/Printer_2.png",
            "alt": "Print Icon",
            "title": "Print",
            "style": "cursor: pointer; border: 2px solid white; width: 40px; height: 40px;"
        });

        icondiv.append(printicon);

        $("<tr>").attr("class", "text-center").append(slnocell, TRFNoText, EmployeeId, FullName, ContactNo,
            CompanyName, DepartmentName, DesignationName, TotalCostRequired, TotalAdvanceRequired, Remarks, TicketApprovalStatusManagement, ApprovedByManDet,
            iconcell).appendTo("#ls_disburse_table_tbody");

        (function ($) {
            editicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_add_disburse_modal").modal("show");
                $("#ls_disb_id_hidden").data("Id", value.Id);

                //alert(value.TotalDisbursedAmount);

                //try {

                //    if (value.TotalDisbursedAmount > 0) {
                //        $("#ls_add_disburse_modal").find(".modal-footer").hide();

                //    }
                //}
                //catch {

                //}

                $('#applicant_name').text(value.FullName);
                $('#applicant_employee_id').text(value.EmployeeId);
                $('#applicant_company').text(value.CompanyName);
                $('#applicant_department').text(value.DepartmentName);
                $('#applicant_designation').text(value.DesignationName);

                $("#ls_add_disburse_trfno").val(value.TRFNoText);
                $("#ls_add_disburse_visaReqno").val(value.VisaRequisitionNo);
                $("#ls_add_disburse_ticketReqno").val(value.TicketRequisitionNo);
                $("#ls_add_disburse_hotelResno").val(value.HotelReservationNo);
                $("#totalCostApproved").val(value.TotalCostRequired);
                $("#travelAdvanceApproved").val(value.TotalAdvanceRequired);

                $("#ls_add_disburse_currency1").val(value.CurrencyName[0].CurrencyName);


                try {
                    $("#travelAdvanceDisbursed").val(value.TotalDisbursedAmount);
                }
                catch {

                }

                $("#ls_NeedleReq_add_remarks").val(value.Remarks);


                $("#ord_order_table_tbody tr.added-item").empty();
                $.each(value.orderdetails, async function (index, _value) {   //.slice(0, 5)
                    create_order_item_row_for_edit(_value);
                });

                $("#ls_team_table_edit_tbody tr.added-item").empty();
                $.each(value.Requistionorderdetails, async function (index, _value2) {
                    create_order_item_row_for_edit_Det(_value2);
                });


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

    //let closeBtn = $("<button>").attr({ "type": "button", "class": "btn btn-danger", style: "font-family: auto;" }).append('<i class="bi bi-x-square"></i>');
    //let closeBtnCell = $("<td>").append(closeBtn);

    var row = $("<tr>").attr("class", "text-center added-item").append(VisaRequisitionNoCell, TicketRequisitionNoCell, HotelReservationNoCell);

    $('#ls_team_table_edit_tbody tr.add-item').before(row);


    (function ($) {

        load_data_select_items_for_edit_det(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata);

        //closeBtn.on("click", function (e) {
        //    e.preventDefault();
        //    if ($('#ord_order_table_tbody tr.added-item').length <= 1) {
        //        iziToast.warning({
        //            title: 'Warning!',
        //            message: "You cannot delete this row.Please keep at least one row.",
        //            position: 'bottomRight'
        //        });
        //        return;
        //    }
        //    row.remove();
        //});
    })(jQuery);
}

function load_data_select_items_for_edit_det(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata) {

    VisaRequisitionNoInput.value = rowdata.VisaRequisitionNo;

    TicketRequisitionNoInput.value = rowdata.TicketRequisitionNo;

    HotelReservationNoInput.value = rowdata.HotelReservationNo;
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
    DisburseInput.step = ".1";
    //DisburseInput.onkeypress = function () {
    //    return event.charCode >= 48 && event.charCode <= 57;
    //}
    let DisburseCell = $("<td>").append(DisburseInput);


    let remarksInput = create_input_element("Remarks", "ord_remarks", "remarks");
    let remarksCell = $("<td>").append(remarksInput);


    var row = $("<tr>").attr("class", "text-center added-item").append(ExpensesCell, DaysCell, CostPerDayCell, TotalCell, DisburseCell, remarksCell    );

    $('#ord_order_table_tbody tr.add-item').before(row);
    (function ($) {

        
        load_data_select_items_for_add(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, DisburseInput, remarksInput, rowdata);


        //balance

        $(document).on('input', 'input[name="Disburse_det"]', function () {
            calculateTotalCostRequired();
        });

        function calculateTotalCostRequired() {

            let totalCost = 0;


            $('#ord_order_table_tbody tr.added-item').each(function () {
                let disburseInput = $(this).find('input[name="Disburse_det"]');
                let disburseValue = parseFloat(disburseInput.val()) || 0;
                //console.log("DisburseValue:", disburseValue);
                totalCost += disburseValue;
            });

            //console.log("TotalCost:", totalCost);
            $("#travelAdvanceDisbursed").val(totalCost.toFixed(2));
        }




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


$("#saveButton").on("click", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_disb_id_hidden").data("Id"),
        TotalDisbursedAmount: $("#travelAdvanceDisbursed").val(),
        BudgetFormTRFDetails: getOrderQuantitiesArr()
    };

    //console.log("json", json);


    $.ajax({
        type: "POST",
        url: "/Disbursement/ApproveDisbursement",
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



function getOrderQuantitiesArr() {

    //alert();

    let OrderQuantitiesArr = [];

    $('#ord_order_table_tbody tr.added-item').each(function () {

        let Expenses = $(this).find(".Expenses_id").val();
        let Days = $(this).find(".Days_id").val();
        let CostPerDay = $(this).find(".CostPerDay_id").val();
        let Total = $(this).find(".Total_id").val();

        let Disburse = $(this).find(".Disburse_id").val().trim();
        let RemarksDisbursed = $(this).find(".remarks").val().trim();

        //console.log("Expenses:", Expenses);
        //console.log("Days:", Days);
        //console.log("CostPerDay:", CostPerDay);
        //console.log("Total:", Total);
        //console.log("Disburse:", Disburse);
        //console.log("RemarksDisbursed:", RemarksDisbursed);


        if (Expenses !== "" && Days !== "" && CostPerDay !== "" && Total !== "" && Disburse !== "" ) {
            let obj = {
                Expenses: Expenses,
                Days: Days,
                CostPerDay: CostPerDay,
                Total: Total,
                Disburse: Disburse,
                RemarksDisbursed: RemarksDisbursed
            }
            OrderQuantitiesArr.push(obj);
        }
    });


    //console.log("ordersdet", OrderQuantitiesArr);
    return OrderQuantitiesArr;
}



function getPrint(data) {
    let w = window.open();
    w.document.write('<html><head><title>Report || Disbursement</title>');
    w.document.write('<style>body { font-family: Arial, sans-serif; } table { border-collapse: collapse; width: 100%; } th, td { padding: 8px; text-align: left; border: 1px solid #ddd; } th { background-color: #f2f2f2; } tr:nth-child(even) { background-color: #f2f2f2; } .center { text-align: center; } .bold { font-weight: bold; }</style>');
    w.document.write('</head><body>');

    // Report Header
    w.document.write('<br/>');
    w.document.write('<h2 style="margin-bottom: 10px; font-size:20px; border: 1px solid black; padding: 5px;"><center>Disbursement Report</center></h2>');
    w.document.write('<h3 class="center">' + data.CompanyName + '</h3>');
    w.document.write('<h4 class="center">TRF No: ' + data.TRFNoText + '</h4>');

    // Applicant Details
    w.document.write('<table>');
    w.document.write('<caption class="center bold">Applicant Details</caption>');
    w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">Employee Name:</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + data.FullName + '</td></tr>');
    w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">Employee ID:</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + data.EmployeeId + '</td></tr>');
    w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">Company:</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + data.CompanyName + '</td></tr>');
    w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">Department:</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + data.DepartmentName + '</td></tr>');
    w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">Designation:</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + data.DesignationName + '</td></tr>');
    w.document.write('</table>');

    w.document.write('<br/>');

    // Requisition Details
    w.document.write('<table>');
    w.document.write('<caption class="center bold">Requisition Details</caption>');
    w.document.write('<tr><th style="border: 1px solid black; padding: 5px; text-align: center;">Visa Requisition No.</th><th style="border: 1px solid black; padding: 5px; text-align: center;">Ticket Requisition No.</th><th style="border: 1px solid black; padding: 5px; text-align: center;">Hotel Reservation No.</th></tr>');
    data.Requistionorderdetails.forEach(function (item) {
        w.document.write('<tr><td style="border: 1px solid black; padding: 5px; text-align: center;">' + item.VisaRequisitionNo + '</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + item.TicketRequisitionNo + '</td><td style="border: 1px solid black; padding: 5px; text-align: center;">' + item.HotelReservationNo + '</td></tr>');
    });
    w.document.write('</table>');

    w.document.write('<br/>');

    w.document.write('<table>');
    w.document.write('<tr>');
    w.document.write('<td style="border: 1px solid black; width: 30%; padding: 5px; text-align: center;">Currency</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.CurrencyName[0].CurrencyName ? data.CurrencyName[0].CurrencyName : " ") + '</td>');
    w.document.write('</tr>');
    w.document.write('</table>');

    // Estimated Travel Cost

    w.document.write('<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">');
    w.document.write('<caption style="caption-side: top; text-align: center; font-weight: bold; font-size: 18px;">Estimated Travel Cost</caption>');


    w.document.write('<tr>');
    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Expenses</th>');
    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Days</th>');
    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Cost per Day/Cost</th>');
    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Total Cost</th>');
    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Disburse</th>');
    w.document.write('<th style="border: 1px solid black; padding: 5px; text-align: center;">Remarks</th>');
    w.document.write('</tr>');

    let val = data.orderdetails;

    function safeValue(val) {
        return val === null || val === undefined ? '-' : val;
    }


    var expenses = ['Flight', 'Hotel', 'Food', 'Transportation', 'Others'];
    for (var i = 0; i < expenses.length; i++) {
        w.document.write('<tr>');
        w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + expenses[i] + '</td>');

        if (expenses[i] === 'Flight') {
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;"></td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[0].CostPerDay) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[0].Total) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[0].Disburse) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[0].RemarksDisbursed) + '</td>');
        }
        else if (expenses[i] === 'Hotel') {
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[1].Days) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[1].CostPerDay) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[1].Total) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[1].Disburse) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[1].RemarksDisbursed) + '</td>');
        }
        else if (expenses[i] === 'Food') {
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[2].Days) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[2].CostPerDay) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[2].Total) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[2].Disburse) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[2].RemarksDisbursed) + '</td>');
        }
        else if (expenses[i] === 'Transportation') {
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[3].Days) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[3].CostPerDay) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[3].Total) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[3].Disburse) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[3].RemarksDisbursed) + '</td>');
        }
        else if (expenses[i] === 'Others') {
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[4].Days) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[4].CostPerDay) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[4].Total) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[4].Disburse) + '</td>');
            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[4].RemarksDisbursed) + '</td>');
        }

        w.document.write('</tr>');
    }

    w.document.write('</table>');

    w.document.write('<br/>');


    // Disbursement Details
    w.document.write('<table>');
    w.document.write('<caption class="center bold">Disbursement Details</caption>');
    w.document.write('<tr>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Total Disbursed Amount</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.TotalCostRequired ? data.TotalCostRequired : '-') + '</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Required Advance</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.TotalAdvanceRequired ? data.TotalAdvanceRequired : '-') + '</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Disbursed Advance</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.TotalDisbursedAmount ? data.TotalDisbursedAmount : '-') + '</td>');
    w.document.write('</tr>');

    w.document.write('</table>');

    w.document.write('<br/>');

    // Remarks
    //w.document.write('<table>');
    //w.document.write('<tr><td class="bold" style="border: 1px solid black; width: 30%; padding: 5px; text-align: center;">Remarks</td><td>' + (data.Remarks ? data.Remarks : "") + '</td></tr>');
    //w.document.write('</table>');

    w.document.write('<table>');
    w.document.write('<tr>');
    w.document.write('<td style="border: 1px solid black; width: 30%; padding: 5px; text-align: center;">Remarks</td>');
    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.Remarks ? data.Remarks : " ") + '</td>');
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

//     console.log("abc",data);

//    let w = window.open();

//    w.document.write('<html><head><title>Report || Disbursement</title>');

//    w.document.write('<style> .top_rw{ background-color:#f4f4f4; } .td_w{ } button{ padding:5px 10px; font-size:14px;} .invoice-box { max-width: 890px; margin: auto; padding:10px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, .15); font-size: 14px; line-height: 24px; font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; color: #555; } .invoice-box table { width: 100%; line-height: inherit; text-align: left; border-bottom: solid 1px #ccc; } .invoice-box table td { padding: 5px; vertical-align:middle; } .invoice-box table tr td:nth-child(2) { text-align: right; } .invoice-box table tr.top table td { padding-bottom: 20px; } .invoice-box table tr.top table td.title { font-size: 45px; line-height: 45px; color: #333; } .invoice-box table tr.information table td { padding-bottom: 40px; } .invoice-box table tr.heading td { background: #eee; border-bottom: 1px solid #ddd; font-weight: bold; font-size:12px; } .invoice-box table tr.details td { padding-bottom: 20px; } .invoice-box table tr.item td{ border-bottom: 1px solid #eee; } .invoice-box table tr.item.last td { border-bottom: none; } .invoice-box table tr.total td:nth-child(2) { border-top: 2px solid #eee; font-weight: bold; } @media only screen and (max-width: 600px) { .invoice-box table tr.top table td { width: 100%; display: block; text-align: center; } .invoice-box table tr.information table td { width: 100%; display: block; text-align: center; } } /** RTL **/ .rtl { direction: rtl; font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; } .rtl table { text-align: right; } .rtl table tr td:nth-child(2) { text-align: left; } </style >');

//    w.document.write('<style>.invoice-box table {width: 100%;line-height: inherit;text-align: left;border-bottom: 0px;}</style>');
//    w.document.write('<style>.invoice-box {max-width: -webkit-fill-available;box-shadow: 0 0 0 0!important;}</style>');
//    w.document.write('<style> #item_info_table td,th{border: 1px solid black;border-collapse: collapse;} </style>');
//    w.document.write('<style>.invoice-box table tr.heading th { background: #eee;  font-weight: bold; font-size: 12px;}</style>');
//    w.document.write('<style>.invoice-box table tr.information table td {padding-bottom: 0px;} .invoice-box table td {padding: 2.5px;vertical-align: middle;} </style>');
//    w.document.write("<style>body, html{ margin: 0px; width: 100%; height: 100%; overflow: visible; display: table-caption; justify-content: space-around; align-items: center; flex-direction: row; } .stamp { transform: rotate(12deg); color: #555; font-size: 2rem; font-weight: 700; border: 0.25rem solid #555; display: inline-block; padding: 0.25rem 1rem; text-transform: uppercase; border-radius: 1rem; font-family: 'Courier'; -webkit-mask-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png'); -webkit-mask-size: 944px 604px; mix-blend-mode: multiply; } .is-nope { color: #D23; border: 0.5rem double #D23; transform: rotate(-14deg); -webkit-mask-position: 2rem 3rem; font-size: 2rem; } .is-approved { color: #0A9928; border: 0.3rem solid #0A9928; -webkit-mask-position: 13rem 6rem; transform: rotate(-14deg); border-radius: 0; } .is-draft { color: #C4C4C4; border: 1rem double #C4C4C4; transform: rotate(-5deg); font-size: 6rem; font-family: 'Open sans', Helvetica, Arial, sans-serif; border-radius: 0; padding: 0.5rem; }</style>");
//    w.document.write("<style>@page {margin: .5in;} </style>");

//    w.document.write('</head><body>');

//    let body = $("<div>");
//    let invoice_box = $("<div>").attr('class', 'invoice-box').appendTo(body);
//    let table = $("<table>").attr({ 'cellpadding': '0', cellspacing: "0" }).appendTo(invoice_box);
//    var tr = $("<tr>").attr('class', 'top_rw').appendTo(table);
//    var td = $("<td>").attr('colspan', '2').appendTo(tr);
//    var div = $("<div>").attr("style", "display: flex!important").appendTo(td);

//    //var currentdate = new Date();
//    //var datetime = "Print Date: " + currentdate.getDate() + "/"
//    //    + (currentdate.getMonth() + 1) + "/"
//    //    + currentdate.getFullYear() + " , "
//    //    + currentdate.getHours() + ":"
//    //    + currentdate.getMinutes() + ":"
//    //    + currentdate.getSeconds();
//    //var td = $("<td>").attr('style', 'width:100%; text-align: right; margin-right: 10px; font-size:12px;').append("Travel Management System - " + datetime).appendTo(tr);

//    w.document.write(body.html());
//    w.document.write('<h2 style="margin-bottom: 10px; font-size:20px; border: 1px solid black; padding: 5px;"><center>Disbursement Report</center></h2>');
//    w.document.write('<h2 style="text-align:center;">' + data.CompanyName + '</h2>');
//    w.document.write('<h3 style="text-align:center;">TRF No: ' + data.TRFNoText + '</h3>');

//    w.document.write('<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">');
//    w.document.write('<caption style="caption-side: top; text-align: center; font-weight: bold; font-size: 18px;">Applicant Details</caption>');
//    w.document.write('<tr><td style="border: 1px solid black; padding: 5px;">Employee Name</td><td style="border: 1px solid black; padding: 5px;">' + data.FullName + '</td></tr>');
//    w.document.write('<tr><td style="border: 1px solid black; padding: 5px;">Employee Id</td><td style="border: 1px solid black; padding: 5px;">' + data.EmployeeId + '</td></tr>');
//    w.document.write('<tr><td style="border: 1px solid black; padding: 5px;">Company</td><td style="border: 1px solid black; padding: 5px;">' + data.CompanyName + '</td></tr>');
//    w.document.write('<tr><td style="border: 1px solid black; padding: 5px;">Department</td><td style="border: 1px solid black; padding: 5px;">' + data.DepartmentName + '</td></tr>');
//    w.document.write('<tr><td style="border: 1px solid black; padding: 5px;">Designation</td><td style="border: 1px solid black; padding: 5px;">' + data.DesignationName + '</td></tr>');
//    w.document.write('</table>');



//    //information
//    var tr = $("<tr>").attr('class', 'information').appendTo(table);
//    var td = $("<td>").attr('colspan', '3').appendTo(tr);
//    let info_table = $("<table>").appendTo(td);
//    var tr = $("<tr>").attr('class', '').appendTo(info_table);

//    var tr = $("<tr>").attr('class', '').appendTo(table);
//    var td = $("<td>").attr({ 'colspan': '3', 'id': 'table_div' }).appendTo(tr);


//    var item_info_table = document.createElement("table");
//    item_info_table.className = "";
//    item_info_table.setAttribute("cellspacing", "0px");
//    item_info_table.setAttribute("cellpadding", "2px");
//    //, "cellpadding":"2px"}
//    item_info_table.style = "font-size:10px;border-collapse: collapse;";
//    item_info_table.id = "item_info_table";


//    var table_thead = document.createElement("thead");
//    item_info_table.appendChild(table_thead);

//    var table_thead_row = document.createElement("tr");
//    table_thead_row.classList = "heading";
//    table_thead.appendChild(table_thead_row);


//    var theads = new Array();
//    //theads.push('');
//    theads.push('Visa Requisition No.'); 
//    theads.push('Ticket Requisition No.'); 
//    theads.push('Hotel Reservation No.'); 


//    for (var i = 0; i < theads.length; i++) {
//        var table_thead_th = document.createElement("td");
//        table_thead_th.innerHTML = theads[i];
//        //table_thead_th.setAttribute("scope", "col");
//        table_thead_th.setAttribute("style", "text-align: center;font-size:10px;width:80px;line-height: 15px;");
//        table_thead_row.appendChild(table_thead_th);
//    }

//    var table_tbody = document.createElement("tbody");
//    table_tbody.id = 'item_info_table_tbody';
//    item_info_table.appendChild(table_tbody);
//    td.append(item_info_table);



//    $.each(data.Requistionorderdetails, function (index, value) {
//        //console.log('print', data.Requistionorderdetails[0]);
//        //console.log('printvalue', value);

//        var table_tbody_row = document.createElement("tr");
//        table_tbody_row.setAttribute("style", "text-align: center;");
//        table_tbody.appendChild(table_tbody_row);

//        var table_thead_td = document.createElement("td"); 
//        table_thead_td.innerHTML = data.Requistionorderdetails[0].VisaRequisitionNo;
//        table_tbody_row.appendChild(table_thead_td);

//        var table_thead_td = document.createElement("td");
//        table_thead_td.innerHTML = data.Requistionorderdetails[0].TicketRequisitionNo;
//        table_tbody_row.appendChild(table_thead_td);

//        var table_thead_td = document.createElement("td");
//        table_thead_td.innerHTML = data.Requistionorderdetails[0].HotelReservationNo;
//        table_tbody_row.appendChild(table_thead_td);

//        var table_tbody_row = document.createElement("tr");
//        table_tbody_row.setAttribute("style", "text-align: center;");

//        table_tbody.appendChild(table_tbody_row);

//    });



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

//    let val = data.orderdetails;

//    function safeValue(val) {
//        return val === null || val === undefined ? '-' : val;
//    }


//    var expenses = ['Flight', 'Hotel', 'Food', 'Transportation', 'Others'];
//    for (var i = 0; i < expenses.length; i++) {
//        w.document.write('<tr>');
//        w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + expenses[i] + '</td>');

//        if (expenses[i] === 'Flight') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;"></td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[0].CostPerDay) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[0].Total) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[0].Disburse) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[0].RemarksDisbursed) + '</td>'); 
//        }
//        else if (expenses[i] === 'Hotel') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[1].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[1].CostPerDay) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[1].Total) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[1].Disburse) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[1].RemarksDisbursed) + '</td>'); 
//        }
//        else if (expenses[i] === 'Food') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[2].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[2].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[2].Total) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[2].Disburse) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[2].RemarksDisbursed) + '</td>'); 
//        }
//        else if (expenses[i] === 'Transportation') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[3].Days) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[3].CostPerDay) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[3].Total) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[3].Disburse) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[3].RemarksDisbursed) + '</td>'); 
//        }
//        else if (expenses[i] === 'Others') {
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[4].Days) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[4].CostPerDay) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[4].Total) + '</td>'); 
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[4].Disburse) + '</td>');
//            w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + safeValue(data.orderdetails[4].RemarksDisbursed) + '</td>'); 
//        }

//        w.document.write('</tr>');
//    }

//    w.document.write('</table>');


//    // Additional table for Disbursement Details
//    w.document.write('<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">');
//    w.document.write('<tr>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Total Disbursed Amount</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.TotalCostRequired ? data.TotalCostRequired : '-') + '</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Advance</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.TotalAdvanceRequired ? data.TotalAdvanceRequired : '-') + '</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">Disbursed Advance</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 5px; text-align: center;">' + (data.TotalDisbursedAmount ? data.TotalDisbursedAmount : '-') + '</td>');
//    w.document.write('</tr>');
//    w.document.write('</table>');


//    w.document.write('<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">');
//    w.document.write('<tr>');
//    w.document.write('<td style="width: 30%; border: 1px solid black; padding: 10px; text-align: center;">Remarks</td>');
//    w.document.write('<td style="border: 1px solid black; padding: 10px; text-align: center;">' + (data.Remarks ? data.Remarks : " ") + '</td>');
//    w.document.write('</tr>');
//    w.document.write('</table>');


//    var tr = $("<tr>").attr('class', '').appendTo(table);
//    var td = $("<td>").attr('colspan', '3').appendTo(tr);
//    let footer_table = $("<table>").attr({ "cellspacing": "0px", "cellpadding": "2px", "style": "margin-top:30px" }).appendTo(td);
//    var tbody = $("<tbody>").appendTo(footer_table);
//    var tr = $("<tr>").attr('class', '').appendTo(tbody);
//    var td = $("<td>").attr({ 'width': '33.33%', "style": "text-align:center" }).append("...................................<br><b> Receiver </b>").appendTo(tr);
//    var td = $("<td>").attr({ 'width': '33.33%', "style": "text-align:center" }).append("...................................<br><b> Recommended By </b>").appendTo(tr);
//    var td = $("<td>").attr({ 'width': '33.33%', "style": "text-align:center" }).append("...................................<br><b> Approved By </b>").appendTo(tr);

//    w.document.write(body.html());
//    w.document.write('</body></html>');
//    //w.print();
//    //w.close();
//}















