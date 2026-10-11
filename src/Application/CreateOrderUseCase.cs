namespace Application.UseCases;

using Domain.Entities;

public class CreateOrderUseCase
{
    private readonly IOrderRepository _orderRepository;
    private readonly IKhNTUTimeProvider _timeProvider;

    public CreateOrderUseCase(IOrderRepository orderRepository, IKhNTUTimeProvider timeProvider)
    {
        _orderRepository = orderRepository;
        _timeProvider = timeProvider;
    }

    public async Task<Order> ExecuteAsync(long userId, List<OrderItem> items)
    {
        if (userId <= 0 || items == null || items.Count == 0)
            throw new ArgumentException("Invalid order data");

        var order = new Order
        {
            UserId = userId,
            Items = items,
            CreatedAt = _timeProvider.GetCurrentTime()
        };

        await _orderRepository.AddAsync(order.Id);
        return order;
    }
}

