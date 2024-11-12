# tests/test_stock_routes.py
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_get_stock():
    response = client.get("/api/stock")
    assert response.status_code == 200
    data = response.json()
    assert "last_updated" in data
    assert "beers" in data
    assert len(data["beers"]) > 0

def test_update_stock():
    new_stock = {
        "last_updated": "2024-09-10 12:00:00",
        "beers": [
            {"name": "Corona", "price": 120, "quantity": 5},
            {"name": "Quilmes", "price": 125, "quantity": 3},
            {"name": "Club Colombia", "price": 115, "quantity": 4},
        ]
    }
    response = client.put("/api/stock", json=new_stock)
    assert response.status_code == 200
    data = response.json()
    assert data["beers"][0]["quantity"] == 5
    assert data["beers"][1]["quantity"] == 3
    assert data["beers"][2]["quantity"] == 4