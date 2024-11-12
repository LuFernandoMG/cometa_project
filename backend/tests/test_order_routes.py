# tests/test_order_routes.py
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_get_order():
    response = client.get("/api/order")
    assert response.status_code == 200
    data = response.json()
    assert "created" in data
    assert "paid" in data
    assert "rounds" in data
    assert len(data["rounds"]) > 0

def test_update_order():
    new_order = {
        "created": "2024-09-10 12:00:00",
        "paid": True,
        "subtotal": 100,
        "taxes": 10,
        "discounts": 5,
        "items": [],
        "rounds": [
            {
                "created": "2024-09-10 12:00:30",
                "items": [
                    {"name": "Corona", "quantity": 2},
                    {"name": "Club Colombia", "quantity": 1},
                ]
            }
        ]
    }
    response = client.put("/api/order", json=new_order)
    assert response.status_code == 200
    data = response.json()
    assert data["paid"] == True
    assert data["subtotal"] == 100
    assert len(data["rounds"]) == 1

def test_add_round():
    new_round = {
        "created": "2024-09-10 13:00:00",
        "items": [
            {"name": "Quilmes", "quantity": 3},
        ]
    }
    response = client.post("/api/order/round", json=new_round)
    assert response.status_code == 200
    data = response.json()
    assert len(data["rounds"]) > 1
    assert data["rounds"][-1]["created"] == "2024-09-10 13:00:00"
    assert data["rounds"][-1]["items"][0]["name"] == "Quilmes"
    assert data["rounds"][-1]["items"][0]["quantity"] == 3