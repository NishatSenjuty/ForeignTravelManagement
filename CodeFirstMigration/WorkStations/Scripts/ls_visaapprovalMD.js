

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
        page: page,
        limit: 10

    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/MDVisaApproval/ShowVisaRequisitionMD",
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

function convertJsonDateNew(date) {
    if (!date || typeof date !== "string" || date.length < 6) {
        return "Invalid Date";
    }

    try {
        var timestamp = parseInt(date.substr(6), 10); 
        var fullDate = new Date(timestamp);

        if (isNaN(fullDate.getTime())) {
            return "Invalid Date";
        }

        var day = String(fullDate.getDate()).padStart(2, '0');
        var month = String(fullDate.getMonth() + 1).padStart(2, '0'); 
        var year = String(fullDate.getFullYear()).slice(-2); 

        return `${day}/${month}/${year}`;
    }
    catch (error) {
        return "Invalid Date";
    }
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
        var CompanyName = $("<td>").append(value.CompanyShortName);
        var DesignationName = $("<td>").append(value.DesignationName);
        var FullName = $("<td>").append(value.FullName);
        var country = $("<td>").append(value.CountryNameUser);

        var DepartureUser = $("<td>").append(value.DepartureUser ? convertJsonDateNew(value.DepartureUser) : " ");
        var ReturnUser = $("<td>").append(value.ReturnUser ? convertJsonDateNew(value.ReturnUser) : " ");

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


        $("<tr>").attr("class", "text-center").append(iconcell, FullName, CompanyName, DesignationName, country,
            DepartureUser, ReturnUser).appendTo("#ls_EmpInfo_table_tbody");

        (function ($) {
            previewicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_add_visareq_modal").modal("show");

                if (value.TypeOfVisaUser == 1) {
                    $("#ls_add_visareq_other_visatype").val("Business");
                }
                else if (value.TypeOfVisaUser == 2) {
                    $("#ls_add_visareq_other_visatype").val("Tourist");
                }
                else if (value.TypeOfVisaUser == 3) {
                    $("#ls_add_visareq_other_visatype").val("Transit");
                }
                else if (value.TypeOfVisaUser == 4) {
                    $("#ls_add_visareq_other_visatype").val(value.TypeOfVisaOtherUser);
                }
                else {
                    $("#ls_add_visareq_other_visatype").val("");
                }


                if (value.TypeOfVisaUser == 1) {
                    $("#ls_add_visareq_other_travel").val("Business");
                }
                else if (value.TypeOfVisaUser == 2) {
                    $("#ls_add_visareq_other_travel").val("Conference");
                }
                else if (value.TypeOfVisaUser == 3) {
                    $("#ls_add_visareq_other_travel").val("Training");
                }
                else if (value.TypeOfVisaUser == 4) {
                    $("#ls_add_visareq_other_travel").val(value.PurposeOfTravelOtherUser);
                }
                else {
                    $("#ls_add_visareq_other_travel").val("");
                }


                $("#ls_add_visareq_EntryDate").val(value.EntryDateUser ? convertJsonDate(value.EntryDateUser) : null);
                $("#ls_add_visareq_remarks").val(value.RemarksUser);


                //NID and Passport files

                //$(".uploaded-design_passport").empty();

                //$.each(value.totissue, function (index, _value) {

                //    let btnGroupDiv = $("<div>").attr({ "class": "btn-group m-1", role: "group", id: "fileId-" + _value.Id });
                //    let btnGroupAnc = $("<a>").attr({ "class": "btn btn-primary", href: _value.location, target: "_blank", "data-id": _value.Id }).appendTo(btnGroupDiv);
                //    let btnGroupAncIcon = $("<i>").attr({ "class": "bi bi-file-earmark" }).appendTo(btnGroupAnc);

                //    if (value.totissue.length > 0) {
                //        let smallElement = $("<small>").attr({ "class": "text-muted" }).text("NID/Passport file");
                //        btnGroupAnc.append(smallElement);
                //    }

                //    $(".uploaded-design_passport").append(btnGroupDiv);

                //});


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
