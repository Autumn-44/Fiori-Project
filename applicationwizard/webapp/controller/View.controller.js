sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (
    Controller,
    MessageBox,
    MessageToast,
    JSONModel
) {

    "use strict";

    return Controller.extend(
        "applicationwizard.controller.View",
        {

            // INITIALIZE MODEL

            onInit: function () {

                var oModel =
                    new JSONModel({

                        name: "",
                        email: "",
                        phone: "",
                        gender: "",
                        degree: "",
                        university: "",
                        cgpa: "",
                        year: "",
                        skills: "",
                        experience: "",
                        role: "",
                        salary: "",
                        location: ""

                    });

                this.getView().setModel(
                    oModel,
                    "view"
                );
            },

            // VALIDATION

            onValidateForm: function () {

                var sName =
                    this.byId(
                        "inputName01"
                    ).getValue();

                var sEmail =
                    this.byId(
                        "inputEmail01"
                    ).getValue();

                var sPhone =
                    this.byId(
                        "inputPhone01"
                    ).getValue();

                // NAME VALIDATION

                if (
                    sName.length < 3
                ) {

                    this.byId(
                        "inputName01"
                    ).setValueState(
                        "Error"
                    );

                    this.byId(
                        "inputName01"
                    ).setValueStateText(
                        "Minimum 3 characters required"
                    );

                } else {

                    this.byId(
                        "inputName01"
                    ).setValueState(
                        "None"
                    );
                }

                // EMAIL VALIDATION

                if (
                    !sEmail.includes("@")
                ) {

                    this.byId(
                        "inputEmail01"
                    ).setValueState(
                        "Error"
                    );

                    this.byId(
                        "inputEmail01"
                    ).setValueStateText(
                        "Enter valid email"
                    );

                } else {

                    this.byId(
                        "inputEmail01"
                    ).setValueState(
                        "None"
                    );
                }

                // PHONE VALIDATION

                if (
                    sPhone.length < 10
                ) {

                    this.byId(
                        "inputPhone01"
                    ).setValueState(
                        "Error"
                    );

                    this.byId(
                        "inputPhone01"
                    ).setValueStateText(
                        "Enter valid phone number"
                    );

                } else {

                    this.byId(
                        "inputPhone01"
                    ).setValueState(
                        "None"
                    );
                }

                // UPDATE REVIEW

                this.updateReviewData();
            },

            // UPDATE REVIEW MODEL

            updateReviewData: function () {

                var oModel =
                    this.getView().getModel(
                        "view"
                    );

                oModel.setProperty(
                    "/name",
                    this.byId(
                        "inputName01"
                    ).getValue()
                );

                oModel.setProperty(
                    "/email",
                    this.byId(
                        "inputEmail01"
                    ).getValue()
                );

                oModel.setProperty(
                    "/phone",
                    this.byId(
                        "inputPhone01"
                    ).getValue()
                );

                oModel.setProperty(
                    "/gender",
                    this.byId(
                        "selectGender01"
                    ).getSelectedKey()
                );

                oModel.setProperty(
                    "/degree",
                    this.byId(
                        "inputDegree01"
                    ).getSelectedKey()
                );

                oModel.setProperty(
                    "/university",
                    this.byId(
                        "inputUniversity01"
                    ).getValue()
                );

                oModel.setProperty(
                    "/cgpa",
                    this.byId(
                        "inputCgpa01"
                    ).getValue()
                );

                oModel.setProperty(
                    "/year",
                    this.byId(
                        "inputYear01"
                    ).getSelectedKey()
                );

                oModel.setProperty(
                    "/skills",
                    this.byId(
                        "inputSkills01"
                    ).getValue()
                );

                oModel.setProperty(
                    "/experience",
                    this.byId(
                        "selectExperience01"
                    ).getSelectedKey()
                );

                oModel.setProperty(
                    "/role",
                    this.byId(
                        "inputRole01"
                    ).getValue()
                );

                oModel.setProperty(
                    "/salary",
                    this.byId(
                        "inputSalary01"
                    ).getValue()
                );

                oModel.setProperty(
                    "/location",
                    this.byId(
                        "inputLocation01"
                    ).getSelectedKey()
                );
            },

            // SUBMIT APPLICATION

            onSubmitApplication: function () {

                var sName =
                    this.byId(
                        "inputName01"
                    ).getValue();

                var sEmail =
                    this.byId(
                        "inputEmail01"
                    ).getValue();

                var sPhone =
                    this.byId(
                        "inputPhone01"
                    ).getValue();

                // FINAL CHECK

                if (
                    !sName ||
                    !sEmail ||
                    !sPhone
                ) {

                    MessageBox.error(
                        "Please complete all mandatory fields."
                    );

                    return;
                }

                // SUCCESS MESSAGE

                MessageBox.success(

                    "Thank You " +

                    sName +

                    "!\n\n" +

                    "Your application has been submitted successfully.\n\n" +

                    "We wish you good luck for your future career."

                );

                // HIDE WIZARD AFTER SUBMISSION

                this.byId(
                    "applicationWizard01"
                ).setVisible(false);
            },

            // WIZARD COMPLETE

            onCompleteWizard: function () {

                this.updateReviewData();

                MessageToast.show(
                    "Review your application before submitting."
                );
            }

        }
    );
});