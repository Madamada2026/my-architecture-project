# Звіт з Лабораторної роботи №2
**Тема:** Побудова C4 Model, UML-моделювання статичної структури та динаміки поведінки (MILESTONE 2)
**Варіант:** № 1 — E-Commerce Cloud Platform

---

## Розділ 1: C4 Model (Level 1 Context & Level 2 Container)

### 1.1 C4 Level 1: System Context Diagram
Діаграма відображає місце системи E-Commerce Cloud Platform у зовнішньому оточенні та взаємодію зі стейкхолдерами та зовнішніми сервісами.

```mermaid
graph TD
    User[End User / Покупець]
    Admin[Administrator / Менеджер]
    System[E-Commerce Cloud Platform]
    PaymentSystem[External Payment Gateway / LiqPay / Stripe]
    DeliverySystem[Nova Poshta API]

    User -->|HTTPS / Перегляд товарів, замовлення| System
    Admin -->|HTTPS / Управління каталогом| System
    System -->|HTTPS / REST API / Проведення платежів| PaymentSystem
    System -->|HTTPS / REST API / ТТН та доставка| DeliverySystem
```

### 1.2 C4 Level 2: Container Diagram
Розбиття системи на окремі технічні контейнери із зазначенням конкретних мережевих протоколів комунікації.

```mermaid
graph TB
    subgraph Client Space
        WebUI[Single Page Application / React via HTTPS]
        MobileApp[Mobile App / Flutter via HTTPS]
    end

    subgraph E-Commerce Platform Boundary
        Gateway[API Gateway / Nginx / HTTPS / REST]
        AuthService[Identity Provider / Keycloak / OIDC / OAuth2]
        
        subgraph Modular Monolith Backend
            OrderModule[Order & Catalog Service / Java Spring Boot]
        end

        MessageBroker[Message Broker / RabbitMQ / AMQP]
        NotificationService[Notification Worker / Go]

        PrimaryDB[(Primary DB / PostgreSQL / TCP/IP)]
        Cache[(Cache & Session Store / Redis / TCP/IP)]
    end

    WebUI -->|HTTPS / JSON| Gateway
    MobileApp -->|HTTPS / JSON| Gateway

    Gateway -->|HTTPS / REST| OrderModule
    Gateway -->|HTTPS / OIDC| AuthService

    OrderModule -->|TCP / SQL| PrimaryDB
    OrderModule -->|TCP / RESP| Cache
    OrderModule -->|AMQP / Async Events| MessageBroker

    MessageBroker -->|AMQP / Consume| NotificationService
```

---

## Розділ 2: UML Component Diagram & UML Class Diagram

### 2.1 UML Component Diagram (C4 Level 3)
Архітектура внутрішнього backend-модуля (Modular Monolith) із зазначенням надаваних (Provided) та запитуваних (Required) інтерфейсів.

```mermaid
graph LR
    subgraph Order Processing Module
        GW[API Gateway] -->|Provided: IOrderController| Controller[OrderController]
        Controller --> Service[OrderService]
        Service --> Repo[OrderRepository]
        Service -->|Required: IPaymentGateway| Payment[PaymentClient]
        Service -->|Required: IEventPublisher| Pub[EventPublisher]
    end

    Repo -->|TCP / SQL| DB[(PostgreSQL)]
    Payment -->|HTTPS / REST| LiqPay[External LiqPay API]
    Pub -->|AMQP| RMQ[RabbitMQ Broker]
```

### 2.2 UML Domain Class Diagram
Предметна область системи, що включає більше 5 основних сутностей з атрибутами, методами, типами доступу та кратністю.

```mermaid
classDiagram
    class User {
        +Long id
        +String email
        -String passwordHash
        +String fullName
        +register()
        +login()
    }

    class Product {
        +Long id
        +String title
        +BigDecimal price
        +Integer stockQuantity
        +updateStock(int qty)
    }

    class Order {
        +Long id
        +Date createdAt
        +OrderStatus status
        +BigDecimal totalAmount
        +calculateTotal()
        +changeStatus(OrderStatus newStatus)
    }

    class OrderItem {
        +Long id
        +Integer quantity
        +BigDecimal price
        +getCost()
    }

    class Payment {
        +Long id
        +String transactionId
        +BigDecimal amount
        +PaymentStatus status
        +processPayment()
    }

    class ShippingAddress {
        +String city
        +String street
        +String warehouseNumber
    }

    User "1" -- "0..*" Order : places
    Order "1" *-- "1..*" OrderItem : contains
    OrderItem "0..*" -- "1" Product : references
    Order "1" -- "1" Payment : has
    Order "1" o-- "1" ShippingAddress : ships to
```

---

## Розділ 3: UML Sequence Diagram & State Machine Diagram

### 3.1 UML Sequence Diagram
Сценарій створення замовлення під час високого навантаження із застосуванням комбінованих фрагментів `alt`, `opt` та `loop`.

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Покупець
    participant Gateway as API Gateway
    participant OrderSvc as Order Service
    participant Cache as Redis Cache
    participant DB as PostgreSQL
    participant Broker as RabbitMQ

    Customer->>Gateway: POST /api/v1/orders (JWT Token)
    
    alt Перевірка токена некоректна (401 Unauthorized)
        Gateway-->>Customer: 401 Unauthorized
    else Авторизація успішна
        Gateway->>OrderSvc: Process CreateOrderCommand
        
        loop Для кожного товару у кошику
            OrderSvc->>Cache: Перевірити наявність і ціну товару
            opt Якщо даних немає в кеші
                Cache-->>OrderSvc: Cache Miss
                OrderSvc->>DB: Запит товару з БД
                DB-->>OrderSvc: Дані товару
                OrderSvc->>Cache: Зберегти в кеш
            end
        end

        OrderSvc->>DB: Зберегти замовлення (Status: NEW)
        DB-->>OrderSvc: Success OrderID
        
        OrderSvc->>Broker: Publish Event: OrderCreatedEvent
        OrderSvc-->>Gateway: 202 Accepted (Order ID)
        Gateway-->>Customer: 202 Accepted { orderId: 1024, status: "PENDING" }
    end
```

### 3.2 UML State Machine Diagram
Життєвий цикл головної сутності домену — **Замовлення (Order)**.

```mermaid
stateDiagram-v2
    [*] --> New : Створення замовлення

    New --> PendingPayment : Очікування оплати
    New --> Cancelled : Скасовано користувачем

    PendingPayment --> Paid : Успішна оплата
    PendingPayment --> PaymentFailed : Помилка транзакції

    PaymentFailed --> PendingPayment : Повторна спроба
    PaymentFailed --> Cancelled : Таймаут оплати (15 хв)

    Paid --> Processing : Передано на склад
    Processing --> Shipped : Передано в службу доставки
    Shipped --> Delivered : Отримано покупцем

    Delivered --> Closed : Завершено
    Cancelled --> Closed : Архівовано

    Closed --> [*]
```

