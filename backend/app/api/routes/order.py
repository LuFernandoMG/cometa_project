# app/api/routes/order.py
from fastapi import APIRouter, Depends
from services.order_service import OrderService
from models.order import Order, Round

router = APIRouter()

def get_order_service():
    return OrderService()

@router.get("/order", response_model=Order)
async def get_order(order_service: OrderService = Depends(get_order_service)):
    return order_service.get_order()

@router.put("/order", response_model=Order)
async def update_order(updated_order: Order, order_service: OrderService = Depends(get_order_service)):
    return order_service.update_order(updated_order)

@router.post("/order/round", response_model=Order)
async def add_round(new_round: Round, order_service: OrderService = Depends(get_order_service)):
    return order_service.add_round(new_round)