

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

    if (userRoleId == '7') {
        e.preventDefault();
        load_FinalSettlement_table_audit(1);

    }

    else if (userRoleId == '4') {
        e.preventDefault();
        load_FinalSettlement_table_management(1);
    }
});

if (userRoleId == '2') {   //Supervisor
    load_FinalSettlement_table_Supervisor(1);
}

//Supervisor

function load_FinalSettlement_table_Supervisor(page) {

    json = {
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TRFNo: $("#filter_disburse_no").val(),
        ApprovalStatusSup: $("#filter_gatepass_status").val()
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/FinalSettlementApproval/ShowFinalSettlementSup",
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
                show_FinalSettlement_list_Sup(resp);

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

function show_FinalSettlement_list_Sup(resp) {
    $("#ls_EmpInfo_table_tbody").empty();



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
        var Remarks = $("<td>").append(value.Remarks);
        var CommentsManagement = $("<td>");

        if (value.CommentsManagement != null) {
            $("<div>").attr("class", "badge bg-danger").append(value.CommentsManagement).appendTo(CommentsManagement);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(CommentsManagement);
        }

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

        var ApprovalStatusSup = $("<td>");

        if (value.ApprovalStatusSup == 1) {
            $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(ApprovalStatusSup);
        }
        else if (value.ApprovalStatusSup == 2) {
            $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(ApprovalStatusSup);
        }
        else if (value.ApprovalStatusSup == 3) {
            $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(ApprovalStatusSup);
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


        try {
            if (value.FSApprovalStatusAudit == 1) {
                icondiv.addClass("disabled");
            }
        }
        catch {

        }



        $("<tr>").attr("class", "text-center").append(slnocell, iconcell, TRFNo, EmployeeId, FullName, ContactNo,
            CompanyName, DepartmentName, DesignationName, DisbursedAmount, Cost, RemainingBalance, Remarks, ApprovalStatusSup, CommentsSupervisor,  FSApprovalStatusAudit, FSApprovalStatusManagement,
            CommentsManagement).appendTo("#ls_EmpInfo_table_tbody");

        (function ($) {
            selecticon.on("click", function (e) {
                e.preventDefault();
                //console.log(value);

                $("#ls_add_FSapproval_modal").modal("show");

                $("#ls_NeedleReq_add_AmountApp").attr("disabled", true);
                $("#ls_NeedleReq_add_remarks").attr("disabled", true);

                $('#applicant_name').text(value.FullName);
                $('#applicant_employee_id').text(value.EmployeeId);
                $('#applicant_company').text(value.CompanyName);
                $('#applicant_department').text(value.DepartmentName);
                $('#applicant_designation').text(value.DesignationName);

                $("#ls_team_table_edit_tbody tr.added-item").empty();
                $.each(value.Requistionorderdetails, async function (index, _value2) {
                    create_order_item_row_for_edit_Det(_value2);
                });

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


                $("#travelBalance").data("Id", value.Id);
                $("#travelCost").data("TRFNo", value.TRFNo);

                $("#travelBalance").val(value.RemainingBalance);
                $("#travelCost").val(value.Cost);
                $("#totalCostApproved").val(value.DisbursedAmount);

                //$("#ls_NeedleReq_add_AmountApp").val(value.ApprovedFSamount);
                //$("#ls_NeedleReq_add_remarks").val(value.RemarksFSapproval);

                $("#ls_NeedleReq_add_AmountApp").val(value.ApprovedFSamount === null ? "" : value.ApprovedFSamount);
                $("#ls_NeedleReq_add_remarks").val(value.RemarksFSapproval === null ? "" : value.RemarksFSapproval);


                var remainBal = $("#travelBalance").val() || 0;

                setTimeout(function () {

                    if (remainBal < 0) {
                        $("#travelComments").val("The applicant should return the excess amount of BDT " + Math.abs(remainBal).toFixed(2) + " to the accounts department.");
                    }
                    else if (remainBal > 0) {
                        $("#travelComments").val("The applicant is entitled to receive the remaining amount of BDT " + Math.abs(remainBal).toFixed(2) + " upon approval.");
                    }
                    else {
                        $("#travelComments").val("No balance remaining. No further action required.");
                    }

                }, 1000);


                /*Flight*/

                $(".uploaded-design-edit-flight").empty();

                $.each(value.FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Flight") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Flight Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        $(".uploaded-design-edit-flight").append(btnGroupDiv);
                    }
                });


                /*Hotel*/

                $(".uploaded-design-edit-hotel").empty();

                $.each(value.FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Hotel") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Hotel Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        $(".uploaded-design-edit-hotel").append(btnGroupDiv);
                    }
                });

                /*Food and allowance*/

                $(".uploaded-design-edit-food").empty();

                $.each(value.FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Food") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Food and Allowance Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        $(".uploaded-design-edit-food").append(btnGroupDiv);
                    }
                });


                /*Transportation*/

                $(".uploaded-design-edit-transportation").empty();

                $.each(value.FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Transportation") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Transportation Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        $(".uploaded-design-edit-transportation").append(btnGroupDiv);
                    }
                });


                /*Others*/

                $(".uploaded-design-edit-others").empty();

                $.each(value.FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Others") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Other Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        $(".uploaded-design-edit-others").append(btnGroupDiv);
                    }
                });

                try {

                    // alert();

                    if (value.FSApprovalStatusManagement == 1) {
                        $("#ls_add_FSapproval_modal").find(".modal-footer").hide();
                    }
                }
                catch {

                }

            });

        })(jQuery);
    });
}


if (userRoleId == '2') {   //Supervisor
    $(document).ready(function () {
        $('#reject-btn').on('click', function () {
            $('#ls_reject_requisition_modal_sup').modal('show');
        });
    });
}


//Supervisor - Approve

if (userRoleId == '2') {

    $(document).ready(function () {
        $("#approve-btn").on("click", function (e) {
            e.preventDefault();
            $("#ls_add_FSapproval_modal_form").submit();
        });


        $("#ls_add_FSapproval_modal_form").on("submit", function (e) {
            e.preventDefault();

            json = {
                Id: $("#travelBalance").data("Id"),
                TRFNo: $("#travelCost").data("TRFNo"),

            };

            //console.log("json", json);

            $.ajax({
                type: "POST",
                url: "/FinalSettlementApproval/ApproveTRFApprovalSup",
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
    });
}


//Supervisor - Reject

if (userRoleId == '2') {

    $("#ls_reject_requisition_modal_form_sup").on("submit", function (e) {
        e.preventDefault();

        json = {
            Id: $("#travelBalance").data("Id"),
            TRFNo: $("#travelCost").data("TRFNo"),
            CommentsSupervisor: $("#reject_comments_sup").val(),
        };

        //console.log("json", json);

        $.ajax({
            type: "POST",
            url: "/FinalSettlementApproval/RejectTRFApprovalSup",
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
}




///////////////////////////////////////////////////////////////////////////////////





//Audit

if (userRoleId == '7') {   //Audit
    load_FinalSettlement_table_audit(1);
}


function load_FinalSettlement_table_audit(page) {

    json = {
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        TRFNo: $("#filter_disburse_no").val(),
        VisaRequisitionNo: $("#filter_visareq_no").val(),
        FSApprovalStatusAudit: $("#filter_gatepass_status").val()
    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/FinalSettlementApproval/ShowFinalSettlement",
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

//Audit
function show_FinalSettlement_list(resp) {
    $("#ls_EmpInfo_table_tbody").empty();



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
        var Remarks = $("<td>").append(value.Remarks);
        var CommentsManagement = $("<td>");

        if (value.CommentsManagement != null) {
            $("<div>").attr("class", "badge bg-danger").append(value.CommentsManagement).appendTo(CommentsManagement);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(CommentsManagement);
        }

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


        var ApprovalStatusSup = $("<td>");

        if (value.ApprovalStatusSup == 1) {
            $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(ApprovalStatusSup);
        }
        else if (value.ApprovalStatusSup == 2) {
            $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(ApprovalStatusSup);
        }
        else if (value.ApprovalStatusSup == 3) {
            $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(ApprovalStatusSup);
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


        try {
            if (value.FSApprovalStatusManagement == 1) {
                icondiv.addClass("disabled");
            }
        }
        catch {

        }



        $("<tr>").attr("class", "text-center").append(slnocell, iconcell, TRFNo, EmployeeId, FullName, ContactNo,
            CompanyName, DepartmentName, DesignationName, DisbursedAmount, Cost, RemainingBalance, Remarks, ApprovalStatusSup, CommentsSupervisor, FSApprovalStatusAudit, FSApprovalStatusManagement,
            CommentsManagement).appendTo("#ls_EmpInfo_table_tbody");

        (function ($) {
            selecticon.on("click", function (e) {
                e.preventDefault();
                //console.log(value);

                $("#ls_add_FSapproval_modal").modal("show");


                $('#applicant_name').text(value.FullName);
                $('#applicant_employee_id').text(value.EmployeeId);
                $('#applicant_company').text(value.CompanyName);
                $('#applicant_department').text(value.DepartmentName);
                $('#applicant_designation').text(value.DesignationName);

                $("#ls_team_table_edit_tbody tr.added-item").empty();
                $.each(value.Requistionorderdetails, async function (index, _value2) {
                    create_order_item_row_for_edit_Det(_value2);
                });

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


                $("#travelBalance").data("Id", value.Id);
                $("#travelCost").data("TRFNo", value.TRFNo);

                $("#travelBalance").val(value.RemainingBalance);
                $("#travelCost").val(value.Cost);
                $("#totalCostApproved").val(value.DisbursedAmount);

                //$("#ls_NeedleReq_add_AmountApp").val(value.ApprovedFSamount);
                //$("#ls_NeedleReq_add_remarks").val(value.RemarksFSapproval);

                $("#ls_NeedleReq_add_AmountApp").val(value.ApprovedFSamount === null ? "" : value.ApprovedFSamount);
                $("#ls_NeedleReq_add_remarks").val(value.RemarksFSapproval === null ? "" : value.RemarksFSapproval);


                var remainBal = $("#travelBalance").val() || 0;

                setTimeout(function () {

                    if (remainBal < 0) {
                        $("#travelComments").val("The applicant should return the excess amount of BDT " + Math.abs(remainBal).toFixed(2) + " to the accounts department.");
                    }
                    else if (remainBal > 0) {
                        $("#travelComments").val("The applicant is entitled to receive the remaining amount of BDT " + Math.abs(remainBal).toFixed(2) + " upon approval.");
                    }
                    else {
                        $("#travelComments").val("No balance remaining. No further action required.");
                    }

                }, 1000);


                /*Flight*/

                $(".uploaded-design-edit-flight").empty();

                $.each(value.FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Flight") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Flight Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        $(".uploaded-design-edit-flight").append(btnGroupDiv);
                    }
                });


                /*Hotel*/

                $(".uploaded-design-edit-hotel").empty();

                $.each(value.FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Hotel") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Hotel Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        $(".uploaded-design-edit-hotel").append(btnGroupDiv);
                    }
                });

                /*Food and allowance*/

                $(".uploaded-design-edit-food").empty();

                $.each(value.FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Food") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Food and Allowance Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        $(".uploaded-design-edit-food").append(btnGroupDiv);
                    }
                });


                /*Transportation*/

                $(".uploaded-design-edit-transportation").empty();

                $.each(value.FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Transportation") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Transportation Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        $(".uploaded-design-edit-transportation").append(btnGroupDiv);
                    }
                });


                /*Others*/

                $(".uploaded-design-edit-others").empty();

                $.each(value.FinalAttachmentFiles, function (index, _value2) {

                    if (_value2.FileType == "Others") {
                        let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value2.Id });
                        let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value2.location, target: "_blank", "data-id": _value2.Id }).appendTo(btnGroupDiv);
                        let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                        if (value.FinalAttachmentFiles.length > 0) {
                            let smallElement = $("<small>").attr({ "class": "text-muted" }).text("Other Cost Documents.");
                            btnGroupAnc.append(smallElement);
                        }

                        $(".uploaded-design-edit-others").append(btnGroupDiv);
                    }
                });

                try {

                    // alert();

                    if (value.FSApprovalStatusManagement == 1) {
                        $("#ls_add_FSapproval_modal").find(".modal-footer").hide();
                    }
                }
                catch {

                }

            });

        })(jQuery);
    });
}


//Audit - Approve

if (userRoleId == '7') {
    $(document).ready(function () {
        $("#approve-btn").on("click", function (e) {
            e.preventDefault();
            $("#ls_add_FSapproval_modal_form").submit();
        });


        $("#ls_add_FSapproval_modal_form").on("submit", function (e) {
            e.preventDefault();

            json = {
                Id: $("#travelBalance").data("Id"),
                RemarksFSapproval: $("#ls_NeedleReq_add_remarks").val(),
                ApprovedFSamount: $("#ls_NeedleReq_add_AmountApp").val(),
                TRFNo: $("#travelCost").data("TRFNo"),

            };

            //console.log("json", json);

            $.ajax({
                type: "POST",
                url: "/FinalSettlementApproval/ApproveTRFApproval",
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
    });
}


if (userRoleId == '7') {   //Audit
    $(document).ready(function () {
        $('#reject-btn').on('click', function () {
            $('#ls_reject_requisition_modal_audit').modal('show');
        });
    });
}

//Audit - Reject

if (userRoleId == '7') {
    $("#ls_reject_requisition_modal_form_audit").on("submit", function (e) {
        e.preventDefault();

        json = {
            Id: $("#travelBalance").data("Id"),
            RemarksFSapproval: $("#ls_NeedleReq_add_remarks").val(),
            ApprovedFSamount: $("#ls_NeedleReq_add_AmountApp").val(),
            TRFNo: $("#travelCost").data("TRFNo"),

        };

        console.log("json", json);

        $.ajax({
            type: "POST",
            url: "/FinalSettlementApproval/RejectTRFApproval",
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
}




//////////////////////////////////////////////////////////////////////



//Management

if (userRoleId == '4') {   //Management
    load_FinalSettlement_table_management(1);
}


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
        var Remarks = $("<td>").append(value.Remarks);
        var CommentsManagement = $("<td>").append(value.CommentsManagement);

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


        var ApprovalStatusSup = $("<td>");

        if (value.ApprovalStatusSup == 1) {
            $("<div>").attr("class", "badge bg-success").append("Approved").appendTo(ApprovalStatusSup);
        }
        else if (value.ApprovalStatusSup == 2) {
            $("<div>").attr("class", "badge bg-warning").append("Pending").appendTo(ApprovalStatusSup);
        }
        else if (value.ApprovalStatusSup == 3) {
            $("<div>").attr("class", "badge bg-danger").append("Rejected").appendTo(ApprovalStatusSup);
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
        //var previewicon = $("<i>").attr({
        //    "class": "bi-eye-fill btn icon btn-primary rounded-circle shadow",
        //    "style": "font-size: 15px; cursor: pointer; border: 2px solid white;",
        //    "title": "Preview"
        //}).appendTo(icondiv);

        var previewicon = $("<img>").attr({
            "src": "/_Assets/Icons/view_updated2.png",
            "alt": "Preview Icon",
            "title": "Preview",
            "style": "cursor: pointer; border: 2px solid white; width: 46px; height: 46px;"
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
            "style": "cursor: pointer; border: 2px solid white; width: 43px; height: 43px;"
        });

        icondiv.append(approvedicon);

        //var rejectedicon = $("<i>").attr({
        //    "class": "bi bi-x text-white bg-secondary rounded-circle shadow",
        //    "style": "font-size: 15px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Reject"
        //}).appendTo(icondiv);

        var rejectedicon = $("<img>").attr({
            "src": "/_Assets/Icons/reject.png",
            "alt": "Reject Icon",
            "title": "Reject",
            "style": "cursor: pointer; border: 2px solid white; width: 43px; height: 43px;"
        });

        icondiv.append(rejectedicon);


        $("<tr>").attr("class", "text-center").append(slnocell, iconcell, TRFNo, EmployeeId, FullName, ContactNo,
            CompanyName, DepartmentName, DesignationName, DisbursedAmount, Cost, RemainingBalance,
            Remarks, ApprovalStatusSup, CommentsSupervisor, FSApprovalStatusAudit, FSApprovalStatusManagement,
            CommentsManagement).appendTo("#ls_EmpInfo_table_tbody");

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


                var remainBal = $("#travelBalance").val() || 0;

                setTimeout(function () {

                    if (remainBal < 0) {
                        $("#travelComments").val("The applicant should return the excess amount of BDT " + Math.abs(remainBal).toFixed(2) + " to the accounts department.");
                    }
                    else if (remainBal > 0) {
                        $("#travelComments").val("The applicant is entitled to receive the remaining amount of BDT " + Math.abs(remainBal).toFixed(2) + " upon approval.");
                    }
                    else {
                        $("#travelComments").val("No balance remaining.");
                    }

                }, 1000);

                $("#ls_add_FSapproval_modal").find(".modal-footer").hide();

            });

            approvedicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_approve_requisition_modal").modal("show");
                $("#ls_approve_hotelresv_id_hidden").data("Id", value.Id);
                $("#ls_approve_hotelresv_id_hidden").data("TRFNo", value.TRFNo);


            });
            rejectedicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_reject_requisition_modal").modal("show");
                $("#ls_reject_hotelresv_id_hidden").data("Id", value.Id);
                $("#reject_comments").data("TRFNo", value.TRFNo);
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





//Management
$("#ls_approve_requisition_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_approve_hotelresv_id_hidden").data("Id"),
        TRFNo: $("#ls_approve_hotelresv_id_hidden").data("TRFNo")
    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/FinalSettlementApproval/ApproveFinalSettlementApproval",
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


//Reject Management

$("#ls_reject_requisition_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_reject_hotelresv_id_hidden").data("Id"),
        CommentsManagement: $("#reject_comments").val(),
        TRFNo: $("#reject_comments").data("TRFNo")

    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/FinalSettlementApproval/RejectFinalSettlementApproval",
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