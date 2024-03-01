const Client = require('../models/client');
const Company = require('../models/company');

const endSubcription = async() => {
    const condition = {
        isDeleted: false,
        isActive: true
    };
    const query = [
        {
            $match: condition
        },
        {
            $addFields: {
              subscriptionEndPart: {
                $dateToParts: {
                  date: "$subscriptionEnd",
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
              subscriptionEndDate: {
                $concat: [
                  { $toString: "$subscriptionEndPart.day" },
                  "-",
                  { $toString: "$subscriptionEndPart.month" },
                  "-",
                  { $toString: "$subscriptionEndPart.year" },
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
                      $eq: ["$subscriptionEndDate", "$todayDate"]
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
        };
        const payload = {
            isActive: false
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

module.exports = endSubcription;