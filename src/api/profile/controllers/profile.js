"use strict";

/**
 * profile controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::profile.profile", ({ strapi }) => ({
  async find(ctx) {
    const { id } = ctx.params;
    const { role } = ctx.state.user;
    // const { users_permissions_users: userPermissions } = user;

    ctx.query = { ...ctx.query, local: "en" };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    // meta.users_permissions_users = userPermissions;

    return { role, id };
  },
}));
