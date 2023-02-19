using Microsoft.Azure.Cosmos;
using System.Configuration;
using Microsoft.AspNetCore.Authentication;
using BasicAuthenticationHandler = server.Handlers.BasicAuthenticationHandler;
using IUserServices = server.Services.IUserService;
using UserService = server.Services.UserService;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services
    .AddAuthentication("BasicAuthentication")
    .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);
builder.Services.AddAuthorization();

builder.Services.AddScoped<IUserServices, UserService>();

// The Azure Cosmos DB endpoint for running this sample.
string? EndpointUri = System.Configuration.ConfigurationManager.AppSettings["EndPointUri"];
// The primary key for the Azure Cosmos account.
string? PrimaryKey = System.Configuration.ConfigurationManager.AppSettings["PrimaryKey"];

builder.Services.AddSingleton<CosmosClient>(x => new CosmosClient(EndpointUri, PrimaryKey));

var app = builder.Build();

app.UseCors(options => options.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
