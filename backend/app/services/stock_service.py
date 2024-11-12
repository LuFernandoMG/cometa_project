# app/services/stock_service.py
from models.stock import Stock, Beer
from datetime import datetime

class StockService:
    def __init__(self):
        self.stock = Stock(
            last_updated=datetime.now().isoformat(),
            beers=[
                Beer(name="Corona", price=9.5, quantity=400),
                Beer(name="Quilmes", price=7.5, quantity=510),
                Beer(name="Club Colombia", price=5.5, quantity=324),
            ]
        )

    def get_stock(self) -> Stock:
        return self.stock

    def update_stock(self, updated_stock: Stock) -> Stock:
        self.stock = updated_stock
        self.stock.last_updated = datetime.now().isoformat()
        return self.stock
