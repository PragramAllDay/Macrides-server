"use strict";

/**
 * car controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::car.car", () => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    const parsedData = JSON.parse(data);
    const files = ctx.request.files;

    const entry = await strapi.entityService.create("api::car.car", {
      data: {
        ...parsedData,
        publishedAt: new Date().toISOString(),
      },
      files: {
        exteriorCarImage: files["files.exteriorCarImage"],
        interiorImage: files["files.interiorImage"],
      },
    });
    ctx.send(entry);
    return entry;
  },
}));
