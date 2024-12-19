using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository;

public class PortfolioRepository(AppDBContext context) : IPortfolioRepository
{
    private readonly AppDBContext _context = context;

    public async Task<List<Stock>> GetUserPortfolio(AppUser user)
    {
        return await _context.Portfolios.Where(u => u.AppUserId == user.Id)
            .Select(stock => new Stock
            {
                Id = stock.StockId,
                CompanyName = stock.Stock.CompanyName,
                Symbol = stock.Stock.Symbol,
                Industry = stock.Stock.Industry,
                LastDiv = stock.Stock.LastDiv,
                MarketCap = stock.Stock.MarketCap
            }).ToListAsync();
    }
}