// using api.Extensions;
// using api.Interfaces;
// using api.Models;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.AspNetCore.Mvc;
//
// namespace api.Controller;
//
// [Route("api/portfolio")]
// [ApiController]
// public class PortfolioController : ControllerBase
// {
//     private readonly UserManager<AppUser> _userManager;
//     private readonly IStockRepository _stockRepo;
//     private readonly IPortfolioRepository _portfolioRepo; 
//     public PortfolioController(UserManager<AppUser> userManager,
//         IStockRepository stockRepository, IPortfolioRepository portfolioRepo)
//     {
//         _userManager = userManager;
//         _stockRepo = stockRepository;
//         _portfolioRepo = portfolioRepo; 
//     }
//
     // [HttpGet]
//     // [Authorize]
//     public async Task<IActionResult> GetUserPortfolio()
//     {
//         var username = User.GetUsername(); // User from controllerBase, to get the claims 
//         var appUser = await _userManager.FindByNameAsync(username);
//         // we need IPortfolio to get the user portfolio 
//         var userPortfolio = _portfolioRepo.GetUserPortfolio(appUser);
//         return Ok(userPortfolio);
//     }
// }