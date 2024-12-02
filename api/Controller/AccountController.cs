using api.DTO.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService; 
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                var appUser = new AppUser
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email
                };
                
                var userCreate = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (userCreate.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    
                    if(roleResult.Succeeded)
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName,
                                Email = appUser.Email, 
                                Token = _tokenService.CreateToken(appUser)
                            }
                            );
                    else 
                        return StatusCode(500, roleResult.Errors);
                }
                else 
                    return StatusCode(500, userCreate.Errors);
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
    }
}