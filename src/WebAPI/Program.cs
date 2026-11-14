using Application.Ports;
using Application.UseCases;
using Domain.Entities;
using Domain.Events;
using Infrastructure.Consumers;
using Infrastructure.Messaging;
using Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Реєстрація залежностей із зазначенням життєвих циклів (DI)
builder.Services.AddScoped<IOrderRepository, SqlOrderRepository>();
builder.Services.AddScoped<IKhNTUTimeProvider, KhNTUSystemTimeProvider>();
builder.Services.AddScoped<CreateOrderUseCase>();

// Реєстрація шини та ідемпотентності
builder.Services.AddSingleton<IdempotencyService>();

// Використовуємо фабрику для правильного створення Singleton-сервісу, 
// який залежить від Scoped-сервісів (споживачів)
builder.Services.AddSingleton<IEventPublisher>(sp =>
{
    var scopeFactory = sp.GetRequiredService<IServiceScopeFactory>();
    var logger = sp.GetRequiredService<ILogger<InMemoryEventBus>>();
    return new InMemoryEventBus(scopeFactory, logger);
});

// Реєстрація споживачів
builder.Services.AddScoped<IEventHandler<OrderCreatedEvent>, InventoryConsumer>();
builder.Services.AddScoped<IEventHandler<OrderCreatedEvent>, NotificationConsumer>();

builder.Services.AddControllers();
// Додаємо підтримку OpenAPI (Swagger), щоб ви могли тестувати запити
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();