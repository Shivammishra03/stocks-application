import api from '@/services/apiService';

export const getTopNStocks = async (startDate, endDate, n) => {
    const { data } = await api.get('/stocks/top', {
        params: { startDate: startDate, endDate: endDate, limit:n }
    });
    return data;
};
