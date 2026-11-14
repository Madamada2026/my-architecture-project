# Звіт про виконання лабораторної роботи №5
## Тема: Подійно-орієнтована взаємодія компонентів (EDA)
**Студент:** Семеніхін Руслан  
**Група:** 3ПР1  
**Тег у репозиторії:** lr5  
**Посилання на репозиторій:** https://github.com/Madamada2026/my-architecture-project  

### 1. Каталог подій

| Подія | Видавець | Споживачі | Поля |
| :--- | :--- | :--- | :--- |
| OrderCreatedEvent | CreateOrderUseCase | InventoryConsumer, NotificationConsumer | EventId (Guid), OccurredAt (DateTime), OrderId (long), UserId (long), TotalAmount (decimal), SchemaTag |
| PaymentProcessedEvent | (Майбутній PaymentModule) | (Майбутній OrderModule) | EventId (Guid), OccurredAt (DateTime), OrderId (long), IsSuccess (bool), SchemaTag |

*Примітка:* Класи подій розміщено у шарі Domain (src/Domain/Events), оскільки вони є незмінними фактами предметної області. Згідно з правилом залежностей Clean Architecture, вони не можуть знаходитися в Infrastructure чи Application.

### 2. Транспорт
Обрано **Варіант Б (in-memory шина)**. Реалізовано клас InMemoryEventBus у шарі Infrastructure.Messaging. 

Використовується **Mediator Topology**, оскільки сценарій (CreateOrderUseCase) не знає про існування споживачів і просто публікує подію в абстрактний порт IEventPublisher. Шина викликає зареєстрованих обробників асинхронно через Task.Run, що дозволяє уникнути блокування основного потоку сценарію.

### 3. Видавець і споживачі
- **Сценарій-видавець:** CreateOrderUseCase. Після успішного збереження замовлення він формує OrderCreatedEvent і викликає IEventPublisher.PublishAsync().
- **Споживач 1:** InventoryConsumer. Резервує товари на складі (імітація бізнес-логіки з Task.Delay).
- **Споживач 2:** NotificationConsumer. Надсилає сповіщення користувачу про успішне створення замовлення.
Обидва споживачі працюють незалежно. Падіння одного споживача ловиться в блоці try-catch всередині шини і не зупиняє роботу іншого, а також не впливає на повернення відповіді клієнту.

### 4. Ідемпотентність
Оброблені ідентифікатори EventId зберігаються у потокобезпечній колекції ConcurrentDictionary у класі IdempotencyService (сховище khntu_processed_events_v5). Щоб різні споживачі не конфліктували, ключ формується як НазваСпоживача_EventId. Перед виконанням бізнес-логіки споживач викликає TryMarkAsProcessed(consumerName, eventId).

**Фрагмент логу з пропуском дубліката (при повторній доставці тієї самої події):**
```text
info: Infrastructure.Consumers.InventoryConsumer[0]
      InventoryConsumer: Reserving stock for Order 0
info: Infrastructure.Consumers.NotificationConsumer[0]
      NotificationConsumer: Sending email to user 123
info: Infrastructure.Consumers.InventoryConsumer[0]
      InventoryConsumer: Stock reserved successfully for Order 0
info: Infrastructure.Consumers.NotificationConsumer[0]
      NotificationConsumer: Email sent successfully for Order 0
warn: Infrastructure.Consumers.NotificationConsumer[0]
      [KhNTU-Idempotency-42] duplicate skipped. EventId: 18569613-c1a2-4ccf-bdd6-75427bf07a62