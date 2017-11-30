javascript: (function() {
    /* A class that servs as a way to store the different hours for each team member. */
    class peepObj {
        constructor(name) {
            this.name = name;
            this.clarificationHours = 0.0;
            this.requirementHours = 0.0;
            this.unspecifiedHours = 0.0;
            this.projectManagementHours = 0.0;
            this.designHours = 0.0;
            this.testingHours = 0.0;
        }
    }
    /* Gets the current URL */
    var currentURL = window.location.search;
    /* This works under the assumption that the JIRA page maintains the query string parameter of 'periodType=BILLING'*/
    /* This query string correlates with the page that contains a breakdown of hours logged for tickets within a particular query */
    if (!currentURL.includes('periodType=BILLING')) {
        alert('Sorry!\n\nYou cannot use this tool with this page.\n\nYou should go to the Tempo Timesheet page, then try to use this tool.\n\nBe sure to use the Advanced option along with the Report view, on this page.');
    } else {
        var level3 = document.getElementsByClassName('level-3');
        var peeps = ['total_hours'];
        var peepsObj = [];
        peepsObj.push(new peepObj(peeps[0]));
        if (calculateSums() > -1) {
            showSumTable();
        }
    }
 
    function calculateSums() {
        for (var x = 0; x < level3.length / 2; x++) {
            try {
                var log = level3[x];
                var fullName = log.querySelectorAll('td.displayName')[0].innerHTML.trim().toLowerCase().split(' ');
                var nameOfBA = fullName.join('_');
                var worklogSummary = log.querySelectorAll("[data-field='edit-desc']")[0].innerHTML.trim().toLowerCase();
                var worklogNumber = parseFloat(log.querySelectorAll("td.editable [data-editable='isHoursEditable']")[1].innerHTML.trim());
            } catch (err) {
                console.log('Does not compute! The bean counter ran out of beans! ' + err);
                return -1;
            }
            if (peeps.indexOf(nameOfBA) < 0) {
                peeps.push(nameOfBA);
                peeps.sort();
                peepsObj.splice(peeps.indexOf(nameOfBA), 0, new peepObj(nameOfBA));
            }
            if (!isNaN(worklogNumber)) {
                switch (nameOfBA) {
                    case 'anna_pavolovich':
                    case 'stefan_sitsko':
                    case 'olga_leshkevich':
                    case 'iliya_fokeev':
                        try {
                            peepsObj[peeps.indexOf(nameOfBA)].clarificationHours += worklogNumber;
                            peepsObj[peeps.indexOf('total')].clarificationHours += worklogNumber;
                            break;
                        } catch (err) {
                            alert('Something went wrong!\n\n' + err);
                            console.log(err);
                            return -1;
                        }
                    default:
                        try {
                            checkCategory(nameOfBA, worklogSummary, worklogNumber);
                            break;
                        } catch (err) {
                            alert('Something went wrong!\n\n' + err);
                            console.log(err);
                            return -1;
                        }
                }
            }
        }
        return 0;
    }
 
    function checkCategory(name, type, hours) {
        if (type) {
            if (type.indexOf('clarification') > -1) {
                peepsObj[peeps.indexOf(name)].clarificationHours += hours;
                peepsObj[peeps.indexOf('total_hours')].clarificationHours += hours;
            } else if (type.indexOf('requirement') > -1) {
                peepsObj[peeps.indexOf(name)].requirementHours += hours;
                peepsObj[peeps.indexOf('total_hours')].requirementHours += hours;
            } else if (type.indexOf('project management') > -1) {
                peepsObj[peeps.indexOf(name)].projectManagementHours += hours;
                peepsObj[peeps.indexOf('total_hours')].projectManagementHours += hours;
            } else if (type.indexOf('test') > -1) {
                peepsObj[peeps.indexOf(name)].testHours += hours;
                peepsObj[peeps.indexOf('total_hours')].testHours += hours;
            } else if (type.indexOf('working on issue') > -1) {
                peepsObj[peeps.indexOf(name)].unspecifiedHours += hours;
                peepsObj[peeps.indexOf('total_hours')].unspecifiedHours += hours;
            } else {
                peepsObj[peeps.indexOf(name)].unspecifiedHours += hours;
                peepsObj[peeps.indexOf('total_hours')].unspecifiedHours += hours;
            }
        }
    }
 
    function showSumTable() {
        var tableBody = ' ';
        var indexOfTotal = 0;
        for (var y = 0; y < peepsObj.length; y++) {
            if (peepsObj[y].name != 'total_hours') {
                var sumHours = peepsObj[y].clarificationHours + peepsObj[y].requirementHours + peepsObj[y].projectManagementHours + peepsObj[y].designHours + peepsObj[y].testingHours + peepsObj[y].unspecifiedHours;
                var empName = peepsObj[y].name.split('_');
                var firstName = empName[0].charAt(0).toUpperCase() + empName[0].slice(1);
                var lastName = empName[1].charAt(0).toUpperCase() + empName[1].slice(1);
                tableBody += '<tr><td>' + firstName + ' ' + lastName + '</td>' + '<td>' + peepsObj[y].clarificationHours + '</td>' + '<td>' + peepsObj[y].requirementHours + '</td>' + '<td>' + peepsObj[y].projectManagementHours + '</td>' + '<td>' + peepsObj[y].designHours + '</td>' + '<td>' + peepsObj[y].testingHours + '</td>' + '<td> ' + peepsObj[y].unspecifiedHours + '</td>' + "<td class='totalHours'> " + sumHours + '</td>' + '</tr>';
            } else {
                indexOfTotal = y;
            }
        } /*Adding the totals hours after looping through all other hours */
        var sumHours = peepsObj[indexOfTotal].clarificationHours + peepsObj[indexOfTotal].requirementHours + peepsObj[indexOfTotal].projectManagementHours + peepsObj[indexOfTotal].designHours + peepsObj[indexOfTotal].testingHours + peepsObj[indexOfTotal].unspecifiedHours;
        var empName = peepsObj[indexOfTotal].name.split('_');
        var firstName = empName[0].charAt(0).toUpperCase() + empName[0].slice(1);
        var lastName = empName[1].charAt(0).toUpperCase() + empName[1].slice(1);
        tableBody += '<tr><td>' + firstName + ' ' + lastName + '</td>' + '<td>' + peepsObj[indexOfTotal].clarificationHours + '</td>' + '<td>' + peepsObj[indexOfTotal].requirementHours + '</td>' + '<td>' + peepsObj[indexOfTotal].projectManagementHours + '</td>' + '<td>' + peepsObj[indexOfTotal].designHours + '</td>' + '<td>' + peepsObj[indexOfTotal].testingHours + '</td>' + '<td> ' + peepsObj[indexOfTotal].unspecifiedHours + '</td>' + "<td class='totalHours'> " + sumHours + '</td>' + '</tr>';
        var objSummary = '<table><thead><tr><th>Name</th><th>Clarification Hours</th><th>Requirement Hours</th><th>Project Management Hours</th><th>Design Hours</th><th>Testing Hours</th><th>Unspecfied Hours</th><th>Total Hours</th></tr></thead><tbody>' + tableBody + '</tbody></table>';
        var style = '<title>Summary of Hours</title><style> table {width:100%; border-collapse: collapse; border-spacing: 0; padding:2%;} table * { border-right:1px solid black; border-bottom:1px solid gray; padding:1%;} table tbody tr:hover { background-color:lightblue; }thead tr * { font-weight:bold; } tbody tr * {text-align:center;} .totalHours:hover {background-color:yellow;} </style>';
        var windowWidth = (windowDim = 'width=' + screen.width + 'px,height=' + screen.height + 'px' + ',location=no');
        var resultsWindow = window.open(' ', 'Summary of Hours', windowDim);
        resultsWindow.document.write(style + objSummary);
    }
})();
