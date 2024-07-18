import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    UPDATE_FREQUENCY: process.env.UPDATE_FREQUENCY || 5000,
    SERVICE_COMMISSION: parseFloat(process.env.SERVICE_COMMISSION) || 0.01,
};
