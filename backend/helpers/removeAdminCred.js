const Client = require('../models/client');

const removeCred = async() => {
    const query = [
        {
          $addFields: {
            subscriptionStartPart: {
              $dateToParts: {
                date: {
                  $dateSubtract: {
                    startDate: new Date(),
                    unit: "day",
                    amount: 7,
                  },
                },
              },
            },
            createdOnPart: {
              $dateToParts: {
                date: "$createdOn",
              },
            },
          },
        },
        {
          $addFields: {
            subscriptionStartDate: {
              $concat: [
                { $toString: "$subscriptionStartPart.day" },
                "-",
                { $toString: "$subscriptionStartPart.month" },
                "-",
                { $toString: "$subscriptionStartPart.year" },
              ],
            },
            createdDate: {
              $concat: [
                { $toString: "$createdOnPart.day" },
                "-",
                { $toString: "$createdOnPart.month" },
                "-",
                { $toString: "$createdOnPart.year" },
              ],
            },
          },
        },
        {
          $match: {
            $expr: {
                $and: [{
                    $eq: ["$subscriptionStartDate", "$createdDate"]
                }]
            }
          },
        },
        {
            $project: {
                _id: 1
            }
        }
    ];
    const clients = await Client.aggregate(query);
    if (clients) {
        const clientIDs = [];
        for (const id of clients) {
            clientIDs.push(id._id)
        }
        const payload = {
            "companyAdminUsername": "", 
            "companyAdminPassword": ""
        }
        await Client.model.updateMany({_id: {$in: clientIDs}},{$unset: payload})
    }
}

module.exports = removeCred;

