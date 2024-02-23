const Client = require('../models/client');
const Company = require('../models/company');

const startSubscription = async() => {
    const condition = {
        isDeleted: false,
        isActive: false
    };
    const query = [
        {
            $match: condition
        },
        {
            $addFields: {
              subscriptionStartPart: {
                $dateToParts: {
                  date: "$subscriptionStart",
                },
              },
              todayDatePart: {
                $dateToParts: {
                  date: new Date(),
                  timezone: "Asia/Kolkata"
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
              todayDate: {
                $concat: [
                  { $toString: "$todayDatePart.day" },
                  "-",
                  { $toString: "$todayDatePart.month" },
                  "-",
                  { $toString: "$todayDatePart.year" },
                ],
              },
            },
        },
        {
            $match: {
              $expr: {
                  $and: [{
                      $eq: ["$subscriptionStartDate", "$todayDate"]
                  }]
              }
            },
        },
        {
              $project: {
                  _id: 1,
              }
        }
    ];
    const clients = await Client.aggregate(query);
    if (clients) {
        const clientIDs = [];
        for (const id of clients) {
            clientIDs.push(id._id)
        };
        const payload = {
            isActive: true
        };
        const clientQuery = {
            _id: {
                $in: clientIDs
            }
        };
        const companyQuery = {
            clientID: {
                $in: clientIDs
            }
        };
        await Client.updateMany(clientQuery, payload);
        await Company.updateMany(companyQuery, payload);
    }
}

module.exports = startSubscription;