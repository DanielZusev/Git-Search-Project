using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly ISessionManager _session;


    public AuthController(IConfiguration config, ISessionManager session)
    {
        _config = config;
        _session = session;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto login)
    {
        if (login.Username == "admin" && login.Password == "1234")
        {
            var userId = "User_01";
            var tokenString = GenerateJwtToken(userId);
            return Ok(new { token = tokenString });
        }
        return Unauthorized();
    }

    [Authorize]
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!string.IsNullOrEmpty(userId))
        {
            _session.ClearSession(userId);
        }

        return Ok(new { message = "Server session cleared" });
    }


    /// <summary>
    /// Generates a signed JSON Web Token (JWT) for an authenticated user.
    /// </summary>
    /// <remarks>
    /// This method constructs a token containing the user's ID as a <see cref="ClaimTypes.NameIdentifier"/>.
    /// It signs the token using HMAC SHA256 with the secret key defined in <c>appsettings.json</c>.
    /// The token is configured to expire in 1 hour.
    /// </remarks>
    /// <param name="userId">The unique identifier of the user (e.g., 'admin').</param>
    /// <returns>A Base64 encoded string representing the JWT.</returns>
    private string GenerateJwtToken(string userId)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}