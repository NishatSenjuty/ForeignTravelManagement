
load_Company_location_for_dropdown();

load_Designation_for_dropdown();

load_Departments_for_dropdown();

function convertJsonDate(date) {

    var fullDate = new Date(parseInt(date.substr(6)));
    var twoDigitMonth = (fullDate.getMonth() + 1) + ""; if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;

    var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
    return twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

}



//Function For Employee Information Page - function of showing Table section in the pagination     *

function show_EmpInfo_table_info(tableRecords) {
    $("#ls_EmpInfo_table_info").empty();
    $("#ls_EmpInfo_table_info").append('TotalRecords: ' + tableRecords + ' | TotalPage: ' + Math.ceil(tableRecords / $("#ls_filter_limit").val()));

}

//Function For Employee Information Page - Pagination: GoTo Next Page     *

$("#ls_EmpInfo_next_list_click").on("click", function () {
    var currentPage = parseInt($("#ls_EmpInfo_pagination_page_no").text());
    load_company_table(currentPage + 1);
    $("#$ls_EmpInfo_pagination_page_no").text(currentPage + 1);
});

//Function For Employee Information Page - Pagination: No input    *

$("#ls_EmpInfo_pagination_page_no").on("click", function () {
    $("#$ls_EmpInfo_pagination_page_no").addClass("display-none");
    $("#$ls_EmpInfo_pagination_page_no_input").removeClass("display-none");
    $("#$ls_EmpInfo_pagination_page_no_input").focus();
});

$("#ls_EmpInfo_pagination_page_no_input").blur(function () {
    $("#$ls_EmpInfo_pagination_page_no_input").addClass("display-none");
    $("#$ls_EmpInfo_pagination_page_no").removeClass("display-none");
});

//Function For Employee Information Page - Pagination: GoTo previous Page   *

$("#ls_EmpInfo_previous_list_click").on("click", function () {
    var currentPage = parseInt($("#ls_EmpInfo_pagination_page_no").text());
    if (currentPage == 1) {
        iziToast.warning({
            title: 'Warning!',
            message: "You are in page 1.",
            position: 'bottomRight'
        });
    }
    else {
        load_company_table(currentPage - 1);
        $("#$ls_EmpInfo_pagination_page_no").test(currentPage - 1);
    }
});

$("#ls_EmpInfo_pagination_page_no_input").keydown(function (e)
{
    if (e.keyCode == 13)
    {
        if ($("#ls_EmpInfo_pagination_page_no_input").val() > 0)
        {
            load_EmpInfo_table($("#ls_EmpInfo_pagination_page_no_input").val());
            $("#ls_EmpInfo_pagination_page_no").text($("#ls_EmpInfo_pagination_page_no_input").val());
            $("#ls_EmpInfo_pagination_page_no_input").val("");
            $("#ls_EmpInfo_pagination_page_no").removeClass("display-none");
            $("#ls_EmpInfo_pagination_page_no_input").addClass("display-none");
        }

        else {
            $("#ls_EmpInfo_pagination_page_no_input").val("");
            iziToast.warning({
                title: 'Warning!',
                message: "Page no. should be greater than zero.",
                position: 'bottomRight'
            });
        }
    }
    else if (e.keyCode == 27) {
        $("#ls_EmpInfo_pagination_page_no").removeClass("display-none");
        $("#ls_EmpInfo_pagination_page_no_input").addClass("display-none");

    }
});



//Function For Employee Page - Add Employee Button - Show Add Employee Modal Page *

$("#ls_add_EmpInfo_btn").on("click", function () {
    $("#ls_add_EmpInfo_modal").modal("show");
    $("#ls_add_EmpInfo_modal_form").trigger("reset");
    $("#ls_add_EmpInfo_modal_form").removeClass('was-validated');


    $("#ls_add_EmpInfo_JoinDate").val(getCurrDate());
    $("#ls_add_EmpInfo_dob").val(getCurrDate());

});

function getCurrDate() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}

$("#ls_add_EmpInfo_JoinDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_add_EmpInfo_dob").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_EmpInfo_JoinDate").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});

$("#ls_edit_EmpInfo_dob").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //minDate: new Date(),
    //maxDate: new Date(),
    //alert();

});


//For Employee Information page - with session - to get the data of company, floor and location

function load_Company_location_for_dropdown() {

    $.ajax({
        type: "POST",
        url: "/Companies/ShowCompaniesForDropDown",
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

                var companies = resp.data;
                //console.log("company", companies);

                $("#ls_add_EmpInfo_company").empty();
                $("#ls_edit_EmpInfo_company").empty();



                $("#ls_add_EmpInfo_company").append('<option value="">Select Company</option>');
                $("#ls_edit_EmpInfo_company").append('<option value="">Select Company</option>')

                $.each(companies, function (index, value) {
                    $("#ls_add_EmpInfo_company").append('<option value="' + value.Id + '">' + value.CompanyName + '</option>');
                    $("#ls_edit_EmpInfo_company").append('<option value="' + value.Id + '">' + value.CompanyName + '</option>');
                });

                $("#ls_add_EmpInfo_company").on("change", function (e) {
                    e.preventDefault();
                    $("#ls_add_EmpInfo_location").empty();
                    $("#ls_add_EmpInfo_location").append('<option value="">Select Location</option>');
                    let companyId = $("#ls_add_EmpInfo_company").val();
                    //console.log("company-id", companyId);
                    var companyInfo = companies.find(e => e.Id === parseInt(companyId));
                    console.log("company-find", companyInfo);
                    //console.log("comp", companyInfo.Locations);
                    $.each(companyInfo.Locations, function (index, value) {
                        $("#ls_add_EmpInfo_location").append('<option value="' + value.Id + '">' + value.LocationName + '</option>');
                    });
                })

                $("#ls_edit_EmpInfo_company").on("change", function (e)
                {
                    e.preventDefault();
                    $("#ls_edit_EmpInfo_location").empty();
                    $("#ls_edit_EmpInfo_location").append('<option value="">Select Location</option>')
                    let companyId = $("#ls_edit_EmpInfo_company").val();
                    //console.log("company-id", companyId);
                    var companyInfo = companies.find(e => e.Id === parseInt(companyId));
                    //console.log("company-find", companyInfo);
                    

                    $.each(companyInfo.Locations, function (index, value) {
                        $("#ls_edit_EmpInfo_location").append('<option value="' + value.Id + '">' + value.LocationName + '</option>');
                    });
                })
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

            $("#ls_add_EmpInfo_company").attr("disabled", true);
            $("#ls_edit_EmpInfo_company").attr("disabled", true);

        },

        complete: function () {
            // $("#ls_location_loading_spinner").hide();

            $("#ls_add_EmpInfo_company").attr("disabled", false);
            $("#ls_edit_EmpInfo_company").attr("disabled", false);
        }
    });
}

//DropDown for Designation

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
                $("#ls_add_EmpInfo_designation").empty();
                $("#ls_edit_EmpInfo_designation").empty();

                $("#ls_add_EmpInfo_designation").append('<option value="">Select Designation</option>');
                $("#ls_edit_EmpInfo_designation").append('<option value="">Select Designation</option>')

                $.each(resp.data, function (index, value) {
                    $("#ls_add_EmpInfo_designation").append('<option value="' + value.Id + '">' + value.DesignationName + '</option>');
                    $("#ls_edit_EmpInfo_designation").append('<option value="' + value.Id + '">' + value.DesignationName + '</option>');
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
            else
            {
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
                $("#ls_add_EmpInfo_department").empty();
                $("#ls_edit_EmpInfo_department").empty();

                $("#ls_add_EmpInfo_department").append('<option value="">Select Department</option>');
                $("#ls_edit_EmpInfo_department").append('<option value="">Select Department</option>')

                $.each(resp.data, function (index, value) {
                    $("#ls_add_EmpInfo_department").append('<option value="' + value.Id + '">' + value.Name + '</option>');
                    $("#ls_edit_EmpInfo_department").append('<option value="' + value.Id + '">' + value.Name + '</option>');
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

            $("#ls_add_EmpInfo_department").attr("disabled", true);
            $("#ls_edit_EmpInfo_department").attr("disabled", true);

        },

        complete: function () {
            // $("#ls_location_loading_spinner").hide();

            $("#ls_add_EmpInfo_department").attr("disabled", false);
            $("#ls_edit_EmpInfo_department").attr("disabled", false);
        }
    });
}


//Saving in database

$("#ls_add_EmpInfo_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#ls_add_EmpInfo_modal_form')[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        json = {
            CompanyId: $("#ls_add_EmpInfo_company").val(),
            DepartmentId: $("#ls_add_EmpInfo_department").val(),
            DesignationId: $("#ls_add_EmpInfo_designation").val(),
            LocationId: $("#ls_add_EmpInfo_location").val(),
            EmployeeId: $("#ls_add_EmpInfo_id").val(),
            Name: $("#ls_add_EmpInfo_name").val(),
            JDStr: $("#ls_add_EmpInfo_JoinDate").val(),
            DOBStr: $("#ls_add_EmpInfo_dob").val(),
            Gender: $("#ls_add_EmpInfo_gender").val(),
            Address: $("#ls_add_EmpInfo_address").val(),
            BloodGroup: $("#ls_add_EmpInfo_BloodGroup").val(),
            Salary: $("#ls_add_EmpInfo_salary").val(),
            ContactNo: $("#ls_add_EmpInfo_ContactNo").val(),
            ActiveStatus: $("#ls_add_EmpInfo_status").val()
        };
        //console.log("showjson",json);
        $.ajax({
            url: '/EmployeeInformations/AddEmployeeInformation',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(json),
            beforeSend: function () {
                $("#spinner").show();
            },
            success: function (resp) {
                //alert('ok1');
                if (resp.error) {
                    iziToast.error({
                        title: 'error!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }

                else {
                    $("#ls_add_EmpInfo_modal").modal("hide");
                    iziToast.success({
                        title: 'Saved Successfully!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    load_EmpInfo_table(1);

                    $("#ls_add_EmpInfo_modal_form").removeClass('was-validated');
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

});



//Showing EmpInfo Table View

load_EmpInfo_table(1);

function load_EmpInfo_table(page)
{
    //alert('hello');
    json = {

        CompanyId: $("#ls_filter_rp_EmpInfo_Company").text(),
        DepartmentId: $("#ls_filter_rp_EmpInfo_department").text(),   
        DesignationId: $("#ls_filter_rp_EmpInfo_designation").text(),
        EmployeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        Name: $("#ls_rp_EmpInfo_filter_Name").val(),
        page: page,
        limit: 10  //page limt

    };

    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/EmployeeInformations/ShowEmpInfo",
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
               // show_EmpInfo_list(resp);
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


//Shows data on EmpInfo table

function show_EmpInfo_list(resp) {
    $("#ls_EmpInfo_table_tbody").empty();

    if (resp.data.length <= 0) {
        iziToast.warning({
            title: 'Warning!',
            message: "Data Not Available",
            position: 'bottomRight'
        });
    }

    var sl = parseInt((($("#ls_filter_limit").val() * $("#ls_EmpInfo_pagination_page_no").text()) - $("#ls_filter_limit").val()));
    var sl = 0;

    $.each(resp.data, function (index, value) {
        console.log(value);
        var slnocell = $("<td>").attr("scope", "row").append(sl += 1);
        //var slnocell = $("<td>").append(index + 1);
        var EmployeeId = $("<td>").append(value.EmployeeId);
        var EmployeeName = $("<td>").append(value.EmployeeName);
        var companyName = $("<td>").append(value.CompanyName);
        var locationName = $("<td>").append(value.LocationName);
        var departmentName = $("<td>").append(value.DepartmentName);
        var designationName = $("<td>").append(value.DesignationName);
        var ContactNo = $("<td>").append(value.ContactNo);
        var ActiveStatus = $("<td>");

        if (value.ActiveStatus == 1) {
            $("<div>").attr("class", "badge bg-success").append("Active").appendTo(ActiveStatus);
        }
        else if (value.ActiveStatus == 0) {
            $("<div>").attr("class", "badge bg-danger").append("Inactive").appendTo(ActiveStatus);
        }
        else {
            $("<div>").attr("class", "badge bg-danger").append("-").appendTo(ActiveStatus);
        }

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
        var editicon = $("<i>").attr({
            "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
            "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
            "title": "Edit Employee Information"
        }).appendTo(icondiv);
        var deleteicon = $("<i>").attr({
            "class": "e-btn bi-trash-fill text-white bg-danger rounded-circle shadow",
            "style": "font-size: 18px; padding:10px; cursor: pointer; border: 2px solid white;",
            "title": "Delete Employee Information"
        }).appendTo(icondiv);
        //alert('hello');
        
        $("<tr>").attr("class", "text-center").append(slnocell, EmployeeId, EmployeeName, companyName, locationName, departmentName, designationName, ContactNo, ActiveStatus, iconcell).appendTo("#ls_EmpInfo_table_tbody");

        (function ($) {
            editicon.on("click", function (e) {
                e.preventDefault();
                //console.log(value);
                $("#ls_edit_EmpInfo_modal").modal("show");//ls_edit_EmpInfo_id
                $("#ls_edit_EmpInfo_id").val(value.EmployeeId);
                $("#ls_edit_EmpInfo_name").data("Id", value.Id);
                $("#ls_edit_EmpInfo_name").val(value.EmployeeName);
                $("#ls_edit_EmpInfo_company").val(value.CompanyId).change();
                $("#ls_edit_EmpInfo_department").val(value.DepartmentId);  
                $("#ls_edit_EmpInfo_designation").val(value.DesignationId);
                $("#ls_edit_EmpInfo_location").val(value.LocationId);  
                $("#ls_edit_EmpInfo_status").val(value.ActiveStatus); 
                $("#ls_edit_EmpInfo_gender").val(value.Gender);
                $("#ls_edit_EmpInfo_BloodGroup").val(value.BloodGroup);
                $("#ls_edit_EmpInfo_address").val(value.EmployeeAddress);
                $("#ls_edit_EmpInfo_salary").val(value.Salary);
                $("#ls_edit_EmpInfo_ContactNo").val(value.ContactNo);
                $("#ls_edit_EmpInfo_JoinDate").val(convertJsonDate(value.JD));
                $("#ls_edit_EmpInfo_dob").val(convertJsonDate(value.DOB)); 

            });
            deleteicon.on("click", function (e) {
                e.preventDefault();

                $("#ls_delete_EmpInfo_modal").modal("show");
                $("#ls_delete_EmpInfo_id_hidden").data("Id", value.Id);
            });
        })(jQuery);
    });
}


//Filter

$("#ls_rp_EmpInfo_filter_form").on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

$("#ls_filter_btn").on("click", function (e) {
    e.preventDefault();
    load_EmpInfo_table(1);
});

function filter_rp_EmpInfo_table() {

    json = {

        employeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        name: $("#ls_rp_EmpInfo_filter_Name").val(),              //.find(":selected")
        company: $("#ls_filter_rp_EmpInfo_Company").val(),
        department: $("#ls_filter_rp_EmpInfo_department").val(),
        designation: $("#ls_filter_rp_EmpInfo_designation").val()

    };
    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/EmployeeInformations/FilterEmployee",
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
                //console.log("test", resp);
                show_EmpInfo_list(resp);
                show_EmpInfo_table_info();
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


//Delete EmpInfo

$("#ls_delete_EmpInfo_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ls_delete_EmpInfo_modal_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        json = {
            id: $("#ls_delete_EmpInfo_id_hidden").data("Id"),
        };

        $.ajax({
            type: "POST",
            url: "/EmployeeInformations/DeleteEmployee",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),

            success: function (resp) {
                if (resp.error) {
                    iziToast.error({
                        title: 'ERROR!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }

                else {
                    $("#ls_delete_EmpInfo_modal").modal("hide");
                    iziToast.success({
                        title: 'Deleted!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    load_EmpInfo_table($("#ls_EmpInfo_pagination_page_no").text());
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
                $("#spinner").show();
            },

            complete: function () {
                $("#spinner").hide();
            }

        });
    }
});


//Edit EmpInfo

$("#ls_edit_EmpInfo_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($("#ls_edit_EmpInfo_modal_form")[0].checkValidity() == false) {
        e.stopPropagation();
    }

    else {
        //alert('ok1');
        json =
        {
            CompanyId: $("#ls_edit_EmpInfo_company").find(":selected").val(),                 
            DepartmentId: $("#ls_edit_EmpInfo_department").find(":selected").val(),
            DesignationId: $("#ls_edit_EmpInfo_designation").find(":selected").val(),
            LocationId: $("#ls_edit_EmpInfo_location").find(":selected").val(),
            EmployeeId: $("#ls_edit_EmpInfo_id").val(),
            Name: $("#ls_edit_EmpInfo_name").val(),
            JDStr: $("#ls_edit_EmpInfo_JoinDate").val(),
            DOBStr: $("#ls_edit_EmpInfo_dob").val(),
            Gender: $("#ls_edit_EmpInfo_gender").val(),
            Address: $("#ls_edit_EmpInfo_address").val(),
            BloodGroup: $("#ls_edit_EmpInfo_BloodGroup").val(),
            Salary: $("#ls_edit_EmpInfo_salary").val(),
            ContactNo: $("#ls_edit_EmpInfo_ContactNo").val(),
            ActiveStatus: $("#ls_edit_EmpInfo_status").val(),
            Id: $("#ls_edit_EmpInfo_name").data("Id")

        };

        console.log("jsonEdit", json);

        $.ajax({
            type: "POST",
            url: "/EmployeeInformations/EditEmpInfo",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),


            success: function (resp) {
                if (resp.error) {
                    iziToast.error({
                        title: 'ERROR!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }

                else {
                    $("#ls_edit_EmpInfo_modal").modal("hide");
                    iziToast.success({
                        title: 'Updated Successfully!',
                        message: resp.message,
                        position: 'bottomRight'
                    });

                    load_EmpInfo_table($("#ls_EmpInfo_pagination_page_no").text());

                }
            },

            error: function (jqXHR, exception) {

                //alert('ok4');

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
                $("#spinner").show();
            },

            complete: function () {
                $("#spinner").hide();
            }
        });
    }
});

//Print

$("#ls_print_btn").on("click", function (e) {
    e.preventDefault();
    load_EmpInfo_for_print_table();
});

function load_EmpInfo_for_print_table() {

    json = {

        employeeId: $("#ls_rp_EmpInfo_filter_Id").val(),
        name: $("#ls_rp_EmpInfo_filter_Name").val(),              //.find(":selected")
        company: $("#ls_filter_rp_EmpInfo_Company").val(),
        department: $("#ls_filter_rp_EmpInfo_department").val(),
        designation: $("#ls_filter_rp_EmpInfo_designation").val()

    };
    //console.log(json);

    $.ajax({
        type: "POST",
        url: "/EmployeeInformations/FilterEmployee",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(json),


        beforeSend: function () {
            $("#spinner").show()
        },

        success: function (resp) {
            // alert('ok2');
            if (resp.error) {
                iziToast.error({
                    title: 'ERROR!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {

                getPrint(resp.data);
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


function getPrint(data) {

   // alert('ok1');

    w = window.open();

    w.document.write('<html><head><title>Report || Company Information</title>');


    w.document.write('<style> .top_rw{ background-color:#f4f4f4; } .td_w{ } button{ padding:5px 10px; font-size:14px;} .invoice-box { max-width: 890px; margin: auto; padding:10px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, .15); font-size: 14px; line-height: 24px; font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; color: #555; } .invoice-box table { width: 100%; line-height: inherit; text-align: left; border-bottom: solid 1px #ccc; } .invoice-box table td { padding: 5px; vertical-align:middle; } .invoice-box table tr td:nth-child(2) { text-align: right; } .invoice-box table tr.top table td { padding-bottom: 20px; } .invoice-box table tr.top table td.title { font-size: 45px; line-height: 45px; color: #333; } .invoice-box table tr.information table td { padding-bottom: 40px; } .invoice-box table tr.heading td { background: #eee; border-bottom: 1px solid #ddd; font-weight: bold; font-size:12px; } .invoice-box table tr.details td { padding-bottom: 20px; } .invoice-box table tr.item td{ border-bottom: 1px solid #eee; } .invoice-box table tr.item.last td { border-bottom: none; } .invoice-box table tr.total td:nth-child(2) { border-top: 2px solid #eee; font-weight: bold; } @media only screen and (max-width: 600px) { .invoice-box table tr.top table td { width: 100%; display: block; text-align: center; } .invoice-box table tr.information table td { width: 100%; display: block; text-align: center; } } /** RTL **/ .rtl { direction: rtl; font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; } .rtl table { text-align: right; } .rtl table tr td:nth-child(2) { text-align: left; } </style >');

    w.document.write('<style>.invoice-box table {width: 100%;line-height: inherit;text-align: left;border-bottom: 0px;}</style>');
    w.document.write('<style>.invoice-box {max-width: -webkit-fill-available;box-shadow: 0 0 0 0!important;}</style>');
    w.document.write('<style> #item_info_table td,th{border: 1px solid black;border-collapse: collapse;} </style>');
    //w.document.write('<style> .table-wrapper { overflow : hidden; height : 300px; } .table-wrapper, table { height : 300px; } .table-wrapper, td,th { border : solid 1px #CCC; } table, tbody, tr, td { box-sizing: border-box; display: block; } table { margin: 1px 0 0 0; overflow : auto; } td { height: 60px; border-width : 0 0 1px 0; } </style>');
    w.document.write('<style>.invoice-box table tr.heading th { background: #eee;  font-weight: bold; font-size: 12px;}</style>');
    w.document.write('<style>.invoice-box table tr.information table td {padding-bottom: 0px;} .invoice-box table td {padding: 2.5px;vertical - align: middle;} </style>');
    w.document.write("<style>body, html{ margin: 0px; width: 100%; height: 100%; overflow: visible; display: table-caption; justify-content: space-around; align-items: center; flex-direction: row; } .stamp { transform: rotate(12deg); color: #555; font-size: 2rem; font-weight: 700; border: 0.25rem solid #555; display: inline-block; padding: 0.25rem 1rem; text-transform: uppercase; border-radius: 1rem; font-family: 'Courier'; -webkit-mask-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png'); -webkit-mask-size: 944px 604px; mix-blend-mode: multiply; } .is-nope { color: #D23; border: 0.5rem double #D23; transform: rotate(-14deg); -webkit-mask-position: 2rem 3rem; font-size: 2rem; } .is-approved { color: #0A9928; border: 0.3rem solid #0A9928; -webkit-mask-position: 13rem 6rem; transform: rotate(-14deg); border-radius: 0; } .is-draft { color: #C4C4C4; border: 1rem double #C4C4C4; transform: rotate(-5deg); font-size: 6rem; font-family: 'Open sans', Helvetica, Arial, sans-serif; border-radius: 0; padding: 0.5rem; }</style>");
    w.document.write("<style>@page {margin: .5in;} </style>");

    w.document.write('</head><body>');
    //border - bottom: 1px solid #ddd;
    //w.document.write(document.getElementById(el).innerHTML);
    //w.document.write('<script type="text/javascript">addEventListener("load", () => { print(); close(); })</script></body></html>');
    let body = $("<div>");
    let invoice_box = $("<div>").attr('class', 'invoice-box').appendTo(body);
    let table = $("<table>").attr({ 'cellpadding': '0', cellspacing: "0" }).appendTo(invoice_box);
    var tr = $("<tr>").attr('class', 'top_rw').appendTo(table);
    var td = $("<td>").attr('colspan', '2').appendTo(tr);
    var div = $("<div>").attr("style", "display: flex!important").appendTo(td);

    var img = $("<img>").attr({ 'src': '/Content/assets/images/logo/test.png', style: "width: 60px" }).appendTo(div);
    var h2 = $("<h2>").attr('style', 'margin-bottom: 0px;margin-left: 10px;').append("Logo").appendTo(div);
    var span = $("<span>").attr('style', 'margin-bottom: 0px').append("Address..............................................").appendTo(td);
    var currentdate = new Date();
    var datetime = "Printed Date: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    var td = $("<td>").attr('style', 'width:30%; margin-right: 10px;font-size:12px').append("Test Project <br>" + datetime).appendTo(tr);

    var invoice_title_tr = $("<tr>").attr('style', '').appendTo(table);
    var invoice_title_td = $("<td>").attr('colspan', '3').appendTo(invoice_title_tr);
    var h2 = $("<h2>").attr('style', 'margin-bottom: 10px;text-align: center; font-size:20px;border-bottom: solid 1px #ccc;padding: 5px;').append("Company Information").appendTo(invoice_title_td);

    //information
    var tr = $("<tr>").attr('class', 'information').appendTo(table);
    var td = $("<td>").attr('colspan', '3').appendTo(tr);
    let info_table = $("<table>").appendTo(td);
    var tr = $("<tr>").attr('class', '').appendTo(info_table);

    var tr = $("<tr>").attr('class', '').appendTo(table);
    var td = $("<td>").attr({ 'colspan': '3', 'id': 'table_div' }).appendTo(tr);


    var item_info_table = document.createElement("table");
    item_info_table.className = "";
    item_info_table.setAttribute("cellspacing", "0px");
    item_info_table.setAttribute("cellpadding", "2px");
    //, "cellpadding":"2px"}
    item_info_table.style = "font-size:10px;border-collapse: collapse;";
    item_info_table.id = "item_info_table";


    var table_thead = document.createElement("thead");
    item_info_table.appendChild(table_thead);

    var table_thead_row = document.createElement("tr");
    table_thead_row.classList = "heading";
    table_thead.appendChild(table_thead_row);

    var theads = new Array();
    //theads.push('');
    theads.push('Serial No.'); //1
    theads.push('Employee Id'); //2
    theads.push('Name'); //3
    theads.push('Company'); //4
    theads.push('Location'); //5
    theads.push('Department');  //6
    theads.push('Designation');  //7
    theads.push('Join Date');     //8
    theads.push('Date Of Birth');    //9
    theads.push('Gender');   //10
    theads.push('Contact Address');    //11
    theads.push('Blood Group');    //12
    theads.push('Salary');   //13
    theads.push('Contact No.');   //14
    theads.push('Status');    //15


    for (var i = 0; i < theads.length; i++) {
        var table_thead_th = document.createElement("td");
        table_thead_th.innerHTML = theads[i];
        table_thead_th.setAttribute("scope", "col");
        table_thead_th.setAttribute("style", "text-align: center;font-size:10px;width:80px;line-height: 15px;");
        table_thead_row.appendChild(table_thead_th);
    }

    var table_tbody = document.createElement("tbody");
    table_tbody.id = 'item_info_table_tbody';
    item_info_table.appendChild(table_tbody);
    td.append(item_info_table);



    $.each(data, function (index, value) {

        var table_tbody_row = document.createElement("tr");
        table_tbody_row.setAttribute("style", "text-align: center;");
        table_tbody.appendChild(table_tbody_row);

        //var index = $("<td>").append(index + 1);
        var table_thead_td = document.createElement("td"); //1 SL no
        table_thead_td.innerHTML = index + 1;
        table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td");//2 Employee ID
        table_thead_td.innerHTML = value.EmployeeId;
        table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //3 Name
        table_thead_td.innerHTML = value.EmployeeName;
        table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //6 company
        table_thead_td.innerHTML = value.CompanyName;
        table_tbody_row.appendChild(table_thead_td);


        var table_thead_td = document.createElement("td"); //7 location
        table_thead_td.innerHTML = value.LocationName;
        table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //4 dept
        table_thead_td.innerHTML = value.DepartmentName;
        table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //5 designation
        table_thead_td.innerHTML = value.DesignationName;
        table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //8 JD 
        table_thead_td.innerHTML = convertJsonDate(value.JD);
        table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //9 DOB 
        table_thead_td.innerHTML = convertJsonDate(value.DOB);
        table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //10 gender 
        if (value.Gender == 1) {
            table_thead_td.innerHTML = "Male";
        }
        else if (value.Gender == 2) {
            table_thead_td.innerHTML = "Female";
        }
        else if (value.Gender == 3) {
            table_thead_td.innerHTML = "Others";
        }
        else {
            table_thead_td.innerHTML = "--Please select--";
        }

        table_tbody_row.appendChild(table_thead_td);

        //var table_thead_td = document.createElement("td"); //10 gender
        //table_thead_td.innerHTML = value.Gender;
        //table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //11 ConAdd
        table_thead_td.innerHTML = value.EmployeeAddress;
        table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //12 BG
        if (value.BloodGroup == 1) {
            table_thead_td.innerHTML = "O+";
        }
        else if (value.BloodGroup == 2) {
            table_thead_td.innerHTML = "A+";
        }
        else if (value.BloodGroup == 3) {
            table_thead_td.innerHTML = "B+";
        }
        else if (value.BloodGroup == 4) {
            table_thead_td.innerHTML = "AB+";
        }
        else if (value.BloodGroup == 5) {
            table_thead_td.innerHTML = "A-";
        }
        else if (value.BloodGroup == 6) {
            table_thead_td.innerHTML = "B-";
        }
        else if (value.BloodGroup == 7) {
            table_thead_td.innerHTML = "AB-";
        }
        else if (value.BloodGroup == 8) {
            table_thead_td.innerHTML = "O-";
        }
        else {
            table_thead_td.innerHTML = "N/A";
        }

        table_tbody_row.appendChild(table_thead_td);

        //var table_thead_td = document.createElement("td"); //12  bg
        //table_thead_td.innerHTML = value.BloodGroup;
        //table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //13 Salary
        table_thead_td.innerHTML = value.Salary;
        table_tbody_row.appendChild(table_thead_td);

        var table_thead_td = document.createElement("td"); //14 number
        table_thead_td.innerHTML = value.ContactNo;
        table_tbody_row.appendChild(table_thead_td);


        //alert(value.EmployeeActiveStatus);
        var table_thead_td = document.createElement("td"); //15 status 
        if (value.EmployeeActiveStatus == 1) {
            table_thead_td.innerHTML = "Active";
        }
        else if (value.EmployeeActiveStatus == 0) {
            table_thead_td.innerHTML = "In-Active";
        }

        table_tbody_row.appendChild(table_thead_td);

        //var table_thead_td = document.createElement("td"); //15 status
        //table_thead_td.innerHTML = value.EmployeeActiveStatus;
        //table_tbody_row.appendChild(table_thead_td);



        //var table_thead_td = document.createElement("td");
        //if (value.ActiveStatus == 1) {
        //    table_thead_td.innerHTML = "Active";
        //}
        //else if (value.ActiveStatus == 1) {
        //    table_thead_td.innerHTML = "In-Active";
        //}

        //table_tbody_row.appendChild(table_thead_td);


        var table_tbody_row = document.createElement("tr");
        table_tbody_row.setAttribute("style", "text-align: center;");

        table_tbody.appendChild(table_tbody_row);

    });

    var tr = $("<tr>").attr('class', '').appendTo(table);
    var td = $("<td>").attr('colspan', '3').appendTo(tr);
    let footer_table = $("<table>").attr({ "cellspacing": "0px", "cellpadding": "2px", "style": "margin-top:30px" }).appendTo(td);
    var tbody = $("<tbody>").appendTo(footer_table);
    var tr = $("<tr>").attr('class', '').appendTo(tbody);
    var td = $("<td>").attr({ 'width': '25%', "style": "text-align:center" }).append("...................................<br><b> Prepared By </b>").appendTo(tr);
    var td = $("<td>").attr({ 'width': '25%', "style": "text-align:center" }).append("...................................<br><b> Checked By </b>").appendTo(tr);
    var td = $("<td>").attr({ 'width': '25%', "style": "text-align:center" }).append("...................................<br><b> Authorized By </b>").appendTo(tr);
    var td = $("<td>").attr({ 'width': '25%', "style": "text-align:center" }).append("...................................<br><b> Approved By </b>").appendTo(tr);

    w.document.write(body.html());
    w.document.write('</body></html>');
    w.print();
    w.close();
}


