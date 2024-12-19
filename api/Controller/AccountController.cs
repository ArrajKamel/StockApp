using api.DTO.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controller
{
    [Route("api/account")]
    [ApiController]
    public class AccountController(
        UserManager<AppUser> userManager,
        ITokenService tokenService,
        SignInManager<AppUser> signInManager)
        : ControllerBase
    {
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
                
                var userCreate = await userManager.CreateAsync(appUser, registerDto.Password ?? "enter a password");

                if (userCreate.Succeeded)
                {
                    var roleResult = await userManager.AddToRoleAsync(appUser, "User");
                    
                    if(roleResult.Succeeded)
                        return Ok(
                            new NewUserDto
                            {
                                UserName = appUser.UserName!,
                                Email = appUser.Email!, 
                                Token = tokenService.CreateToken(appUser)
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
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username);// we can do it with Email
            if(user == null)
                return Unauthorized("Invalid username");
            
            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if(!result.Succeeded)
                return Unauthorized("username or password is incorrect");
            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName!,
                    Email = user.Email!,
                    Token = tokenService.CreateToken(user)
                }
            );
        }
    }
}