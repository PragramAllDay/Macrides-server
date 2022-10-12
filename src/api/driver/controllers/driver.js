"use strict";

/**
 * driver controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::driver.driver", ({ strapi }) => ({
  async create(ctx) {
    const { dataForm1 } = ctx.request.body;
    console.log(dataForm1);
    const parsedData = JSON.parse(dataForm1);

    const files = ctx.request.files;
    const entry = await strapi.entityService.create("api::driver.driver", {
      data: {
        ...parsedData,
        publishedAt: new Date().toISOString(),
      },
      files: {
        cnicFrontImage: files["files.cnicFrontImage"],
        cnicBackImage: files["files.cnicBackImage"],
        licenseFront: files["files.licenseFront"],
        licenseBack: files["files.licenseBack"],
      },
    });
    ctx.send(entry);
    return entry;
  },
}));
