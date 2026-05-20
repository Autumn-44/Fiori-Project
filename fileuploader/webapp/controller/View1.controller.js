sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (
    MessageToast,
    Controller,
    JSONModel
) {

    "use strict";

    return Controller.extend(
        "fileuploader.controller.View1",
        {

            onInit: function () {

                var oModel =
                    new JSONModel({

                        rows: []

                    });

                this.getView().setModel(
                    oModel,
                    "excelModel"
                );
            },

            // LOAD EXCEL FILE

            handleUploadPress: function () {

                var oFileUploader =
                    this.byId(
                        "fileUploader01"
                    );

                var oDomRef =
                    oFileUploader
                    .getFocusDomRef();

                var file =
                    oDomRef.files[0];

                if (!file) {

                    MessageToast.show(
                        "Please choose an Excel file"
                    );

                    return;
                }

                var reader =
                    new FileReader();

                reader.onload =
                    function (e) {

                    var data =
                        e.target.result;

                    var workbook =
                        XLSX.read(
                            data,
                            {
                                type: "binary"
                            }
                        );

                    var firstSheet =
                        workbook.SheetNames[0];

                    var worksheet =
                        workbook.Sheets[firstSheet];

                   var jsonData =
    XLSX.utils.sheet_to_json(
        worksheet,
        {
            range: 5
        }
    );

                    // IMPORTANT

                    jsonData = jsonData.map(function (item) {

    return {

        "Project Name":
            item["Project Name"] || "",

        "Task Name":
            item["Task Name"] || "",

        "Assigned to":
            item["Assigned to"] || "",

        "Start Date":
            item["Start Date"] || "",

        "Days Required":
            item["Days Required"] || "",

        "End Date":
            item["End Date"] || "",

        "Progress":
            item["Progress"] || ""

    };
});
                    var oModel =
                        this.getView()
                        .getModel(
                            "excelModel"
                        );

                    oModel.setProperty(
                        "/rows",
                        jsonData
                    );

                    MessageToast.show(
                        "Excel Loaded Successfully"
                    );

                }.bind(this);

                reader.readAsBinaryString(
                    file
                );
            },

            // DOWNLOAD PDF

            onDownloadSelectedRows: function () {

                var oTable =
                    this.byId(
                        "excelTable01"
                    );

                var aSelectedItems =
                    oTable.getSelectedItems();

                if (
                    aSelectedItems.length === 0
                ) {

                    MessageToast.show(
                        "Please select rows"
                    );

                    return;
                }

                const { jsPDF } =
                    window.jspdf;

                var doc =
                    new jsPDF();

                var aBody = [];

                aSelectedItems.forEach(
                    function (oItem) {

                    var oData =
                        oItem
                        .getBindingContext(
                            "excelModel"
                        )
                        .getObject();

                    aBody.push([

                        oData.empId,
                        oData.name,
                        oData.department,
                        oData.salary

                    ]);

                });

                doc.setFontSize(18);

                doc.text(
                    "Selected Employee Records",
                    14,
                    20
                );

                doc.autoTable({

                    startY: 30,

                    head: [[

                        "Employee ID",
                        "Employee Name",
                        "Department",
                        "Salary"

                    ]],

                    body: aBody

                });

                doc.save(
                    "Selected_Rows.pdf"
                );

                MessageToast.show(
                    "PDF Downloaded Successfully"
                );
            }

        }
    );
});