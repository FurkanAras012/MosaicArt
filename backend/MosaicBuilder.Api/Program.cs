using MosaicBuilder.Api.Services;
using MosaicBuilder.Api.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Register services
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<ITileService, TileService>();
builder.Services.AddScoped<IColorService, ColorService>();
builder.Services.AddScoped<IQuantizationService, QuantizationService>();
builder.Services.AddScoped<IRenderService, RenderService>();
builder.Services.AddScoped<IExportService, ExportService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "MosaicBuilder API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
