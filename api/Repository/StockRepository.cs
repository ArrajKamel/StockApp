using System.Net.Sockets;
using api.Data;
using api.DTO.Stock;
using api.Interfaces;
using api.Models;
using api.Query;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Query.ExpressionTranslators.Internal;

namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly AppDBContext _context;
        public StockRepository(AppDBContext context)
        {
            _context = context;
        }
        public async Task<List<Stock>> GetAllAsync(StockQueryObject query)
        {
            var stocks = _context.Stocks.Include(c => c.Comments).AsQueryable();
            if (!string.IsNullOrEmpty(query.CompanyName))
            {
                stocks = stocks.Where(s => s.CompanyName.Contains(query.CompanyName));
            }

            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                stocks = stocks.Where(s => s.Symbol.Contains(query.Symbol));
            }
            
            return await stocks.ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _context.Stocks.Include(c =>c.Comments).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Stock> CreateAsync(Stock stockModel)
        {
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();
            return stockModel; 
        }

        public async Task<Stock?> UpdateAsync(int id, StockUpdateDto stockUpdateDto)
        {
            var existingStock = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);
            if (existingStock == null)
            {
                return null;
            }
            existingStock.Symbol = stockUpdateDto.Symbol;
            existingStock.Industry = stockUpdateDto.Industry;
            existingStock.Purchase = stockUpdateDto.Purchase;
            existingStock.MarketCap = stockUpdateDto.MarketCap;
            existingStock.LastDiv = stockUpdateDto.LastDiv;
            existingStock.Purchase = stockUpdateDto.Purchase;
            await _context.SaveChangesAsync();
            return existingStock;
        }

        public async Task<Stock?> UpdateCompanyAsync(int id, StockUpdateDto stockUpdateDto)
        {
            var existingStock = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);
            if (existingStock == null)
            {
                return null; 
            }
            existingStock.CompanyName = stockUpdateDto.CompanyName; 
            await _context.SaveChangesAsync();
            return existingStock;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var existingStock = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);
            if (existingStock == null)
            {
                return null;
            }
            _context.Remove(existingStock);
            await _context.SaveChangesAsync();
            return existingStock;
        }

        public Task<bool> StockExists(int id)
        {
            return _context.Stocks.AnyAsync(s => s.Id == id);
        }
    }
}