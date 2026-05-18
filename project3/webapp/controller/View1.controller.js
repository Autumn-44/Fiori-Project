sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function (
    Controller,
    JSONModel,
    Filter,
    FilterOperator,
    Fragment,
    MessageToast
) {

    "use strict";

    return Controller.extend("project3.controller.View1", {

        onInit: function () {

            var oModel = new JSONModel();

            oModel.loadData(
                sap.ui.require.toUrl(
                    "project3/model/data.json"
                )
            );

            this.getView().setModel(oModel);
        },

        // EMPLOYEE SEARCH

        onEmployeeSearch: function () {

            var sValue = this.byId(
                "employeeSearchField01"
            ).getValue();

            var oBinding = this.byId(
                "employeeTable01"
            ).getBinding("items");

            var oFilter = new Filter({

                filters: [

                    new Filter(
                        "empId",
                        FilterOperator.Contains,
                        sValue
                    ),

                    new Filter(
                        "name",
                        FilterOperator.Contains,
                        sValue
                    ),

                    new Filter(
                        "department",
                        FilterOperator.Contains,
                        sValue
                    )

                ],

                and: false
            });

            oBinding.filter([oFilter]);
        },

        // PERFORMANCE SEARCH

        onPerformanceSearch: function () {

            var sValue = this.byId(
                "performanceSearchField01"
            ).getValue();

            var oBinding = this.byId(
                "performanceTable01"
            ).getBinding("items");

            var oFilter = new Filter({

                filters: [

                    new Filter(
                        "empId",
                        FilterOperator.Contains,
                        sValue
                    ),

                    new Filter(
                        "name",
                        FilterOperator.Contains,
                        sValue
                    ),

                    new Filter(
                        "rating",
                        FilterOperator.Contains,
                        sValue
                    )

                ],

                and: false
            });

            oBinding.filter([oFilter]);
        },

        // OPEN EMPLOYEE DIALOG

        onOpenAddEmployeeDialog: async function () {

            if (!this.oEmployeeDialog) {

                this.oEmployeeDialog =
                    await Fragment.load({

                        id: this.getView().getId(),

                        name:
                        "project3.view.AddEmployee",

                        controller: this
                    });

                this.getView().addDependent(
                    this.oEmployeeDialog
                );
            }

            this.oEmployeeDialog.open();
        },

        onCloseDialog: function () {

            this.oEmployeeDialog.close();
        },

        // ADD EMPLOYEE

        onAddEmployee: function () {

            var oModel =
                this.getView().getModel();

            var aEmployees =
                oModel.getProperty("/employees");

            aEmployees.push({

                empId: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--inputEmpIdFragment01"
                ).getValue(),

                name: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--inputEmpNameFragment01"
                ).getValue(),

                department: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--inputDepartmentFragment01"
                ).getValue(),

                designation: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--inputDesignationFragment01"
                ).getValue(),

                location: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--inputLocationFragment01"
                ).getValue(),

                salary: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--inputSalaryFragment01"
                ).getValue(),

                email: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--inputEmailFragment01"
                ).getValue(),

                phone: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--inputPhoneFragment01"
                ).getValue()

            });

            oModel.refresh(true);

            this.oEmployeeDialog.close();

            MessageToast.show(
                "Employee Added"
            );
        },

        // DELETE EMPLOYEE

        onDeleteEmployee: function (oEvent) {

            var oItem =
                oEvent.getSource().getParent();

            var sPath =
                oItem.getBindingContext().getPath();

            var iIndex =
                parseInt(sPath.split("/")[2]);

            var oModel =
                this.getView().getModel();

            var aEmployees =
                oModel.getProperty("/employees");

            aEmployees.splice(iIndex, 1);

            oModel.refresh(true);

            MessageToast.show(
                "Employee Deleted"
            );
        },

        // OPEN PERFORMANCE DIALOG

        onOpenPerformanceDialog: async function () {

            if (!this.oPerformanceDialog) {

                this.oPerformanceDialog =
                    await Fragment.load({

                        id: this.getView().getId(),

                        name:
                        "project3.view.AddPerformance",

                        controller: this
                    });

                this.getView().addDependent(
                    this.oPerformanceDialog
                );
            }

            this.oPerformanceDialog.open();
        },

        onClosePerformanceDialog: function () {

            this.oPerformanceDialog.close();
        },

        // ADD PERFORMANCE

        onAddPerformance: function () {

            var oModel =
                this.getView().getModel();

            var aPerformance =
                oModel.getProperty(
                    "/performanceEmployees"
                );

            var iScore = parseInt(

                sap.ui.getCore().byId(

                    this.getView().getId() +
                    "--performanceInputScore01"

                ).getValue()

            );

            aPerformance.push({

                empId: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--performanceInputEmpId01"
                ).getValue(),

                name: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--performanceInputName01"
                ).getValue(),

                score: iScore,

                experience: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--performanceInputExperience01"
                ).getValue(),

                projects: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--performanceInputProjects01"
                ).getValue(),

                bonus: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--performanceInputBonus01"
                ).getValue(),

                attendance: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--performanceInputAttendance01"
                ).getValue(),

                promotion: sap.ui.getCore().byId(
                    this.getView().getId() +
                    "--performanceInputPromotion01"
                ).getValue(),

                rating: iScore < 50
                    ? "Poor"
                    : "Excellent"

            });

            oModel.refresh(true);

            this.oPerformanceDialog.close();

            MessageToast.show(
                "Performance Added"
            );
        },

        // DELETE PERFORMANCE

        onDeletePerformance: function (oEvent) {

            var oItem =
                oEvent.getSource().getParent();

            var sPath =
                oItem.getBindingContext().getPath();

            var iIndex =
                parseInt(sPath.split("/")[2]);

            var oModel =
                this.getView().getModel();

            var aPerformance =
                oModel.getProperty(
                    "/performanceEmployees"
                );

            aPerformance.splice(iIndex, 1);

            oModel.refresh(true);

            MessageToast.show(
                "Performance Deleted"
            );
        },

        // EMPLOYEE PDF

        onDownloadEmployeePDF: function () {

            this.loadPDFLibraries(
                this.generateEmployeePDF.bind(this)
            );
        },

        // PERFORMANCE PDF

        onDownloadPerformancePDF: function () {

            this.loadPDFLibraries(
                this.generatePerformancePDF.bind(this)
            );
        },

        // COMBINED PDF

        onDownloadCombinedPDF: function () {

            this.loadPDFLibraries(
                this.generateCombinedPDF.bind(this)
            );
        },

        // LOAD PDF LIBRARIES

        loadPDFLibraries: function (fnCallback) {

            if (!window.jspdf) {

                $.getScript(
                    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
                ).done(function () {

                    $.getScript(
                        "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"
                    ).done(function () {

                        fnCallback();

                    });

                });

            } else {

                fnCallback();
            }
        },

        // GENERATE EMPLOYEE PDF

        generateEmployeePDF: function () {

            const { jsPDF } = window.jspdf;

            var doc =
                new jsPDF("landscape");

            var aEmployees =
                this.getView()
                .getModel()
                .getProperty("/employees");

            var aBody = [];

            aEmployees.forEach(function (emp) {

                aBody.push([

                    emp.empId,
                    emp.name,
                    emp.department,
                    emp.designation,
                    emp.location,
                    emp.salary,
                    emp.email,
                    emp.phone

                ]);
            });

            doc.text(
                "Employee Report",
                14,
                20
            );

            doc.autoTable({

                startY: 30,

                head: [[

                    "ID",
                    "Name",
                    "Department",
                    "Designation",
                    "Location",
                    "Salary",
                    "Email",
                    "Phone"

                ]],

                body: aBody

            });

            doc.save(
                "Employee_Report.pdf"
            );
        },

        // GENERATE PERFORMANCE PDF

        generatePerformancePDF: function () {

            const { jsPDF } = window.jspdf;

            var doc =
                new jsPDF("landscape");

            var aPerformance =
                this.getView()
                .getModel()
                .getProperty(
                    "/performanceEmployees"
                );

            var aBody = [];

            aPerformance.forEach(function (emp) {

                aBody.push([

                    emp.empId,
                    emp.name,
                    emp.score,
                    emp.experience,
                    emp.projects,
                    emp.bonus,
                    emp.attendance,
                    emp.promotion,
                    emp.rating

                ]);
            });

            doc.text(
                "Performance Report",
                14,
                20
            );

            doc.autoTable({

                startY: 30,

                head: [[

                    "ID",
                    "Name",
                    "Score",
                    "Experience",
                    "Projects",
                    "Bonus",
                    "Attendance",
                    "Promotion",
                    "Rating"

                ]],

                body: aBody

            });

            doc.save(
                "Performance_Report.pdf"
            );
        },

        // GENERATE COMBINED PDF

        generateCombinedPDF: function () {

            const { jsPDF } = window.jspdf;

            var doc =
                new jsPDF("landscape");

            // EMPLOYEE DATA

            var aEmployees =
                this.getView()
                .getModel()
                .getProperty("/employees");

            var aEmployeeBody = [];

            aEmployees.forEach(function (emp) {

                aEmployeeBody.push([

                    emp.empId,
                    emp.name,
                    emp.department,
                    emp.designation,
                    emp.location,
                    emp.salary,
                    emp.email,
                    emp.phone

                ]);
            });

            doc.text(
                "Employee Records",
                14,
                20
            );

            doc.autoTable({

                startY: 30,

                head: [[

                    "ID",
                    "Name",
                    "Department",
                    "Designation",
                    "Location",
                    "Salary",
                    "Email",
                    "Phone"

                ]],

                body: aEmployeeBody

            });

            // PERFORMANCE DATA

            var aPerformance =
                this.getView()
                .getModel()
                .getProperty(
                    "/performanceEmployees"
                );

            var aPerformanceBody = [];

            aPerformance.forEach(function (emp) {

                aPerformanceBody.push([

                    emp.empId,
                    emp.name,
                    emp.score,
                    emp.experience,
                    emp.projects,
                    emp.bonus,
                    emp.attendance,
                    emp.promotion,
                    emp.rating

                ]);
            });

            doc.addPage();

            doc.text(
                "Performance Records",
                14,
                20
            );

            doc.autoTable({

                startY: 30,

                head: [[

                    "ID",
                    "Name",
                    "Score",
                    "Experience",
                    "Projects",
                    "Bonus",
                    "Attendance",
                    "Promotion",
                    "Rating"

                ]],

                body: aPerformanceBody

            });

            doc.save(
                "Complete_Enterprise_Report.pdf"
            );
        }

    });
});