using backend.Models;
using backend.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Dtos;
using backend.Interfaces;

namespace backend.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<ApplicationUser> _signinManager;
        public AccountController(UserManager<ApplicationUser> userManager, ITokenService tokenService, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized("Invalid user");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Invalid email and/or password");
            
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            return Ok(
                new NewUserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = role,
                    Token = await _tokenService.CreateTokenAsync(user)
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (registerDto.Role.ToLower() != "customer" && registerDto.Role.ToLower() != "company")
                return BadRequest("Invalid role! Valid roles are 'Customer' or 'Company'.");

            var appUser = new ApplicationUser
            {
                UserName = registerDto.Email,  // Use email as username
                Name = registerDto.Name,
                Email = registerDto.Email
            };

            var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

            if (createdUser.Succeeded)
            {
                var roleResult = await _userManager.AddToRoleAsync(appUser, registerDto.Role);

                if (roleResult.Succeeded)
                {
                    var roles = await _userManager.GetRolesAsync(appUser);
                    var userRole = roles.FirstOrDefault();

                    return Ok(
                        new NewUserDto
                        {
                            Id = appUser.Id,
                            Name = appUser.Name,
                            Email = appUser.Email,
                            Role = userRole,
                            Token = await _tokenService.CreateTokenAsync(appUser)
                        }
                    );
                }
                else
                {
                    return StatusCode(500, roleResult.Errors);
                }
            }
            else
            {
                return StatusCode(500, createdUser.Errors);
            }
        }

    }
}