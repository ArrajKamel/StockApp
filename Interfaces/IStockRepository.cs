using api.DTO.Stock;
using api.Models;

namespace api.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllAsync();
        Task<Stock?> GetByIdAsync(int id);//FirstOrDefault can be null that is why we put the '?'
        Task<Stock> CreateAsync(Stock stockModel);
        Task<Stock?> UpdateAsync(int id, StockUpdateDto stockUpdateDto);
        Task<Stock?> UpdateCompanyAsync(int id, StockUpdateDto stockUpdateDto);
        Task<Stock?> DeleteAsync(int id);
        Task<Boolean> StockExists(int id);
    }
}