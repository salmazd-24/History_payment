"use client";

import React, { useEffect, useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { login, isAuthenticated } from "@/services/auth";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const HistoryPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const { orders, loading, error } = useOrders();

  useEffect(() => {
    const authenticate = async () => {
      if (!isAuthenticated()) {
        try {
          await login("email@example.com", "password123"); // Ganti dengan kredensial pengguna
          setAuthenticated(true);
        } catch (err) {
          console.error(err.message);
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(true);
      }
    };

    authenticate();
  }, []);

  if (!authenticated) {
    return <p className="text-center text-red-500">Harap login terlebih dahulu.</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">History Pembayaran</h1>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="bg-white">
              <CardHeader>
                <CardTitle className="text-sm text-gray-700">
                  ID Pesanan: <span className="font-semibold">{order.id}</span>
                </CardTitle>
                <CardDescription>
                  <span className="font-semibold">Tanggal:</span>{" "}
                  {new Date(order.created).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <span className="font-semibold">Detail Pesanan:</span>
                </p>
                <ul className="list-disc ml-4 text-sm text-gray-600">
                  {order.menu && order.menu.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">
                    Total: Rp{order.total_price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      order.status_order === "selesai"
                        ? "text-green-500"
                        : "text-orange-500"
                    }`}
                  >
                    {order.status_order === "selesai" ? "Done" : "Ongoing"}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Tidak ada riwayat pemesanan.</p>
      )}
    </div>
  );
};

export default HistoryPage;
