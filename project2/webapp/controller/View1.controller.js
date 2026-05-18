sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {

    "use strict";

    return Controller.extend("project2.controller.View1", {

        onEmpIdValidation: function (oEvent) {

            var oInput = oEvent.getSource();

            var sValue = oInput.getValue();

            var empIdRegex = /^EMP\d*$/;

            if (!empIdRegex.test(sValue)) {

                oInput.setValueState("Error");

                oInput.setValueStateText(
                    "Employee ID must start with EMP followed by numbers."
                );

            } else {

                oInput.setValueState("None");
            }
        },

        onNameValidation: function (oEvent) {

            var oInput = oEvent.getSource();

            var sValue = oInput.getValue();

            var nameRegex = /^[A-Za-z\s]*$/;

            if (!nameRegex.test(sValue)) {

                oInput.setValueState("Error");

                oInput.setValueStateText(
                    "Name cannot contain numbers or special characters."
                );

            } else {

                oInput.setValueState("None");
            }
        },

        onPhoneValidation: function (oEvent) {

            var oInput = oEvent.getSource();

            var sValue = oInput.getValue();

            var phoneRegex = /^[0-9]*$/;

            if (!phoneRegex.test(sValue)) {

                oInput.setValueState("Error");

                oInput.setValueStateText(
                    "Phone number must contain numbers only."
                );

            } else {

                oInput.setValueState("None");
            }
        },

        onSubmit: function () {

            var oView = this.getView();

            var sEmpId = oView.byId("inputEmpId").getValue().trim();

            var sName = oView.byId("inputFullName").getValue().trim();

            var sEmail = oView.byId("inputEmail").getValue().trim();

            var sPhone = oView.byId("inputPhone").getValue().trim();

            var sDepartment = oView.byId("selectDepartment").getSelectedKey();

            var sDesignation = oView.byId("selectDesignation").getSelectedKey();

            var sSalary = oView.byId("inputSalary").getValue().trim();

            var sLocation = oView.byId("inputLocation").getValue().trim();

            var empIdRegex = /^EMP\d+$/;

            var nameRegex = /^[A-Za-z\s]+$/;

            var phoneRegex = /^[0-9]{10}$/;

            if (
                !sEmpId ||
                !sName ||
                !sEmail ||
                !sPhone ||
                sDepartment === "default" ||
                !sSalary
            ) {

                MessageBox.error(
                    "Please fill all mandatory fields."
                );

                return;
            }

            if (!empIdRegex.test(sEmpId)) {

                MessageBox.error(
                    "Employee ID must start with EMP followed by numbers."
                );

                return;
            }

            if (!nameRegex.test(sName)) {

                MessageBox.error(
                    "Name cannot contain numbers."
                );

                return;
            }

            if (!phoneRegex.test(sPhone)) {

                MessageBox.error(
                    "Phone number must contain exactly 10 digits."
                );

                return;
            }

            var sMessage =
                "Employee ID: " + sEmpId + "\n\n" +
                "Name: " + sName + "\n\n" +
                "Email: " + sEmail + "\n\n" +
                "Phone: " + sPhone + "\n\n" +
                "Department: " + sDepartment + "\n\n" +
                "Designation: " + sDesignation + "\n\n" +
                "Salary: " + sSalary + "\n\n" +
                "Location: " + sLocation + "\n\n" +
                "Do you want to continue submitting the form?";

            MessageBox.confirm(
                sMessage,
                {
                    title: "Confirm Submission",

                    actions: [
                        MessageBox.Action.OK,
                        MessageBox.Action.CANCEL
                    ],

                    onClose: function (sAction) {

                        if (sAction === "OK") {

                            oView.byId("submittedEmpId").setText(
                                "Employee ID: " + sEmpId
                            );

                            oView.byId("submittedName").setText(
                                "Full Name: " + sName
                            );

                            oView.byId("submittedEmail").setText(
                                "Email: " + sEmail
                            );

                            oView.byId("submittedPhone").setText(
                                "Phone: " + sPhone
                            );

                            oView.byId("submittedDepartment").setText(
                                "Department: " + sDepartment
                            );

                            oView.byId("submittedDesignation").setText(
                                "Designation: " + sDesignation
                            );

                            oView.byId("submittedSalary").setText(
                                "Salary: " + sSalary
                            );

                            oView.byId("submittedLocation").setText(
                                "Location: " + sLocation
                            );

                            oView.byId("employeePanel").setVisible(false);

                            oView.byId("thankYouContainer").setVisible(true);

                            oView.byId("buttonFillAgain").setVisible(true);

                            MessageBox.success(
                                "Employee form submitted successfully!"
                            );
                        }
                    }
                }
            );
        },

        onFillAgain: function () {

            var oView = this.getView();

            // SHOW FORM AGAIN
            oView.byId("employeePanel").setVisible(true);

            // HIDE THANK YOU SECTION
            oView.byId("thankYouContainer").setVisible(false);

            // HIDE BUTTON AGAIN
            oView.byId("buttonFillAgain").setVisible(false);

            // RESET INPUTS
            oView.byId("inputEmpId").setValue("");

            oView.byId("inputFullName").setValue("");

            oView.byId("inputEmail").setValue("");

            oView.byId("inputPhone").setValue("");

            oView.byId("selectGender").setSelectedKey("default");

            oView.byId("selectDepartment").setSelectedKey("default");

            oView.byId("selectDesignation").setSelectedKey("default");

            oView.byId("inputSalary").setValue("");

            oView.byId("dateJoining").setValue("");

            oView.byId("selectStatus").setSelectedKey("default");

            oView.byId("inputLocation").setValue("");

            oView.byId("inputAddress").setValue("");

            oView.byId("inputSkills").setValue("");

            oView.byId("inputExperience").setValue("");

            // RESET VALIDATIONS
            oView.byId("inputEmpId").setValueState("None");

            oView.byId("inputFullName").setValueState("None");

            oView.byId("inputPhone").setValueState("None");
        },

        onNavBack: function () {

            window.location.reload();
        }

    });
});