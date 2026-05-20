sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (
    Controller,
    JSONModel,
    MessageBox
) {

    "use strict";

    return Controller.extend(
        "project5.controller.View1",
        {

            onInit: function () {
                 sap.ui.getCore().getMessageManager().registerObject(
    this.getView(),
    true
);

                var oData = {

                    empId: "",
                    name: "",
                    email: "",
                    phone: "",
                    department: "",
                    salary: "",
                    joiningDate: null,
                    status: ""

                };

                var oModel =
                    new JSONModel(oData);

                this.getView().setModel(
                    oModel,
                    "employeeModel"
                );
            },

            // SUBMIT

            onSubmit: function () {

                var oData =
                    this.getView()
                    .getModel("employeeModel")
                    .getData();

                // SIMPLE VALIDATION

                if (

                    oData.empId === "" ||
                    oData.name === "" ||
                    oData.email === "" ||
                    oData.phone === "" ||
                    oData.department === ""

                ) {

                    MessageBox.error(
                        "Please fill all mandatory fields"
                    );

                    return;
                }

                MessageBox.success(

                    "Employee Registered Successfully\n\n" +

                    "Employee ID: " +
                    oData.empId +

                    "\nName: " +
                    oData.name +

                    "\nEmail: " +
                    oData.email +

                    "\nPhone: " +
                    oData.phone +

                    "\nDepartment: " +
                    oData.department +

                    "\nSalary: " +
                    oData.salary +

                    "\nStatus: " +
                    oData.status
                );
            },

            // RESET

            onReset: function () {

                var oModel =
                    this.getView()
                    .getModel("employeeModel");

                oModel.setData({

                    empId: "",
                    name: "",
                    email: "",
                    phone: "",
                    department: "",
                    salary: "",
                    joiningDate: null,
                    status: ""

                });

                MessageBox.information(
                    "Form Reset Successfully"
                );
            }

        }
    );
});