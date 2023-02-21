using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using IUserService = server.Services.IUserService;
namespace server.Handlers;

public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly IUserService _userService;

    public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        IUserService userService
    )
        : base(options, logger, encoder, clock)
    {
        _userService = userService;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        // check for auth headers
        if (!Request.Headers.ContainsKey("Authorization"))
        {
            return AuthenticateResult.Fail("Missing Authorization Header");
        }

        // check it's basic auth
        var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
        if (authHeader.Scheme != "Basic")
        {
            return AuthenticateResult.Fail("Invalid Authorization Scheme");
        }

        // get credentials decoded
        var credentialsBytes = Convert.FromBase64String(authHeader.Parameter);
        var credentials = Encoding.UTF8.GetString(credentialsBytes).Split(':');
        var username = credentials[0];
        var password = credentials[1];

        // authenticate the user against our database
        var user = await _userService.Authenticate(username, password);
        if (user == null)
        {
            return AuthenticateResult.Fail("Invalid Username or Password");
        }

        // set our authentication ticket with authorized user
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Name),
            new Claim(ClaimTypes.Name, user.Name),
        };
        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);

        return AuthenticateResult.Success(ticket);
    }
}