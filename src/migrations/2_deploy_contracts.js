/* eslint-disable no-undef */
const OpenSea = artifacts.require("OpenSea");

module.exports = function (deployer) {
    deployer.deploy(OpenSea);
};
