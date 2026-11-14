namespace Application.UseCases;

using Domain.Entities;
using Domain.Events;
using Application.Ports;

public class CreateOrderUseCase
{
    private readonly IOrderRepository _orderRepository;
    private readonly IKhNTUTimeProvider _timeProvider;
    private readonly IEventPublisher _eventPublisher;

    public CreateOrderUseCase(
        IOrderRepository orderRepository, 
        IKhNTUTimeProvider timeProvider,
        IEventPublisher eventPublisher)
    {
        _orderRepository = orderRepository;
        _timeProvider = timeProvider;
        _eventPublisher = eventPublisher;
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

        // Публікація події
        var orderCreatedEvent = new OrderCreatedEvent(
            EventId: Guid.NewGuid(),
            OccurredAt: _timeProvider.GetCurrentTime(),
            OrderId: order.Id,
            UserId: order.UserId,
            TotalAmount: order.TotalAmount
        );

        // Публікуємо подію один раз
        await _eventPublisher.PublishAsync(orderCreatedEvent);

        return order;
    }
}