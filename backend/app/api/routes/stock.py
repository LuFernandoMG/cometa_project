# app/api/routes/stock.py
from fastapi import APIRouter, Depends
from services.stock_service import StockService
from models.stock import Stock

router = APIRouter()

def get_stock_service():
    return StockService()

@router.get("/stock", response_model=Stock)
async def get_stock(stock_service: StockService = Depends(get_stock_service)):
    return stock_service.get_stock()

@router.put("/stock", response_model=Stock)
async def update_stock(updated_stock: Stock, stock_service: StockService = Depends(get_stock_service)):
    return stock_service.update_stock(updated_stock)