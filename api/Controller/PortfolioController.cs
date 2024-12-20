using api.Data;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller;

[Route("api/portfolio")]
[ApiController]
public class PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepos, IPortfolioRepository portfolioRepo)
    : ControllerBase
{
    private readonly UserManager<AppUser> _userManager = userManager;
    private readonly IStockRepository _stockRepos = stockRepos;
    private readonly IPortfolioRepository _portfolioRepo = portfolioRepo;
    
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserPortfolio()
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
        return Ok(userPortfolio);
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddPortfolio(string symbol)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        var stock = await _stockRepos.GetBySymbolAsync(symbol);

        if (stock == null)
        {
            return BadRequest("stock not found");
        }

        var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
        
        if (userPortfolio.Any(s => s.Symbol.ToLower() == stock.Symbol.ToLower()))
        {
            return BadRequest("stock already in portfolio");
        }
        
        var portfolioModel = new Portfolio
        {
            StockId = stock.Id,
            AppUserId = appUser.Id
        };
        await _portfolioRepo.CreateAsync(portfolioModel);

        if (portfolioModel == null)
            return StatusCode(500, "could not create portfolio");

        return Created();

    }
    
    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeletePortfolio(string symbol)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
    
        var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
        var filteredStock = userPortfolio.Where(s => s.Symbol.ToLower() == symbol.ToLower());
        if (filteredStock.Count() == 1)
        {
            await _portfolioRepo.DeletePortfolio(appUser, symbol);
        }
        else
        {
            return BadRequest("stock not found");
        }
        return Ok();
    }

}