'use client'
// pages/index.tsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Order, Stock } from '../types'
import OrderDisplay from '../components/OrderDisplay'
import StockDisplay from '../components/StockDisplay'

export default function Home() {
  const [order, setOrder] = useState<Order | null>(null)
  const [stock, setStock] = useState<Stock | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderResponse, stockResponse] = await Promise.all([
          axios({
           method: 'get',
            url: 'http://localhost:8000/api/order',
            headers: {
              'Content-Type': 'application/json',
            },
          }),
          axios({
            method: 'get',
            url: 'http://localhost:8000/api/stock',
            headers: {
              'Content-Type': 'application/json',
            },
          }),
        ])
        setOrder(orderResponse.data)
        setStock(stockResponse.data)
        setLoading(false)
      } catch (err) {
        setError('Error fetching data')
        console.error(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>
  if (!order || !stock) return <div className="text-center mt-8">No data available</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bar Order System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <OrderDisplay order={order} />
        <StockDisplay stock={stock} />
      </div>
    </div>
  )
}