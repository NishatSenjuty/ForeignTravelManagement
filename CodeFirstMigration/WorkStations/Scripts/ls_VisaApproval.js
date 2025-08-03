

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


$("#gatepass_filter_form").on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

$("#ls_filter_btn").on("click", function (e) {
    e.preventDefault();
    load_VisaRequisition_table(1);
});

load_VisaRequisition_table(1);

function load_VisaRequisition_table(page) {


    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        VisaRequisitionNoText: $("#filter_visareq_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        VisaApprovalStatus: $("#filter_status").val(),
        page: page,
        limit: 10

    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/VisaApproval/ShowVisaRequisition",
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

        let CountryNameUser2 = value.CountryNameUser;

        if (CountryNameUser2 == -1) {
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

        var CommentsSupervisor = $("<td>");

        if (value.CommentsSupervisor != null) {
            $("<div>").attr("class", "badge bg-success").append(value.CommentsSupervisor).appendTo(CommentsSupervisor);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(CommentsSupervisor);
        }

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);

        //var previewicon = $("<i>").attr({
        //    "class": "bi-eye-fill btn icon btn-primary rounded-circle shadow",
        //    "style": "font-size: 18px; cursor: pointer; border: 2px solid white;",
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
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Approved"
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
        //    "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
        //    "title": "Rejected"
        //}).appendTo(icondiv);

        var rejectedicon = $("<img>").attr({
            "src": "/_Assets/Icons/reject.png",
            "alt": "Reject Icon",
            "title": "Reject",
            "style": "cursor: pointer; border: 2px solid white; width: 43px; height: 43px;"
        });

        icondiv.append(rejectedicon);


        $("<tr>").attr("class", "text-center").append(slnocell, iconcell, VisaRequisitionNoText, EmployeeId, FullName, CompanyName, DepartmentName, DesignationName,
            TypeOfVisaUser, CountryNameUser, PurposeOfTravelUser, DepartureUser, ReturnUser,   
            EntryDateUser, SpecialReqUser, RemarksUser, VisaReqActiveStatus, VisaApprovalStatus, CommentsSupervisor).appendTo("#ls_EmpInfo_table_tbody");

        (function ($) {
            previewicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_add_visareq_modal").modal("show");


                $("#ls_add_visareq_reqno").val(value.VisaRequisitionNoText);
                $("#ls_add_visareq_visatype").val(value.TypeOfVisaUser);
                $("#ls_add_visareq_other_visatype").val(value.TypeOfVisaOtherUser);
                $("#ls_add_visareq_prevvisited").val(value.PreviouslyDestinedUser);
                $("#ls_add_visareq_other_prevvisited_visatype").val(value.VisaTypePreviousUser);
                $("#ls_add_visareq_other_prevvisited_issuedate").val(value.IssueDatePrevUser ? convertJsonDate(value.IssueDatePrevUser) : null);
                $("#ls_add_visareq_other_prevvisited_expdate").val(value.ExpiryDatePrevUser ? convertJsonDate(value.ExpiryDatePrevUser) : null);
                $("#ls_add_visareq_country").val(value.CountryNameUser);
                $("#ls_add_visareq_travel").val(value.PurposeOfTravelUser);
                $("#ls_add_visareq_other_travel").val(value.PurposeOfTravelOtherUser);
                $("#ls_add_visareq_EntryDate").val(value.EntryDateUser ? convertJsonDate(value.EntryDateUser) : null);
                $("#ls_add_visareq_other_travel").val(value.PurposeOfTravelOtherUser);
                $("#ls_add_visareq_EntryDate").val(value.EntryDateUser ? convertJsonDate(value.EntryDateUser) : null);
                $("#ls_add_visareq_TravelDate_dep").val(value.DepartureUser ? convertJsonDate(value.DepartureUser) : null);
                $("#ls_add_visareq_TravelDate_ret").val(value.ReturnUser ? convertJsonDate(value.ReturnUser) : null);
                $("#ls_add_visareq_accodet").val(value.AccomodationDetUser);
                $("#ls_add_visareq_spreq").val(value.SpecialReqUser);
                $("#ls_add_visareq_remarks").val(value.RemarksUser);
                $("#ls_add_visareq_status").val(value.VisaReqActiveStatus);

                //NID and Passport files

                //console.log("totissue", value.totissue);
                //console.log("visaReqAtt", value.visaReqAtt);

                $(".uploaded-design_passport").empty();

                $.each(value.totissue, function (index, _value) {

                    let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value.Id });
                    let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value.location, target: "_blank", "data-id": _value.Id }).appendTo(btnGroupDiv);
                    let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                    if (value.totissue.length > 0) {
                        let smallElement = $("<small>").attr({ "class": "text-muted" }).text("NID/Passport file");
                        btnGroupAnc.append(smallElement);
                    }

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

                    $(".uploaded-design_invitation").append(btnGroupDiv);
                });


            });
            approvedicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_approve_requisition_modal").modal("show");
                $("#ls_approve_visareq_id_hidden").data("Id", value.Id);

            });

            rejectedicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_reject_requisition_modal").modal("show");
                $("#ls_reject_visareq_id_hidden").data("Id", value.Id);
            });
        })(jQuery);
    });
}



$("#ls_approve_requisition_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_approve_visareq_id_hidden").data("Id")
    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/VisaApproval/ApproveVisaApproval",
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



$("#ls_reject_requisition_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_reject_visareq_id_hidden").data("Id"),
        CommentsSupervisor: $("#reject_comments").val()
    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/VisaApproval/RejectVisaApproval",
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