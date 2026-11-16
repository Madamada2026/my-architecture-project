deploymentDiagram
    node "Client Device" <<device>> {
        artifact "Web Browser (SPA)" <<artifact>>
    }

    node "Docker Host (Cloud VM / Local PC)" <<device>> {
        node "Docker Container (.NET Runtime)" <<executionEnvironment>> {
            artifact "WebAPI.dll (Modular Monolith)" <<artifact>>
            artifact "In-Memory Event Bus" <<artifact>>
            artifact "Consumers (Inventory, Notification)" <<artifact>>
        }
        node "Docker Container (PostgreSQL)" <<executionEnvironment>> {
            artifact "PostgreSQL Database" <<artifact>>
        }
    }

    node "External Systems" <<device>> {
        artifact "Payment Gateway API" <<artifact>>
        artifact "Email Service API" <<artifact>>
    }

    "Web Browser (SPA)" --> "WebAPI.dll (Modular Monolith)" : HTTPS / 443
    "WebAPI.dll (Modular Monolith)" --> "PostgreSQL Database" : TCP / 5432
    "WebAPI.dll (Modular Monolith)" --> "Payment Gateway API" : HTTPS / REST
    "WebAPI.dll (Modular Monolith)" --> "Email Service API" : HTTPS / SMTP