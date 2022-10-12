"use strict";

/**
 * booking controller
 */

const emailTemplate = {
  subject: "Welcome <%= booking.user_name %>",
  text: `Thank you for choosing us
    You have booked our car with this email: <%= booking.user_email %>.
   This is your booking invoice ID.
    <%= entry.id %>.
   With the car id.
    <%= booking.car_id %>`,
  html: `Thank you for choosing us
    You have booked our car with this email: <%= booking.user_email %>.
   <h1>This is your booking invoice ID.</h1>
    <p><%= entry.id %>.</p>
   <h1>With the car id.</h1>
    <p><%= booking.car_id %>.<p>`,
};

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::booking.booking", () => ({
  async create(ctx) {
    const { data } = ctx.request.body;

    const entry = await strapi.entityService.create("api::booking.booking", {
      data: {
        ...data,
        publishedAt: new Date().toISOString(),
      },
    });
    await strapi.plugins["email"].services.email.sendTemplatedEmail(
      {
        to: data.user_email,
        bcc: "macrides.info@gmail.com",
        // from: is not specified, the defaultFrom is used.
      },
      emailTemplate,
      {
        booking: data,
        entry,
      }
    );
    ctx.send(entry);
    return entry;
  },
}));
