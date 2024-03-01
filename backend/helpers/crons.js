const { CronJob } = require('cron');
const removeClientAdminCred = require('./removeAdminCred');
const startSubscription = require('./startSubscription');
const endSubscription = require('./endSubcription');

const removeClientAdminCredCron = () => {new CronJob(
    '* * * * *',
    // Everyday at 00:00:01 AM
    // '1 0 0 * * *',
    removeClientAdminCred,
    null,
    true,
    'Asia/Kolkata'
)};

const startSubcriptionCron = () => {new CronJob(
    '* * * * *',
    // Everyday at 00:00:01 AM
    // '1 0 0 * * *',
    startSubscription,
    null,
    true,
    'Asia/Kolkata'
)};

const endSubcriptionCron = () => {new CronJob(
    '* * * * *',
    // Everyday at 00:00:01 AM
    // '1 0 0 * * *',
    endSubscription,
    null,
    true,
    'Asia/Kolkata'
)};

module.exports = {removeClientAdminCredCron, startSubcriptionCron, endSubcriptionCron}