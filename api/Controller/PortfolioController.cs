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

}