from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import stock, order

app = FastAPI(title="Bar Order API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock.router, prefix="/api", tags=["stock"])
app.include_router(order.router, prefix="/api", tags=["order"])

@app.get("/")

async def root():
    return {"message": "Welcome to this Bar Order API in FastAPI!"}