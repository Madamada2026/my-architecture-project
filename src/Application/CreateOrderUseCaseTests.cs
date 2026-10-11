using Xunit;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Application.UseCases;

public class CreateOrderUseCaseTests
{
    [Fact]
    public async Task SuccessfulPath_SavesViaPort()
    {
        var mockRepo = new Mock<IOrderRepository>();
        var mockTime = new Mock<IKhNTUTimeProvider>();
        mockTime.Setup(t => t.GetCurrentTime()).Returns(DateTime.UtcNow);
        
        var useCase = new CreateOrderUseCase(mockRepo.Object, mockTime.Object);
        var items = new List<OrderItem> { new OrderItem { ProductId = 1, Quantity = 2, Price = 100 } };

        var result = await useCase.ExecuteAsync(123, items);

        Assert.NotNull(result);
        mockRepo.Verify(r => r.AddAsync(It.IsAny<long>()), Times.Once);
    }

    [Fact]
    public async Task DomainRule_InvalidData_ThrowsException()
    {
        var mockRepo = new Mock<IOrderRepository>();
        var mockTime = new Mock<IKhNTUTimeProvider>();
        var useCase = new CreateOrderUseCase(mockRepo.Object, mockTime.Object);

        await Assert.ThrowsAsync<ArgumentException>(async () =>
        {
            await useCase.ExecuteAsync(0, new List<OrderItem>());
        });

        mockRepo.Verify(r => r.AddAsync(It.IsAny<long>()), Times.Never);
    }

    [Fact]
    public async Task UseCase_WithMockedPort_DoesNotTouchInfrastructure_KhNTU42()
    {
        var mockRepo = new Mock<IOrderRepository>();
        var mockTime = new Mock<IKhNTUTimeProvider>();
        mockRepo.Setup(r => r.AddAsync(It.IsAny<long>())).ThrowsAsync(new InvalidOperationException("DB error"));
        
        var useCase = new CreateOrderUseCase(mockRepo.Object, mockTime.Object);
        var items = new List<OrderItem> { new OrderItem { ProductId = 1, Quantity = 1, Price = 50 } };

        await Assert.ThrowsAsync<InvalidOperationException>(async () =>
        {
            await useCase.ExecuteAsync(123, items);
        });
    }
}
