using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository;

public class PortfolioRepository : IPortfolioRepository
{
    private readonly AppDBContext _context;
    public PortfolioRepository(AppDBContext context)
    {
        _context = context;
    }
    
    public async Task<List<Stock>> GetUserPortfolio(AppUser user)
    {
        return await _context.Portfolios.Where(u => u.AppUserId == user.Id).Select(s => new Stock
        {
            Id = s.StockId,
            CompanyName = s.Stock.CompanyName,
            Symbol = s.Stock.Symbol,
            Industry = s.Stock.Industry,
            LastDiv = s.Stock.LastDiv,
            MarketCap = s.Stock.MarketCap
        }).ToListAsync();
    }
}