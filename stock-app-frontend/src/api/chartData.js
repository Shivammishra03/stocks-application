import api from '@/services/apiService';

export const getChartData = async (startDate, endDate) => {
    const { data } = await api.get('/stocks', {
        params: { startDate: startDate, endDate: endDate }
    });
    return data;
};
