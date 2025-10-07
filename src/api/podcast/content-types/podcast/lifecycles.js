module.exports = {
    async afterFindMany(event) {
      const { result, params } = event;
  
      if (Array.isArray(result) && result.length > 0) {
        await Promise.all(
          result.map(async (item) => {
            if(result.length == 1) {

                await strapi.db.query('api::podcast.podcast').update({
                  where: { id: item.id },
                  data: { popularity: (item.popularity || 0) + 1 },
                });
            }

          })
        );
      }
    },
  };
  