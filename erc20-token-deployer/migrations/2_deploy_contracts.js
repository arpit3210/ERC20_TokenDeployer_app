const MyToken = artifacts.require("MyToken");

module.exports = function(deployer) {
    deployer.deploy(MyToken, "MyToken", "MTK", 1000000);
};
