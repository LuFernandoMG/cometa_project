from pydantic import BaseModel
from typing import List

class OrderItem(BaseModel):
    name: str
    quantity: int

class Round(BaseModel):
    created: str
    items: List[OrderItem]

class Order(BaseModel):
    created: str
    paid: bool
    subtotal: float
    taxes: float
    discounts: float
    items: List[dict]
    rounds: List[Round]