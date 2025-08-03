

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



$("#gatepass_filter_form").on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

$("#ls_filter_btn").on("click", function (e) {
    e.preventDefault();
    load_FinalSettlement_table(1);
});


load_FinalSettlement_table(1);

function load_FinalSettlement_table(page) {

    json = {
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TRFNoText: $("#filter_disburse_no").val(),
        VisaRequisitionNo: $("#filter_visareq_no").val()
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/FinalSettlement/ShowFinalSettlement",         
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
                show_FinalSettlement_list(resp);

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


function show_FinalSettlement_list(resp) {
    $("#ls_finalSet_table_tbody").empty();



    if (resp.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    $.each(resp, function (index, value) {

        //console.log(value);

        

        var slnocell = $("<td>").append(index + 1);
        var TRFNoText = $("<td>").append(value.TRFNoText);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var FullName = $("<td>").append(value.FullName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var CompanyName = $("<td>").append(value.CompanyName);
        var DepartmentName = $("<td>").append(value.DepartmentName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var TotalCostReq = $("<td>").append(value.TotalCostRequired);
        var TotalDisbursedAmount = $("<td>").append(value.TotalDisbursedAmount);

        //alert(value.ApprovalStatusSup);

        try {

            var ApprovalStatusSup = $("<td>");

            if (value.FinalSettlementDet[0].ApprovalStatusSup == 1) {
                $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(ApprovalStatusSup);
            }
            else if (value.FinalSettlementDet[0].ApprovalStatusSup == 2) {
                $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(ApprovalStatusSup);
            }
            else if (value.FinalSettlementDet[0].ApprovalStatusSup == 3) {
                $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(ApprovalStatusSup);
            }
        }

        catch {

        }

        try {
            var CommentsSupervisor = $("<td>");

            if (value.FinalSettlementDet[0].CommentsSupervisor != null) {
                $("<div>").attr("class", "badge bg-danger").append(value.FinalSettlementDet[0].CommentsSupervisor).appendTo(CommentsSupervisor);
            }
            else {
                $("<div>").attr("class", "badge bg-danger").append("-").appendTo(CommentsSupervisor);
            }
        }

        catch {

        }

        var FSApprovalStatusAudit = $("<td>");

        if (value.FinalSettlementDet && value.FinalSettlementDet[0] && value.FinalSettlementDet[0].FSApprovalStatusAudit != null) {
            var status = value.FinalSettlementDet[0].FSApprovalStatusAudit;

            if (status == 1) {
                $("<div>").attr("class", "badge bg-success").text("Approved").appendTo(FSApprovalStatusAudit);
            } else if (status == 2) {
                $("<div>").attr("class", "badge bg-warning").text("Pending").appendTo(FSApprovalStatusAudit);
            } else if (status == 3) {
                $("<div>").attr("class", "badge bg-danger").text("Rejected").appendTo(FSApprovalStatusAudit);
            }
        } else {
            $("<div>").attr("class", "badge").text("-").appendTo(FSApprovalStatusAudit);
        }

        var RemarksFSapproval = $("<td>");

        if (value.FinalSettlementDet && value.FinalSettlementDet[0] && value.FinalSettlementDet[0].RemarksFSapproval != null) {
            RemarksFSapproval.append(value.FinalSettlementDet[0].RemarksFSapproval);
        } else {
            RemarksFSapproval.append("-");
        }


        var FSApprovalStatusManagement = $("<td>");

        if (value.FinalSettlementDet && value.FinalSettlementDet[0] && value.FinalSettlementDet[0].FSApprovalStatusManagement != null) {
            var status = value.FinalSettlementDet[0].FSApprovalStatusManagement;

            if (status == 1) {
                $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(FSApprovalStatusManagement);
            }
            else if (status == 2) {
                $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(FSApprovalStatusManagement);
            }
            else if (status == 3) {
                $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(FSApprovalStatusManagement);
            }
        }
        else {
            $("<div>").attr("class", "badge").append("-").appendTo(FSApprovalStatusManagement);
        }

        var CommentsManagement = $("<td>");

        if (value.FinalSettlementDet && value.FinalSettlementDet[0] && value.FinalSettlementDet[0].CommentsManagement != null) {
            CommentsManagement.append(value.FinalSettlementDet[0].CommentsManagement);
        } else {
            CommentsManagement.append("-");
        }



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

        var editicon = $("<img>").attr({
            "src": "/_Assets/Icons/Edit_2.png",
            "alt": "Edit Icon",
            "title": "Edit",
            "style": "cursor: pointer; border: 2px solid white; width: 38px; height: 38px;"
        });

        icondiv.append(editicon);

        //console.log(value);

        if (value.FinalSettlementDet.length === 0) {
            selecticon.removeClass("disabled");
        }
        else {
            selecticon.addClass("disabled");
        }

        if (value.FinalSettlementDet.length > 0) {
            editicon.removeClass("disabled");
        }
        else {
            editicon.addClass("disabled");
        }

        try {
            if (value.FinalSettlementDet[0].ApprovalStatusSup == 1 && value.FinalSettlementDet[0].FSApprovalStatusAudit == 1 ) {
                icondiv.addClass("disabled");
                //$("#ls_edit_finalSet_modal").find(".modal-footer").hide();

                //iziToast.warning({
                //    title: 'Action Restricted',
                //    message: 'The approval process is currently underway. You can not edit this right now. Please wait for approval. ',
                //    position: 'bottomRight'
                //});
            }
        }
        catch {

        }

        //if (value.ApprovalStatusSup == 2) {
        //    editicon.addClass("disabled");
        //}


            //if (value.FinalSettlementDet.length > 0) {
            //    if (value.FinalSettlementDet[0].ApprovalStatusSup == 1) {
            //        $("#ls_edit_finalSet_modal").find(".modal-footer").hide();

            //    }
            //}



        $("<tr>").attr("class", "text-center").append(slnocell, TRFNoText, EmployeeId, FullName, ContactNo,
            CompanyName, DepartmentName, DesignationName, TotalCostReq, TotalDisbursedAmount, ApprovalStatusSup, CommentsSupervisor,
            FSApprovalStatusAudit, RemarksFSapproval, FSApprovalStatusManagement, CommentsManagement,
            iconcell).appendTo("#ls_finalSet_table_tbody");

        (function ($) {
            selecticon.on("click", function (e) {
                e.preventDefault();
                //console.log(value);

                PopulateApplicantDetails();

                $("#ls_add_finalSet_modal").modal("show");

                $("#ls_add_finalSet_visaReqno").data("VisaReqId", value.VisaReqId);
                $("#ls_add_finalSet_hotelResno").data("HotelResId", value.HotelResId);
                $("#ls_add_finalSet_ticketReqno").data("TicketReqId", value.TicketReqId);
                $("#ls_add_finalSet_budgetno").data("TRFNo", value.TRFNo);

                $("#ls_add_finalSet_visaReqno").val(value.VisaRequisitionNo);
                $("#ls_add_finalSet_ticketReqno").val(value.TicketRequisitionNo);
                $("#ls_add_finalSet_hotelResno").val(value.HotelReservationNo);
                $("#ls_add_finalSet_budgetno").val(value.TRFNoText);
                $("#ls_add_finalSet_estimated_cost").val(value.TotalCostRequired);
                $("#ls_add_finalSet_disbAmount").val(value.TotalDisbursedAmount);


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

                //$("#ls_team_table_edit_tbody tr.added-item").empty();
                $("#ls_team_table_edit_tbody").empty();
                $.each(value.Requistionorderdetails, async function (index, _value2) {
                    create_order_item_row_for_edit_Det(_value2);
                });



            });

            editicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_edit_finalSet_modal").modal("show");

                $('#applicant_name_edit').text(value.FullName);
                $('#applicant_employee_id_edit').text(value.EmployeeId);
                $('#applicant_company_edit').text(value.CompanyName);
                $('#applicant_department_edit').text(value.DepartmentName);
                $('#applicant_designation_edit').text(value.DesignationName);

                //$("#ls_team_table_edit_tbody tr.added-item").empty();
                $("#ls_team_table_edit_tbody").empty();


                $.each(value.Requistionorderdetails, async function (index, _value2) {
                    create_order_item_row_for_edit_Det_shit(_value2);
                });

                try {
                    $("#ord_order_table_tbody tr.added-item").empty();
                    $.each(value.FinalSettlementDet[0].FinalAttachmentDetails, async function (index, _value) {
                        create_order_item_row_for_edit(_value);
                    });
                }
                catch {

                }


                $("#ls_edit_finalSet_visaReqno").data("VisaReqId", value.FinalSettlementDet[0].VisaReqId);
                $("#ls_edit_finalSet_hotelResno").data("HotelResId", value.FinalSettlementDet[0].HotelResId);
                $("#ls_edit_finalSet_ticketReqno").data("TicketReqId", value.FinalSettlementDet[0].TicketReqId);
                $("#ls_edit_finalSet_budgetno").data("TRFMasterId", value.FinalSettlementDet[0].TRFMasterId);
                $("#ls_edit_finalSet_comments").data("Id", value.FinalSettlementDet[0].Id);
                $("#ls_edit_finalSet_estimated_cost").data("UserNo", value.FinalSettlementDet[0].UserNo);


                $("#ls_edit_finalSet_disbAmount").data("FSApprovalStatusAudit", value.FinalSettlementDet[0].FSApprovalStatusAudit);
                $("#ls_edit_finalSet_hotelResno").data("RejectedByAudit", value.FinalSettlementDet[0].RejectedByAudit);
                $("#ls_edit_finalSet_comments").data("ApprovedByAudit", value.FinalSettlementDet[0].ApprovedByAudit);

                $("#ls_edit_finalSet_visaReqno").val(value.FinalSettlementDet[0].VisaRequisitionNo);
                $("#ls_edit_finalSet_ticketReqno").val(value.FinalSettlementDet[0].TicketRequisitionNo);
                $("#ls_edit_finalSet_hotelResno").val(value.FinalSettlementDet[0].HotelReservationNo);
                $("#ls_edit_finalSet_budgetno").val(value.FinalSettlementDet[0].TRFNo);
                $("#ls_edit_finalSet_estimated_cost").val(value.TotalCostRequired);
                $("#ls_edit_finalSet_disbAmount").val(value.FinalSettlementDet[0].DisbursedAmount);
                

                $("#ls_edit_finalSet_cost").val(value.FinalSettlementDet[0].Cost);
                $("#ls_edit_finalSet_total").val(value.FinalSettlementDet[0].RemainingBalance);
                $("#ls_edit_finalSet_comments").val(value.FinalSettlementDet[0].Comments);
                $("#ls_edit_finalSet_remarks").val(value.FinalSettlementDet[0].Remarks);


                $(".uploaded-design-flight").empty();

                $.each(value.FinalSettlementDet[0].FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Flight") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalSettlementDet[0].FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        let btnGroupButton = $("<button>").attr({ "class": "btn btn-danger fileBtn", type: "button" }).appendTo(btnGroupDiv);
                        let btnGroupButtonIcon = $("<i>").attr({ "class": "bi bi-trash" }).appendTo(btnGroupButton);

                        $(".uploaded-design-flight").append(btnGroupDiv);

                        (function ($) {
                            btnGroupButton.on('click', function () {
                                $("#delete_File_modal").modal("show");
                                $("#delete_File_id_hidden").data("Id", _value2.Id);
                            });
                        })(jQuery);
                    }
                });



                $(".uploaded-design-hotel").empty();

                $.each(value.FinalSettlementDet[0].FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Hotel") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalSettlementDet[0].FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        let btnGroupButton = $("<button>").attr({ "class": "btn btn-danger fileBtn", type: "button" }).appendTo(btnGroupDiv);
                        let btnGroupButtonIcon = $("<i>").attr({ "class": "bi bi-trash" }).appendTo(btnGroupButton);

                        $(".uploaded-design-hotel").append(btnGroupDiv);

                        (function ($) {
                            btnGroupButton.on('click', function () {
                                $("#delete_File_modal").modal("show");
                                $("#delete_File_id_hidden").data("Id", _value2.Id);
                            });
                        })(jQuery);
                    }
                });


                $(".uploaded-design-food").empty();

                $.each(value.FinalSettlementDet[0].FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Food") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalSettlementDet[0].FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        let btnGroupButton = $("<button>").attr({ "class": "btn btn-danger fileBtn", type: "button" }).appendTo(btnGroupDiv);
                        let btnGroupButtonIcon = $("<i>").attr({ "class": "bi bi-trash" }).appendTo(btnGroupButton);

                        $(".uploaded-design-food").append(btnGroupDiv);

                        (function ($) {
                            btnGroupButton.on('click', function () {
                                $("#delete_File_modal").modal("show");
                                $("#delete_File_id_hidden").data("Id", _value2.Id);
                            });
                        })(jQuery);
                    }
                });


                $(".uploaded-design-Transportation").empty();

                $.each(value.FinalSettlementDet[0].FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Transportation") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalSettlementDet[0].FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        let btnGroupButton = $("<button>").attr({ "class": "btn btn-danger fileBtn", type: "button" }).appendTo(btnGroupDiv);
                        let btnGroupButtonIcon = $("<i>").attr({ "class": "bi bi-trash" }).appendTo(btnGroupButton);

                        $(".uploaded-design-Transportation").append(btnGroupDiv);

                        (function ($) {
                            btnGroupButton.on('click', function () {
                                $("#delete_File_modal").modal("show");
                                $("#delete_File_id_hidden").data("Id", _value2.Id);
                            });
                        })(jQuery);
                    }
                });


                $(".uploaded-design-others").empty();

                $.each(value.FinalSettlementDet[0].FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Others") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalSettlementDet[0].FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        let btnGroupButton = $("<button>").attr({ "class": "btn btn-danger fileBtn", type: "button" }).appendTo(btnGroupDiv);
                        let btnGroupButtonIcon = $("<i>").attr({ "class": "bi bi-trash" }).appendTo(btnGroupButton);

                        $(".uploaded-design-others").append(btnGroupDiv);

                        (function ($) {
                            btnGroupButton.on('click', function () {
                                $("#delete_File_modal").modal("show");
                                $("#delete_File_id_hidden").data("Id", _value2.Id);
                            });
                        })(jQuery);
                    }
                });

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

    $('#ls_team_table_edit_tbody').prepend(row);


    (function ($) {

        load_data_select_items_for_edit_det(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata);

    })(jQuery);
}

function load_data_select_items_for_edit_det(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata) {

    VisaRequisitionNoInput.value = rowdata.VisaRequisitionNo;

    TicketRequisitionNoInput.value = rowdata.TicketRequisitionNo;

    HotelReservationNoInput.value = rowdata.HotelReservationNo;
}



function create_order_item_row_for_edit_Det_shit(rowdata) {

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
    //console.log(row);

    $('#ls_team_table_edit_tbody tr.add-item').before(row);

    (function ($) {

        load_data_select_items_for_edit_det_shit(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata);

    })(jQuery);
}

function load_data_select_items_for_edit_det_shit(VisaRequisitionNoInput, TicketRequisitionNoInput, HotelReservationNoInput, rowdata) {

    VisaRequisitionNoInput.value = rowdata.VisaRequisitionNo;

    TicketRequisitionNoInput.value = rowdata.TicketRequisitionNo;

    HotelReservationNoInput.value = rowdata.HotelReservationNo;
}

async function create_order_item_row_for_edit(rowdata) {

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

    let TotalInput = create_input_element("Total", "Total_det", "Total_id");
    TotalInput.type = "number";
    TotalInput.required = true;
    TotalInput.min = "1";
    TotalInput.step = ".1";
    TotalInput.readOnly = true;
    //TotalInput.onkeypress = function () {
    //    return event.charCode >= 48 && event.charCode <= 57;
    //}
    let TotalCell = $("<td>").append(TotalInput);

    var row = $("<tr>").attr("class", "text-center added-item").append(ExpensesCell, DaysCell, CostPerDayCell, TotalCell);

    $('#ord_order_table_tbody tr.add-item').before(row);
    (function ($) {

        load_data_select_items_for_edit(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, rowdata);

        if (ExpensesInput.value == 'Flight') {
            DaysInput.disabled = true;
            CostPerDayInput.disabled = true;
            TotalInput.readOnly = false;
        }

        //balance

        function calculateTotal() {
            let days = parseFloat(DaysInput.value) || 0;
            let costPerDay = parseFloat(CostPerDayInput.value) || 0;
            let total = days * costPerDay;
            TotalInput.value = total.toFixed(2);

            calculateTotalCostRequired();
        }

        DaysInput.addEventListener('input', calculateTotal);
        CostPerDayInput.addEventListener('input', calculateTotal);

        //calculateTotal();

        //calculateTotalCostRequired();

        function calculateTotalCostRequired() {

            let totalCost = 0;
            $('#ord_order_table_tbody tr.added-item').each(function () {

                let rowTotalCell = $(this).find(".Total_id").val();
                //console.log("rowTotalCell", rowTotalCell);


                let rowTotalValue = parseFloat(rowTotalCell) || 0;
                //console.log("rowTotalValue", rowTotalValue);

                totalCost += rowTotalValue;
                //console.log("totalCost", totalCost);

            });

            $("#ls_edit_finalSet_cost").val(totalCost.toFixed(2));

            calculateRemainingBalance();
        }


        function calculateRemainingBalance() {
            var disbAmount = parseFloat($("#ls_edit_finalSet_disbAmount").val()) || 0;
            var cost = parseFloat($("#ls_edit_finalSet_cost").val()) || 0;

            var remainingBalance = cost - disbAmount;
            $("#ls_edit_finalSet_total").val(remainingBalance.toFixed(2));


            setTimeout(function () {

                if (remainingBalance < 0) {
                    $("#ls_edit_finalSet_comments").val("Please return the excess amount of BDT " + Math.abs(remainingBalance).toFixed(2) + " to the accounts department.");
                }
                else if (remainingBalance > 0) {
                    $("#ls_edit_finalSet_comments").val("You are entitled to receive the remaining amount of BDT " + Math.abs(remainingBalance).toFixed(2) + " from the accounts department upon approval.");
                }
                else {
                    $("#ls_edit_finalSet_comments").val("No balance remaining. No further action required.");
                }

            }, 1500);
        }




    })(jQuery);
}


function load_data_select_items_for_edit(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, rowdata) {

    ExpensesInput.value = rowdata.Expenses;

    DaysInput.value = rowdata.Days;

    CostPerDayInput.value = rowdata.CostPerDay;

    TotalInput.value = rowdata.Total;
}



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


    //let TotalCell = $("<td>").attr("class", "readonly").append();

    let TotalInput = create_input_element("Total", "Total_det", "Total_id");
    TotalInput.type = "number";
    TotalInput.required = true;
    TotalInput.min = "1";
    TotalInput.step = ".1";
    TotalInput.readOnly = true;
    //TotalInput.onkeypress = function () {
    //    return event.charCode >= 48 && event.charCode <= 57;
    //}
    let TotalCell = $("<td>").append(TotalInput);
    //let TotalCell = $("<td>").attr("class", "readonly").append(TotalInput);


    var row = $("<tr>").attr("class", "text-center added-item").append(ExpensesCell, DaysCell, CostPerDayCell, TotalCell);

    $('#ord_order_table_tbody').prepend(row);

    (function ($) {

        load_data_select_items_for_add(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, rowdata);

        if (ExpensesInput.value == 'Flight') {
            DaysInput.disabled = true;
            CostPerDayInput.disabled = true;
            TotalInput.readOnly = false;
        }

        if (ExpensesInput.value == 'Food & Allowance') {
            CostPerDayInput.value = 100;
        }

        function calculateTotal() {
            let days = parseFloat(DaysInput.value) || 0;
            let costPerDay = parseFloat(CostPerDayInput.value) || 0;
            let total = days * costPerDay;
            TotalInput.value = total.toFixed(2);

            calculateTotalCostRequired();
        }

        DaysInput.addEventListener('input', calculateTotal);
        CostPerDayInput.addEventListener('input', calculateTotal);

        calculateTotal();

        function calculateTotalCostRequired() {
            let totalCost = 0;
            $('#ord_order_table_tbody tr.added-item').each(function () {

                let rowTotalCell = $(this).find(".Total_id").val();
                //console.log("rowTotalCell", rowTotalCell);


                let rowTotalValue = parseFloat(rowTotalCell) || 0;
                //console.log("rowTotalValue", rowTotalValue);

                totalCost += rowTotalValue;
                //console.log("totalCost", totalCost);
            });

            $("#ls_add_finalSet_cost").val(totalCost.toFixed(2));

            calculateRemainingBalance();
        }


        function calculateRemainingBalance()
        {
            var disbAmount = parseFloat($("#ls_add_finalSet_disbAmount").val()) || 0;
            var cost = parseFloat($("#ls_add_finalSet_cost").val()) || 0;

            var remainingBalance = cost - disbAmount;
            $("#ls_add_finalSet_total").val(remainingBalance.toFixed(2));


            setTimeout(function () {

                if (remainingBalance < 0) {
                    $("#ls_add_finalSet_comments").val("Please return the excess amount of BDT " + Math.abs(remainingBalance).toFixed(2) + " to the accounts department.");
                }
                else if (remainingBalance > 0) {
                    $("#ls_add_finalSet_comments").val("You are entitled to receive the remaining amount of BDT " + Math.abs(remainingBalance).toFixed(2) + " from the accounts department upon approval.");
                }
                else {
                    $("#ls_add_finalSet_comments").val("No balance remaining. No further action required.");
                }

            }, 1500);
        }

        //    $("#ls_add_finalSet_disbAmount, #ls_add_finalSet_cost").on("input", function () {
        //        calculateRemainingBalance();
        //    });

    })(jQuery);
}


function load_data_select_items_for_add(ExpensesInput, DaysInput, CostPerDayInput, TotalInput, rowdata) {

    //console.log("1", rowdata);

    ExpensesInput.value = rowdata.ExpensesCategory;

    if (ExpensesInput.value == 'Flight') {
        DaysInput.disabled = true;
        CostPerDayInput.disabled = true;
    }
}




//Delete File in Edit Mode

$("#delete_File_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#delete_File_id_hidden").data('Id'),
    };
    $.ajax({
        type: "POST",
        url: "/FinalSettlement/DeleteFinalSettlementFile",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(json),

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
                msg = 'Uncaught Error.\n + jqXHR.responseText';
            }

            iziToast.error({
                title: 'error!',
                message: msg,
                position: 'bottomRight'
            });
        }
    });
});


/*Flight*/

$(document).ready(function () {
    $("#ls_add_finalSettle_attachment_Flight").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-flight").html(fileNames);
    }
});

//Hotel

$(document).ready(function () {
    $("#ls_add_finalSettle_attachment_hotel").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-hotel").html(fileNames);
    }
});

//Food

$(document).ready(function () {
    $("#ls_add_finalSettle_attachment_Food").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-food").html(fileNames);
    }
});


//Transportation

$(document).ready(function () {
    $("#ls_add_finalSettle_attachment_Transportation").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-Transportation").html(fileNames);
    }
});

//Others

$(document).ready(function () {
    $("#ls_add_finalSettle_attachment_Others").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-others").html(fileNames);
    }
});

//Saving in database

$("#ls_add_finalSet_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {

        TRFNo: $("#ls_add_finalSet_budgetno").val(),
        Cost: $("#ls_add_finalSet_cost").val(),
        RemainingBalance: $("#ls_add_finalSet_total").val(),
        DisbursedAmount: $("#ls_add_finalSet_disbAmount").val(),
        Comments: $("#ls_add_finalSet_comments").val(),
        Remarks: $("#ls_add_finalSet_remarks").val(),
        FinalSettlementsDetails: getOrderQuantitiesArr()

    }

    //console.log("json", json);


    var formData = new FormData();

    formData.append("TRFNo", json.TRFNo);
    formData.append("Cost", json.Cost);
    formData.append("RemainingBalance", json.RemainingBalance);
    formData.append("DisbursedAmount", json.DisbursedAmount);
    formData.append("Comments", json.Comments);
    formData.append("Remarks", json.Remarks);
    //formData.append("FinalSettlementsDetails", json.FinalSettlementsDetails);

    for (let i = 0; i < json.FinalSettlementsDetails.length; i++) {
        formData.append("FinalSettlementsDetails[" + i + "].Expenses", json.FinalSettlementsDetails[i].Expenses);
        formData.append("FinalSettlementsDetails[" + i + "].Days", json.FinalSettlementsDetails[i].Days);
        formData.append("FinalSettlementsDetails[" + i + "].CostPerDay", json.FinalSettlementsDetails[i].CostPerDay);
        formData.append("FinalSettlementsDetails[" + i + "].Total", json.FinalSettlementsDetails[i].Total);
    }
    

    for (let i = 0; i < $("#ls_add_finalSettle_attachment_Flight")[0].files.length; i++) {
        formData.append("FilesFlight", $("#ls_add_finalSettle_attachment_Flight")[0].files[i]);
    }

    for (let i = 0; i < $("#ls_add_finalSettle_attachment_hotel")[0].files.length; i++) {
        formData.append("FilesHotel", $("#ls_add_finalSettle_attachment_hotel")[0].files[i]);
    }

    for (let i = 0; i < $("#ls_add_finalSettle_attachment_Food")[0].files.length; i++) {
        formData.append("FilesFood", $("#ls_add_finalSettle_attachment_Food")[0].files[i]);
    }

    for (let i = 0; i < $("#ls_add_finalSettle_attachment_Transportation")[0].files.length; i++) {
        formData.append("FilesTransportation", $("#ls_add_finalSettle_attachment_Transportation")[0].files[i]);
    }

    for (let i = 0; i < $("#ls_add_finalSettle_attachment_Others")[0].files.length; i++) {
        formData.append("FilesOthers", $("#ls_add_finalSettle_attachment_Others")[0].files[i]);
    }


    $.ajax({
        type: "POST",
        url: "/FinalSettlement/AddFinalSettlement",       
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

function getOrderQuantitiesArr() {

    let OrderQuantitiesArr = [];

    $('#ord_order_table_tbody tr.added-item').each(function () {


        let Expenses = $(this).find(".Expenses_id").val();
        let Days = $(this).find(".Days_id").val();
        let CostPerDay = $(this).find(".CostPerDay_id").val();
        let Total = $(this).find(".Total_id").val();


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



$(document).ready(function () {
    $("#ls_edit_finalSettle_attachment_Flight").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-flight").html(fileNames);
    }
});


$(document).ready(function () {
    $("#ls_edit_finalSettle_attachment_hotel").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-hotel").html(fileNames);
    }
});


$(document).ready(function () {
    $("#ls_edit_finalSettle_attachment_Food").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-food").html(fileNames);
    }
});


$(document).ready(function () {
    $("#ls_edit_finalSettle_attachment_Transportation").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-Transportation").html(fileNames);
    }
});


$(document).ready(function () {
    $("#ls_edit_finalSettle_attachment_Others").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-others").html(fileNames);
    }
});


$(document).ready(function () {
    $("#ls_edit_finalSettle_attachment_Flight").change(function () {
        var files = $(this)[0].files;
        displayFileNames(files);
    });

    function displayFileNames(files) {
        var fileNames = "";
        for (var i = 0; i < files.length; i++) {
            fileNames += files[i].name + "<br>";
        }
        $(".uploaded-design-flight").html(fileNames);
    }
});


//$(document).ready(function () {
//    function calculateRemainingBalance() {
//        var disbAmount = parseFloat($("#ls_edit_finalSet_disbAmount").val()) || 0;
//        var cost = parseFloat($("#ls_edit_finalSet_cost").val()) || 0;

//        var remainingBalance = cost - disbAmount;
//        $("#ls_edit_finalSet_total").val(remainingBalance.toFixed(2));


//        setTimeout(function () {

//            if (remainingBalance < 0) {
//                $("#ls_edit_finalSet_comments").val("Please return the excess amount of BDT " + Math.abs(remainingBalance).toFixed(2) + " to the accounts department.");
//            } else if (remainingBalance > 0) {
//                $("#ls_edit_finalSet_comments").val("You are entitled to receive the remaining amount of BDT " + Math.abs(remainingBalance).toFixed(2) + " from the accounts department upon approval.");
//            } else {
//                $("#ls_edit_finalSet_comments").val("No balance remaining. No further action required.");
//            }

//        }, 1500);
//    }

//    calculateRemainingBalance();

//    $("#ls_edit_finalSet_disbAmount, #ls_edit_finalSet_cost").on("input", function () {
//        calculateRemainingBalance();
//    });
//});



//Update

$("#ls_edit_finalSet_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {

        Id: $("#ls_edit_finalSet_comments").data("Id"),
        UserNo: $("#ls_edit_finalSet_estimated_cost").data("UserNo"),
        TRFMasterId: $("#ls_edit_finalSet_budgetno").data("TRFMasterId"),
        TRFNo: $("#ls_edit_finalSet_budgetno").val(),
        Cost: $("#ls_edit_finalSet_cost").val(),
        RemainingBalance: $("#ls_edit_finalSet_total").val(),
        DisbursedAmount: $("#ls_edit_finalSet_disbAmount").val(),
        Comments: $("#ls_edit_finalSet_comments").val(),
        Remarks: $("#ls_edit_finalSet_remarks").val(),

        FSApprovalStatusAudit: $("#ls_edit_finalSet_disbAmount").data("FSApprovalStatusAudit"),
        ApprovedByAudit: $("#ls_edit_finalSet_comments").data("ApprovedByAudit"),
        RejectedByAudit: $("#ls_edit_finalSet_hotelResno").data("RejectedByAudit"),


        FinalSettlementsDetails: getOrderQuantitiesArrEdit()

    }

    //console.log("json", json);

    var formData = new FormData();


    formData.append("TRFNo", json.TRFNo);
    formData.append("Cost", json.Cost);
    formData.append("RemainingBalance", json.RemainingBalance);
    formData.append("DisbursedAmount", json.DisbursedAmount);
    formData.append("Comments", json.Comments);
    formData.append("Remarks", json.Remarks);
    formData.append("Id", json.Id);
    formData.append("UserNo", json.UserNo);
    formData.append("TRFMasterId", json.TRFMasterId);

    formData.append("FSApprovalStatusAudit", json.FSApprovalStatusAudit);
    formData.append("ApprovedByAudit", json.ApprovedByAudit);
    formData.append("RejectedByAudit", json.RejectedByAudit);


    for (let i = 0; i < json.FinalSettlementsDetails.length; i++) {
        formData.append("FinalSettlementsDetails[" + i + "].Expenses", json.FinalSettlementsDetails[i].Expenses);
        formData.append("FinalSettlementsDetails[" + i + "].Days", json.FinalSettlementsDetails[i].Days);
        formData.append("FinalSettlementsDetails[" + i + "].CostPerDay", json.FinalSettlementsDetails[i].CostPerDay);
        formData.append("FinalSettlementsDetails[" + i + "].Total", json.FinalSettlementsDetails[i].Total);
    }


    for (let i = 0; i < $("#ls_edit_finalSettle_attachment_Flight")[0].files.length; i++) {
        formData.append("FilesFlight", $("#ls_edit_finalSettle_attachment_Flight")[0].files[i]);
    }

    for (let i = 0; i < $("#ls_edit_finalSettle_attachment_hotel")[0].files.length; i++) {
        formData.append("FilesHotel", $("#ls_edit_finalSettle_attachment_hotel")[0].files[i]);
    }

    for (let i = 0; i < $("#ls_edit_finalSettle_attachment_Food")[0].files.length; i++) {
        formData.append("FilesFood", $("#ls_edit_finalSettle_attachment_Food")[0].files[i]);
    }

    for (let i = 0; i < $("#ls_edit_finalSettle_attachment_Transportation")[0].files.length; i++) {
        formData.append("FilesTransportation", $("#ls_edit_finalSettle_attachment_Transportation")[0].files[i]);
    }

    for (let i = 0; i < $("#ls_edit_finalSettle_attachment_Others")[0].files.length; i++) {
        formData.append("FilesOthers", $("#ls_edit_finalSettle_attachment_Others")[0].files[i]);
    }

    $.ajax({
        url: '/FinalSettlement/EditFinalSettlement',
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


function getOrderQuantitiesArrEdit() {
    let OrderQuantitiesArr = [];

    $('#ord_order_table_tbody tr.added-item').each(function () {

        let Expenses = $(this).find(".Expenses_id").val().trim();
        let Days = $(this).find(".Days_id").val().trim();
        let CostPerDay = $(this).find(".CostPerDay_id").val().trim();
        let Total = $(this).find(".Total_id").val().trim();


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

    console.log("ordersdet", OrderQuantitiesArr);
    return OrderQuantitiesArr;
}