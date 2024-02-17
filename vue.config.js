const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	// Removes leading "/" from js/css reference files in index.html
	publicPath: "",
});
