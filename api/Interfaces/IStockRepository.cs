using api.DTO.Stock;
using api.Models;
using api.Query;

namespace api.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllAsync(StockQueryObject query);
        Task<Stock?> GetByIdAsync(int id);//FirstOrDefault can be null that is why we put the '?'
        Task<Stock?> GetBySymbolAsync(string symbol);
        Task<Stock> CreateAsync(Stock stockModel);
        Task<Stock?> UpdateAsync(int id, StockUpdateDto stockUpdateDto);
        Task<Stock?> UpdateCompanyAsync(int id, StockUpdateDto stockUpdateDto);
        Task<Stock?> DeleteAsync(int id);
        Task<Boolean> StockExists(int id);
    }
}