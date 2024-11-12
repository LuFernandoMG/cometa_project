# app/services/order_service.py
from models.order import Order, Round, OrderItem
from datetime import datetime

class OrderService:
    def __init__(self):
        self.order = Order(
            created=datetime.now().isoformat(),
            paid=False,
            subtotal=0,
            taxes=0,
            discounts=0,
            items=[],
            rounds=[
                Round(
                    created="2024-09-10 12:00:30",
                    items=[
                        OrderItem(name="Corona", quantity=2),
                        OrderItem(name="Club Colombia", quantity=1),
                    ]
                ),
                Round(
                    created="2024-09-10 12:20:31",
                    items=[
                        OrderItem(name="Club Colombia", quantity=1),
                        OrderItem(name="Quilmes", quantity=2),
                    ]
                ),
                Round(
                    created="2024-09-10 12:43:21",
                    items=[
                        OrderItem(name="Quilmes", quantity=3),
                    ]
                ),
            ]
        )

    def calculate_totals(self):
        subtotal = 0
        price_map = {
            "Quilmes": 7.5,
            "Corona": 9.5,
            "Club Colombia": 5.5
        }
        for round in self.order.rounds:
            for item in round.items:
                # Assuming each item has a fixed price for simplicity
                price = price_map.get(item.name, 0)  # Get price from price_map, default to 0 if not found
                subtotal += item.quantity * price
        
        taxes = subtotal * 0.1  # Assuming a tax rate of 10%
        
        self.order.subtotal = subtotal
        self.order.taxes = taxes

    def apply_discounts(self):
        today = datetime.now().strftime('%A')
        if today == 'Thursday':
            self.order.discounts = self.order.subtotal * 0.2
        else:
            self.order.discounts = 0

    def get_order(self) -> Order:
        self.calculate_totals()
        self.apply_discounts()
        return self.order

    def update_order(self, updated_order: Order) -> Order:
        self.order = updated_order
        return self.order

    def add_round(self, new_round: Round) -> Order:
        self.order.rounds.append(new_round)
        return self.order