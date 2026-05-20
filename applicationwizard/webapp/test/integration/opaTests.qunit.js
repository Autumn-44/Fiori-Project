/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["applicationwizard/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
