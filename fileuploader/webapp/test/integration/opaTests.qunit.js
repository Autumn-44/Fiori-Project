/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["fileuploader/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
