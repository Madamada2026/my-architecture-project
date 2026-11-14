using Application.UseCases;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly CreateOrderUseCase _createOrderUseCase;

    public OrderController(CreateOrderUseCase createOrderUseCase)
    {
        _createOrderUseCase = createOrderUseCase;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
        try
        {
            var order = await _createOrderUseCase.ExecuteAsync(request.UserId, request.Items);
            return Ok(order);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

public class CreateOrderRequest
{
    public long UserId { get; set; }
    public List<OrderItem> Items { get; set; } = new();
}