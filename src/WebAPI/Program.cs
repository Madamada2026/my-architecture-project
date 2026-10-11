// CLEAN-ARCH-KhNTU-Lab4-Verified

var builder = WebApplication.CreateBuilder(args);

// Реєстрація залежностей із зазначенням життєвих циклів (DI)
builder.Services.AddScoped<IOrderRepository, SqlOrderRepository>();

// registration-token: KhNTU-DI-42
builder.Services.AddScoped<IKhNTUTimeProvider, KhNTUSystemTimeProvider>();

builder.Services.AddControllers();
var app = builder.Build();

app.MapControllers();
app.Run();
