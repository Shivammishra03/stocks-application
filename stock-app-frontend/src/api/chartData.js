import api from '@/services/apiService';

export const getChartData = async () => {
    const { data } = await api.get('/stocks', {
        params: { startDate: '2024-01-01', endDate: '2024-12-31' } // Correctly specify query parameters here
    });
    console.log("data", data);
    return data;
};
