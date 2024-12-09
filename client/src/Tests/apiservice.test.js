// Подключаем класс ApiService
import { ApiService } from '../services/api.service';

// Создаем мок fetch
//имитирует поведение fetch функции во время тестирования
//создает новую мок-функцию для тестирования
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),//где возвращенный ответ представляет собой пустой объект
  })
);

describe('ApiService', () => {// запускает набор тестов с помощью describe функции. Набор тестов называется 'ApiService'
  describe('get method', () => {
    //Первый тест: Проверка, выполняет ли get метод запрос GET с правильным URL
    it('should make a GET request with correct URL', async () => {
      const apiService = new ApiService();
      await apiService.get('/data');

      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/data', {
        method: 'GET'
      });
    });//проверяет, был ли fetch вызван с правильным URL и параметрами
    

    //Второй тест: проверка, возвращает ли get метод ответ в формате JSON
    it('should return JSON response', async () => {
      const responseData = { key: 'value' };

      // Мокируем fetch, чтобы вернуть желаемый ответ
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(responseData),
      });

      const apiService = new ApiService();
      const response = await apiService.get('/data');

      //проверка сравнение
      expect(response).toEqual(responseData);
    });
  });

  describe('delete method', () => {
    // Проверка, выполняет ли delete метод запрос DELETE с правильным URL
    it('should make a DELETE request with correct URL', async () => {
      const apiService = new ApiService();
      await apiService.delete('/data');

      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/data', {
        method: 'DELETE'
      });
    });

    // Проверка, возвращает ли delete метод ответ в формате JSON
    it('should return JSON response', async () => {
      const responseData = { success: true };

      // Мокируем fetch, чтобы вернуть желаемый ответ
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(responseData),
      });

      const apiService = new ApiService();
      const response = await apiService.delete('/data');

      // проверка сравнение
      expect(response).toEqual(responseData);
    });
  });

  describe('post method', () => {
    // Проверка, выполняет ли post метод запрос POST с правильным URL и данными
    it('should make a POST request with correct URL and data', async () => {
      const apiService = new ApiService();
      const data = { key: 'value' };
      
      await apiService.post('/data', data);

      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    });

    // Проверка, возвращает ли post метод ответ в формате JSON
    it('should return JSON response', async () => {
      const responseData = { success: true };

      // Мокируем fetch, чтобы вернуть желаемый ответ
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve(responseData),
      });

      const apiService = new ApiService();
      const response = await apiService.post('/data', { key: 'value' });

      // проверка сравнение
      expect(response).toEqual(responseData);
    });
  });
});
