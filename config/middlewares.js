module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: '*',
      methods: '*',
      headers: '*',
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: "strapi::body",
    config: {
      formLimit: "256mb", // modify form body
      jsonLimit: "256mb", // modify JSON body
      textLimit: "256mb", // modify text body
      formidable: {
        maxFileSize: 100000000, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public'
];
