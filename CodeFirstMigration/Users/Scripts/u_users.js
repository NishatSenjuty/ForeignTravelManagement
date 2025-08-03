
load_department_select_items();
function load_department_select_items() {
    $.ajax({
        url: '/Departments/ShowDepartmentsForDropDownInEmpInfo',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        async: false,
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {

                //let departmentSelect = document.getElementById("add_department");

                //show_department_select_items(departmentSelect, resp.data);



                let editDepartmentSelect = document.getElementById("edit_department");

                show_department_select_items(editDepartmentSelect, resp.data);
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            iziToast.error({
                title: 'Ajax Error!',
                message: msg,
                position: 'bottomRight'
            });
        },
        beforeSend: function () {
            $("#department").attr("disabled", true);
        },
        complete: function () {
            $("#department").attr("disabled", false);
        }
    });

}

function show_department_select_items(departmentSelect, data) {

    $.each(data, function (index, value) {

        departmentSelect.options[departmentSelect.options.length] = new Option(value.Name, value.Id);
    });
    //if (departmentSelect.length == 2) {
    //    departmentSelect.selectedIndex = 1;
    //    departmentSelect.dispatchEvent(new Event("change"));
    //}
}

load_designation_select_items();

function load_designation_select_items() {
    $.ajax({
        url: '/Designations/ShowDesignationsForDropDownInEmpInfo',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {

                let designationSelect = document.getElementById("add_designation");

                show_designation_select_items(designationSelect, resp.data);

                let editDesignationSelect = document.getElementById("edit_designation");

                show_designation_select_items(editDesignationSelect, resp.data);
            }

        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            iziToast.error({
                title: 'Ajax Error!',
                message: msg,
                position: 'bottomRight'
            });
        },
        beforeSend: function () {
            $("#designation").attr("disabled", true);
        },
        complete: function () {
            $("#designation").attr("disabled", false);
        }
    });

}
// show_designation_select_items

function show_designation_select_items(designationSelect, data) {

    $.each(data, function (index, value) {
        designationSelect.options[designationSelect.options.length] = new Option(value.DesignationName, value.Id);
    });
    if (designationSelect.length == 2) {
        designationSelect.selectedIndex = 1;
        designationSelect.dispatchEvent(new Event("change"));
    }
}


////////////////////////////////////////////////////////////

//// load company for dropdown
//load_companies_for_dropdown();
//function load_companies_for_dropdown() {
//    $.ajax({
//        url: '/Companies/ShowCompaniesForDropDownLocation',
//        type: "POST",
//        contentType: "application/json; charset-utf-8",
//        success: function (resp) {
//            if (resp.error) {
//                iziToast.error({
//                    title: 'Error!',
//                    message: resp.message,
//                    position: 'bottomRight'
//                });
//            }
//            else {

//               // console.log("test",resp.data);
//                $("#users_add_company").empty();
//                $("#users_add_location").empty();
//                $("#users_add_floor").empty();
//                //$("#users_add_company").append('<option value="-1">Select Company</option>');
//                //$("#users_add_location").append('<option value="-1">Select Location</option>');
//                //$("#users_add_floor").append('<option value="-1">Select Floor</option>');

//                $("#filter_companyy").empty();
//                $("#filter_location").empty();
//                $("#filter_floor").empty();
//                //$("#filter_companyy").append('<option value="-1">Select Company</option>');
//                //$("#filter_location").append('<option value="-1">Select Location</option>');
//                //$("#filter_floor").append('<option value="-1">Select Floor</option>');

//                $("#users_edit_company").empty();
//                $("#users_edit_location").empty();
//                $("#users_edit_floor").empty();
//                //$("#users_edit_company").append('<option value="-1">Select Company</option>');
//                //$("#users_edit_location").append('<option value="-1">Select Location</option>');
//                //$("#users_edit_floor").append('<option value="-1">Select Floor</option>');

//                //filter
//                var companySelect = document.getElementById("users_add_company");
//                var locationSelect = document.getElementById("users_add_location");
//                var floorSelect = document.getElementById("users_add_floor");
//              //  alert('call');
//                show_companies_location_floor_select_items(companySelect, locationSelect, floorSelect, resp.data);

//                var companyfilterSelect = document.getElementById("filter_companyy");
//                var locationfilterSelect = document.getElementById("filter_location");
//                var floorfilterSelect = document.getElementById("filter_floor");

//                show_companies_location_floor_select_items(companyfilterSelect, locationfilterSelect, floorfilterSelect, resp.data);


//                var companySelectEdit = document.getElementById("users_edit_company");
//                var locationSelectEdit = document.getElementById("users_edit_location");
//                var floorSelectEdit = document.getElementById("users_edit_floor");

//                show_companies_location_floor_select_items(companySelectEdit, locationSelectEdit, floorSelectEdit, resp.data);

//                var primaryCompanySelect = document.getElementById("add_primary_company");
//                var primaryLocationSelect = document.getElementById("add_primary_location");
//                show_companies_location_floor_select_items(primaryCompanySelect, primaryLocationSelect, floorSelect, resp.data);

//                var primaryCompanyEdit = document.getElementById("edit_primary_company");
//                var primaryLocationEdit = document.getElementById("edit_primary_location");
//                show_companies_location_floor_select_items(primaryCompanyEdit, primaryLocationEdit, floorSelect, resp.data);

//            }

//        },
//        error: function (jqXHR, exception) {
//            var msg = '';
//            if (jqXHR.status === 0) {
//                msg = 'Not connect.\n Verify Network.';
//            } else if (jqXHR.status == 404) {
//                msg = 'Requested page not found. [404]';
//            } else if (jqXHR.status == 500) {
//                msg = 'Internal Server Error [500].';
//            } else if (exception === 'parsererror') {
//                msg = 'Requested JSON parse failed.';
//            } else if (exception === 'timeout') {
//                msg = 'Time out error.';
//            } else if (exception === 'abort') {
//                msg = 'Ajax request aborted.';
//            } else {
//                msg = 'Uncaught Error.\n' + jqXHR.responseText;
//            }
//            iziToast.error({
//                title: 'Ajax Error!',
//                message: msg,
//                position: 'bottomRight'
//            });
//        },
//        beforeSend: function () {
//            $("#users_add_company").attr("disabled", true);
//            $("#users_add_location").attr("disabled", true);
//            $("#users_add_floor").attr("disabled", true);
//        },
//        complete: function () {
//            $("#users_add_company").attr("disabled", false);
//            $("#users_add_location").attr("disabled", false);
//            $("#users_add_floor").attr("disabled", false);
//        }
//    });

//    return new Promise(resolve => {
//        setTimeout(() => {
//            resolve();
//        }, 50);
//    });
//}


//// show_companies_location_select_items
//function show_companies_location_floor_select_items(companySelect, locationSelect, floorSelect, data) {
//    companySelect.length = 0;

//    $.each(data, function (index, value) {
//        companySelect.options[companySelect.options.length] = new Option(value.CompanyName, value.Id);
//    });
//    companySelect.onchange = function () {
//        locationSelect.length = 0;
//        let companyId = companySelect.options[companySelect.selectedIndex].value;
//        //console.log(1, data, companyId);

//        //if (companyId <= 0) {
//        //    locationSelect.length = 1;
//        //    floorSelect.length = 1;

//        //    return;
//        //}

//        //display correct values
//        $.each(data.find(e => e.Id === parseInt(companyId)).Locations, function (index, value) {
//            locationSelect.options[locationSelect.options.length] = new Option(value.LocationName, value.Id);
//        });

//        locationSelect.onchange = function () {
//            floorSelect.length = 0;
//            let locationId = locationSelect.options[locationSelect.selectedIndex].value;
//            //console.log(2, data, locationId);

//            //if (locationId <= 0) {
//            //    floorSelect.length = 1;
//            //    return;
//            //}
//            //floorSelect.length = 0;

//            //display correct values
//            $.each(data.find(e => e.Id === parseInt(companyId)).Locations.find(e => e.Id === parseInt(locationId)).Floors, function (index, value) {
//                floorSelect.options[floorSelect.options.length] = new Option(value.FloorName, value.Id);
//            });
//        }

//        $(locationSelect).change();
//    }

//    $(companySelect).change();
//}



load_Company_location_for_dropdown();

function load_Company_location_for_dropdown() {

    $.ajax({
        type: "POST",
        url: "/Companies/ShowCompaniesLocationsFloorsLinesForDropDown",
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

                $("#filter_companyy").empty();
                $("#filter_companyy").append('<option value="-1">Select Company</option>');

                $.each(companies, function (index, value) {
                    $("#filter_companyy").append('<option value="' + value.Id + '">' + value.CompanyName + '</option>');
                });

                // 1st nested load location from company

                //filter

                $("#filter_companyy").on("change", function (e) {
                    e.preventDefault();
                    $("#filter_location").empty();
                    $("#filter_location").append('<option value="-1">Select Location</option>');
                    $("#filter_floor").empty();
                    $("#filter_floor").append('<option value="-1">Select Floor</option>');
                    let companyId_fl = $("#filter_companyy").val();
                    var companyInfo_fl = companies.find(e => e.Id === parseInt(companyId_fl)); //filter company info
                    $.each(companyInfo_fl.Locations, function (index, value) {  //bind location data
                        $("#filter_location").append('<option value="' + value.Id + '">' + value.LocationName + '</option>');
                    });
                });


                //2nd nested load floor from location

                //filter for floor from location
                $("#filter_location").on("change", function (e) {
                    e.preventDefault();
                    $("#filter_floor").empty();
                    $("#filter_floor").append('<option value="-1">Select Floor</option>');

                    let locationId_fl = $("#filter_location").val();
                    let companyId_fl = $("#filter_companyy").val();
                    var companyInfo_fl = companies.find(e => e.Id === parseInt(companyId_fl));
                    var locationInfo_fl = companyInfo_fl.Locations.find(e => e.Id === parseInt(locationId_fl));  //filter location info 
                    $.each(locationInfo_fl.Floors, function (index, value) {  //bind floor data
                        $("#filter_floor").append('<option value="' + value.Id + '">' + value.FloorName + '</option>');
                    });
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
            $("#ls_edit_MachineEntry_company").attr("disabled", true);
            $("#filter_companyy").attr("disabled", true);

        },

        complete: function () {

            $("#filter_companyy").attr("disabled", false);
            $("#ls_edit_MachineEntry_company").attr("disabled", false);
        }
    });
}

load_companies_for_dropdown();

function load_companies_for_dropdown() {
    $.ajax({
        url: '/Companies/ShowCompaniesForDropDownLocation',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {

                console.log("test", resp.data);
                //$("#users_add_company").empty();
                //$("#users_add_location").empty();
                //$("#users_add_floor").empty();
                //$("#users_add_company").append('<option value="-1">Select Company</option>');
                //$("#users_add_location").append('<option value="-1">Select Location</option>');
                $("#users_add_floor").append('<option value="-1">Select Floor</option>');

                //$("#filter_companyy").empty();
                //$("#filter_location").empty();
                //$("#filter_floor").empty();
                //$("#filter_companyy").append('<option value="-1">Select Company</option>');
                //$("#filter_location").append('<option value="-1">Select Location</option>');
                //$("#filter_floor").append('<option value="-1">Select Floor</option>');

                $("#users_edit_company").empty();
                $("#users_edit_location").empty();
                $("#users_edit_floor").empty();
                //$("#users_edit_company").append('<option value="-1">Select Company</option>');
                //$("#users_edit_location").append('<option value="-1">Select Location</option>');
                //$("#users_edit_floor").append('<option value="-1">Select Floor</option>');

                //filter
                //var companySelect = document.getElementById("users_add_company");
                //var locationSelect = document.getElementById("users_add_location");
                var floorSelect = document.getElementById("users_add_floor");
                //  alert('call');
                //show_companies_location_floor_select_items(companySelect, locationSelect, floorSelect, resp.data);

                //var companyfilterSelect = document.getElementById("filter_companyy");
                //var locationfilterSelect = document.getElementById("filter_location");
                //var floorfilterSelect = document.getElementById("filter_floor");

                //show_companies_location_floor_select_items(companyfilterSelect, locationfilterSelect, floorfilterSelect, resp.data);


                var companySelectEdit = document.getElementById("users_edit_company");
                var locationSelectEdit = document.getElementById("users_edit_location");
                var floorSelectEdit = document.getElementById("users_edit_floor");

                show_companies_location_floor_select_items(companySelectEdit, locationSelectEdit, floorSelectEdit, resp.data);

                //var primaryCompanySelect = document.getElementById("add_primary_company");
                //var primaryLocationSelect = document.getElementById("add_primary_location");
                //show_companies_location_floor_select_items(primaryCompanySelect, primaryLocationSelect, floorSelect, resp.data);

                var primaryCompanyEdit = document.getElementById("edit_primary_company");
                var primaryLocationEdit = document.getElementById("edit_primary_location");
                show_companies_location_floor_select_items(primaryCompanyEdit, primaryLocationEdit, floorSelect, resp.data);

            }

        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            iziToast.error({
                title: 'Ajax Error!',
                message: msg,
                position: 'bottomRight'
            });
        },
    });

    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 50);
    });
}


// show_companies_location_select_items
function show_companies_location_floor_select_items(companySelect, locationSelect, floorSelect, data) {
    companySelect.length = 0;

    $.each(data, function (index, value) {
        companySelect.options[companySelect.options.length] = new Option(value.CompanyName, value.Id);
    });
    companySelect.onchange = function () {
        locationSelect.length = 0;
        let companyId = companySelect.options[companySelect.selectedIndex].value;
        //console.log(1, data, companyId);

        //if (companyId <= 0) {
        //    locationSelect.length = 1;
        //    floorSelect.length = 1;

        //    return;
        //}

        //display correct values
        $.each(data.find(e => e.Id === parseInt(companyId)).Locations, function (index, value) {
            locationSelect.options[locationSelect.options.length] = new Option(value.LocationName, value.Id);
        });

        locationSelect.onchange = function () {
            floorSelect.length = 0;
            let locationId = locationSelect.options[locationSelect.selectedIndex].value;
            //console.log(2, data, locationId);

            //if (locationId <= 0) {
            //    floorSelect.length = 1;
            //    return;
            //}
            //floorSelect.length = 0;

            //display correct values
            $.each(data.find(e => e.Id === parseInt(companyId)).Locations.find(e => e.Id === parseInt(locationId)).Floors, function (index, value) {
                floorSelect.options[floorSelect.options.length] = new Option(value.FloorName, value.Id);
            });
        }

        $(locationSelect).change();
    }

    $(companySelect).change();
}


//Start load user role dropdown


load_user_role();


function load_user_role() {
    $.ajax({
        type: "POST",
        url: "/UserRoles/ShowUserRole",
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
                $("#filter_user_role").empty();
                $("#edit_user_role").empty();

                $("#filter_user_role").append('<option value="">Select Role Title</option>');
                //$("#edit_user_role").append('<option value="">Select Designation</option>')

                $.each(resp.data, function (index, value) {
                    $("#filter_user_role").append('<option value="' + value.UserRoleId + '">' + value.UserRoleTitle + '</option>');
                    $("#edit_user_role").append('<option value="' + value.UserRoleId + '">' + value.UserRoleTitle + '</option>');
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


load_supervisor_for_dropdown();


function load_supervisor_for_dropdown() {
    $.ajax({
        url: '/Users/ShowUsersForDropdown',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                $("#add_user_supervisor").empty();
                $("#edit_user_supervisor").empty();

                var addlocationSelect = document.getElementById("users_add_location");
                var addlocationId = addlocationSelect.options[addlocationSelect.selectedIndex].value;
                var adddepartmentSelect = document.getElementById("add_department");
                var adddepartmentId = adddepartmentSelect.options[adddepartmentSelect.selectedIndex].value;

                //console.log("addlocationId", addlocationId);
                //console.log("adddepartmentId", adddepartmentId);

                var editlocationSelect = document.getElementById("users_edit_location");
                var editlocationId = editlocationSelect.options[editlocationSelect.selectedIndex].value;
                var editdepartmentSelect = document.getElementById("edit_department");
                var editdepartmentId = editdepartmentSelect.options[editdepartmentSelect.selectedIndex].value;


                var groupedMenuList = groupBy(resp.data, ['DesignationId'])
                // console.log("test", resp.data);

                $.each(groupedMenuList, function (index, _agroupedvalue)
                {
                    var add_option_grouped = $("#add_user_supervisor");//.select2();
                    var _add_option_grouped = $('<optgroup>').attr('label', _agroupedvalue[0].DesignationName).appendTo(add_option_grouped);

                    var edit_option_grouped = $("#edit_user_supervisor");//.select2();
                    var _edit_option_grouped = $('<optgroup>').attr('label', _agroupedvalue[0].DesignationName).appendTo(edit_option_grouped);


                    $.each(_agroupedvalue, function (index, value) {

                       // console.log("hello-loc", value.CompanyLocationFloors[0].LocationId);
                       //console.log("hello1-dept", value.DepartmentId);

                        //_add_option_grouped.append('<option value="' + value.MenuItemId + '">' + value.MenuItemName + '</option>');
                        //_edit_option_grouped.append('<option value="' + value.MenuItemId + '">' + value.MenuItemName + '</option>');


                        if (value.CompanyLocationFloors[0].LocationId == addlocationId || value.DepartmentId == adddepartmentId) {
                            $(_add_option_grouped).append('<option value="' + value.UserNo + '">' + value.FullName + ">" + value.UserName + '</option>');
                        }

                        if ((value.CompanyLocationFloors[0].LocationId == editlocationId || value.DepartmentId == editdepartmentId) || editdepartmentId == "") {
                            _edit_option_grouped.append('<option value="' + value.UserNo + '">' + value.FullName + ">" + value.UserName + '</option>');
                        }



                    });
                });





                $('select[multiple]').multiselect({

                    columns: 3,     // how many columns should be use to show options
                    search: true, // include option search box

                    // search filter options
                    searchOptions: {
                        delay: 250,                  // time (in ms) between keystrokes until search happens
                        showOptGroups: true,                // show option group titles if no options remaining
                        searchText: true,                 // search within the text
                        searchValue: false,                // search within the value
                        onSearch: function (element) { } // fires on keyup before search on options happens
                    },

                    // plugin texts
                    texts: {
                        placeholder: 'Select options', // text to use in dummy input
                        search: 'Search',         // search input placeholder text
                        selectedOptions: ' selected',      // selected suffix text
                        selectAll: 'Select All',     // select all text
                        unselectAll: 'Unselect All',   // unselect all text
                        noneSelected: 'None Selected'   // None selected text
                    },

                    // general options
                    selectAll: true, // add select all option
                    selectGroup: true, // select entire optgroup
                    minHeight: 200,   // minimum height of option overlay
                    maxHeight: null,  // maximum height of option overlay
                    maxWidth: null,  // maximum width of option overlay (or selector)
                    maxPlaceholderWidth: null, // maximum width of placeholder button
                    maxPlaceholderOpts: 10, // maximum number of placeholder options to show until "# selected" shown instead
                    showCheckbox: true,  // display the checkbox to the user
                    optionAttributes: [],  // attributes to copy to the checkbox from the option element

                    // Callbacks
                    onLoad: function (element) { },           // fires at end of list initialization
                    onOptionClick: function (element, option) { },   // fires when an option is clicked
                    onControlOpen: function (element) { },           // fires when the options list is opened
                    onControlClose: function (element) { },           // fires when the options list is closed
                    onSelectAll: function (element, selected) { }, // fires when (un)select all is clicked
                    onPlaceholder: function (element, placeholder, selectedOpts) { }, // fires when the placeholder txt is up<a href="https://www.jqueryscript.net/time-clock/">date</a>d

                });
            }
        }
    });
}


//For User function - Show User on grid *

load_filtered_users(1);

function load_filtered_users(page) {

    json = {
        limit: $("#filter_limit").val(),
        companyId: $("#filter_companyy").val(),
        locationId: $("#filter_location").val(),
        floorId: $("#filter_floor").val(),
        userName: $("#filter_username").val(),
        uRoleId: $("#filter_user_role").val() || -1,
        page: page
    };
    //console.log("jsonlist", json);

    $.ajax({
        url: "/users/ShowUsers/",
        type: "POST",
        contentType: "application/json; charset-utf-8",
        data: JSON.stringify(json),
        success: function (resp) {

            if (resp.error) {
                iziToast.error({
                    title: 'Warning!',
                    message: resp.message,
                    position: 'bottomRight'
                });
                return false;
            } else {
                show_users_list(resp);
                return true;
            }
        },
        beforeSend: function () {
            $("#users_loading_spinner").show();
        },
        complete: function () {
            $("#users_loading_spinner").hide();
        }
    });
}


//End load users table

var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
       // console.log("rv", rv);
        return rv;
    }, {});
};

//Start shows data on users table

function show_users_list(resp) {

    if (resp.data.length <= 0) {

        iziToast.warning({
            title: 'Warning!',
            message: "Users data not available.",
            position: 'bottomRight'
        });
    }
    else {

        $("#users_table_tbody").empty();

        // console.log("check", resp.data);

        $.each(resp.data, function (index, value) {
            var slnocell = $("<td>").append(index + 1);
            var fullNameCell = $("<td>").append(value.FullName);
            var userNameCell = $("<td>").append($("<div>").attr("class", "badge bg-info").append(value.UserName));
            var emailCell = $("<td>").append(value.Email === null ? "-" : value.Email);
            var contactNoCell = $("<td>").append(value.ContactNo === null ? "-" : value.ContactNo);
            var companyLocFloorCell = $("<td>");

            var grouped_company = groupBy(value.CompanyLocationFloors, ['CompanyShortName']);

            $.each(grouped_company, function (_index, company) {
                // console.log('grouped_company', company);

                var grouped_location = groupBy(company, ['LocationName']);


                $("<a>").attr({ "class": "btn btn-primary ", "data-bs-toggle": "collapse", "href": "#COL" + index, "role": "button", "aria-expanded": "false", "aria-controls": "COL" + index }).append(_index).appendTo(companyLocFloorCell);

                var collapse = $("<div>").attr({ "class": "collapse", "id": "COL" + index }).appendTo(companyLocFloorCell);
                //var collapse_card = $("<div>").attr({ "class": "card card-body", "style": "padding: .5rem;"}).appendTo(collapse);

                $.each(grouped_location, function (_indexloc, _obj) {

                    $("<div>").attr({ "class": "badge bg-success m-1 ", "data-bs-toggle": "collapse", "href": "#COL" + index + _index, "role": "button", "aria-expanded": "false", "aria-controls": "COL" + index + _index }).append(_indexloc).appendTo(collapse);

                    var _collapse = $("<div>").attr({ "class": "collapse", "id": "COL" + index + _index }).appendTo(collapse);

                    $.each(_obj, function (index, obj) {

                        _collapse.append($("<div>").attr("class", "badge bg-info ").append(obj.FloorName));
                    })
                })
            })

            var permissionsCell = $("<td>");
            var collapseId = "COLP" + index;

            $("<a>").attr({
                "class": "btn btn-secondary ",
                "data-bs-toggle": "collapse",
                "href": "#" + collapseId,
                "role": "button",
                "aria-expanded": "false",
                "aria-controls": collapseId
            }).append('Permissions <i class="bi bi-arrows-expand"></i>').appendTo(permissionsCell);

            var collapseDiv = $("<div>").attr({ "class": "collapse", "id": collapseId }).appendTo(permissionsCell);

            if (value.EnrollMenus.length === 0) {
                collapseDiv.append($("<div>").attr("class", "badge bg-secondary m-1").text("No menu permissions assigned to this user yet"));
            } else {
                $.each(value.EnrollMenus, function (index, per) {
                    collapseDiv.append($("<div>").attr("class", "badge bg-info m-1").text(per.MenuItemName));
                });
            }

            var teamLeaderCell = $("<td>");
            var collapseId = "COLP2" + index;

            $("<a>").attr({
                "class": "btn btn-secondary m-2",
                "data-bs-toggle": "collapse",
                "href": "#" + collapseId,
                "role": "button",
                "aria-expanded": "false",
                "aria-controls": collapseId
            }).append('Supervisors <i class="bi bi-arrows-expand"></i>').appendTo(teamLeaderCell);

            var collapseDiv = $("<div>").attr({ "class": "collapse", "id": collapseId }).appendTo(teamLeaderCell);



            if (value.EnrollSuperVisors.length === 0) {
                collapseDiv.append($("<div>").attr("class", "badge bg-secondary m-1").text("No supervisor assigned to this user yet"));
            } else {
                $.each(value.EnrollSuperVisors, function (index, per) {
                    collapseDiv.append($("<div>").attr("class", "badge bg-info m-1").text(per.SupervisorName));
                });
            }



            var userRoleTitleCell = $("<td>").append($("<div>").attr("class", "badge bg-primary").append(value.UserRoleTitle));
            var userStatusCell = $("<td>")

            user_status_text(value.UserStatus);
            function user_status_text(status) {

                if (status === 0) {
                    $("<div>").attr("class", "badge bg-warning").append("InActive").appendTo(userStatusCell);
                }
                else if (status === 1) {
                    $("<div>").attr("class", "badge bg-success m-1").append("Active").appendTo(userStatusCell);
                }
                else {
                    $("<div>").attr("class", "badge bg-danger").append("Banned").appendTo(userStatusCell);
                }
            }


            var iconcell = $("<td>");
            var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);
            //var editIcon = $("<i>").attr({
            //    "class": "e-btn bi-pen-fill text-white bg-warning rounded-circle shadow",
            //    "style": "font-size: 18px; padding: 10px; cursor: pointer; border: 2px solid white;",
            //    "title": "Edit Buyer"
            //}).appendTo(icondiv);

            var editIcon = $("<img>").attr({
                "src": "/_Assets/Icons/Edit_2.png",
                "alt": "Edit Icon",
                "title": "Edit",
                "style": "cursor: pointer; border: 2px solid white; width: 38px; height: 38px;"
            });

            icondiv.append(editIcon);

            var unlockIcon = $("<i>").attr({
                "class": "e-btn bi-lock text-white bg-primary rounded-circle shadow",
                "style": "font-size: 18px; padding: 10px; cursor: pointer; border: 2px solid white;",
                "title": "Edit User"
            }).appendTo(icondiv);

            $("<tr>").attr("class", "text-center").append(slnocell, fullNameCell, userNameCell, emailCell, contactNoCell, userRoleTitleCell, companyLocFloorCell, permissionsCell, teamLeaderCell, userStatusCell, iconcell).appendTo("#users_table_tbody");

            (function ($) {
                editIcon.on("click", function (e) {

                    //Super admin

                    //console.log(value);


                    if (value.UserRoleId == 1) {
                        json = {
                            UserRoleId: value.UserRoleId,
                        };
                        $.ajax({
                            url: "/UserRoles/CheckEditValidation/",
                            type: "POST",
                            data: json,
                            dataType: "json",
                            traditional: true,
                            success: function (resp) {

                                if (resp.error) {
                                    iziToast.warning({
                                        title: 'Warning!',
                                        message: resp.message,
                                        position: 'bottomRight'
                                    });
                                    return;
                                }
                                else {
                                    $("#edit_user_modal").modal("show");
                                }
                            }
                        });


                    }
                    else {
                        e.preventDefault();
                        $("#edit_user_modal").modal("show");
                    }


                    $("#edit_department").attr("disabled", true);
                    $("#edit_designation").attr("disabled", true);


                    $("#edit_fullname").data("userNo", value.UserNo);
                    $("#edit_fullname").val(value.FullName);
                    $("#edit_username").val(value.UserName);
                    $("#edit_password").val("*******");
                    $("#edit_email").val(value.Email);
                    $("#edit_contact_no").val(value.ContactNo);
                    $("#edit_user_role").val(value.UserRoleId);
                    $("#edit_user_status").val(value.UserStatus);
                    $("#edit_department").val(value.DepartmentId);
                    $("#edit_designation").val(value.DesignationId);
                    $("#edit_primary_company").val(value.PrimaryCompanyId).change();
                    $("#edit_primary_location").val(value.PrimaryLocationId);
                    //console.log("hello", value.CompanyLocationFloors);

                    $("#ls_edit_country_permission_table_tbody").empty();

                    $.each(value.CompanyLocationFloors, function (index, value)
                    {
                        var rowCount = $('#ls_country_permission_table_tbody tr').length;
                        var slNocell = $("<td>").append(rowCount + 1);
                        var companycell = $("<td>").attr('data-id', value.CompanyId).append(value.CompanyName);
                        var locationcell = $("<td>").attr('data-id', value.LocationId).append(value.LocationName);
                        var floorcell = $("<td>").attr('data-id', value.FloorId).append(value.FloorName);

                        var iconcell = $("<td>");
                        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);

                        var deleteIcon = $("<i>").attr({
                            "class": "bi-trash-fill btn icon btn-danger rounded-circle shadow",
                            "style": "font-size: 12px; cursor: pointer; border: 2px solid white;",
                            "title": "Delete"
                        }).appendTo(icondiv);
                        var row = $("<tr>").attr("class", "text-center").append(slNocell, companycell, locationcell, floorcell, iconcell).appendTo("#ls_edit_country_permission_table_tbody");
                        (function ($) {

                            deleteIcon.on("click", function (e) {
                                e.preventDefault();
                                row.remove();
                            });

                        })(jQuery);
                    })

                    var Values = new Array();

                    $.each(value.EnrollMenus, function (index, value) {
                        Values.push(value.MenuItemId);
                    });

                    //// console.log(Values);
                    //$("#edit_user_permissions").val(Values).trigger('change');
                    $("#edit_user_permissions").val(Values).multiselect('reload')

                    var Values2 = new Array();

                    $.each(value.EnrollSuperVisors, function (index, value) {
                        Values2.push(value.SupervisorId);
                    });

                    //console.log("valu", Values2);
                    //$("#edit_user_supervisor").val(Values2).trigger('change');
                    $("#edit_user_supervisor").val(Values2).multiselect('reload')

                });

                unlockIcon.on("click", function (e) {

                    $("#change_password_modal_form").trigger("reset");
                    $("#change_password_modal_form").removeClass("was-validated");

                    $("#editpassword_username").data("userNo", value.UserNo);
                    $("#editpassword_username").val(value.UserName);
                    //console.log("username", value.UserNo);
                    $("#change_password_modal").modal("show");

                });

            })(jQuery);


        });
    }
}
//End shows data on users table


$("#add_user_btn").on("click", function () {
    $('#users_add_modal_form').removeClass('was-validated');
    $('#ls_country_permission_table_tbody').html('');
    $('#add_user_permissions').val(null).change();

    $("#add_user_modal").modal("show");
    $("#users_add_modal_form").trigger("reset");
    //$('.select2').trigger('change');
});

$("#filter_btn").on("click", function (e) {
    e.preventDefault();
    load_filtered_users(1);
});

//////////////////////
$('#edit_department, #add_department,#users_add_location,#users_edit_location').change(function () {
    // $('#filter_Machine option[value!="-1"]').remove();
    $('#edit_user_supervisor option').remove();
    $('#add_user_supervisor option').remove();
    //load_dia_wise_machines($("#filter_dia").val());
    load_supervisor_for_dropdown();
});
/////////////////////



// load menu for dropdown
load_menu_for_dropdown();
function load_menu_for_dropdown() {
    $.ajax({
        url: '/MenuItems/ShowMenuItemsForDropdown',
        type: "POST",
        contentType: "application/json; charset-utf-8",
        success: function (resp) {
            if (resp.error) {
                iziToast.error({
                    title: 'Error!',
                    message: resp.message,
                    position: 'bottomRight'
                });
            }
            else {
                $("#add_user_permissions").empty();
                $("#edit_user_permissions").empty();


                var groupedMenuList = groupBy(resp.data, ['MenuCategoryId'])
               // console.log("test", resp.data);

                $.each(groupedMenuList, function (index, _agroupedvalue) {
                    var add_option_grouped = $("#add_user_permissions");//.select2();
                    var _add_option_grouped = $('<optgroup>').attr('label', _agroupedvalue[0].MenuCategoryTitle).appendTo(add_option_grouped);

                    var edit_option_grouped = $("#edit_user_permissions");//.select2();
                    var _edit_option_grouped = $('<optgroup>').attr('label', _agroupedvalue[0].MenuCategoryTitle).appendTo(edit_option_grouped);
                    $.each(_agroupedvalue, function (index, value) {

                        _add_option_grouped.append('<option value="' + value.MenuItemId + '">' + value.MenuItemName + '</option>');
                        _edit_option_grouped.append('<option value="' + value.MenuItemId + '">' + value.MenuItemName + '</option>');

                    });
                });

                $('select[multiple]').multiselect({

                    columns: 3,     // how many columns should be use to show options
                    search: true, // include option search box

                    // search filter options
                    searchOptions: {
                        delay: 250,                  // time (in ms) between keystrokes until search happens
                        showOptGroups: true,                // show option group titles if no options remaining
                        searchText: true,                 // search within the text
                        searchValue: false,                // search within the value
                        onSearch: function (element) { } // fires on keyup before search on options happens
                    },

                    // plugin texts
                    texts: {
                        placeholder: 'Select options', // text to use in dummy input
                        search: 'Search',         // search input placeholder text
                        selectedOptions: ' selected',      // selected suffix text
                        selectAll: 'Select All',     // select all text
                        unselectAll: 'Unselect All',   // unselect all text
                        noneSelected: 'None Selected'   // None selected text
                    },

                    // general options
                    selectAll: true, // add select all option
                    selectGroup: true, // select entire optgroup
                    minHeight: 200,   // minimum height of option overlay
                    maxHeight: null,  // maximum height of option overlay
                    maxWidth: null,  // maximum width of option overlay (or selector)
                    maxPlaceholderWidth: null, // maximum width of placeholder button
                    maxPlaceholderOpts: 10, // maximum number of placeholder options to show until "# selected" shown instead
                    showCheckbox: true,  // display the checkbox to the user
                    optionAttributes: [],  // attributes to copy to the checkbox from the option element

                    // Callbacks
                    onLoad: function (element) { },           // fires at end of list initialization
                    onOptionClick: function (element, option) { },   // fires when an option is clicked
                    onControlOpen: function (element) { },           // fires when the options list is opened
                    onControlClose: function (element) { },           // fires when the options list is closed
                    onSelectAll: function (element, selected) { }, // fires when (un)select all is clicked
                    onPlaceholder: function (element, placeholder, selectedOpts) { }, // fires when the placeholder txt is up<a href="https://www.jqueryscript.net/time-clock/">date</a>d

                });
            }
        }
    });
}


//add company permission

$("#users_company_loc_floor_btn").on("click", function (e) {
    e.preventDefault();

    let companyVal = $("#users_add_company").val();
    let company = $("#users_add_company option:selected").text();
    let locationVal = $("#users_add_location").val();
    let location = $("#users_add_location option:selected").text();
    let floorVal = $("#users_add_floor").val();
    let floor = $("#users_add_floor option:selected").text();

    if (companyVal == "" || locationVal == "" || floorVal == "") {
        iziToast.warning({
            title: 'Warning!',
            message: "Please add permission by company,location,floor",
            position: 'bottomRight'
        });
        return;
    }

    if (!_is_exist_label_company_data(company, location, floor)) {
        var rowCount = $('#ls_country_permission_table_tbody tr').length;
        var slNocell = $("<td>").append(rowCount + 1);
        var companycell = $("<td>").attr('data-id', companyVal).append(company);
        var locationcell = $("<td>").attr('data-id', locationVal).append(location);
        var floorcell = $("<td>").attr('data-id', floorVal).append(floor);

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);

        var deleteIcon = $("<i>").attr({
            "class": "bi-trash-fill btn icon btn-danger rounded-circle shadow",
            "style": "font-size: 12px; cursor: pointer; border: 2px solid white;",
            "title": "Delete"
        }).appendTo(icondiv);
        var row = $("<tr>").attr("class", "text-center").append(slNocell, companycell, locationcell, floorcell, iconcell).appendTo("#ls_country_permission_table_tbody");
        (function ($) {

            deleteIcon.on("click", function (e) {
                e.preventDefault();
                row.remove();
            });

        })(jQuery);
    }
    else {
        iziToast.warning({
            title: 'Warning!',
            message: "Already added this permission.",
            position: 'bottomRight'
        });
    }

});


function _is_exist_label_company_data(company, location, floor) {

    var table = document.getElementById("ls_country_permission_table");

    /*
    Extract and iterate rows from tbody of table2
    */
    for (const tr of table.querySelectorAll("tbody tr")) {

        /*
        Extract first and second cell from this row
        */
        const td1 = tr.querySelector("td:nth-child(2)");
        const td2 = tr.querySelector("td:nth-child(3)");
        const td3 = tr.querySelector("td:nth-child(4)");

        /*
        If this row has missing cells, skip it
        */
        if (!td1 || !td2 || !td3) {
            continue;
        }
        /*
        Check if cells of existing tr row contain same contents
        as input arguments.
        */
        if ((td1.innerHTML == company) && (td2.innerHTML == location) && (td3.innerHTML == floor)) {
            return true;
        }
    }
    return false;
}


$("#users_company_loc_floor_edit_btn").on("click", function (e) {
    e.preventDefault();

    let companyVal = $("#users_edit_company").val();
    let company = $("#users_edit_company option:selected").text();
    let locationVal = $("#users_edit_location").val();
    let location = $("#users_edit_location option:selected").text();
    let floorVal = $("#users_edit_floor").val();
    let floor = $("#users_edit_floor option:selected").text();

    if (companyVal == "" || locationVal == "" || floorVal == "") {
        iziToast.warning({
            title: 'Warning!',
            message: "Please add permission by company,location,floor",
            position: 'bottomRight'
        });
        return;
    }

    if (!_edit_is_exist_label_company_data(company, location, floor)) {
        var rowCount = $('#ls_country_permission_table_tbody tr').length;
        var slNocell = $("<td>").append(rowCount + 1);
        var companycell = $("<td>").attr('data-id', companyVal).append(company);
        var locationcell = $("<td>").attr('data-id', locationVal).append(location);
        var floorcell = $("<td>").attr('data-id', floorVal).append(floor);

        var iconcell = $("<td>");
        var icondiv = $("<div>").attr("class", "d-flex justify-content-center").appendTo(iconcell);

        var deleteIcon = $("<i>").attr({
            "class": "bi-trash-fill btn icon btn-danger rounded-circle shadow",
            "style": "font-size: 12px; cursor: pointer; border: 2px solid white;",
            "title": "Delete"
        }).appendTo(icondiv);
        var row = $("<tr>").attr("class", "text-center").append(slNocell, companycell, locationcell, floorcell, iconcell).appendTo("#ls_edit_country_permission_table_tbody");
        (function ($) {

            deleteIcon.on("click", function (e) {
                e.preventDefault();
                row.remove();
            });

        })(jQuery);
    }
    else {
        iziToast.warning({
            title: 'Warning!',
            message: "Already added this permission.",
            position: 'bottomRight'
        });
    }

});

function _edit_is_exist_label_company_data(company, location, floor) {

    var table = document.getElementById("ls_edit_country_permission_table");

    /*
    Extract and iterate rows from tbody of table2
    */
    for (const tr of table.querySelectorAll("tbody tr")) {

        /*
        Extract first and second cell from this row
        */
        const td1 = tr.querySelector("td:nth-child(2)");
        const td2 = tr.querySelector("td:nth-child(3)");
        const td3 = tr.querySelector("td:nth-child(4)");

        /*
        If this row has missing cells, skip it
        */
        if (!td1 || !td2 || !td3) {
            continue;
        }
        /*
        Check if cells of existing tr row contain same contents
        as input arguments.
        */
        if ((td1.innerHTML == company) && (td2.innerHTML == location) && (td3.innerHTML == floor)) {
            return true;
        }
    }
    return false;
}

$('#add_username').keypress(function (e) {
    var regex = new RegExp("^[a-zA-Z0-9.]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    iziToast.warning({
        title: 'Warning!',
        message: "Please enter username using only letters and dots",
        position: 'bottomRight'
    });
    return false;
});

//For User function - Add User - Start save new user action *

$("#users_add_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#users_add_modal_form')[0].checkValidity() === false) {
        e.stopPropagation();
    }
    else {

        var password = $("#add_password").val();
        if (password.length < 5) {
            iziToast.error({
                title: 'Error!',
                message: "Password length should be minimum five character long.",
                position: 'bottomRight'
            });
            return;
        }
        var username = $("#add_username").val();
        if (username.length < 3) {
            iziToast.error({
                title: 'Error!',
                message: "Username length should be minimum three character long.",
                position: 'bottomRight'
            });
            return;
        }
        if ($("#ls_country_permission_table_tbody tr").length < 1) {
            iziToast.error({
                title: 'Error!',
                message: "Plase add at least one company,unit,floor permission.",
                position: 'bottomRight'
            });
            return;
        }
        if ($("#add_unit").val() == -1 && $("#add_user_role").val() == undefined) {
            iziToast.error({
                title: 'Error!',
                message: "User role should be Unit Admin if you assign to all unit.",
                position: 'bottomRight'
            });
            return;
        }

        var enrollCompanyLocationFloors = _get_company_permission_data('ls_country_permission_table_tbody');



        json = {
            FullName: $("#add_fullname").val(),
            Username: username,
            Email: $("#add_email").val(),
            ContactNo: $("#add_contact_no").val(),
            UserRoleId: $("#add_user_role").val(),
            UserStatus: $("#add_user_status").val(),
            PassPhrase: password,
            MenuList: $("#add_user_permissions").val(),
            EnrollCompanyLocationFloors: enrollCompanyLocationFloors,
            ///////////////////////////////////////
            DesignationId: $("#add_designation").val(),
            DepartmentId: $("#add_department").val(),
            SuperVisorList: $("#add_user_supervisor").val(),
            PrimaryCompanyId: $("#add_primary_company").val(),
            PrimaryLocationId: $("#add_primary_location").val(),

        };

        $.ajax({
            url: "/Users/AddUser/",
            type: "POST",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),
            success: function (resp) {

                if (resp.error) {
                    iziToast.error({
                        title: 'Warning!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }
                else {
                    iziToast.success({
                        title: 'Success!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_filtered_users(1);
                    load_supervisor_for_dropdown();
                    $("#users_add_modal_form").removeClass('was-validated');
                    $("#add_user_modal").modal("hide");
                }
            },
            beforeSend: function () {
                $("#users_loading_spinner").show();
            },
            complete: function () {
                $("#users_loading_spinner").hide();
            }
        });
    }

});

function _get_company_permission_data(id) {

    var _comArr = [];
    //gets table
    var oTable = document.getElementById(id);
    //gets rows of table
    var rowLength = oTable.rows.length;
    //loops through rows    
    for (i = 0; i < rowLength; i++) {
        //gets cells of current row
        var oCells = oTable.rows.item(i).cells;
        //gets amount of cells of current row
        if (oCells.item(1).innerText != "" && oCells.item(2).innerText != "" && oCells.item(3).innerText != "") {
            var _jsonArry = {
                companyId: oCells.item(1).getAttribute('data-id'),
                //CompanyName: oCells.item(1).innerText,
                LocationId: oCells.item(2).getAttribute('data-id'),
                //LocationName: oCells.item(2).innerText,
                FloorId: oCells.item(3).getAttribute('data-id'),
                //FloorName: oCells.item(3).innerText,
                //OrderQuantityId: oTable.rows[i].getAttribute('data-id'),
                //DistributeCuttingQuantity: oCells.item(8).innerText
            }
            _comArr.push(_jsonArry);
        }
    }

    return _comArr;
}



//For User Function - Edit and Update User *
//Start update user action

$("#edit_user_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#edit_user_modal_form')[0].checkValidity() === false) {
        e.stopPropagation();
    }
    else {
        if ($("#ls_edit_country_permission_table_tbody tr").length < 1) {
            iziToast.error({
                title: 'Error!',
                message: "Plase add at least one company,unit,floor permission.",
                position: 'bottomRight'
            });
            return;
        }
        if ($("#add_unit").val() == -1 && $("#add_user_role").val() == undefined) {
            iziToast.error({
                title: 'Error!',
                message: "User role should be Unit Admin if you assign to all unit.",
                position: 'bottomRight'
            });
            return;
        }

        var enrollCompanyLocationFloors = _get_company_permission_data('ls_edit_country_permission_table_tbody');

     // console.log("enrollCompanyLocationFloors", enrollCompanyLocationFloors);

        json = {
            UserNo: $("#edit_fullname").data('userNo'),
            FullName: $("#edit_fullname").val(),
            Email: $("#edit_email").val(),
            ContactNo: $("#edit_contact_no").val(),
            UserRoleId: $("#edit_user_role").val(),
            UserStatus: $("#edit_user_status").val(),
            MenuList: $("#edit_user_permissions").val(),
            EnrollCompanyLocationFloors: enrollCompanyLocationFloors,
            ///////////////////////////////////////////
            DesignationId: $("#edit_designation").val(),
            DepartmentId: $("#edit_department").val(),
            UserName: $("#edit_username").val(),
            SuperVisorList: $("#edit_user_supervisor").val(),
            PrimaryCompanyId: $("#edit_primary_company").val(),
            PrimaryLocationId: $("#edit_primary_location").val()

        };


        $.ajax({
            url: "/Users/EditUser/",
            type: "POST",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),
            success: function (resp) {

                if (resp.error) {
                    iziToast.error({
                        title: 'Error!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }
                else {
                    iziToast.success({
                        title: 'Success!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    load_filtered_users(parseInt($("#users_pageno").text()));
                    load_supervisor_for_dropdown();
                    $("#edit_user_modal_form").removeClass('was-validated');
                    $("#edit_user_modal").modal("hide");
                }
            },
            beforeSend: function () {
                $("#users_loading_spinner").show();
            },
            complete: function () {
                $("#users_loading_spinner").hide();
            }
        });
    }
});
//End update user action


//Start users pagination action
$("#prev_users_list").on("click", function () {
    var currentPage = parseInt($("#users_pageno").text());
    if (currentPage === 1) {

        iziToast.warning({
            title: 'Warning!',
            message: "You are in page one",
            position: 'bottomRight'
        });
    }
    else {
        load_filtered_users(currentPage - 1);
        $("#users_pageno").text(currentPage - 1);
    }
});

$("#next_users_list").on("click", function () {
    var currentPage = parseInt($("#users_pageno").text());
    if (load_filtered_users(currentPage + 1) == true) {
        $("#users_pageno").text(currentPage + 1);
    }
});

$("#users_pageno").on("click", function () {
    $("#users_pageno_input").removeClass("display-none");
    $("#users_pageno").addClass("display-none");
    $("#users_pageno_input").focus();
});

$("#users_pageno_input").blur(function () {
    $("#users_pageno").removeClass("display-none");
    $("#users_pageno_input").addClass("display-none");
});

$("#users_pageno_input").keydown(function (e) {

    if (e.keyCode === 13) {
        if ($("#users_pageno_input").val() > 0) {
            if (load_filtered_users($("#users_pageno_input").val()) == true) {
                $("#users_pageno").text($("#users_pageno_input").val());
                $("#users_pageno_input").val("");
                $("#users_pageno").removeClass("display-none");
                $("#users_pageno_input").addClass("display-none");
            } 
        }
        else {
            $("#users_pageno_input").val("");

            iziToast.warning({
                title: 'Warning!',
                message: "Page number should be greater than zero",
                position: 'bottomRight'
            });
        }

    }
    else if (e.keyCode === 27) {
        $("#users_pageno").removeClass("display-none");
        $("#users_pageno_input").addClass("display-none");
    }

});


//Start change password user action

$("#change_password_modal_form").on("submit", function (e) {
    e.preventDefault();

    if ($('#change_password_modal_form')[0].checkValidity() === false) {
        e.stopPropagation();
    }
    else {
        json = {
            userNo: $("#editpassword_username").data("userNo"),         
            key: $("#editpassword_key").val(),
            username: $("#editpassword_username").val(),
            password: $("#editpassword_newpassword").val(),
        };

        $.ajax({
            url: "/Users/ChangePassword/",
            type: "POST",
            contentType: "application/json; charset-utf-8",
            data: JSON.stringify(json),
            success: function (resp) {

                if (resp.error) {
                    iziToast.error({
                        title: 'Error!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                }
                else {
                    iziToast.success({
                        title: 'Success!',
                        message: resp.message,
                        position: 'bottomRight'
                    });
                    //console.log("page", parseInt($("#users_pageno").text()));
                    load_filtered_users(parseInt($("#users_pageno").text()));
                    //load_filtered_users(1);
                    $("#change_password_modal").modal("hide");
                }
            },
            beforeSend: function () {
                $("#users_loading_spinner").show();
            },
            complete: function () {
                $("#users_loading_spinner").hide();
            }
        });
    }
});
//End change password user action