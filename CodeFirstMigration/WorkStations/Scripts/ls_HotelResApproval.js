


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
    load_HotelReservation_table(1);
});



load_HotelReservation_table(1);

function load_HotelReservation_table(page) {


    json = {

        limit: $("#filter_limit").val(),
        CompanyId: $("#ls_filter_rp_EmpInfo_Company").val() || -1,
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").val() || -1,
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").val() || -1,
        HotelReservationNoText: $("#filter_hotelresv_no").val(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        HotelApprovalStatus: $("#filter_gatepass_status").val(),
        page: page,
        limit: 10

    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/HotelReservApproval/ShowHotelReservApproval",
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


        $("<tr>").attr("class", "text-center").append(slnocell, iconcell, HotelReservationNoText, EmployeeId, FullName, ContactNo,
            CompanyName, DepartmentName, DesignationName, CountryNameUser, CityName, CheckInDateUser, CheckOutDateUser, SpecialReqUser, EventDateUser).appendTo("#ls_EmpInfo_table_tbody");

        (function ($)
        {
            previewicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_add_hotelresv_modal").modal("show");

                $("#ls_add_hotelresv_visaReqno").val(value.VisaRequisitionNo);
                $("#ls_add_hotelresv_ticketReqno").val(value.TicketRequisitionNo);
                $("#ls_add_hotelresv_country").val(value.CountryNameUser);
                $("#ls_add_hotelresv_destinationCity").val(value.CityUser);

                $("#ls_add_hotelresv_CheckInDate").val(value.CheckInDateUser ? convertJsonDate(value.CheckInDateUser) : null);
                $("#ls_add_hotelresv_CheckOutDate").val(value.CheckOutDateUser ? convertJsonDate(value.CheckOutDateUser) : null);

                $("#ls_add_hotelresv_room").val(value.RoomTypeUser);
                $("#ls_add_hotelresv_hotel").val(value.PreferedHotelUser);
                $("#ls_add_hotelresv_loc").val(value.PreferedLocationUser);
                $("#ls_add_hotelresv_budget").val(value.BudgetUser);
                $("#ls_add_hotelresv_meetadd").val(value.EventAddressUser);



                $("#ls_add_hotelresv_meetdt").val(value.EventDateUser ? convertJsonDate(value.EventDateUser) : null);


                let lth = value.EventTimeUser.Hours;
                if (lth < 10) {
                    lth = "0" + value.EventTimeUser.Hours;
                }
                let ltm = value.EventTimeUser.Minutes;
                if (ltm < 10) {
                    ltm = "0" + value.EventTimeUser.Minutes;
                }
                let losttime = Boolean(value.EventTimeUser) == true ? lth + ":" + ltm : null;

                $("#ls_add_hotelresv_meetTimeTD").val(losttime);
                $("#ls_add_hotelresv_spereq").val(value.SpecialReqUser);
                $("#ls_add_hotelresv_loyalprogno").val(value.LoyaltyProgNo);

            });


            //approvedicon.on("click", function (e)
            //{
            //    e.preventDefault();

            //    $("#ls_approve_requisition_modal").modal("show");
            //    $("#ls_approve_hotelresv_id_hidden").data("Id", value.Id);

            //});
            //rejectedicon.on("click", function (e) {
            //    e.preventDefault();

            //    $("#ls_reject_requisition_modal").modal("show");
            //    $("#ls_reject_hotelresv_id_hidden").data("Id", value.Id);
            //});
        })(jQuery);
    });
}


$("#ls_approve_requisition_modal_form").on("submit", function (e) {
    e.preventDefault();

    json = {
        Id: $("#ls_approve_hotelresv_id_hidden").data("Id")
    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/HotelReservApproval/ApproveHotelReservApproval",
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
        Id: $("#ls_reject_hotelresv_id_hidden").data("Id"),
        CommentsSupervisor: $("#reject_comments").val()
    };

    //console.log("json", json);

    $.ajax({
        type: "POST",
        url: "/HotelReservApproval/RejectHotelReservApproval",
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